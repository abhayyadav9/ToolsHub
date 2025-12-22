import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  Image as ImageIcon,
  Download,
  Loader2,
  Trash2,
  Minimize2,
  Sliders,
  MoveHorizontal,
  FileBarChart,
  RefreshCw,
  AlertCircle
} from "lucide-react";

// Assuming these paths exist in your project structure
import { COMPRESS_URL } from "../../utils/nodeApi";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";

/* ----------------------------------------------------------------------------------
   HELPER: FORMAT BYTES
---------------------------------------------------------------------------------- */
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

/* ----------------------------------------------------------------------------------
   HELPER: TRANSPARENCY GRID (Base64)
   Prevents usage of external URLs for the checkered background
---------------------------------------------------------------------------------- */
const TRANSPARENT_BG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAjyQc6wcEGAIAoLwXkwwTAz8AAAAASUVORK5CYII=";

export default function ImageCompressor() {
  const toolMetadata = getToolMetadata('compress-image');
  const breadcrumbs = generateBreadcrumbs('compress-image');
  
  const fileRef = useRef(null);

  // State
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [compressedResult, setCompressedResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Settings
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [comparePosition, setComparePosition] = useState(50); // Slider position

  // Memory Cleanup: Revoke Object URLs when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      if (compressedResult?.url) URL.revokeObjectURL(compressedResult.url);
    };
  }, [originalPreview, compressedResult]);

  const onSelectFile = (f) => {
    if (!f || !f.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    
    // Cleanup previous preview
    if (originalPreview) URL.revokeObjectURL(originalPreview);

    setFile(f);
    setOriginalPreview(URL.createObjectURL(f));
    setCompressedResult(null);
    setQuality(80); // Reset defaults
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelectFile(e.dataTransfer.files[0]);
    }
  };

  const compressImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("targetSize", quality); 

    try {
      setLoading(true);
      const res = await axios.post(COMPRESS_URL, formData, {
        responseType: "blob",
      });

      const compressedBlob = res.data;
      const url = URL.createObjectURL(compressedBlob);

      setCompressedResult({
        blob: compressedBlob,
        size: compressedBlob.size,
        url: url,
        saved: ((file.size - compressedBlob.size) / file.size) * 100,
      });
    } catch (err) {
      console.error(err);
      alert("Compression failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setOriginalPreview(null);
    setCompressedResult(null);
    setLoading(false);
    setQuality(80);
  };

  return (
    <div>
      <EnhancedSEO
        title={toolMetadata?.title || "AI Image Compressor"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/compress-image"
        toolName={toolMetadata?.name}
        toolCategory="Compression"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col md:flex-row overflow-hidden">
        
        {/* 1. LEFT SIDEBAR (Navigation) */}
        <div className="w-full md:w-20 bg-white border-r border-gray-200 flex md:flex-col items-center py-4 md:space-y-8 z-30 shadow-sm justify-between md:justify-start px-4 md:px-0">
          <div className="hidden md:flex p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg shadow-red-200">
            <Minimize2 className="text-white w-6 h-6" />
          </div>
          <div className="flex md:flex-col gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-red-600 bg-red-50 rounded-xl transition-colors hover:bg-red-100 cursor-pointer">
              <ImageIcon size={24} />
            </div>
          </div>
        </div>

        {/* 2. MAIN PREVIEW AREA */}
        <div className="flex-1 relative bg-gray-100 flex flex-col h-[calc(100vh-80px)] md:h-screen overflow-hidden">
          
          {/* Top Bar */}
          <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shadow-sm z-20">
            <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              Compressor Studio
            </h2>
            <div className="flex items-center gap-3">
              {file && (
                <button
                  onClick={reset}
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Canvas / Workspace */}
          <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center overflow-y-auto">
            {!file ? (
              // EMPTY STATE
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`w-full max-w-2xl h-96 border-3 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
                  ${isDragging 
                    ? "border-red-500 bg-red-50 scale-[1.02]" 
                    : "border-gray-300 bg-white hover:border-red-400 hover:bg-gray-50"
                  }`}
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 ${isDragging ? "bg-white scale-110" : "bg-red-50 group-hover:scale-110"}`}>
                  <Upload className={`w-10 h-10 ${isDragging ? "text-red-600" : "text-red-500"}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Upload Image</h3>
                <p className="text-gray-500 mt-2">
                  JPG, PNG, WEBP • Drag & drop or click
                </p>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileRef}
                  onChange={(e) => onSelectFile(e.target.files[0])}
                />
              </div>
            ) : (
              // IMAGE PREVIEW AREA
              <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col">
                {/* Comparison Viewer */}
                <div 
                  className="relative w-full h-[300px] md:h-[500px] bg-repeat"
                  style={{ backgroundImage: `url(${TRANSPARENT_BG})` }}
                >
                  {compressedResult ? (
                    // SLIDER COMPARISON MODE
                    <div className="absolute inset-0 select-none overflow-hidden group">
                      {/* Bottom Image (Compressed) */}
                      <img
                        src={compressedResult.url}
                        alt="Compressed"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                      />

                      {/* Top Image (Original) - Clipped */}
                      <div
                        className="absolute inset-0 w-full h-full overflow-hidden border-r border-white/50 shadow-2xl"
                        style={{
                          clipPath: `inset(0 ${100 - comparePosition}% 0 0)`,
                        }}
                      >
                        <img
                          src={originalPreview}
                          alt="Original"
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      </div>

                      {/* Slider Handle */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={comparePosition}
                        onChange={(e) => setComparePosition(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                      />
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-20 pointer-events-none flex items-center justify-center transition-transform"
                        style={{ left: `${comparePosition}%` }}
                      >
                        <div className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 ring-4 ring-black/5">
                          <MoveHorizontal size={18} />
                        </div>
                      </div>

                      {/* Labels */}
                      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-sm pointer-events-none">
                        Original ({formatBytes(file.size)})
                      </div>
                      <div className="absolute top-4 right-4 bg-red-600/90 text-white px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-sm pointer-events-none">
                        Compressed ({formatBytes(compressedResult.size)})
                      </div>
                    </div>
                  ) : (
                    // SINGLE IMAGE MODE
                    <img
                      src={originalPreview}
                      alt="Preview"
                      className="w-full h-full object-contain p-4"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. RIGHT SIDEBAR (Controls) */}
        <div className="w-full md:w-96 bg-white border-l border-gray-200 flex flex-col h-auto md:h-screen overflow-y-auto shadow-2xl z-30">
          <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sliders size={18} className="text-red-500" /> Settings
            </h3>
          </div>

          <div className="p-6 space-y-8 flex-1">
            {file ? (
              <div className="animate-in slide-in-from-right-4 duration-300">
                {/* Stats Card */}
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Original
                    </span>
                    <span className="font-mono text-sm font-bold text-gray-800">
                      {formatBytes(file.size)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Result
                    </span>
                    <div className="text-right">
                      {compressedResult ? (
                        <div className="flex flex-col items-end animate-in fade-in zoom-in-95">
                          <span className="font-mono text-lg font-bold text-red-600">
                            {formatBytes(compressedResult.size)}
                          </span>
                          <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-full mt-1">
                            -{compressedResult.saved.toFixed(0)}% Saved
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400 italic flex items-center gap-1">
                          <AlertCircle size={12} /> Pending...
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Slider Control */}
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-gray-700">Compression Level</label>
                    <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                      {quality}%
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => {
                      setQuality(Number(e.target.value));
                      setCompressedResult(null); // Reset result when changing quality
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 hover:accent-red-700"
                  />
                  
                  <div className="flex justify-between text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                    <span>Smaller Size</span>
                    <span>Better Quality</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 space-y-3">
                  {!compressedResult ? (
                    <button
                      onClick={compressImage}
                      disabled={loading}
                      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Minimize2 size={20} />
                      )}
                      {loading ? "Optimizing..." : "Compress Now"}
                    </button>
                  ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                      <a
                        href={compressedResult.url}
                        download={`compressed-${file.name}`}
                        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-all hover:translate-y-[-2px]"
                      >
                        <Download size={20} /> Download Image
                      </a>
                      <button
                        onClick={compressImage}
                        className="w-full py-3 bg-white border-2 border-gray-100 hover:border-red-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <RefreshCw size={16} /> Re-Compress
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Empty Sidebar State
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 opacity-60">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FileBarChart size={32} className="text-gray-300" />
                </div>
                <p className="text-sm font-medium">
                  Select an image to <br /> unlock settings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}