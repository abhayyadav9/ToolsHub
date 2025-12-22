import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import {
  Upload,
  Download,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  FlipVertical,
  Image as ImageIcon,
  Crop as CropIcon,
  Sliders,
  Maximize,
  RefreshCw,
  X,
  Check,
  Smartphone,
  Monitor,
  Square
} from "lucide-react";
import EnhancedSEO from "../../seo/EnhancedSEO";
import { getToolMetadata, generateBreadcrumbs } from "../../config/seoConfig";

/* ----------------------------------------------------------------------------------
   HELPER: CANVAS PROCESSING
   Applies crop, rotation, flip, and filters (brightness, contrast) to the final image
---------------------------------------------------------------------------------- */
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function creates the final output image with all filters applied
 */
async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
  filters = {}
) {
  const image = await createImage(imageSrc);

  // 1️⃣ CREATE CROPPED CANVAS FIRST
  const cropCanvas = document.createElement("canvas");
  const cropCtx = cropCanvas.getContext("2d");

  cropCanvas.width = pixelCrop.width;
  cropCanvas.height = pixelCrop.height;

  cropCtx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // 2️⃣ CREATE FINAL CANVAS FOR TRANSFORMS
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const rotRad = getRadianAngle(rotation);
  const { width, height } = rotateSize(
    cropCanvas.width,
    cropCanvas.height,
    rotation
  );

  canvas.width = width;
  canvas.height = height;

  // 3️⃣ APPLY FILTERS
  ctx.filter = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturation}%)
    hue-rotate(${filters.hue}deg)
    grayscale(${filters.grayscale}%)
  `;

  // 4️⃣ TRANSFORM
  ctx.translate(width / 2, height / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-cropCanvas.width / 2, -cropCanvas.height / 2);

  ctx.drawImage(cropCanvas, 0, 0);

  // 5️⃣ EXPORT
  return new Promise((resolve) => {
    canvas.toBlob(
      (file) => resolve(URL.createObjectURL(file)),
      "image/jpeg",
      0.95
    );
  });
}


/* ----------------------------------------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------------------------------------- */
export default function ProImageEditor() {
  const toolMetadata = getToolMetadata('crop-image');
  const breadcrumbs = generateBreadcrumbs('crop-image');
  const [imageSrc, setImageSrc] = useState(null);
  const [activeTab, setActiveTab] = useState("crop"); // 'crop' | 'adjust'
  
  // Crop & Transform State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState(4 / 3);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Filters State
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    grayscale: 0,
  });

  const fileInputRef = useRef(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const handleDownload = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation,
        flip,
        filters
      );
      
      const link = document.createElement('a');
      link.href = croppedImage;
      link.download = "edited-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    }
  };

  const resetEdits = () => {
    setZoom(1);
    setRotation(0);
    setFlip({ horizontal: false, vertical: false });
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      grayscale: 0,
    });
    setAspect(4/3);
  };

  // IMPORTANT: Single-line string for compatibility
  const filterStyle = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) hue-rotate(${filters.hue}deg) grayscale(${filters.grayscale}%)`;

  /* ----------------------------------------------------------------------------------
     UI COMPONENTS (LIGHT THEME)
  ---------------------------------------------------------------------------------- */

  if (!imageSrc) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg text-center space-y-6">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                Photo Studio
            </h1>
            <p className="text-gray-500">Upload an image to start editing with professional tools.</p>
            
            <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 hover:border-orange-500 transition-all rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer group shadow-sm"
            >
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                    <Upload className="w-8 h-8 text-orange-500" />
                </div>
                <span className="text-lg font-medium text-gray-600 group-hover:text-orange-600 transition-colors">Click to Upload Image</span>
                <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onFileChange} />
            </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <EnhancedSEO
        title={toolMetadata?.title || "Crop Image"}
        description={toolMetadata?.description}
        keywords={toolMetadata?.keywords}
        canonical="/tools/crop-image"
        toolName={toolMetadata?.name}
        toolCategory="Editor"
        faqs={toolMetadata?.faqs}
        breadcrumbs={breadcrumbs}
      />
      <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col md:flex-row overflow-hidden">
      
      {/* 1. LEFT SIDEBAR (Navigation) */}
      <div className="w-full md:w-20 bg-white border-r border-gray-200 flex md:flex-col items-center justify-between md:justify-start py-4 md:space-y-8 z-20 shadow-sm">
        <div className="hidden md:block p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-md">
            <ImageIcon className="text-white w-6 h-6" />
        </div>
        
        <div className="flex md:flex-col w-full justify-around md:justify-start md:space-y-4">
            <NavButton 
                active={activeTab === 'crop'} 
                onClick={() => setActiveTab('crop')} 
                icon={<CropIcon size={20} />} 
                label="Crop" 
            />
            <NavButton 
                active={activeTab === 'adjust'} 
                onClick={() => setActiveTab('adjust')} 
                icon={<Sliders size={20} />} 
                label="Tune" 
            />
        </div>

        <div className="hidden md:flex flex-col mt-auto space-y-4 mb-4">
            <button 
                onClick={() => setImageSrc(null)}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors" 
                title="Close"
            >
                <X size={20} />
            </button>
        </div>
      </div>

      {/* 2. MAIN CANVAS AREA */}
      <div className="flex-1 relative bg-gray-100 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white z-10 shadow-sm">
            <h2 className="font-bold text-gray-800">Editor Workspace</h2>
            <div className="flex items-center space-x-3">
                <button 
                    onClick={resetEdits}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                    <RefreshCw size={14} /> Reset
                </button>
                <button 
                    onClick={handleDownload}
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full text-sm font-bold shadow-md shadow-orange-200 flex items-center gap-2 transition-all hover:scale-105"
                >
                    <Download size={16} /> Save Image
                </button>
            </div>
        </div>

        {/* Cropper Container */}
        <div className="relative flex-1 p-4 md:p-8 overflow-hidden flex items-center justify-center bg-gray-200/50">
            <div className="relative w-full h-full max-w-4xl max-h-[600px] bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    // FIX: Pass the single-line string to style.filter
                    mediaProps={{ 
                        style: { 
                             filter: filterStyle 
                        } 
                    }}
                    // IMPORTANT: We do NOT pass 'transform' here manually, the library handles it.
                    style={{
                        containerStyle: { backgroundColor: '#ffffff' }, // Force white background
                    }}
                />
            </div>
        </div>
      </div>

      {/* 3. RIGHT SIDEBAR (Tools Panel) */}
      <div className="w-full md:w-80 bg-white border-l border-gray-200 flex flex-col h-1/2 md:h-full overflow-y-auto shadow-sm">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 capitalize">{activeTab} Tools</h3>
        </div>

        <div className="p-6 space-y-8">
            
            {/* CROP & ROTATE TAB */}
            {activeTab === 'crop' && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                    {/* Aspect Ratio */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aspect Ratio</label>
                        <div className="grid grid-cols-3 gap-2">
                            <AspectRatioBtn label="Free" icon={<Maximize size={16} />} onClick={() => setAspect(null)} active={!aspect} />
                            <AspectRatioBtn label="Square" icon={<Square size={16} />} onClick={() => setAspect(1)} active={aspect === 1} />
                            <AspectRatioBtn label="16:9" icon={<Monitor size={16} />} onClick={() => setAspect(16/9)} active={aspect === 16/9} />
                            <AspectRatioBtn label="4:3" icon={<Maximize size={16} />} onClick={() => setAspect(4/3)} active={aspect === 4/3} />
                            <AspectRatioBtn label="9:16" icon={<Smartphone size={16} />} onClick={() => setAspect(9/16)} active={aspect === 9/16} />
                        </div>
                    </div>

                    {/* Transform */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Transform</label>
                        <div className="flex gap-2">
                            <ToolButton onClick={() => setRotation(r => r - 90)} icon={<RotateCcw size={18} />} />
                            <ToolButton onClick={() => setRotation(r => r + 90)} icon={<RotateCw size={18} />} />
                            <ToolButton onClick={() => setFlip(f => ({...f, horizontal: !f.horizontal}))} icon={<FlipHorizontal size={18} />} active={flip.horizontal} />
                            <ToolButton onClick={() => setFlip(f => ({...f, vertical: !f.vertical}))} icon={<FlipVertical size={18} />} active={flip.vertical} />
                        </div>
                    </div>

                    {/* Fine Rotation */}
                    <RangeSlider 
                        label="Straighten" 
                        value={rotation} 
                        min={-180} 
                        max={180} 
                        onChange={(e) => setRotation(Number(e.target.value))} 
                    />

                    {/* Zoom */}
                    <RangeSlider 
                        label="Zoom" 
                        value={zoom} 
                        min={1} 
                        max={3} 
                        step={0.1} 
                        onChange={(e) => setZoom(Number(e.target.value))} 
                    />
                </div>
            )}

            {/* ADJUSTMENT TAB */}
            {activeTab === 'adjust' && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                     <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
                        <p className="text-xs text-orange-600 flex items-center gap-2 font-semibold">
                            <Check size={12} /> Live Preview Active
                        </p>
                    </div>

                    <RangeSlider 
                        label="Brightness" 
                        value={filters.brightness} 
                        min={0} max={200} 
                        onChange={(e) => setFilters({...filters, brightness: Number(e.target.value)})} 
                    />
                    <RangeSlider 
                        label="Contrast" 
                        value={filters.contrast} 
                        min={0} max={200} 
                        onChange={(e) => setFilters({...filters, contrast: Number(e.target.value)})} 
                    />
                    <RangeSlider 
                        label="Saturation" 
                        value={filters.saturation} 
                        min={0} max={200} 
                        onChange={(e) => setFilters({...filters, saturation: Number(e.target.value)})} 
                    />
                    <RangeSlider 
                        label="Grayscale" 
                        value={filters.grayscale} 
                        min={0} max={100} 
                        onChange={(e) => setFilters({...filters, grayscale: Number(e.target.value)})} 
                    />
                     <RangeSlider 
                        label="Hue Rotate" 
                        value={filters.hue} 
                        min={0} max={360} 
                        onChange={(e) => setFilters({...filters, hue: Number(e.target.value)})} 
                    />
                </div>
            )}
        </div>
      </div>
    </div>
    </>
  );
}

/* ----------------------------------------------------------------------------------
   SUB-COMPONENTS (WHITE THEME STYLED)
---------------------------------------------------------------------------------- */

const NavButton = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-200 ${
            active 
            ? "bg-orange-100 text-orange-600 shadow-sm" 
            : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
        {icon}
        <span className="text-[10px] mt-1 font-bold hidden md:block">{label}</span>
    </button>
);

const AspectRatioBtn = ({ label, icon, onClick, active }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
            active
            ? "border-orange-500 bg-orange-50 text-orange-600"
            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm"
        }`}
    >
        {icon}
        <span className="text-xs mt-1 font-medium">{label}</span>
    </button>
);

const ToolButton = ({ onClick, icon, active }) => (
    <button 
        onClick={onClick}
        className={`flex-1 p-3 rounded-lg border flex items-center justify-center transition-all ${
            active
            ? "bg-orange-600 border-orange-600 text-white shadow-md"
            : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900"
        }`}
    >
        {icon}
    </button>
);

const RangeSlider = ({ label, value, min, max, step = 1, onChange }) => (
    <div className="space-y-3">
        <div className="flex justify-between">
            <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>
            <span className="text-xs font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">{value}</span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600 hover:accent-orange-700"
        />
    </div>
);