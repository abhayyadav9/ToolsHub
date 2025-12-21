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
  CheckCircle2,
  FileImage,
  Zap,
  Settings2
} from "lucide-react";

const API_URL = "http://localhost:3000/api/image/convert";

// Format options with descriptions for better UI
const FORMAT_OPTIONS = [
  { value: "jpg", label: "JPG", desc: "Best for photos", badge: "Lossy" },
  { value: "png", label: "PNG", desc: "Transparent backgrounds", badge: "Lossless" },
  { value: "webp", label: "WEBP", desc: "Modern web standard", badge: "Efficient" },
  { value: "avif", label: "AVIF", desc: "Next-gen compression", badge: "Ultra Small" },
];

export default function ImageTypeConverter() {
  const inputRef = useRef(null);

  // --- LOGIC (Untouched) ---
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
      const res = await axios.post(API_URL, formData, {
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
      alert("Conversion failed. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  // Helper for size
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Navbar / Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <RefreshCw className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Converter<span className="text-indigo-600">Pro</span></span>
          </div>
          {file && (
            <button 
              onClick={reset}
              className="text-sm font-medium text-slate-500 hover:text-red-600 flex items-center gap-2 transition-colors px-3 py-1.5 rounded-md hover:bg-red-50"
            >
              <Trash2 size={16} /> Clear Workspace
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Controls & Upload */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Upload Section */}
            {!file ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6">
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Convert Images Instantly</h1>
                  <p className="text-slate-500 text-lg">Transform your images into modern web formats securely.</p>
                </div>

                <label 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); onSelectFile(e.dataTransfer.files[0]); }}
                  className="group relative flex flex-col items-center justify-center w-full h-80 rounded-3xl border-2 border-dashed border-slate-300 bg-white hover:border-indigo-500 hover:bg-indigo-50/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center p-6">
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Upload size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Click or drag image here</h3>
                    <p className="text-slate-500 max-w-xs mx-auto">
                      Supports JPG, PNG, WEBP, AVIF up to 50MB.
                    </p>
                  </div>
                  <input type="file" accept="image/*" hidden ref={inputRef} onChange={(e) => onSelectFile(e.target.files[0])} />
                </label>
              </div>
            ) : (
              // Configuration State
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                
                {/* File Info Card */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                     <img src={preview} alt="thumb" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{file.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{formatBytes(file.size)} • {file.type.split('/')[1].toUpperCase()}</p>
                  </div>
                  <div className="ml-auto">
                    <button onClick={() => inputRef.current.click()} className="text-indigo-600 text-sm font-semibold hover:underline">Change</button>
                    <input type="file" accept="image/*" hidden ref={inputRef} onChange={(e) => onSelectFile(e.target.files[0])} />
                  </div>
                </div>

                {/* Format Selector */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Settings2 className="text-indigo-600" size={20} />
                    <h2 className="text-lg font-bold text-slate-900">Select Output Format</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FORMAT_OPTIONS.map((fmt) => (
                      <button
                        key={fmt.value}
                        onClick={() => setTargetFormat(fmt.value)}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 group ${
                          targetFormat === fmt.value
                            ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`font-bold text-lg ${targetFormat === fmt.value ? "text-indigo-700" : "text-slate-700"}`}>
                            {fmt.label}
                          </span>
                          {targetFormat === fmt.value && (
                            <CheckCircle2 size={20} className="text-indigo-600" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mb-3">{fmt.desc}</p>
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md ${
                          targetFormat === fmt.value ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"
                        }`}>
                          {fmt.badge}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  {!result ? (
                    <button
                      onClick={convertImage}
                      disabled={loading}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" /> Converting...
                        </>
                      ) : (
                        <>
                          Convert to {targetFormat.toUpperCase()} <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                        <Zap size={24} fill="currentColor" />
                      </div>
                      <h3 className="text-xl font-bold text-green-900">Conversion Successful!</h3>
                      <p className="text-green-700 mb-6">
                        Your image has been converted to {result.format.toUpperCase()}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 w-full">
                         <a
                          href={result.url}
                          download={`converted.${result.format}`}
                          className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-transform active:scale-95"
                        >
                          <Download size={20} /> Download
                        </a>
                        <button
                          onClick={() => setResult(null)}
                          className="px-6 py-3 bg-white border border-green-200 text-green-700 hover:bg-green-50 rounded-xl font-bold transition-colors"
                        >
                          Convert Another
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Preview Panel */}
          {file && (
            <div className="lg:col-span-5 animate-in slide-in-from-right-8 duration-500">
              <div className="sticky top-24 bg-white p-2 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="bg-slate-100/50 rounded-xl overflow-hidden flex items-center justify-center min-h-[400px] relative group">
                  <div className="absolute inset-0 bg-[url('https://t3.ftcdn.net/jpg/02/03/99/33/360_F_203993306_c6ZlC4c70337851351113.jpg')] opacity-10 bg-repeat z-0" />
                  
                  <img 
                    src={result ? result.url : preview} 
                    alt="preview" 
                    className="relative z-10 max-h-[500px] w-auto object-contain transition-all duration-300 group-hover:scale-[1.02]" 
                  />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
                    <FileType size={16} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-800">
                      {result ? (
                        <>Result • {formatBytes(result.size)}</>
                      ) : (
                        <>Original • {formatBytes(file.size)}</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}