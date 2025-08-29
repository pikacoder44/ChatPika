import { GoogleGenerativeAI } from "@google/generative-ai";
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";

import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";

export async function POST(req: Request) {
  await connectDB();

  const { message, chatId } = await req.json();

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

      // Save user message if logged in
      if (dbUser && chatId) {
        await Chat.updateOne(
          { _id: chatId, userId: dbUser.clerkId },
          { $push: { messages: { role: "user", content: message } } }
        );
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
        await Chat.updateOne(
          { _id: chatId, userId: dbUser.clerkId },
          {
            $push: { messages: { role: "assistant", content: assistantReply } },
          }
        );
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
