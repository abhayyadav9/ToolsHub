import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Upload,
  Image as ImageIcon,
  Download,
  Loader2,
  Trash2,
  ArrowRight,
  RefreshCw,
  FileType,
  CheckCircle
} from "lucide-react";
import { CONVERT_URL } from "../../utils/nodeApi";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";

const FORMAT_OPTIONS = [
  { value: "jpg", label: "JPG", desc: "Best for photos" },
  { value: "png", label: "PNG", desc: "Lossless quality" },
  { value: "webp", label: "WEBP", desc: "Web optimized" },
  { value: "avif", label: "AVIF", desc: "Next-gen compression" },
];

export default function ImageTypeConverter() {
  const toolMetadata = getToolMetadata("image-type-converter");
  const breadcrumbs = generateBreadcrumbs("image-type-converter");
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [targetFormat, setTargetFormat] = useState("webp");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const onSelectFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const convertImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("format", targetFormat);

    try {
      setLoading(true);
      const res = await axios.post(CONVERT_URL, formData, {
        responseType: "blob",
      });

      const blob = res.data;
      setResult({
        url: URL.createObjectURL(blob),
        size: blob.size,
        format: targetFormat,
      });
    } catch (err) {
      console.error(err);
      alert("Conversion failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Image Format Converter"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/image-type-converter"
        toolName={toolMetadata?.name}
        toolCategory="Converter"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-gray-50 flex overflow-hidden">

        {/* LEFT SIDEBAR */}
        <div className="w-20 bg-white border-r flex flex-col items-center py-6 shadow-sm">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <RefreshCw className="text-white w-6 h-6" />
          </div>
          <div className="mt-10 w-12 h-12 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-xl">
            <FileType size={24} />
          </div>
        </div>

        {/* MAIN */}
        <div className="flex-1 flex flex-col">

          {/* TOP BAR */}
          <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
            <h2 className="font-bold text-lg">Format Converter</h2>
            {file && (
              <button
                onClick={reset}
                className="text-red-500 flex items-center gap-2 text-sm font-semibold"
              >
                <Trash2 size={16} /> Clear
              </button>
            )}
          </div>

          {/* CONTENT */}
          <div className="flex-1 flex items-center justify-center p-8">

            {!file ? (
              <div
                onClick={() => inputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onSelectFile(e.dataTransfer.files[0]);
                }}
                className="w-full max-w-2xl h-96 border-2 border-dashed bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500"
              >
                <Upload className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold">Upload Image</h3>
                <p className="text-gray-500 mt-2">
                  JPG, PNG, WEBP, AVIF supported
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => onSelectFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-[500px] rounded-xl shadow-lg"
                />
                <div className="mt-3 text-sm text-gray-500">
                  Original size: {formatBytes(file.size)}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-96 bg-white border-l shadow-xl p-6">
          {file ? (
            <>
              <h3 className="font-bold mb-4">Output Format</h3>

              <div className="grid grid-cols-2 gap-3">
                {FORMAT_OPTIONS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setTargetFormat(f.value)}
                    className={`p-3 rounded-xl border text-left ${
                      targetFormat === f.value
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="font-bold">{f.label}</div>
                    <div className="text-xs text-gray-500">{f.desc}</div>
                  </button>
                ))}
              </div>

              {!result ? (
                <button
                  onClick={convertImage}
                  disabled={loading}
                  className="mt-6 w-full bg-red-600 text-white py-4 rounded-xl font-bold"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Convert"}
                </button>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="bg-green-50 p-4 rounded-xl flex gap-3">
                    <CheckCircle className="text-green-600" />
                    <div>
                      <div className="font-bold text-green-700">
                        Conversion Complete
                      </div>
                      <div className="text-sm text-green-600">
                        Size: {formatBytes(result.size)}
                      </div>
                    </div>
                  </div>

                  <a
                    href={result.url}
                    download={`converted.${result.format}`}
                    className="block text-center bg-red-600 text-white py-4 rounded-xl font-bold"
                  >
                    <Download className="inline mr-2" />
                    Download
                  </a>

                  <button
                    onClick={() => setResult(null)}
                    className="w-full border py-3 rounded-xl font-semibold"
                  >
                    Convert Another
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ImageIcon size={40} />
              <p className="mt-3 text-sm text-center">
                Upload an image to start converting
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ✅ SINGLE utility */
const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};
