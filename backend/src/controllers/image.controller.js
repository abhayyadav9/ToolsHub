import {
  convertImageService,
  compressImageService
} from "../services/image.service.js";

export const convertImage = async (req, res, next) => {
  try {
    const { format, quality } = req.body;
    console.log(format, quality);
    const result = await convertImageService(
      req.file.buffer,
      format,
      quality
    );

    res.set(result.headers);
    res.send(result.buffer);
  } catch (err) {
    next(err);
  }
};

export const compressImage = async (req, res, next) => {
  try {
    const { targetSize } = req.body;
    console.log(targetSize);
    const result = await compressImageService(
      req.file.buffer,
      targetSize
    );

    res.set(result.headers);
    res.send(result.buffer);
  } catch (err) {
    next(err);
  }
};
