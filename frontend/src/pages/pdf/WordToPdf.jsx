import { useState } from "react";
import {
  Upload,
  FileText,
  X,
  Cloud,
  HardDrive,
  Loader2,
} from "lucide-react";
import { wordToPdf,BASE_URL } from "../../utils/api";
import axios from "axios";

export default function WordToPdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // ---------------- FILE SELECT ----------------
  const onSelectFiles = (e) => {
    const selected = Array.from(e.target.files).filter(
      (f) =>
        f.type === "application/msword" ||
        f.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        f.name.endsWith(".doc") ||
        f.name.endsWith(".docx")
    );

    if (!selected.length) {
      alert("Please select Word files only (.doc or .docx)");
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

  // ---------------- CONVERT ----------------
 const handleConvert = async () => {
  if (!files.length) return;

  const formData = new FormData();
  formData.append("file", files[0]);

  try {
    setLoading(true);

    const res = await axios.post(
      `${API_BASE}/pdf/convert-to-pdf`,
      formData,
      {
        responseType: "blob",
      }
    );

    // ✅ SUCCESS → download PDF
    const url = window.URL.createObjectURL(res.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "converted.pdf";
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    // 🔥 IMPORTANT: decode blob error
    if (err.response && err.response.data) {
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


  return (
    <section className="bg-gray-50 min-h-[90vh] flex items-center justify-center">
      <div className="max-w-4xl w-full px-4 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-800">
          Convert Word to PDF
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Easily convert your Word documents to PDF format.
        </p>

        {/* Upload */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <label className="cursor-pointer">
              <div className="bg-[hsl(19,100%,56%)] hover:bg-red-600 transition text-white text-xl font-semibold px-16 py-6 rounded-2xl shadow-lg flex items-center gap-3">
                <Upload />
                Select Word files
              </div>

              <input
                type="file"
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                multiple
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
          or drop Word files here
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

        {/* Convert */}
        {files.length > 0 && (
          <button
            onClick={handleConvert}
            disabled={loading}
            className="mt-10 bg-[hsl(19,100%,56%)] hover:bg-[rgb(230,92,0)]  disabled:opacity-60 text-white text-lg font-semibold px-12 py-4 rounded-xl inline-flex items-center gap-2"
          >
            {loading && <Loader2 className="animate-spin" />}
            Convert to PDF
          </button>
        )}
      </div>
    </section>
  );
}
