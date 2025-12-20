import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import MergePdf from "./pages/pdf/MergePdf";
import CompressPdf from "./pages/pdf/CompressPdf";
import WordToPdf from "./pages/pdf/WordToPdf";
import PdfToWord from "./pages/pdf/PdfToWord";
import NotFound from "./components/NotFound";
import UnderDevelopment from "./components/UnderDevelopment";
import ImageCropperTool from "./pages/imageTool/ImageCropper";
import QrGenerator from "./pages/imageTool/QrGenerator";
import ImageCompressor from "./pages/imageTool/ImageCompressor";
import ImageTypeConverter from "./pages/imageTool/ImageTypeConverter";
import BgRemover from "./pages/imageTool/BgRemover";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-12 text-center text-lg text-gray-600">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Future routes go here */}

            {/* //pdf tools */}

            <Route path="/tools/merge-pdf" element={<MergePdf />} />
            <Route path="/tools/compress-pdf" element={<CompressPdf />} />
            <Route path="/tools/word-to-pdf" element={<WordToPdf />} />
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />

            {/* <Route path="/tools/split-pdf" element={<SplitPdf />} />
          
             */}

             {/* //image tools */}

            <Route path="/tools/compress-image" element={<ImageCompressor />} />
            <Route path="/tools/image-type-converter" element={<ImageTypeConverter />} />
            <Route path="/tools/crop-image" element={<ImageCropperTool />} />
            <Route path="/tools/qr-generator" element={<QrGenerator />} />
            <Route path="/tools/bg-remover" element={<BgRemover />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="*" element={<NotFound />} />
            <Route path="/tools/:slug" element={<UnderDevelopment />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
