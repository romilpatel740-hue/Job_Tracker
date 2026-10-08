import "dotenv/config";

import express from "express";
import cors from "cors";

import applicationRoutes from "./routes/applicationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import connectDB from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "JobTrack API is running",
  });
});

app.use("/api/applications", applicationRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, () => {
  console.log(
    `JobTrack server running on port ${PORT}`
  );
});