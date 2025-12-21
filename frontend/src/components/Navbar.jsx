import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  FilePlus,
  Scissors,
  Minimize,
  ArrowRightLeft,
} from "lucide-react";
import image1 from "../assets/image1.png";
import image from "../assets/image.png";
import image2 from "../assets/image2.png";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeTimer = useRef(null);

  /* ================= DATA ================= */

  const pdfTools = [
    { name: "Merge PDF", href: "/tools/merge-pdf", icon: FilePlus },
    { name: "Compress PDF", href: "/tools/compress-pdf", icon: Minimize },
    { name: "PDF to Word", href: "/tools/pdf-to-word", icon: ArrowRightLeft },
    { name: "Word to PDF", href: "/tools/word-to-pdf", icon: FileText },
    { name: "Split PDF", href: "/tools/split-pdf", icon: Scissors },
  ];

  const imageTools = [
    { name: "Compress Image", href: "/tools/compress-image", icon: ImageIcon },
    { name: "Image Type Converter", href: "/tools/image-type-converter", icon: ImageIcon },
    { name: "Crop Image", href: "/tools/crop-image", icon: ImageIcon },
    { name: "QR Code Generator", href: "/tools/qr-generator", icon: ImageIcon },
    { name: "Background Remover", href: "/tools/bg-remover", icon: ImageIcon },
  ];

  const megaMenu = [
    {
      title: "PDF Tools",
      color: "text-red-500",
      icon: FileText,
      items: pdfTools,
    },
    {
      title: "Image Tools",
      color: "text-blue-500",
      icon: ImageIcon,
      items: imageTools,
    },
    {
      title: "Video Tools",
      color: "text-purple-500",
      icon: Video,
      items: [
        { name: "Compress Video", href: "#", icon: Video },
        { name: "Trim Video", href: "#", icon: Video },
      ],
    },
    {
      title: "Audio Tools",
      color: "text-green-500",
      icon: Music,
      items: [
        { name: "Compress Audio", href: "#", icon: Music },
        { name: "Voice Recorder", href: "#", icon: Music },
      ],
    },
  ];

  /* ================= HOVER HANDLERS ================= */

  const openDropdown = (name) => {
    clearTimeout(closeTimer.current);
    setActiveDropdown(name);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  /* ================= COMPONENT ================= */

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center text-2xl font-extrabold">
            <Zap className="text-orange-600 mr-1" />
            <span className="text-gray-900">Tools</span>
            <span className="text-orange-600">Hub</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex  items-center gap-8 text-sm font-bold text-gray-700">
            <Link to="/tools/merge-pdf" className="hover:text-red-500">
              MERGE PDF
            </Link>
            <Link to="/tools/compress-pdf" className="hover:text-red-500">
              COMPRESS PDF
            </Link>

            {/* PDF DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => openDropdown("pdf")}
              onMouseLeave={closeDropdown}
            >
              <button className="flex items-center gap-1 hover:text-red-500">
                PDF TOOLS <ChevronDown size={14} />
              </button>

              {activeDropdown === "pdf" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border animate-dropdown">
                  {pdfTools.map((tool) => (
                    <DropdownItem key={tool.name} {...tool} />
                  ))}
                </div>
              )}
            </div>

            {/* IMAGE DROPDOWN */}
<div
  className="relative"
  onMouseEnter={() => openDropdown("image")}
  onMouseLeave={closeDropdown}
>
  <button 
    className={`flex items-center gap-1 text-sm font-bold transition-colors duration-200 ${
      activeDropdown === "image"
        ? "text-red-500"
        : "text-gray-700 hover:text-red-500"
    }`}
  >
    IMAGE TOOLS
    <ChevronDown
      size={14}
      strokeWidth={3}
      className={`transition-transform duration-200 ${
        activeDropdown === "image" ? "rotate-180" : ""
      }`}
    />
  </button>

  {activeDropdown === "image" && (
    <div
      className="
        absolute top-full mt-3 w-72
        right-0   /* 👈 THIS is the magic */
        bg-white rounded-xl shadow-2xl
        border border-gray-100 overflow-hidden z-50
        animate-in fade-in slide-in-from-top-2 duration-200
      "
    >
      {/* Decorative Red Line */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 to-orange-500" />

      <div className="p-3 grid gap-1">
        {imageTools.map((tool) => (
          <Link
            key={tool.name}
            to={tool.href}
            className="block px-4 py-3 rounded-lg text-sm font-medium
              text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  )}
</div>

            {/* MEGA MENU */}
            <div
              onMouseEnter={() => openDropdown("mega")}
              onMouseLeave={closeDropdown}
              className="relative mr-9"
            >
              <div className="flex mr-10 items-center gap-1 cursor-pointer hover:text-red-500">
                <img src={image2} className="w-8 h-8" />
                <span className="font-bold">Tools</span>
              </div>
              {activeDropdown === "mega" && (
                <div className="fixed right-8 top-16 w-full bg-white shadow-2xl border-t animate-dropdown">
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-10 px-8 py-10">
                    {megaMenu.map((cat) => (
                      <div key={cat.title}>
                        <div className="flex items-center mr-6 gap-2 mb-4">
                          <cat.icon className={`${cat.color}`} />
                          <h3 className="font-bold uppercase text-sm">
                            {cat.title}
                          </h3>
                        </div>

                        <ul className="space-y-3">
                          {cat.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
                              >
                                <item.icon size={16} />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-[85%] bg-white animate-slide-in">
            <div className="h-16 flex items-center justify-between px-4 border-b">
              <span className="font-bold text-lg">All Tools</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {megaMenu.map((cat) => (
                <div key={cat.title}>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <cat.icon className={cat.color} size={18} />
                    {cat.title}
                  </h3>
                  <div className="space-y-2 pl-4">
                    {cat.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <item.icon size={16} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= SHARED COMPONENT ================= */

function DropdownItem({ name, href, icon: Icon }) {
  return (
    <Link
      to={href}
      className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 transition"
    >
      <Icon size={16} />
      {name}
    </Link>
  );
}
