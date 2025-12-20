import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import {
  convertImage,
  compressImage
} from "../controllers/image.controller.js";

const router = Router();

router.post("/convert", upload.single("image"), convertImage);
router.post("/compress", upload.single("image"), compressImage);

export default router;
