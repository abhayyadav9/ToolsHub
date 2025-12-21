import React, { useState } from "react";
import axios from "axios";
import {
  Upload,
  Download,
  Loader2,
  PaintBucket,
  RefreshCcw,
} from "lucide-react";

const BG_API = "http://10.158.178.3:5000/remove-bg";

export default function BgRemover() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");

  /* -------- Upload -------- */
  const onSelectFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl(null);
  };

  /* -------- Call Backend -------- */
  const removeBackground = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // ✅ MATCHES BACKEND

    try {
      setLoading(true);

      const res = await axios.post(BG_API, formData, {
        responseType: "blob",
        timeout: 180000, // ✅ 3 MINUTES (CRITICAL)
      });

      const blobUrl = URL.createObjectURL(res.data);
      setResultUrl(blobUrl);
    } catch (err) {
      console.error(err);

      if (err.code === "ECONNABORTED") {
        alert("Processing took too long. Try a smaller image.");
      } else if (err.response?.data) {
        alert("Background removal failed.");
      } else {
        alert("Network error.");
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

    const finalUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = finalUrl;
    a.download = "bg-removed.png";
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6">Remove Image Background</h1>

        {!originalUrl && (
          <label className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <Upload className="w-10 h-10 text-gray-400" />
            <span className="mt-2 font-medium text-gray-600">
              Upload Image
            </span>
            <input type="file" accept="image/*" hidden onChange={onSelectFile} />
          </label>
        )}

        {originalUrl && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <p className="font-semibold mb-2">Original</p>
              <img src={originalUrl} className="rounded-xl shadow max-h-96 mx-auto" />
            </div>

            <div>
              <p className="font-semibold mb-2">Result</p>
              <div
                className="rounded-xl shadow p-4 flex justify-center"
                style={{ backgroundColor: bgColor }}
              >
                {resultUrl ? (
                  <img src={resultUrl} className="max-h-96" />
                ) : (
                  <div className="text-gray-400">Result will appear here</div>
                )}
              </div>

              {resultUrl && (
                <div className="flex items-center gap-3 mt-4">
                  <PaintBucket />
                  <span className="text-sm font-medium">Background Color</span>
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
              onClick={() => {
                setFile(null);
                setOriginalUrl(null);
                setResultUrl(null);
              }}
              className="px-6 py-4 border rounded-xl"
            >
              <RefreshCcw />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
