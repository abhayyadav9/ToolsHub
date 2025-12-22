import { useState } from "react";
import {
  Upload,
  FileText,
  X,
  Cloud,
  HardDrive,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";

export default function ConvertToPdf() {
  const toolMetadata = getToolMetadata('images-to-pdf');
  const breadcrumbs = generateBreadcrumbs('images-to-pdf');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FILE SELECT ---------------- */
  const onSelectFiles = (e) => {
    const selected = Array.from(e.target.files).filter((f) => {
      const name = f.name.toLowerCase();
      return (
        name.endsWith(".doc") ||
        name.endsWith(".docx") ||
        name.endsWith(".ppt") ||
        name.endsWith(".pptx") ||
        name.endsWith(".xls") ||
        name.endsWith(".xlsx") ||
        name.endsWith(".odt") ||
        name.endsWith(".odp") ||
        name.endsWith(".ods") ||
        name.endsWith(".rtf") ||
        name.endsWith(".txt")
      );
    });

    if (!selected.length) {
      alert(
        "Supported formats: DOC, DOCX, PPT, PPTX, XLS, XLSX, ODT, ODP, ODS, RTF, TXT"
      );
      return;
    }

    setFiles((prev) => {
      const existing = prev.map((f) => f.name);
      const unique = selected.filter((f) => !existing.includes(f.name));
      return [...prev, ...unique];
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------------- CONVERT ---------------- */
  const handleConvert = async () => {
    if (!files.length) return;

    const formData = new FormData();
    formData.append("file", files[0]); // backend supports single file

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/pdf/convert-any-to-pdf`,
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${files[0].name.split(".")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      // ---- Proper Blob Error Parsing ----
      if (err.response && err.response.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const json = JSON.parse(reader.result);
            alert(json.error || "Conversion failed");
            console.error("Backend error:", json);
          } catch {
            alert("Conversion failed (unknown error)");
          }
        };
        reader.readAsText(err.response.data);
      } else {
        alert("Network or server error");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Convert to PDF"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/convert-to-pdf"
        toolName={toolMetadata?.name}
        toolCategory="Converter"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />
      <section className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 text-center">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800">
          Convert Documents to PDF
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Convert Word, PPT, Excel & more into high-quality PDF.
        </p>

        {/* Upload */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <label className="cursor-pointer">
              <div className="bg-[hsl(19,100%,56%)] hover:bg-red-600 transition text-white text-xl font-semibold px-16 py-6 rounded-2xl shadow-lg flex items-center gap-3">
                <Upload />
                Select document
              </div>

              <input
                type="file"
                accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.odt,.odp,.ods,.rtf,.txt"
                hidden
                onChange={onSelectFiles}
              />
            </label>

            {/* UI icons */}
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
          Supported: DOC, PPT, XLS, ODT, RTF, TXT
        </p>

        {/* Preview */}
        {files.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 text-sm shadow-sm"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <span className="max-w-[160px] truncate">
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

        {/* Convert */}
        {files.length > 0 && (
          <button
            onClick={handleConvert}
            disabled={loading}
            className="mt-10 bg-[hsl(19,100%,56%)] hover:bg-[rgb(230,92,0)] disabled:opacity-60 text-white text-lg font-semibold px-12 py-4 rounded-xl inline-flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" />}
            Convert to PDF
          </button>
        )}
      </div>
    </section>
    </>
  );
}
