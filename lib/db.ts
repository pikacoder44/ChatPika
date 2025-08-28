import mongoose from "mongoose";

export async function connectDB() {
  const mongodb = process.env.MONGODB_URL_LOCAL as string;
  try {
    let conn = await mongoose.connect(mongodb);
    return conn;
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("MongoDB Connection Error: ", error);
  }
}
