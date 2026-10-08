import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import aiRoutes from "./routes/aiRoutes.js";

import applicationRoutes from "./routes/applicationRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "JobTrack API is running",
  });
});

// Application routes
app.use("/api/applications", applicationRoutes);
app.use("/api/ai", aiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(
    `JobTrack server running on http://localhost:${PORT}`
  );
});