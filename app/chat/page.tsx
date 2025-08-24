"use client";
import { useState } from "react";
import ChatWindow from "@/components/ChatWindow";

export default function Chat() {
  type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
  };

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamResponse, setStreamResponse] = useState("");
  const [sent, setSent] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChat = async () => {
    setLoading(true);

    // Add user message to chat
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Read stream chunks
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        assistantMessage = {
          ...assistantMessage,
          content: assistantMessage.content + chunk, // append chunk
        };

        // Update assistant's message in state
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id ? assistantMessage : msg
          )
        );
      }
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Error: " + error.message,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 w-full min-h-[989] flex flex-col  dark:bg-zinc-900 dark:text-white">
      <ChatWindow messages={messages} />
      <div className="flex flex-row  justify-center gap-4 items-center">
        <textarea
          className="border border-zinc-500 focus:outline-none dark:text-white px-2 w-250 my-4 rounded-md items-center content-center"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me something..."
        />
        {loading ? (
          <button
            disabled
            className="bg-gray-500 text-white px-4 py-2  rounded w-auto "
          >
            Loading...
          </button>
        ) : (
          <button
            onClick={handleChat}
            className="bg-blue-500 text-white px-4 py-2 w-auto rounded"
          >
            Send
          </button>
        )}
      </div>
    </div>
  );
}
