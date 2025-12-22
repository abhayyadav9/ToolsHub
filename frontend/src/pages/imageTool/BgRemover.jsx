import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  Download,
  Loader2,
  PaintBucket,
  RefreshCcw,
} from "lucide-react";
import { BASE_URL } from "../../utils/api";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";

const BG_API = `${BASE_URL}/remove-bg`;

export default function BgRemover() {
  const toolMetadata = getToolMetadata("bg-remover");
  const breadcrumbs = generateBreadcrumbs("bg-remover");

  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");

  /* -------- Cleanup object URLs -------- */
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  /* -------- Upload -------- */
  const onSelectFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);

    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl(null);
  };

  /* -------- Call Backend -------- */
  const removeBackground = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(BG_API, formData, {
        responseType: "blob",
        timeout: 180000,
      });

      setResultUrl(URL.createObjectURL(res.data));
    } catch (err) {
      console.error(err);

      if (err.code === "ECONNABORTED") {
        alert("Processing took too long. Try a smaller image.");
      } else {
        alert("Background removal failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* -------- Download with BG Color -------- */
  const downloadImage = async () => {
    if (!resultUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = resultUrl;

    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "bg-removed.png";
    a.click();
  };

  const resetAll = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);

    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setBgColor("#ffffff");
  };

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Remove Background"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/bg-remover"
        toolName={toolMetadata?.name}
        toolCategory="Editor"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-[#F4F5F7] flex justify-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-2xl font-bold mb-6">
            Remove Image Background
          </h1>

          {!originalUrl && (
            <label className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <Upload className="w-10 h-10 text-gray-400" />
              <span className="mt-2 font-medium text-gray-600">
                Upload Image
              </span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onSelectFile}
              />
            </label>
          )}

          {originalUrl && (
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <p className="font-semibold mb-2">Original</p>
                <img
                  src={originalUrl}
                  alt="Original"
                  className="rounded-xl shadow max-h-96 mx-auto"
                />
              </div>

              <div>
                <p className="font-semibold mb-2">Result</p>
                <div
                  className="rounded-xl shadow p-4 flex justify-center min-h-[300px]"
                  style={{ backgroundColor: bgColor }}
                >
                  {resultUrl ? (
                    <img
                      src={resultUrl}
                      alt="Result"
                      className="max-h-96"
                    />
                  ) : (
                    <div className="text-gray-400 self-center">
                      Result will appear here
                    </div>
                  )}
                </div>

                {resultUrl && (
                  <div className="flex items-center gap-3 mt-4">
                    <PaintBucket />
                    <span className="text-sm font-medium">
                      Background Color
                    </span>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {file && (
            <div className="flex gap-4 mt-8">
              {!resultUrl ? (
                <button
                  onClick={removeBackground}
                  disabled={loading}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Removing...
                    </>
                  ) : (
                    "Remove Background"
                  )}
                </button>
              ) : (
                <button
                  onClick={downloadImage}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Download /> Download Image
                </button>
              )}

              <button
                onClick={resetAll}
                className="px-6 py-4 border rounded-xl"
              >
                <RefreshCcw />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
