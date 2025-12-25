import express from "express";
import {
  getUserActivities,
  getSuspiciousActivities
} from "../controllers/activityController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:userId", protect, getUserActivities);
router.get("/security/suspicious", protect, adminOnly, getSuspiciousActivities);

export default router;
