import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import connectDB from "./config/db.js";
import programRoutes from "./routes/program.js";
import communityRoutes from "./routes/community.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Configure CORS to allow requests from the React client
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'WALLFIT API is running!' });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/program", programRoutes);
app.use("/api/community", communityRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});