import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  convertImage,
  compressImage
} from "../controllers/image.controller.js";
import { trackActivity } from "../middlewares/activityTracker.js";

const router = Router();

router.post("/convert", upload.single("image"), convertImage,trackActivity("image_conversion"));
router.post("/compress", upload.single("image"), compressImage, trackActivity("image_compression"));

export default router;
