import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log("Received message:", message);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const stream = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const encoder = new TextEncoder();
    const streamResponse = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream.stream) {
          const text = chunk.text();
          controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(streamResponse, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    console.error("Error in stream:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
