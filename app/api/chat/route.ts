import dotenv from "dotenv";
dotenv.config();

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";
import Message from "@/lib/models/Message";

export async function POST(req: Request) {
  await connectDB();

  const { message, chatId } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  // API key availability Check:
  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  // check Clerk user
  let user = await currentUser();
  let dbUser = null;

  if (user) {
    dbUser = await User.findOne({ clerkId: user.id });
    if (!dbUser) {
      dbUser = await User.create({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }

  //  ------------------------------------------------------------------------------------------
  // AI Config:
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // For Streaming Response:
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      // save user message if logged in
      if (dbUser && chatId) {
        await Message.create({
          chatId,
          role: "user",
          content: message,
        });
      }

      const result = await model.generateContentStream(message);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) controller.enqueue(encoder.encode(text));
      }

      // save assistant reply if logged in
      if (dbUser && chatId) {
        await Message.create({
          chatId,
          role: "assistant",
          content: assistantReply,
        });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
