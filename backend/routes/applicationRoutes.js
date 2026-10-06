import express from "express";

import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationControllers.js";

const router = express.Router();

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