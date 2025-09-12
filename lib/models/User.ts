import mongoose, { Model, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email?: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
