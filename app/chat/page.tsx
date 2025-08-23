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
    setResponse("");

    // Append in Message array:
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    // ---------------------------------------------

    //    ⚠️ These are hardcoded lines - Remove them after testing:
    setMessages((prev) => [...prev, newMessage]);
    const fakeResponse = "Hello! I'm your hardcoded AI 🤖"; // ⚠️ Delete it after testing
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "assistant", content: fakeResponse },
    ]);
    setMessage("");

    // -------------------------------------------------
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);
      setSent(false); // ⚠️ Set it to true after testing
      const fakeResponse = "Hello! I'm your hardcoded AI 🤖"; // ⚠️ Delete it after testing
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: fakeResponse },
      ]); // ⚠️ Set content to data.response after testing
    } catch (error) {
      setResponse("Error: " + error.message);
      setSent(true); // ⚠️ Set it to false after testing
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
