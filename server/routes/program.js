import express from "express";
import { setProgram, getProgram, getSamplePrograms } from "../controllers/programController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// More specific routes should come first
// Samples route is public (no auth required) so users can browse programs
router.get("/samples", getSamplePrograms);
router.get("/", verifyToken, getProgram);
router.post("/", verifyToken, setProgram);

export default router;