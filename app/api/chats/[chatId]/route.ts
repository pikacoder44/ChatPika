import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import Chat from "@/lib/models/Chat";
import { NextResponse } from "next/server";

export async function GET(req: Request,   { params }: { params: { chatId: string } }) {
  try {
    const { chatId } = await params;
    await connectDB();
    const user = await currentUser();
    console.log("Chat Id: ", chatId);
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const chat = await Chat.findById(chatId); // Fixed: use destructured chatId

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    // Check if user owns this chat
    if (chat.userId !== user.id) { // This should work since chat.userId stores clerkId
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Chat found and authorized:", chat);
    return NextResponse.json(chat);
  } catch (error: any) {
    console.error("Error in chat GET:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}