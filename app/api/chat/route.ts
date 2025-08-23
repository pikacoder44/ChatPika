// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_KEY,
// });

// export async function POST(request) {
//   try {
//     const { message } = await request.json();

//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: message }],
//       //   input: "write a haiku about ai",
//       //   store: true,
//     });

//     return Response.json({
//       response: completion.choices[0].message.content,
//     });
//   } catch (error) {
//     return Response.json(
//       {
//         error: "Failed to process request",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

import dotenv from "dotenv";
dotenv.config();

// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { message } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(message);

  return NextResponse.json({ reply: result.response.text() });
}
