import express from "express";
import uploadPdf from "../middlewares/pdfUpload.middleware.js";
import { pdfSplitter } from "../controllers/splitpdf.controller.js";
import { trackActivity } from "../middlewares/activityTracker.js";

const router = express.Router();

router.post("/split-selective", uploadPdf.single("file"), pdfSplitter,trackActivity("pdf_splitting"));

export default router;
