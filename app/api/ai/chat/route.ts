import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    // 1. Extract chatId along with the message from the request body
    const { message, chatId } = await req.json();

    if (!message || !chatId) {
      return new Response(
        JSON.stringify({ error: "Missing message or chatId" }),
        { status: 400 }
      );
    }

    console.log(`Received message for chat ${chatId}:`, message);

    // 2. Start Gemini stream
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const stream = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: message }] }],
    });

    const encoder = new TextEncoder();
    let fullResponseText = ""; // Accumulator for the full assistant text

    const streamResponse = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream.stream) {
          const text = chunk.text();
          fullResponseText += text; // Append each chunk as it streams
          controller.enqueue(encoder.encode(text));
        }

        // 3. Save both messages to MongoDB when the stream finishes
        try {
          await connectDB();

          await Chat.findByIdAndUpdate(chatId, {
            $push: {
              messages: {
                $each: [
                  { role: "user", content: message, timestamp: new Date() },
                  { role: "assistant", content: fullResponseText, timestamp: new Date() },
                ],
              },
            },
          });

          console.log("Successfully saved messages to MongoDB");
        } catch (dbErr) {
          console.error("Failed to save chat to MongoDB:", dbErr);
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