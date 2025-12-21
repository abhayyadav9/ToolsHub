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
  CheckCircle,
  FileImage
} from "lucide-react";
import { CONVERT_URL } from "../../utils/nodeApi";


const FORMAT_OPTIONS = [
  { value: "jpg", label: "JPG", desc: "Best for photos" },
  { value: "png", label: "PNG", desc: "Lossless quality" },
  { value: "webp", label: "WEBP", desc: "Web optimized" },
  { value: "avif", label: "AVIF", desc: "Next-gen compression" },
];

export default function ImageTypeConverter() {
  const inputRef = useRef(null);

  // State
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
      // Simulate API call or Real API call
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

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* 1. LEFT SIDEBAR (Navigation Placeholder) */}
      <div className="w-full md:w-20 bg-white border-r border-gray-200 flex md:flex-col items-center py-4 md:space-y-8 z-20 shadow-sm justify-between md:justify-start">
        <div className="hidden md:block p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md">
            <RefreshCw className="text-white w-6 h-6" />
        </div>
        <div className="flex md:flex-col gap-4">
             <div className="w-12 h-12 flex items-center justify-center text-indigo-600 bg-indigo-50 rounded-xl">
                <FileType size={24} />
             </div>
        </div>
      </div>

      {/* 2. MAIN WORKSPACE */}
      <div className="flex-1 relative bg-gray-100 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shadow-sm z-10">
            <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                Format Converter
            </h2>
            {file && (
                <button onClick={reset} className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 size={16}/> Clear
                </button>
            )}
        </div>

        {/* Canvas */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col items-center justify-center">
            {!file ? (
                // EMPTY STATE
                <label 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); onSelectFile(e.dataTransfer.files[0]); }}
                    className="w-full max-w-2xl h-96 border-2 border-dashed border-gray-300 bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group"
                >
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Upload Image</h3>
                    <p className="text-gray-500 mt-2">JPG, PNG, WEBP, AVIF supported</p>
                    <input type="file" accept="image/*" hidden ref={inputRef} onChange={(e) => onSelectFile(e.target.files[0])} />
                </label>
            ) : (
                // PREVIEW AREA
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-200">
                        <img src={preview} alt="Preview" className="max-h-[500px] w-auto rounded-xl object-contain" />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                        <FileImage size={16} /> 
                        <span>Original: {formatBytes(file.size)}</span>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR (Controls) */}
      <div className="w-full md:w-96 bg-white border-l border-gray-200 flex flex-col h-auto md:h-screen shadow-xl z-20">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Conversion Settings</h3>
        </div>

        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
            {file ? (
                <>
                    {/* Format Grid */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Output Format</label>
                        <div className="grid grid-cols-2 gap-3">
                            {FORMAT_OPTIONS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setTargetFormat(f.value)}
                                    className={`text-left p-3 rounded-xl border transition-all ${
                                        targetFormat === f.value
                                        ? "border-red-600 bg-red-50 ring-1 ring-red-600"
                                        : "border-gray-200 hover:border-red-300 hover:bg-red-50"
                                    }`}
                                >
                                    <div className={`font-bold text-sm ${targetFormat === f.value ? "text-red-700" : "text-gray-700"}`}>
                                        {f.label}
                                    </div>
                                    <div className="text-[10px] text-gray-500 mt-0.5">{f.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="pt-4 space-y-4">
                        {!result ? (
                            <button 
                                onClick={convertImage}
                                disabled={loading}
                                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                                {loading ? "Converting..." : "Convert Now"}
                            </button>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-green-800 text-sm">Conversion Complete</div>
                                        <div className="text-xs text-green-600">New size: {formatBytes(result.size)}</div>
                                    </div>
                                </div>

                                <a 
                                    href={result.url}
                                    download={`converted-image.${result.format}`}
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 flex items-center justify-center gap-2 transition-all hover:scale-105"
                                >
                                    <Download size={20} /> Download {result.format.toUpperCase()}
                                </a>

                                <button 
                                    onClick={() => setResult(null)}
                                    className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2"
                                >
                                    <ArrowRight size={16} /> Convert Another
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                // Empty State Sidebar
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center transform rotate-3">
                        <ImageIcon size={32} className="text-gray-300" />
                    </div>
                    <p className="text-sm px-4">Upload an image to see conversion options.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

// Utility to duplicate formatting logic if needed outside component
const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};