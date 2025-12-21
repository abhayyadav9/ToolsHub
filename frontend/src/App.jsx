import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";

// Lazy load components for better performance
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));
const UnderDevelopment = lazy(() => import("./components/UnderDevelopment"));

// Category Hub Pages
const PDFToolsHub = lazy(() => import("./pages/hubs/PDFToolsHub"));
const ImageToolsHub = lazy(() => import("./pages/hubs/ImageToolsHub"));
const VideoToolsHub = lazy(() => import("./pages/hubs/VideoToolsHub"));
const AudioToolsHub = lazy(() => import("./pages/hubs/AudioToolsHub"));
const DocumentToolsHub = lazy(() => import("./pages/hubs/DocumentToolsHub"));

// PDF Tools
const MergePdf = lazy(() => import("./pages/pdf/MergePdf"));
const CompressPdf = lazy(() => import("./pages/pdf/CompressPdf"));
const WordToPdf = lazy(() => import("./pages/pdf/WordToPdf"));
const PdfToWord = lazy(() => import("./pages/pdf/PdfToWord"));

// Image Tools
const ImageCropperTool = lazy(() => import("./pages/imageTool/ImageCropper"));
const QrGenerator = lazy(() => import("./pages/imageTool/QrGenerator"));
const ImageCompressor = lazy(() => import("./pages/imageTool/ImageCompressor"));
const ImageTypeConverter = lazy(() => import("./pages/imageTool/ImageTypeConverter"));
const BgRemover = lazy(() => import("./pages/imageTool/BgRemover"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Category Hub Pages */}
            <Route path="/pdf-tools" element={<PDFToolsHub />} />
            <Route path="/image-tools" element={<ImageToolsHub />} />
            <Route path="/video-tools" element={<VideoToolsHub />} />
            <Route path="/audio-tools" element={<AudioToolsHub />} />
            <Route path="/document-tools" element={<DocumentToolsHub />} />

            {/* PDF Tools */}
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
            <Route path="/tools/word-to-pdf" element={<WordToPdf />} />
            <Route path="/tools/merge-pdf" element={<MergePdf />} />
            <Route path="/tools/compress-pdf" element={<CompressPdf />} />
            <Route path="/tools/split-pdf" element={<UnderDevelopment />} />
            <Route path="/tools/pdf-ocr" element={<UnderDevelopment />} />
            <Route path="/tools/protect-pdf" element={<UnderDevelopment />} />
            <Route path="/tools/unlock-pdf" element={<UnderDevelopment />} />

            {/* Image Tools */}
            <Route path="/tools/compress-image" element={<ImageCompressor />} />
            <Route path="/tools/resize-image" element={<UnderDevelopment />} />
            <Route path="/tools/crop-image" element={<ImageCropperTool />} />
            <Route path="/tools/bg-remover" element={<BgRemover />} />
            <Route path="/tools/image-type-converter" element={<ImageTypeConverter />} />
            <Route path="/tools/qr-generator" element={<QrGenerator />} />

            {/* Video Tools */}
            <Route path="/tools/video-to-audio" element={<UnderDevelopment />} />
            <Route path="/tools/video-converter" element={<UnderDevelopment />} />
            <Route path="/tools/video-compressor" element={<UnderDevelopment />} />

            {/* Audio Tools */}
            <Route path="/tools/mp3-converter" element={<UnderDevelopment />} />
            <Route path="/tools/audio-compressor" element={<UnderDevelopment />} />

            {/* Document Tools */}
            <Route path="/tools/excel-to-pdf" element={<UnderDevelopment />} />
            <Route path="/tools/pdf-to-excel" element={<UnderDevelopment />} />
            <Route path="/tools/txt-to-pdf" element={<UnderDevelopment />} />
            <Route path="/tools/pdf-to-txt" element={<UnderDevelopment />} />

            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            

            {/* Fallback Routes */}
            <Route path="/tools/:slug" element={<UnderDevelopment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
