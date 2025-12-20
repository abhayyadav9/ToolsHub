import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";
import SEOHelmet from "../seo/SEOHelment";

export default function NotFound() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "404 - Page Not Found",
    description:
      "The page you're looking for doesn't exist. Return to ToolsHub homepage.",
    url: "https://toolshub.me/404",
  };

  return (
    <>
      <SEOHelmet
        title="404 - Page Not Found | ToolsHub"
        description="The page you're looking for doesn't exist. Return to ToolsHub homepage to access our free online tools."
        structuredData={structuredData}
      />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6">
        
        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />

        {/* Content */}
        <div className="relative z-10 max-w-xl w-full text-center animate-in fade-in zoom-in duration-700">

          {/* Floating 404 */}
          <h1 className="text-[140px] font-extrabold leading-none bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-bounce">
            404
          </h1>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Oops! Page not found
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Looks like you took a wrong turn.
            <br />
            The page doesn’t exist or was moved somewhere else.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-red-500 text-white font-bold text-lg shadow-lg hover:bg-red-600 hover:scale-105 transition-all"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gray-900 text-white font-bold text-lg shadow-lg hover:bg-black hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Popular links */}
          <div className="mt-12 text-left">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">
              Popular pages
            </h3>

            <div className="grid gap-3">
              {[
                {
                  title: "PDF Tools",
                  desc: "Merge, split, compress PDFs",
                  link: "/tools/merge-pdf",
                  color: "bg-red-100 text-red-600",
                },
                {
                  title: "Word to PDF",
                  desc: "Convert documents easily",
                  link: "/tools/word-to-pdf",
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  title: "About ToolsHub",
                  desc: "Know what we’re building",
                  link: "/about",
                  color: "bg-purple-100 text-purple-600",
                },
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.link}
                  className="group flex items-center gap-4 p-4 bg-white border rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}
                  >
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-red-500 transition">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
