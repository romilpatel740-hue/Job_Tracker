import "dotenv/config";
import express from "express";
import cors from "cors";

import applicationRoutes from "./routes/applicationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "JobTrack API is running",
  });
});

// API Routes
app.use("/api/applications", applicationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`JobTrack server running on port http://localhost:${PORT}`);
});