import { useState, useRef } from "react";
import axios from "axios";
import { FileText, X, Loader2, Plus, ArrowRight } from "lucide-react";

const API_BASE = "https://api.toolshub.me";

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // ---------------- FILE HANDLING ----------------
  const handleFiles = (selectedFiles) => {
    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === "application/pdf"
    );

    setFiles((prev) => {
      const existing = prev.map((f) => f.name);
      const unique = pdfFiles.filter((f) => !existing.includes(f.name));
      return [...prev, ...unique];
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  // ---------------- MERGE LOGIC ----------------
  const handleConvert = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files");
      return;
    }

    const totalSize = files.reduce((acc, f) => acc + f.size, 0);
    if (totalSize > 50 * 1024 * 1024) {
      alert("Maximum total size allowed is 50MB");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE}/pdf/merge`, formData, {
        responseType: "blob",
        timeout: 300000,
      });

      //   const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(res.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = "merged-document.pdf";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      if (err.response?.data) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          alert(json.error || "Merge failed");
        } catch {
          alert("Merge failed. Invalid PDF or server error.");
        }
      } else {
        alert("Server not reachable. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col">
      {/* HEADER */}

      <section className="bg-gray-50  mt-24 flex items-center justify-center">
        <div className="max-w-4xl w-full px-4 text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800">
            Merge PDF files
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Combine PDFs in the order you want with the easiest PDF merger
            available.
          </p>
        </div>
      </section>

      {/* BODY */}
      <div className="flex-1 flex flex-col items-center px-4 pb-28">
        {files.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center w-full max-w-4xl h-[320px] transition-all
              ${
                isDragging
                  ? "bg-red-50 border-2 border-dashed border-red-500 scale-105"
                  : ""
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-12 py-6 bg-[#E5322D] hover:bg-[#d42c27] text-white text-2xl font-bold rounded-xl
                shadow-[0_4px_0_0_#b82824] active:translate-y-[4px] transition-all"
            >
              Select PDF files
            </button>
            <p className="mt-6 text-gray-500 text-sm">or drop PDFs here</p>
          </div>
        ) : (
          <div className="w-full max-w-6xl">
            {/* TOOLBAR */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {files.length} PDF{files.length > 1 ? "s" : ""} selected
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setFiles([])}
                  className="text-red-500 hover:text-red-700 font-semibold text-sm px-4 py-2 hover:bg-red-50 rounded-lg"
                >
                  Clear all
                </button>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-gray-800 text-white rounded-full p-3 hover:scale-105 transition"
                >
                  <Plus />
                </button>
              </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative bg-white aspect-[3/4] rounded-xl border shadow-sm p-4 flex flex-col items-center"
                >
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-white border rounded-full p-1 hover:bg-red-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>

                  <div className="flex-1 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-red-500" />
                  </div>

                  <p className="text-xs font-semibold text-gray-700 truncate w-full text-center">
                    {file.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </p>

                  <div className="absolute top-2 left-2 bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">
                    #{index + 1}
                  </div>
                </div>
              ))}

              <button
                onClick={() => fileInputRef.current.click()}
                className="aspect-[3/4] rounded-xl border-2 border-dashed border-gray-300 hover:border-red-400
                  flex items-center justify-center text-gray-400 hover:text-red-500"
              >
                <Plus />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      {files.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="hidden md:block text-sm text-gray-500">
              Total size:{" "}
              {(files.reduce((a, f) => a + f.size, 0) / 1024 / 1024).toFixed(2)}{" "}
              MB
            </div>

            <button
              onClick={handleConvert}
              disabled={loading}
              className="bg-[#E5322D] hover:bg-[#d42c27] text-white text-xl font-bold py-4 px-12 rounded-xl
                shadow-[0_4px_0_0_#b82824] active:translate-y-[4px] transition-all flex items-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Merging...
                </>
              ) : (
                <>
                  Merge PDF <ArrowRight />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* HIDDEN INPUT */}
      <input
        type="file"
        multiple
        accept="application/pdf"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
