import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Chat from "@/lib/models/Chat";

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    console.log("Received Messages:", messages);
    console.log("Received Chat ID:", chatId);

    await connectDB();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key missing" }, { status: 500 });
    }

    // ✅ Use the correct SDK and latest model
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash", // ⚡ Fast & cost-efficient
    });

    // ✅ Prepare concise title prompt
    const convertedMsgs = JSON.stringify(messages);
    const prompt = `Summarize this chat into a short, catchy title (max 5 words):\n\n${convertedMsgs}`;

    // ✅ Generate concise title
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Extract title safely
    const title = result.response.text().trim() || "Untitled Chat";

    console.log("Generated Title:", title);

    if (title && chatId) {
      const updatedTitle = await Chat.updateOne({ _id: chatId }, { title });
      console.log("Chat title update result:", updatedTitle);
    }

    return NextResponse.json({ title }, { status: 200 });
  } catch (error) {
    console.error("Error in chat title route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
