import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";


export async function GET() {
  try {
    await connectDB();

    console.log("MongoDb Connected");
  } catch (error) {
    console.log("Error", error);
  }
}
