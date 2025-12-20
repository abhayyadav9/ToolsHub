import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Wrench } from "lucide-react";
import SEOHelmet from "../seo/SEOHelment";

export default function UnderDevelopment() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Under Development | ToolsHub",
    description:
      "This feature is currently under development. Please check back soon.",
    url: "https://toolshub.me/under-development",
  };

  return (
    <>
      <SEOHelmet
        title="Under Development | ToolsHub"
        description="This feature is currently under development. Please check back soon."
        structuredData={structuredData}
      />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-6">

        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-200 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />

        {/* Content */}
        <div className="relative z-10 max-w-xl w-full text-center animate-in fade-in zoom-in duration-700">

          {/* Icon */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center animate-bounce">
            <Wrench className="w-10 h-10 text-orange-600" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Under Development
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            This feature is currently being crafted with care 🛠️  
            <br />
            We’ll launch it very soon. Stay tuned!
          </p>

          {/* Status badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold text-sm animate-pulse">
            🚧 Work in progress
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
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

          {/* Footer hint */}
          <p className="mt-10 text-sm text-gray-400">
            Building awesome tools at <span className="font-semibold">ToolsHub</span> ✨
          </p>

        </div>
      </div>
    </>
  );
}
