import express from "express";

import {  getUserActivities } from "../../controllers/admin/activityController.js";

const router = express.Router();
router.get("/user-data", getUserActivities );

export default router;
