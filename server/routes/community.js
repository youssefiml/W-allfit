import express from "express";
import {
  getPosts,
  createPost,
  replyToPost,
} from "../controllers/communityController.js";
import {
  createGroup,
  getGroups,
  getGroup,
  joinGroup,
  leaveGroup,
} from "../controllers/groupController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Posts routes
router.get("/posts", verifyToken, getPosts);
router.post("/posts", verifyToken, createPost);
router.post("/posts/:postId/reply", verifyToken, replyToPost);

// Groups routes
router.get("/groups", verifyToken, getGroups);
router.post("/groups", verifyToken, createGroup);
router.get("/groups/:id", verifyToken, getGroup);
router.post("/groups/:id/join", verifyToken, joinGroup);
router.post("/groups/:id/leave", verifyToken, leaveGroup);

export default router;