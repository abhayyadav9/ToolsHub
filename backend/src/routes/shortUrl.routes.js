import express from "express";
import { createShortUrl, redirectShortUrl } from "../controllers/createShortUrl.controller.js";


const router = express.Router();

router.post("/shorten", createShortUrl);

// ⚠️ keep redirect route LAST
router.get("/:code", redirectShortUrl);

export default router;
