import express from "express";
import uploadPdf from "../middlewares/pdfUpload.middleware.js";
import { pdfSplitter } from "../controllers/splitpdf.controller.js";

const router = express.Router();

router.post("/split-selective", uploadPdf.single("file"), pdfSplitter);

export default router;
