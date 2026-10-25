"use client";

import { useParams } from "next/navigation";
import ChatView from "@/components/ChatView";

export default function ChatPage() {
  const params = useParams();
  const chatId = params?.chatId as string | undefined;

  return <ChatView initialChatId={chatId} />;
}
