import { useState } from "react";
import {
  Upload,
  FileText,
  X,
  Cloud,
  HardDrive,
  Loader2,
} from "lucide-react";
import { compressPdf } from "../../utils/api";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";

export default function CompressPdf() {
  const toolMetadata = getToolMetadata('compress-pdf');
  const breadcrumbs = generateBreadcrumbs('compress-pdf');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectFiles = (e) => {
    const selected = Array.from(e.target.files).filter(
      (f) => f.type === "application/pdf"
    );
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (!files.length) return;

    try {
      setLoading(true);

      // ✅ API abstraction used here
      const blob = await compressPdf(files);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "compressed.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("PDF compression failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Compress PDF"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/compress-pdf"
        toolName={toolMetadata?.name}
        toolCategory="Compressor"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />
      <section className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800">
          Compress PDF files
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Reduce the size of your PDFs quickly and easily with our PDF compressor.
        </p>

        {/* Upload Button */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <label className="cursor-pointer">
              <div className="bg-[hsl(19,100%,56%)] hover:bg-red-600 transition text-white text-xl font-semibold px-16 py-6 rounded-2xl shadow-lg flex items-center gap-3">
                <Upload />
                Select PDF files
              </div>
              <input
                type="file"
                accept="application/pdf"
                multiple
                hidden
                onChange={onSelectFiles}
              />
            </label>

            {/* Cloud icons (UI only for now) */}
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              <button className="w-12 h-12 rounded-full bg-[hsl(19,100%,56%)] text-white flex items-center justify-center shadow hover:bg-red-600">
                <Cloud size={20} />
              </button>
              <button className="w-12 h-12 rounded-full bg-[hsl(19,100%,56%)] text-white flex items-center justify-center shadow hover:bg-red-600">
                <HardDrive size={20} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          or drop PDFs here
        </p>

        {/* Small Preview */}
        {files.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm shadow-sm"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span className="max-w-[140px] truncate">
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Convert Button */}
        {files.length > 0 && (
          <button
            onClick={handleConvert}
            disabled={loading}
            className="mt-10 bg-[hsl(19,100%,56%)] hover:bg-[rgb(230,92,0)]  disabled:opacity-60 text-white text-lg font-semibold px-12 py-4 rounded-xl inline-flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" />}
            Compress PDF
          </button>
        )}
      </div>
    </section>
    </>
  );
}
