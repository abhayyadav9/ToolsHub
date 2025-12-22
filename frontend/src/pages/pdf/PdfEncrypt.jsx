import { useState, useRef } from "react";
import axios from "axios";
import {
  Lock,
  Upload,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
  Download
} from "lucide-react";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";

import { PDF_ENCRYPT_URL  } from "../../utils/api";
export default function PdfEncrypt() {
  const fileInputRef = useRef(null);
  const toolMetadata = getToolMetadata('protect-pdf');
  const breadcrumbs = generateBreadcrumbs('protect-pdf');

  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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

  const encryptPdf = async () => {
    if (!file) return setError("Please upload a PDF");
    if (!password || password.length < 4)
      return setError("Password must be at least 4 characters");
    if (password !== confirm)
      return setError("Passwords do not match");

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    try {
      const res = await axios.post(PDF_ENCRYPT_URL, formData, {
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "protected.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to encrypt PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Protect PDF"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/protect-pdf"
        toolName={toolMetadata?.name}
        toolCategory="Protection"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />
      <div className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">

        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
            <Lock className="text-red-500 w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold mt-4">
            Protect PDF with Password
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Secure your PDF with strong AES-256 encryption
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
              Click to upload PDF
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

        {/* PASSWORDS */}
        <div className="mt-5 space-y-3">
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Set password"
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

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* ACTION */}
        <button
          onClick={encryptPdf}
          disabled={loading}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold
            ${loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Encrypting…
            </>
          ) : (
            <>
              <ShieldCheck /> Protect PDF
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
}