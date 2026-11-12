import express from "express";

import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationControllers.js";
import { protect } from "../middleware/authMiddleware.js";

// 1. Initialize router FIRST
const router = express.Router();

// 2. Apply the protect middleware to all routes in this router
router.use(protect);

// GET all applications
router.get("/", getApplications);

// GET one application
router.get("/:id", getApplicationById);

// POST create application
router.post("/", createApplication);

// PUT update application
router.put("/:id", updateApplication);

// DELETE application
router.delete("/:id", deleteApplication);

export default router;