import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";
import Chat from "@/lib/models/Chat";

export async function POST(req: Request) {
  await dbConnect();
  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

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
  return Response.json(chat);
}
