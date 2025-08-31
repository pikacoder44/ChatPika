import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Chat from "@/lib/models/Chat";

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();
  console.log("Received Messages:", messages);
  console.log("Received Chat ID:", chatId);

  try {
    await connectDB();

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const convertedMsgs = JSON.stringify(messages);

    const prompt = `Summarize this conversation into a very short, catchy title (max 5 words):\n\n${convertedMsgs}`;

    // ✅ Correct call
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const title = result.response.text().trim();
    console.log("Generated Title:", title);

    if (title) {
      const updatedTitle = await Chat.updateOne(
        { _id: chatId },
        { title }
      );
      console.log("Chat title update result:", updatedTitle);
    }

    return NextResponse.json({ title }, { status: 200 });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
