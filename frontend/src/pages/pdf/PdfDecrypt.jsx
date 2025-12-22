import { useState, useRef } from "react";
import axios from "axios";
import {
  Unlock,
  Upload,
  Eye,
  EyeOff,
  Loader2,
  Download
} from "lucide-react";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";
import { PDF_DECRYPT_URL } from "../../utils/api";


const PdfDecrypt = () => {
  const fileInputRef = useRef(null);
  const toolMetadata = getToolMetadata('unlock-pdf');
  const breadcrumbs = generateBreadcrumbs('unlock-pdf');

  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f) => {
    if (!f || f.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }
    setError("");
    setFile(f);
  };

  const decryptPdf = async () => {
    if (!file) return setError("Please upload a protected PDF");
    if (!password) return setError("Password is required");

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    try {
      const res = await axios.post(PDF_DECRYPT_URL, formData, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "unlocked.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Incorrect password");
      } else {
        setError("Failed to unlock PDF");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Unlock PDF"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/unlock-pdf"
        toolName={toolMetadata?.name}
        toolCategory="Security"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
            <Unlock className="text-green-600 w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold mt-4">
            Unlock PDF
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Remove password protection from your PDF
          </p>
        </div>

        {/* FILE UPLOAD */}
        {!file ? (
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="mt-2 font-medium text-gray-600">
              Click to upload protected PDF
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-red-500 text-sm font-semibold"
            >
              Remove
            </button>
          </div>
        )}

        {/* PASSWORD */}
        <div className="mt-5 relative">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Enter PDF password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 pr-12"
          />
          <button
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPwd ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* ACTION */}
        <button
          onClick={decryptPdf}
          disabled={loading}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold
            ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Unlocking…
            </>
          ) : (
            <>
              <Download /> Unlock PDF
            </>
          )}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Files are processed securely and never stored
        </p>
      </div>
      </div>
    </>
  );
};

export default PdfDecrypt;
 
