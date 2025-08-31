import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await currentUser();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    

    let dbUser = await User.findOne({ clerkId: user.id });

    if (!dbUser) {
      dbUser = await User.create({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      });
    }

    const body = await req.json();
    const { title } = body;

  
    const chat = await Chat.create({
      userId: dbUser.clerkId,
      title,
      messages: [],
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error: any) {
    console.error("=== CHAT CREATION ERROR ===");
    console.error("Error creating chat:", error);
    console.error("Error stack:", error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const user = await currentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const dbUser = await User.findOne({ clerkId: user.id });
    if (!dbUser) return NextResponse.json([]);

    const chats = await Chat.find({ userId: dbUser.clerkId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(chats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
