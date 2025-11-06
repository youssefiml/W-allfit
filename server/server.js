import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import connectDB from "./config/db.js";
import programRoutes from "./routes/program.js";
import communityRoutes from "./routes/community.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Configure CORS to allow requests from the React client
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://w-allfit-pi.vercel.app',
  process.env.CLIENT_URL,
  process.env.RAILWAY_PUBLIC_DOMAIN,
  process.env.RAILWAY_STATIC_URL,
  process.env.VERCEL_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In production, allow all origins if no specific CLIENT_URL is set
    if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URL) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// API Routes (must come before static file serving)
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/program", programRoutes);
app.use("/api/community", communityRoutes);

// Test route (only in development)
if (process.env.NODE_ENV !== "production") {
  app.get('/', (req, res) => {
    res.json({ message: 'WALLFIT API is running!' });
  });
}

// Serve static files from the React app in production
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientBuildPath));
  
  // Serve React app for all non-API routes (must be last)
  // Use a middleware instead of wildcard route for Express 5 compatibility
  app.use((req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api")) {
      return next();
    }
    // Skip static files (already handled by express.static)
    if (req.path.includes(".") && !req.path.endsWith(".html")) {
      return next();
    }
    // Serve React app for all other routes
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT} 🚀`);
  if (process.env.NODE_ENV === "production") {
    console.log(`Serving client from: ${path.join(__dirname, "../client/dist")}`);
  }
});