import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await connectDB();


    const user = await User.find();
    return NextResponse.json({ User: user }, { status: 200 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ Error: error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    let payload = await req.json();

    let response = await User.create(payload);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ Error: error }, { status: 500 });
  }
}
