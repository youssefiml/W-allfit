import User from "../models/User.js";
import { samplePrograms } from "../data/samplePrograms.js";

export const setProgram = async (req, res) => {
  try {
    const { title, description, exercises, nutrition } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.program = { title, description, exercises, nutrition };
    await user.save();
    res.json(user.program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProgram = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.program) return res.status(404).json({ error: "No program found" });
    res.json(user.program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSamplePrograms = async (req, res) => {
  try {
    if (!samplePrograms || samplePrograms.length === 0) {
      return res.status(500).json({ error: "Sample programs not available" });
    }
    res.json(samplePrograms);
  } catch (err) {
    console.error("Error in getSamplePrograms:", err);
    res.status(500).json({ error: err.message });
  }
};
