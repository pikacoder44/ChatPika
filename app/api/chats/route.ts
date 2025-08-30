import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    console.log("=== CHAT CREATION START ===");
    await connectDB();
    console.log("Database connected");
    
    const user = await currentUser();
    console.log("Current user:", user);
    
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let dbUser = await User.findOne({ clerkId: user.id });
    console.log("Found dbUser:", dbUser);
    
    if (!dbUser) {
      dbUser = await User.create({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      });
      console.log("Created new dbUser:", dbUser);
    }

    const body = await req.json();
    const { title, chatId } = body;
    console.log("Request body:", { title, chatId, userId: dbUser.clerkId });

    console.log("About to create chat...");
    const chat = await Chat.create({
      userId: dbUser.clerkId,
      title,
      messages: [],
    });
    
    console.log("Chat created successfully:", chat);
    console.log("=== CHAT CREATION END ===");
    return NextResponse.json(chat);
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
