import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import JSZip from "jszip";
import { useDropzone } from "react-dropzone";
import {
  FileText,
  Scissors,
  Download,
  AlertCircle,
  CheckCircle2,
  X,
  Loader2,
  ArrowRight
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { SPLIT_PDF_URL } from "../../utils/nodeApi";

/* ---------- Utility ---------- */
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function PdfSplit() {
  /* ---------- State ---------- */
  const [file, setFile] = useState(null);
  const [splitAt, setSplitAt] = useState("");
  const [status, setStatus] = useState("IDLE"); // IDLE | UPLOADING | PROCESSING | SUCCESS | ERROR
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [downloads, setDownloads] = useState({ zip: null, parts: [] });

  /* ---------- Memory Cleanup ---------- */
  // Revoke URLs to prevent memory leaks when component unmounts or resets
  useEffect(() => {
    return () => {
      if (downloads.zip) URL.revokeObjectURL(downloads.zip);
      downloads.parts.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [downloads]);

  /* ---------- Handlers ---------- */
  const onDrop = useCallback((accepted) => {
    const pdf = accepted?.[0];
    if (!pdf) return;

    if (pdf.type !== "application/pdf") {
      setErrorMessage("Please upload a valid PDF file.");
      setStatus("ERROR");
      return;
    }

    // Reset previous state
    if (downloads.zip) URL.revokeObjectURL(downloads.zip);
    
    setFile(pdf);
    setSplitAt("");
    setStatus("IDLE");
    setProgress(0);
    setDownloads({ zip: null, parts: [] });
    setErrorMessage("");
  }, [downloads]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  });

  const reset = () => {
    setFile(null);
    setSplitAt("");
    setStatus("IDLE");
    setProgress(0);
    setErrorMessage("");
    // Clean up memory
    if (downloads.zip) URL.revokeObjectURL(downloads.zip);
    setDownloads({ zip: null, parts: [] });
  };

  const handleSplit = async () => {
    if (!file || !splitAt) return;

    setStatus("UPLOADING");
    setProgress(0);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("splitAt", splitAt);

    try {
      const res = await axios.post(SPLIT_PDF_URL, fd, {
        responseType: "blob",
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / e.total);
          setProgress(pct < 100 ? pct : 98); // Hold at 98% during processing
        },
      });

      setStatus("PROCESSING");

      // Extract ZIP
      const zip = await JSZip.loadAsync(res.data);
      const parts = [];

      // Sort files to ensure Part 1 comes before Part 2 visually
      const filenames = Object.keys(zip.files).sort();

      for (const name of filenames) {
        if (!zip.files[name].dir) {
          const blob = await zip.files[name].async("blob");
          parts.push({
            name,
            url: URL.createObjectURL(blob),
          });
        }
      }

      setDownloads({
        zip: URL.createObjectURL(new Blob([res.data], { type: "application/zip" })),
        parts,
      });

      setProgress(100);
      setStatus("SUCCESS");
    } catch (err) {
      console.error(err);
      setStatus("ERROR");
      
      // Blob Error Parsing
      if (err.response?.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            setErrorMessage(JSON.parse(reader.result).error);
          } catch {
            setErrorMessage("Server error occurred.");
          }
        };
        reader.readAsText(err.response.data);
      } else {
        setErrorMessage("Network connection failed.");
      }
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-slate-50 flex mb-10 items-center justify-center mt-4 font-sans text-slate-900">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-slate-900/5 transition-all duration-300">
        
        {/* HEADER */}
        <div className="px-8 py-6 text-purple-700 text-center">
          <div className="flex  justify-center mb-2">
            <div className="flex flex-row  gap-4 bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Scissors className="w-8 h-8 text-purple-600" />
               <h1 className="text-4xl font-bold tracking-tight">PDF Splitter</h1>
            </div>
          </div>
         
          <p className="text-purple-500 text-sm mt-1 font-medium">
            Fast, secure, and accurate splitting
          </p>
        </div>

        <div className="p-8">
          
          {/* STATE: IDLE / ERROR (Upload) */}
          {!file && (
            <div
              {...getRootProps()}
              className={cn(
                "group relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ease-in-out",
                isDragActive
                  ? "border-red-500 bg-red-50"
                  : "border-slate-200 hover:border-red-400 hover:bg-slate-50"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-red-100 text-red-600 rounded-full group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">
                    Click to upload or drag PDF here
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Maximum 20 MB
                  </p>
                </div>
              </div>
              
              {/* Error Toast inside Dropzone */}
              {status === "ERROR" && !file && (
                <div className="absolute inset-x-4 bottom-4 bg-red-100 text-red-700 text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2">
                  <AlertCircle className="w-4 h-4" /> {errorMessage}
                </div>
              )}
            </div>
          )}

          {/* STATE: SELECTED (Form) */}
          {file && status !== "SUCCESS" && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              
              {/* File Card */}
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate max-w-[180px]">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={reset}
                  disabled={status === "UPLOADING" || status === "PROCESSING"}
                  className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Input Section */}
              <div className="relative">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1 mb-2 block">
                  Split Configuration
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Scissors className="h-5 w-5 text-slate-400 group-focus-within:text-red-500 transition-colors" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    placeholder="Split after page number..."
                    value={splitAt}
                    onChange={(e) => setSplitAt(e.target.value)}
                    disabled={status !== "IDLE" && status !== "ERROR"}
                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all font-medium"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 px-1">
                  Example: Entering <strong>5</strong> will create one PDF with pages 1-5, and another with pages 6-End.
                </p>
              </div>

              {/* Progress & Error */}
              {(status === "UPLOADING" || status === "PROCESSING") && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span className="flex items-center gap-2">
                      {status === "PROCESSING" && <Loader2 className="w-3 h-3 animate-spin text-red-600" />}
                      {status === "UPLOADING" ? "Uploading file..." : "Splitting pages..."}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-600 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>
                </div>
              )}

              {status === "ERROR" && errorMessage && (
                <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSplit}
                disabled={!splitAt || status === "UPLOADING" || status === "PROCESSING"}
                className={cn(
                  "w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]",
                  !splitAt || status === "UPLOADING" || status === "PROCESSING"
                    ? "bg-slate-300 shadow-none cursor-not-allowed text-slate-500"
                    : "bg-red-600 hover:bg-red-700 hover:shadow-red-600/30"
                )}
              >
                {status === "UPLOADING" || status === "PROCESSING" ? "Processing..." : "Split PDF Now"}
              </button>
            </div>
          )}

          {/* STATE: SUCCESS (Download) */}
          {status === "SUCCESS" && (
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto ring-4 ring-green-50">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-slate-900">Success!</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Your PDF has been split into {downloads.parts.length} parts.
                </p>
              </div>

              {/* Primary Action */}
              <a
                href={downloads.zip}
                download="split-output.zip"
                className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-900/10"
              >
                <Download className="w-5 h-5" /> Download All (ZIP)
              </a>

              {/* Divider */}
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink-0 mx-3 text-slate-400 text-[10px] uppercase font-bold tracking-wider">Or Individual Parts</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Secondary Actions */}
              <div className="grid grid-cols-1 gap-2">
                {downloads.parts.map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    download={p.name}
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-red-200 hover:bg-red-50/50 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-white transition">
                        <FileText className="w-4 h-4 text-slate-500 group-hover:text-red-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-red-700 truncate max-w-[150px]">
                        {p.name}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-400" />
                  </a>
                ))}
              </div>

              <button
                onClick={reset}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 py-2"
              >
                Split another file
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}