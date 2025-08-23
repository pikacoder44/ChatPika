"use client";
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamResponse, setStreamResponse] = useState("");
  const [sent, setSent] = useState(false);
  const handleChat = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setResponse(data.response);
      setSent(true);
    } catch (error) {
      setResponse("Error: " + error.message);
      setSent(false);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 w-full min-h-[989] flex flex-col  dark:bg-zinc-900 dark:text-white">
      <ChatWindow response={response} sent={sent} user={message} />
      <div className="flex flex-row  justify-center gap-4 items-center">
        <textarea
          className="border dark:text-white p-2 w-250 my-4 rounded-md items-center"
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
