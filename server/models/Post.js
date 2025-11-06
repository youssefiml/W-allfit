import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
}, { 
  timestamps: true,
  strict: false // Allow extra fields for backward compatibility
});

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", default: null },
  replies: { type: [ReplySchema], default: [] },
  isQuestion: { type: Boolean, default: false },
}, { 
  timestamps: true,
  strict: false // Allow extra fields for backward compatibility
});

export default mongoose.model("Post", PostSchema);