"use client";
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="p-6 w-full min-h-[989] flex flex-col  dark:bg-zinc-900 dark:text-white">
      <ChatWindow user={message} />
      <div className="flex flex-row  justify-center gap-4 items-center">
        <textarea
          className="border dark:text-white p-2 w-250 my-4 rounded-md items-center"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me something..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 w-20 rounded"
        >
          Send
        </button>
      </div>

      {reply && (
        <div className="mt-4 p-3 border rounded text-black bg-gray-100">
          <b>AI:</b> {reply}
        </div>
      )}
    </div>
  );
}
