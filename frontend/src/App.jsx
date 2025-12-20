import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import MergePdf from "./pages/pdf/MergePdf";
import CompressPdf from "./pages/pdf/CompressPdf";

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

            {/* <Route path="/tools/split-pdf" element={<SplitPdf />} />
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
            <Route path="/tools/word-to-pdf" element={<WordToPdf />} /> */}



            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
