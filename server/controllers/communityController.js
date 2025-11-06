import Post from "../models/Post.js";
import Group from "../models/Group.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const { groupId } = req.query;
    const query = groupId ? { group: groupId } : { group: null };
    
    const posts = await Post.find(query)
      .populate("user", "name email")
      .populate("replies.user", "name email")
      .populate("group", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, groupId, isQuestion } = req.body;
    
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Content is required" });
    }
    
    // If groupId is provided, verify the user is a member
    if (groupId) {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: "Group not found" });
      }
      const userIdStr = req.userId.toString();
      const isMember = group.members.some(
        (memberId) => memberId.toString() === userIdStr
      );
      if (!isMember) {
        return res.status(403).json({ error: "You must be a member to post in this group" });
      }
    }
    
    const post = new Post({
      user: req.userId,
      content: content.trim(),
      group: groupId || null,
      isQuestion: isQuestion || false,
      replies: [], // Explicitly set to empty array
    });
    
    await post.save();
    await post.populate("user", "name email");
    await post.populate("group", "name");
    
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const replyToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    
    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "Reply content is required" });
    }
    
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid post ID" });
    }
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    // Create reply object
    const newReply = {
      user: req.userId,
      content: content.trim(),
    };
    
    // Ensure replies array exists
    if (!post.replies) {
      post.replies = [];
    }
    
    post.replies.push(newReply);
    
    // Save the post
    const savedPost = await post.save();
    
    // Populate and return
    await savedPost.populate("user", "name email");
    await savedPost.populate("replies.user", "name email");
    await savedPost.populate("group", "name");
    
    res.json(savedPost);
  } catch (err) {
    console.error("Error in replyToPost:", err);
    res.status(500).json({ 
      error: err.message || "Error posting reply",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
  }
};
