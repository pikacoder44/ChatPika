import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";
import mongoose, { Model, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  email?: string;
  createdAt: Date;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { message, chatId } = await req.json();

    // Add debugging
    console.log("Received chatId:", chatId);
    console.log("Received message:", message);

    // check Clerk user
    let user = await currentUser();
    let dbUser = null;

    if (user) {
      dbUser = await (User as mongoose.Model<IUser>).findOne({
        clerkId: user.id,
      });
      if (!dbUser) {
        dbUser = await (User as Model<IUser>).create({
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        });
      }
    }

    console.log("dbUser:", dbUser);
    console.log("chatId:", chatId);

    //  ------------------------------------------------------------------------------------------
    // AI Config:
    // API key availability Check:
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // For Streaming Response:
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          // Save user message if logged in
          if (dbUser && chatId) {
            // First, let's check if the chat document exists
            const chatDoc = await Chat.findById(chatId);
            console.log("Found chat document:", chatDoc);

            if (chatDoc) {
              const updateResult = await Chat.updateOne(
                { _id: chatId },
                { $push: { messages: { role: "user", content: message } } }
              );
              console.log("User message update result:", updateResult);
            } else {
              console.log("Chat document not found with ID:", chatId);
            }
          }

          const result = await model.generateContentStream(message);
          let assistantReply = "";
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
              assistantReply += text;
            }
          }

          // Save assistant reply if logged in
          if (dbUser && chatId) {
            const updateResult = await Chat.updateOne(
              { _id: chatId },
              {
                $push: {
                  messages: { role: "assistant", content: assistantReply },
                },
              }
            );
            console.log("Assistant message update result:", updateResult);
          }
        } catch (error) {
          console.error("Error in stream:", error);
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
