import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import {
  Upload,
  Download,
  RefreshCcw,
  Link as LinkIcon,
  Palette,
  Image as ImageIcon,
  QrCode,
  Settings,
  Check,
} from "lucide-react";

/* ----------------------------------------------------------------------------------
   HELPER: PROCESS LOGO (Apply Brightness/Contrast)
---------------------------------------------------------------------------------- */
const processLogoImage = (src, brightness, contrast) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(src); // Fallback to original if fail
  });
};

/* ----------------------------------------------------------------------------------
   QR INSTANCE
---------------------------------------------------------------------------------- */
const qrCode = new QRCodeStyling({
  width: 1000, // High res for download
  height: 1000,
  type: "svg",
  data: "https://toolshub.me",
  image: "",
  dotsOptions: { color: "#000000", type: "rounded" },
  backgroundOptions: { color: "#ffffff" },
  imageOptions: { crossOrigin: "anonymous", margin: 10 },
});


const generateTextLogo = (text, color, bg, size = 300) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  // Text
  ctx.fillStyle = color;
  ctx.font = `bold ${size / 2}px Inter, Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.toUpperCase(), size / 2, size / 2);

  return canvas.toDataURL("image/png");
};


export default function QrGenerator() {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState("content"); // content | style | logo

  // Content State
  const [data, setData] = useState("https://toolshub.me");

  // Style State
  const [dotStyle, setDotStyle] = useState("rounded");
  const [eyeStyle, setEyeStyle] = useState("extra-rounded");
  const [dotColor, setDotColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [gradient, setGradient] = useState(false);
  const [gradientColor, setGradientColor] = useState("#6a5cff");

  // Logo State
  const [logoRaw, setLogoRaw] = useState(null); // The original uploaded file URL
  const [logoProcessed, setLogoProcessed] = useState(null); // The filtered dataURL
  const [logoSize, setLogoSize] = useState(0.4);
  const [logoBrightness, setLogoBrightness] = useState(100);
  const [logoContrast, setLogoContrast] = useState(100);


  // Logo mode
const [logoMode, setLogoMode] = useState("image"); // image | text

// Text logo state
const [logoText, setLogoText] = useState("LOGO");
const [textColor, setTextColor] = useState("#000000");
const [textBg, setTextBg] = useState("#ffffff");


  // Initialize QR
  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  // Handle Logo Processing (Debounced effect could be better, but this works for simple usage)
 
useEffect(() => {
  if (logoMode === "image" && logoRaw) {
    processLogoImage(logoRaw, logoBrightness, logoContrast).then(
      setLogoProcessed
    );
  }

  if (logoMode === "text") {
    const textImage = generateTextLogo(
      logoText,
      textColor,
      textBg
    );
    setLogoProcessed(textImage);
  }

  if (!logoRaw && logoMode === "image") {
    setLogoProcessed(null);
  }
}, [
  logoMode,
  logoRaw,
  logoText,
  textColor,
  textBg,
  logoBrightness,
  logoContrast,
]);





  // Update QR Code appearance
  useEffect(() => {
    qrCode.update({
      data,
      dotsOptions: {
        type: dotStyle,
        color: dotColor,
        gradient: gradient
          ? {
              type: "linear",
              rotation: 45,
              colorStops: [
                { offset: 0, color: dotColor },
                { offset: 1, color: gradientColor },
              ],
            }
          : undefined,
      },
      backgroundOptions: {
        color: bgColor,
      },
      cornersSquareOptions: {
        type: eyeStyle,
        color: dotColor,
      },
      cornersDotOptions: {
        type: "dot",
        color: dotColor,
      },
      image: logoProcessed || "",
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        imageSize: logoSize,
      },
    });
  }, [
    data,
    dotStyle,
    eyeStyle,
    dotColor,
    bgColor,
    gradient,
    gradientColor,
    logoProcessed,
    logoSize,
  ]);

  const onLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoRaw(URL.createObjectURL(file));
    // Reset filters on new upload
    setLogoBrightness(100);
    setLogoContrast(100);
  };

  const download = (ext) => {
    qrCode.download({
      extension: ext,
      name: "custom-qr-code",
    });
  };

  const MAX_CHARS = 700;

// const getWordCount = (text) =>
//   text.trim() === "" ? 0 : text.trim().split(/\s+/).length;


  /* ----------------------------------------------------------------------------------
     UI COMPONENTS
  ---------------------------------------------------------------------------------- */

  return (
    <div className="min-h-[60vh] bg-gray-100 text-gray-800 flex flex-col font-sans">
      {/* 1. TOP NAVIGATION (Mobile) / LEFT SIDEBAR (Desktop) */}
      <div className="w-full md:w-20 bg-white border-b md:border-r md:border-b-0 border-gray-200 flex md:flex-col items-center justify-between md:justify-start py-3 px-4 md:px-0 md:py-4 md:space-y-8 md:fixed md:left-0 md:top-0 md:h-full z-30 shadow-sm">
        <div className="hidden md:block p-2 bg-gradient-to-br from-red-500 to-indigo-600 rounded-lg shadow-md">
          <QrCode className="text-white w-6 h-6" />
        </div>

        <div className="flex md:flex-col w-full justify-around md:justify-start md:space-y-4 gap-2 md:gap-0">
          <NavButton
            active={activeTab === "content"}
            onClick={() => setActiveTab("content")}
            icon={<LinkIcon size={20} />}
            label="Content"
          />
          <NavButton
            active={activeTab === "style"}
            onClick={() => setActiveTab("style")}
            icon={<Palette size={20} />}
            label="Style"
          />
          <NavButton
            active={activeTab === "logo"}
            onClick={() => setActiveTab("logo")}
            icon={<ImageIcon size={20} />}
            label="Logo"
          />
        </div>
      </div>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col md:flex-row md:ml-20">
        {/* PREVIEW AREA */}
        <div className="flex-1 relative bg-gray-100 flex flex-col">
          {/* Top Bar */}
          <div className="min-h-16 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-0 bg-white z-10 shadow-sm gap-3 sm:gap-0">
            <h2 className="font-bold text-gray-800 text-lg sm:text-base">QR Studio</h2>
            <div className="flex items-center flex-wrap gap-2 sm:space-x-3">
              <button
                onClick={() => {
                  setData("https://toolshub.me");
                  setLogoRaw(null);
                }}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 sm:gap-2"
              >
                <RefreshCcw size={14} /> <span className="hidden sm:inline">Reset</span>
              </button>
              <div className="hidden sm:block h-6 w-px bg-gray-300 mx-2"></div>
              <button
                onClick={() => download("png")}
                className="px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs sm:text-sm font-bold shadow-md shadow-red-200 flex items-center gap-1 sm:gap-2 transition-all hover:scale-105"
              >
                <Download size={14} /> PNG
              </button>
              <button
                onClick={() => download("svg")}
                className="px-4 sm:px-6 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full text-xs sm:text-sm font-bold shadow-sm flex items-center gap-1 sm:gap-2 transition-all"
              >
                <Download size={14} /> SVG
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <section className="flex-1 flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
              {/* QR MOUNT POINT */}
              <div
                ref={ref}
                className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center"
              />
            </div>

            <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400 flex items-center gap-2">
              <Check className="text-green-500" size={14} /> Live Preview • Print Ready
            </p>
          </section>
        </div>

        {/* 3. SETTINGS PANEL (Bottom on Mobile / Right Sidebar on Desktop) */}
        <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col max-h-[50vh] md:max-h-full md:h-screen overflow-y-auto shadow-lg md:shadow-sm">
          <div className="sticky top-0 bg-white z-10 p-4 sm:p-6 border-b border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 capitalize">
            {activeTab} Settings
          </h3>
        </div>

        <div className="p-6 space-y-8 animate-in slide-in-from-right duration-300">
            {/* CONTENT TAB */}
            {activeTab === "content" && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Target URL / Text
                  </label>

                  <textarea
                    value={data}
                    onChange={(e) => {
                      const input = e.target.value;

                      if (input.length <= MAX_CHARS) {
                        setData(input);
                      } else {
                        // Hard limit
                        setData(input.slice(0, MAX_CHARS));
                      }
                    }}
                    rows={5}
                    className={`w-full rounded-xl px-4 py-3 outline-none resize-none transition-all text-sm sm:text-base touch-manipulation
                      ${
                        data.length >= MAX_CHARS
                          ? "border-2 border-red-400 bg-red-50 focus:ring-2 focus:ring-red-500"
                          : "border-2 border-gray-200 bg-gray-50 focus:ring-2 focus:ring-red-500"
                      }
                    `}
                    placeholder="https://example.com"
                  />

                  {/* Character Counter */}
                  <div className="mt-2 flex justify-between text-xs sm:text-sm">
                    <span
                      className={`font-medium ${
                        data.length >= MAX_CHARS
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {data.length} / {MAX_CHARS} characters
                    </span>

                    {data.length >= MAX_CHARS && (
                      <span className="text-red-500 font-semibold">
                        Limit reached
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STYLE TAB */}
            {activeTab === "style" && (
              <div className="space-y-4 sm:space-y-6">
                {/* Colors */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                    Colors
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">
                        Dots
                      </label>
                      <div className="flex items-center gap-2 border-2 border-gray-200 p-3 rounded-lg hover:border-red-400 transition-colors">
                        <input
                          type="color"
                          value={dotColor}
                          onChange={(e) => setDotColor(e.target.value)}
                          className="w-10 h-10 sm:w-8 sm:h-8 rounded cursor-pointer border-none bg-transparent touch-manipulation"
                        />
                        <span className="text-xs font-mono overflow-hidden text-ellipsis">{dotColor}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">
                        Background
                      </label>
                      <div className="flex items-center gap-2 border-2 border-gray-200 p-3 rounded-lg hover:border-red-400 transition-colors">
                        <input
                          type="color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          className="w-10 h-10 sm:w-8 sm:h-8 rounded cursor-pointer border-none bg-transparent touch-manipulation"
                        />
                        <span className="text-xs font-mono overflow-hidden text-ellipsis">{bgColor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gradient Toggle */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <label className="flex items-center justify-between cursor-pointer mb-3 touch-manipulation">
                    <span className="text-sm font-bold text-gray-700">
                      Enable Gradient
                    </span>
                    <input
                      type="checkbox"
                      checked={gradient}
                      onChange={(e) => setGradient(e.target.checked)}
                      className="accent-red-600 w-5 h-5 cursor-pointer"
                    />
                  </label>
                  {gradient && (
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">
                        Second Color
                      </label>
                      <div className="flex items-center gap-2 border-2 border-gray-200 p-3 rounded-lg bg-white hover:border-red-400 transition-colors">
                        <input
                          type="color"
                          value={gradientColor}
                          onChange={(e) => setGradientColor(e.target.value)}
                          className="w-10 h-10 sm:w-8 sm:h-8 rounded cursor-pointer border-none bg-transparent touch-manipulation"
                        />
                        <span className="text-xs font-mono">{gradientColor}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Shapes */}
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                    Shapes
                  </label>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500 block mb-2">
                        Dot Style
                      </span>
                      <select
                        value={dotStyle}
                        onChange={(e) => setDotStyle(e.target.value)}
                        className="w-full p-3 sm:p-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm touch-manipulation focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      >
                        <option value="square">Square</option>
                        <option value="dots">Dots</option>
                        <option value="rounded">Rounded</option>
                        <option value="extra-rounded">Extra Rounded</option>
                        <option value="classy">Classy</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block mb-2">
                        Corner Style
                      </span>
                      <select
                        value={eyeStyle}
                        onChange={(e) => setEyeStyle(e.target.value)}
                        className="w-full p-3 sm:p-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-sm touch-manipulation focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      >
                        <option value="square">Square</option>
                        <option value="dot">Dot</option>
                        <option value="extra-rounded">Extra Rounded</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LOGO TAB */}
            {activeTab === "logo" && (
              <div className="space-y-4 sm:space-y-6">
                {/* MODE TOGGLE */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setLogoMode("image")}
                    className={`flex-1 py-3 sm:py-2 rounded-lg text-sm font-semibold transition-colors touch-manipulation ${
                      logoMode === "image"
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Image Logo
                  </button>
                  <button
                    onClick={() => setLogoMode("text")}
                    className={`flex-1 py-3 sm:py-2 rounded-lg text-sm font-semibold transition-colors touch-manipulation ${
                      logoMode === "text"
                        ? "bg-red-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Text Logo
                  </button>
                </div>

                {/* IMAGE LOGO */}
                {logoMode === "image" && (
                  <>
                    <label className="block w-full border-2 border-dashed border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all rounded-xl p-6 sm:p-6 text-center cursor-pointer touch-manipulation active:scale-98">
                      <Upload className="mx-auto text-gray-400 mb-2" size={28} />
                      <span className="text-sm font-medium text-gray-600">
                        Upload Logo Image
                      </span>
                      <input type="file" accept="image/*" hidden onChange={onLogoUpload} />
                    </label>

        {logoRaw && (
          <>
            <RangeSlider
              label="Size"
              value={Math.round(logoSize * 100)}
              min={10}
              max={60}
              onChange={(e) => setLogoSize(Number(e.target.value) / 100)}
              unit="%"
            />
            <RangeSlider
              label="Brightness"
              value={logoBrightness}
              min={0}
              max={200}
              onChange={(e) => setLogoBrightness(+e.target.value)}
              unit="%"
            />
            <RangeSlider
              label="Contrast"
              value={logoContrast}
              min={0}
              max={200}
              onChange={(e) => setLogoContrast(+e.target.value)}
              unit="%"
            />
          </>
        )}
      </>
    )}

                    {/* TEXT LOGO */}
                    {logoMode === "text" && (
                      <>
                        <input
                          value={logoText}
                          onChange={(e) => setLogoText(e.target.value.slice(0, 6))}
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-center font-bold uppercase text-base sm:text-sm touch-manipulation focus:border-red-500 focus:ring-2 focus:ring-red-200"
                          placeholder="LOGO"
                          maxLength={6}
                        />

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="text-xs text-gray-500 mb-2 block">Text Color</label>
                            <div className="border-2 border-gray-200 p-3 rounded-lg hover:border-red-400 transition-colors">
                              <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                                className="w-full h-10 sm:h-8 rounded cursor-pointer border-none bg-transparent touch-manipulation"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-2 block">Background</label>
                            <div className="border-2 border-gray-200 p-3 rounded-lg hover:border-red-400 transition-colors">
                              <input
                                type="color"
                                value={textBg}
                                onChange={(e) => setTextBg(e.target.value)}
                                className="w-full h-10 sm:h-8 rounded cursor-pointer border-none bg-transparent touch-manipulation"
                              />
                            </div>
                          </div>
                        </div>

                        <RangeSlider
                          label="Logo Size"
                          value={Math.round(logoSize * 100)}
                          min={10}
                          max={60}
                          onChange={(e) => setLogoSize(Number(e.target.value) / 100)}
                          unit="%"
                        />
                      </>
                    )}

                    <button
                      onClick={() => {
                        setLogoRaw(null);
                        setLogoProcessed(null);
                      }}
                      className="w-full py-3 sm:py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors touch-manipulation active:bg-red-100"
                    >
                      Remove Logo
                    </button>
                  </div>
                )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------------
   UI SUB-COMPONENTS
---------------------------------------------------------------------------------- */
const NavButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-12 sm:w-14 sm:h-12 md:w-14 md:h-14 rounded-xl transition-all duration-200 touch-manipulation ${
      active
        ? "bg-red-100 text-red-600 shadow-sm"
        : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    {icon}
    <span className="text-[10px] mt-1 font-bold block md:block">{label}</span>
  </button>
);

const RangeSlider = ({ label, value, min, max, onChange, unit = "" }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-xs sm:text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-xs font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
        {value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="w-full h-2 sm:h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 touch-manipulation"
      style={{ touchAction: 'none' }}
    />
  </div>
);
