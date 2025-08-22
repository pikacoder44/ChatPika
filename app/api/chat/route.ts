import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      //   input: "write a haiku about ai",
      //   store: true,
    });

    return Response.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to process request",
      },
      {
        status: 500,
      }
    );
  }
}
