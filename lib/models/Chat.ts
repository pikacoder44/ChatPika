import mongoose, { Model, Document } from "mongoose";

export interface IMsg {
  role: string;
  content: string;
  timestamp?: Date;
}

export interface IChat extends Document {
  userId: string;
  title?: string;
  messages: IMsg[];
  createdAt?: Date;
}
const ChatSchema = new mongoose.Schema<IChat>({
  userId: { type: String, ref: "User", required: true },
  title: { type: String, default: "New Chat" },
  messages: [
    {
      role: { type: String, enum: ["user", "assistant"], required: true },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
export default Chat;
