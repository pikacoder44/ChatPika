import mongoose from "mongoose";
const ChatSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true }, // Clerk user
  title: { type: String, default: "New Chat" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
