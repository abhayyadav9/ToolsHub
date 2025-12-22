import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Upload, X, Loader2, FileImage, Trash2, CheckCircle2 } from "lucide-react";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";
import { IMAGE_TO_PDF_URL } from "../../utils/api";


export default function ImagesToPdf() {
  const toolMetadata = getToolMetadata('images-to-pdf');
  const breadcrumbs = generateBreadcrumbs('images-to-pdf');
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [success, setSuccess] = useState(false);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );

    if (validFiles.length === 0) return;

    // Add preview URL to the file object
    const newFiles = validFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    setImages((prev) => [...prev, ...newFiles]);
    setError("");
    setSuccess(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
    setError("");
    setSuccess(false);
  };

  const convert = async () => {
    if (!images.length) return setError("Please add at least one image.");

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post(IMAGE_TO_PDF_URL, formData, {
        responseType: "blob",
      });

      // Create download link
      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `converted_${new Date().getTime()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to convert. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Images to PDF Converter"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/images-to-pdf"
        toolName={toolMetadata?.name}
        toolCategory="Converter"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center  sm:p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="p-8 pb-4 text-center">
          <h1 className="text-6xl font-extrabold text-red-600 tracking-tight">
            Image to PDF Converter
          </h1>
          <p className="text-red-500 mt-2 text-sm">
            Drag & drop your photos to create a high-quality PDF instantly.
          </p>
        </div>

        <div className="p-8 pt-2">
          {/* Drop Zone */}
          <div
            className={`relative group transition-all duration-300 ease-in-out border-3 border-dashed rounded-2xl h-56 flex flex-col items-center justify-center cursor-pointer overflow-hidden
              ${dragActive 
                ? "border-red-500 bg-red-50 scale-[1.01]" 
                : "border-slate-200 hover:border-red-400 hover:bg-slate-50"
              }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            
            <div className="relative z-10 flex flex-col items-center pointer-events-none">
              <div className={`p-4 rounded-full mb-3 transition-colors ${dragActive ? "bg-red-100" : "bg-slate-100 group-hover:bg-white shadow-sm"}`}>
                <Upload className={`w-8 h-8 ${dragActive ? "text-red-600" : "text-slate-400 group-hover:text-red-500"}`} />
              </div>
              <p className="text-lg font-semibold text-slate-700">
                {dragActive ? "Drop files here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                JPG, PNG, WEBP supported
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
              <X className="w-4 h-4" /> {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4" /> PDF downloaded successfully!
            </div>
          )}

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-sm font-medium text-slate-600">
                  {images.length} {images.length === 1 ? 'file' : 'files'} selected
                </span>
                <button 
                  onClick={clearAll}
                  className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Clear all
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {images.map((img, i) => (
                  <div 
                    key={`${img.name}-${i}`} 
                    className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <img 
                      src={img.preview} 
                      alt="preview" 
                      className="w-full h-full object-cover" 
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removeImage(i)}
                        className="bg-white/90 text-red-500 p-2 rounded-full hover:bg-white hover:scale-110 transition-all shadow-lg"
                        title="Remove image"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* File info tag */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-1.5 border-t border-slate-100">
                      <p className="text-[10px] text-center text-slate-600 truncate font-medium">
                        {img.name}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Add More Button (Mini) */}
                <button
                  onClick={() => inputRef.current?.click()}
                  className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50/50 transition-all"
                >
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Add more</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8">
            <button
              onClick={convert}
              disabled={loading || images.length === 0}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]
                ${loading || images.length === 0
                  ? "bg-slate-300 cursor-not-allowed shadow-none" 
                  : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-200"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" /> Processing...
                </>
              ) : (
                <>
                  <FileImage className="w-5 h-5" /> Convert to PDF
                </>
              )}
            </button>
            
            <p className="text-xs text-slate-400 text-center mt-4 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              Secure processing • No quality loss
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}