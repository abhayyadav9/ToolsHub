import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Upload,
  Image as ImageIcon,
  Download,
  Loader2,
  Trash2,
  Minimize2,
  CheckCircle,
  ArrowRight,
  Sliders,
  MoveHorizontal,
  FileBarChart
} from "lucide-react";

const API_URL = "http://localhost:3000/api/image/compress";

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

export default function ImageCompressor() {
  const fileRef = useRef(null);

  // State
  const [file, setFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [compressedResult, setCompressedResult] = useState(null);
  
  // Settings
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [comparePosition, setComparePosition] = useState(50); // For the slider

  const onSelectFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    setOriginalPreview(URL.createObjectURL(f));
    setCompressedResult(null);
  };

  const compressImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("targetSize", quality); // Sending quality as targetSize param based on your API

    try {
      setLoading(true);
      const res = await axios.post(API_URL, formData, {
        responseType: "blob",
      });

      const compressedBlob = res.data;
      const url = URL.createObjectURL(compressedBlob);
      
      setCompressedResult({
        blob: compressedBlob,
        size: compressedBlob.size,
        url: url,
        saved: ((file.size - compressedBlob.size) / file.size) * 100
      });
    } catch (err) {
      console.error(err);
      alert("Compression failed. Ensure your backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setOriginalPreview(null);
    setCompressedResult(null);
    setLoading(false);
  };

  /* ----------------------------------------------------------------------------------
     UI COMPONENTS
  ---------------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* 1. LEFT SIDEBAR (Navigation) */}
      <div className="w-full md:w-20 bg-white border-r border-gray-200 flex md:flex-col items-center py-4 md:space-y-8 z-20 shadow-sm justify-between md:justify-start">
        <div className="hidden md:block p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-md">
            <Minimize2 className="text-white w-6 h-6" />
        </div>
        <div className="flex md:flex-col gap-4">
             <div className="w-12 h-12 flex items-center justify-center text-green-600 bg-green-50 rounded-xl">
                <ImageIcon size={24} />
             </div>
        </div>
      </div>

      {/* 2. MAIN PREVIEW AREA */}
      <div className="flex-1 relative bg-gray-100 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shadow-sm z-10">
            <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                Compressor Studio
            </h2>
            <div className="flex items-center gap-3">
                {file && (
                    <button onClick={reset} className="px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
                        <Trash2 size={16}/> Clear
                    </button>
                )}
            </div>
        </div>

        {/* Canvas / Workspace */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto flex flex-col items-center justify-center">
            
            {!file ? (
                // EMPTY STATE
                <label 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); onSelectFile(e.dataTransfer.files[0]); }}
                    className="w-full max-w-2xl h-96 border-2 border-dashed border-gray-300 bg-white rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50/30 transition-all group"
                >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Upload Image</h3>
                    <p className="text-gray-500 mt-2">Drag & drop or click to browse</p>
                    <input type="file" accept="image/*" hidden ref={fileRef} onChange={(e) => onSelectFile(e.target.files[0])} />
                </label>
            ) : (
                // IMAGE PREVIEW AREA
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col h-full md:h-auto">
                    
                    {/* Comparison Viewer */}
                    <div className="relative w-full h-[400px] md:h-[500px] bg-[url('https://t3.ftcdn.net/jpg/02/03/99/33/360_F_203993306_c6ZlC4c70337851351113.jpg')] bg-repeat">
                        {compressedResult ? (
                            // SLIDER COMPARISON MODE
                            <div className="absolute inset-0 select-none overflow-hidden">
                                {/* Bottom Image (Compressed) */}
                                <img src={compressedResult.url} alt="Compressed" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                                
                                {/* Top Image (Original) - Clipped */}
                                <div 
                                    className="absolute inset-0 w-full h-full overflow-hidden border-r-2 border-white/50"
                                    style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
                                >
                                    <img src={originalPreview} alt="Original" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                                </div>

                                {/* Slider Handle */}
                                <input 
                                    type="range" min="0" max="100" value={comparePosition} 
                                    onChange={(e) => setComparePosition(e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                                />
                                <div 
                                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 pointer-events-none flex items-center justify-center"
                                    style={{ left: `${comparePosition}%` }}
                                >
                                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                                        <MoveHorizontal size={16} className="text-gray-600" />
                                    </div>
                                </div>

                                {/* Labels */}
                                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Original</div>
                                <div className="absolute top-4 right-4 bg-green-600/80 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Compressed</div>
                            </div>
                        ) : (
                            // SINGLE IMAGE MODE
                            <img src={originalPreview} alt="Preview" className="w-full h-full object-contain" />
                        )}
                    </div>
                </div>
            )}
        </div>
    </div>

      {/* 3. RIGHT SIDEBAR (Controls) */}
      <div className="w-full md:w-96 bg-white border-l border-gray-200 flex flex-col h-auto md:h-screen overflow-y-auto shadow-xl z-20">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Compression Settings</h3>
        </div>

        <div className="p-6 space-y-8 flex-1">
            {file ? (
                <>
                    {/* Stats Card */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                            <span className="text-xs font-bold text-gray-400 uppercase">Original Size</span>
                            <span className="font-mono text-sm font-bold text-gray-800">{formatBytes(file.size)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-400 uppercase">New Size</span>
                            <div className="text-right">
                                {compressedResult ? (
                                    <div className="flex flex-col items-end animate-in slide-in-from-bottom-2">
                                        <span className="font-mono text-lg font-bold text-green-600">{formatBytes(compressedResult.size)}</span>
                                        <span className="text-xs font-bold text-white bg-green-500 px-1.5 py-0.5 rounded">-{compressedResult.saved.toFixed(0)}%</span>
                                    </div>
                                ) : (
                                    <span className="text-sm text-gray-400 italic">Processing...</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-4">
                         <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Sliders size={16} /> Quality
                                </label>
                                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 rounded">{quality}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="10" 
                                max="100" 
                                value={quality} 
                                onChange={(e) => {
                                    setQuality(Number(e.target.value));
                                    setCompressedResult(null); // Reset result when changing quality
                                }}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>High Compression</span>
                                <span>Best Quality</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 space-y-3">
                        {!compressedResult ? (
                            <button 
                                onClick={compressImage}
                                disabled={loading}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Minimize2 />}
                                {loading ? "Compressing..." : "Compress Image"}
                            </button>
                        ) : (
                            <div className="space-y-3 animate-in fade-in">
                                <a 
                                    href={compressedResult.url} 
                                    download={`compressed-${file.name}`}
                                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-all hover:scale-105"
                                >
                                    <Download size={20} /> Download Result
                                </a>
                                <button 
                                    onClick={compressImage}
                                    className="w-full py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={16} /> Re-Compress
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                // Empty Sidebar State
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <FileBarChart size={32} className="text-gray-300" />
                    </div>
                    <p className="text-sm">Upload an image to <br/> adjust compression settings.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

// Icon for Re-compress
const RefreshCw = ({size, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);