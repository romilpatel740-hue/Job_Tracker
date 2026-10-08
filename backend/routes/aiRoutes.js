import express from "express";

import {
  testAI,
  analyzeJobDescription,
  matchSkills
} from "../controllers/aiControllers.js";

const router = express.Router();

router.post("/test", testAI);

router.post("/analyze", analyzeJobDescription);

router.post("/match-skills", matchSkills);

export default router;