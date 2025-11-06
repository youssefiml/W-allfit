import Group from "../models/Group.js";
import User from "../models/User.js";

export const createGroup = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Group name is required" });
    }
    
    const group = new Group({
      name: name.trim(),
      description: description?.trim() || "",
      creator: req.userId,
      members: [req.userId],
      image: image || "",
    });
    
    await group.save();
    await group.populate("creator", "name email");
    await group.populate("members", "name email");
    
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("creator", "name email")
      .populate("members", "name email")
      .sort({ createdAt: -1 });
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("creator", "name email")
      .populate("members", "name email");
    
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    const userIdStr = req.userId.toString();
    const isMember = group.members.some(
      (memberId) => memberId.toString() === userIdStr
    );
    
    if (isMember) {
      return res.status(400).json({ error: "Already a member of this group" });
    }
    
    group.members.push(req.userId);
    await group.save();
    await group.populate("creator", "name email");
    await group.populate("members", "name email");
    
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }
    
    if (group.creator.toString() === req.userId.toString()) {
      return res.status(400).json({ error: "Creator cannot leave the group" });
    }
    
    group.members = group.members.filter(
      (memberId) => memberId.toString() !== req.userId.toString()
    );
    await group.save();
    await group.populate("creator", "name email");
    await group.populate("members", "name email");
    
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

