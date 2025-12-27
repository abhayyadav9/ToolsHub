import { useState } from "react";
import axios from "axios";
import { 
  Link as LinkIcon, 
  Copy, 
  Check, 
  Loader2, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Globe
} from "lucide-react";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";
import { NODE_BASE_URL } from "../../utils/nodeApi";

export default function UrlShortener() {
  const toolMetadata = getToolMetadata('url-shortener');
  const breadcrumbs = generateBreadcrumbs('url-shortener');
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const validateUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleShorten = async () => {
    setError("");
    setShortUrl("");
    setCopied(false);

    if (!originalUrl) {
      setError("Please enter a URL first.");
      return;
    }

    if (!validateUrl(originalUrl)) {
      setError("Please enter a valid URL (include http:// or https://).");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`https://toolshub-kg7q.onrender.com/url/shorten`, {
        originalUrl,
      });

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to shorten link. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleShorten();
    }
  };

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "URL Shortener"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/url-shortener"
        toolName={toolMetadata?.name}
        toolCategory="URL Utility"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-[60vh] flex items-center justify-center bg-red-50/50 p-4">
      <div className="max-w-xl w-full">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
          
          {/* Decorative Gradient Top */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 shadow-sm">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-extrabold text-purple-600 tracking-tight">
                Shorten Your Link
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                Paste a long URL to create a short, shareable link instantly.
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon className={`w-5 h-5 transition-colors ${error ? "text-red-400" : "text-gray-400 group-focus-within:text-indigo-500"}`} />
                </div>
                <input
                  type="url"
                  placeholder="https://very-long-url.com/example..."
                  value={originalUrl}
                  onChange={(e) => {
                    setOriginalUrl(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  className={`block w-full pl-12 pr-4 py-4 bg-red-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:bg-white transition-all
                    ${error 
                      ? "border-red-300 focus:ring-red-200" 
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleShorten}
                disabled={loading}
                className="w-full py-4 bg-red-500 hover:bg-red-400 text-white rounded-xl font-bold text-lg shadow-lg shadow-gray-200 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-indigo-300" /> Shorten URL
                  </>
                )}
              </button>
            </div>

            {/* Result Section */}
            {shortUrl && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative p-1 rounded-2xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
                  <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-3 overflow-hidden w-full">
                      <div className="p-2 bg-green-50 rounded-lg shrink-0">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">
                          Short Link Ready
                        </p>
                        <a 
                          href={shortUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-indigo-600 font-bold hover:underline truncate block"
                        >
                          {shortUrl}
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={handleCopy}
                      className={`shrink-0 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all duration-200
                        ${copied 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-gray-700 hover:bg-red-200"
                        }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <p className="text-center text-xs text-gray-400 mt-4">
                  Link expires in 24 hours • <span className="hover:text-gray-600 cursor-pointer underline">Details</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Security / Info Badge */}
        {!shortUrl && (
          <div className="mt-6 flex justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
               🔒 Secure & Encrypted
            </span>
            <span className="flex items-center gap-1.5">
               ⚡ Fast Processing
            </span>
          </div>
        )}
      </div>
    </div>
    </>
  );
}