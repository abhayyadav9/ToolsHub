import sharp from "sharp";
import { SUPPORTED_FORMATS } from "../utils/imageFormats.js";

export const convertImageService = async (buffer, format, quality = 85) => {
  if (!SUPPORTED_FORMATS.includes(format)) {
    throw new Error("Unsupported format");
  }

  let image = sharp(buffer).rotate();
  let output;
  let mime;

  switch (format) {
    case "jpg":
      output = await image.jpeg({ quality, mozjpeg: true }).toBuffer();
      mime = "image/jpeg";
      break;

    case "png":
      output = await image.png({ compressionLevel: 9 }).toBuffer();
      mime = "image/png";
      break;

    case "webp":
      output = await image.webp({ quality }).toBuffer();
      mime = "image/webp";
      break;

    case "avif":
      output = await image.avif({ quality }).toBuffer();
      mime = "image/avif";
      break;
  }

  return {
    buffer: output,
    headers: {
      "Content-Type": mime,
      "Content-Disposition": `attachment; filename=image.${format}`
    }
  };
};

export const compressImageService = async (buffer, targetSizeKB = 500) => {
  let quality = 90;
  let output;

  do {
    output = await sharp(buffer)
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
    quality -= 5;
  } while (output.length / 1024 > targetSizeKB && quality >= 60);

  return {
    buffer: output,
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": "attachment; filename=compressed.jpg"
    }
  };
};
