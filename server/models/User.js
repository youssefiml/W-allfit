// models/User.js
import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema({
  title: String,
  description: String,
  exercises: [String],
  nutrition: [String],
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  weight: Number,
  height: Number,
  goal: String,
  program: ProgramSchema,
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
