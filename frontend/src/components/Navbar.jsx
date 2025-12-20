import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Grid3X3, Menu, X, Zap } from "lucide-react"; // Added Menu and X icons

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pdfTools = [
    { name: "Merge PDF", href: "/tools/merge-pdf" },
    { name: "Split PDF", href: "/tools/split-pdf" },
    { name: "Compress PDF", href: "/tools/compress-pdf" },
    { name: "PDF to Word", href: "/tools/pdf-to-word" },
    { name: "Word to PDF", href: "/tools/word-to-pdf" },
  ];

  return (
    <header className="relative border-b bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center  font-bold text-2xl tracking-tight">
            <Zap className="text-orange-700 stroke-2 stroke" />
            <span className="text-gray-900">Tools</span>
            <span className="text-orange-600">Hub</span>
          </Link>

          {/* CENTER: Desktop Main Nav (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-bold text-gray-700">
            <Link className="hover:text-red-500 transition-colors" to="/tools/merge-pdf">
              MERGE PDF
            </Link>
            <Link className="hover:text-red-500 transition-colors" to="/tools/split-pdf">
              SPLIT PDF
            </Link>
            <Link className="hover:text-red-500 transition-colors" to="/tools/compress-pdf">
              COMPRESS PDF
            </Link>

            {/* Convert PDF Dropdown */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={() => setActiveDropdown("convert")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                CONVERT PDF <ChevronDown size={14} strokeWidth={3} />
              </button>

              {activeDropdown === "convert" && (
                <div className="absolute left-0 top-full w-56 rounded-b-md border-t-2 border-red-500 bg-white shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  {pdfTools.map((tool) => (
                    <Link
                      key={tool.name}
                      to={tool.href}
                      className="block px-6 py-3 text-sm font-normal text-gray-600 hover:bg-gray-50 hover:text-red-500"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* All Tools Dropdown */}
            <div
              className="relative h-16 flex items-center"
              onMouseEnter={() => setActiveDropdown("all")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                ALL PDF TOOLS <ChevronDown size={14} strokeWidth={3} />
              </button>

              {activeDropdown === "all" && (
                <div className="absolute right-0 top-full w-64 rounded-b-md border-t-2 border-red-500 bg-white shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Organize PDF
                  </div>
                  {pdfTools.slice(0, 3).map((tool) => (
                    <Link
                      key={tool.name}
                      to={tool.href}
                      className="block px-6 py-3 text-sm font-normal text-gray-600 hover:bg-gray-50 hover:text-red-500"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT: Actions & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-bold text-gray-700 hover:text-red-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-red-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-red-600"
              >
                Sign up
              </Link>
            </div> */}

            {/* Hamburger Button (Visible on Mobile) */}
            <button 
              className="lg:hidden p-2 text-gray-600 hover:text-red-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Visible when open) */}
      {isMobileMenuOpen && (
        <div
        onClick={() => {setIsMobileMenuOpen(false); setInterval(() => {}, 100)}}
        
        
         className="lg:hidden absolute top-16 left-0 w-full bg-white border-b shadow-lg h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col p-4 space-y-4">
            <Link to="/tools/merge-pdf" className="text-lg font-medium text-gray-700 py-2 border-b">
              Merge PDF
            </Link>
            <Link to="/tools/split-pdf" className="text-lg font-medium text-gray-700 py-2 border-b">
              Split PDF
            </Link>
            <Link to="/tools/compress-pdf" className="text-lg font-medium text-gray-700 py-2 border-b">
              Compress PDF
            </Link>
            
            <div className="py-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Convert PDF</h3>
              <div className="grid grid-cols-1 gap-2 pl-4">
                {pdfTools.map((tool) => (
                   <Link key={tool.name} to={tool.href} className="text-gray-600 py-2">
                     {tool.name}
                   </Link>
                ))}
              </div>
            </div>

            {/* Mobile Auth Buttons
            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full text-center py-3 rounded-md bg-gray-100 font-bold text-gray-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full text-center py-3 rounded-md bg-red-500 font-bold text-white"
              >
                Sign up
              </Link>
            </div> */}
          </div>
        </div>
      )}
    </header>
  );
}