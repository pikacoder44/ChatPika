import mongoose from "mongoose";
import { models } from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  createdAt: Number,
});

const User = models.User || mongoose.model("User", userSchema);
export default User;
