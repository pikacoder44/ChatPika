// app/test/page.tsx
"use client";
import ChatWindow from "@/components/ChatWindow";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { useState } from "react";

export default function TestPage() {
  const [messages, setMessages] = useState([
    { role: "user", content: "Hello AI!" },
    { role: "assistant", content: "Hey there! How can I help you?" },
    { role: "user", content: "Can you tell me a joke?" },
    {
      role: "assistant",
      content:
        "Sure 😄 Why don’t skeletons fight each other? Because they don’t have the guts!",
    },

    { role: "user", content: "Hello AI!" },
    { role: "assistant", content: "Hey there! How can I help you?" },
    { role: "user", content: "Can you tell me a joke?" },
    {
      role: "assistant",
      content:
        "Sure 😄 Why don’t skeletons fight each other? Because they don’t have the guts!",
    },

    { role: "user", content: "Hello AI!" },
    { role: "assistant", content: "Hey there! How can I help you?" },
    { role: "user", content: "Can you tell me a joke?" },
    {
      role: "assistant",
      content:
        "Sure 😄 Why don’t skeletons fight each other? Because they don’t have the guts!",
    },

    { role: "user", content: "Hello AI!" },
    { role: "assistant", content: "Hey there! How can I help you?" },
    { role: "user", content: "Can you tell me a joke?" },
    {
      role: "assistant",
      content:
        "Sure 😄 Why don’t skeletons fight each other? Because they don’t have the guts!",
    },

    { role: "user", content: "Hello AI!" },
    { role: "assistant", content: "Hey there! How can I help you?" },
    { role: "user", content: "Can you tell me a joke?" },
    {
      role: "assistant",
      content:
        "Sure 😄 Why don’t skeletons fight each other? Because they don’t have the guts!",
    },
  ]);

  return (
    <div className="flex flex-col items-center h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Chat Test Page</h1>

      {/* Chat Window */}
      <div className="flex-1 w-full flex justify-center">
        <ScrollArea.Root className="w-[60%] h-[850px] rounded-md overflow-hidden bg-gray-700">
          <ScrollArea.Viewport className="w-full h-full p-3">
            <ChatWindow messages={messages} />
          </ScrollArea.Viewport>

          {/* Vertical Scrollbar */}
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex select-none touch-none w-2 bg-gray-600 p-0.5 transition-colors duration-150 hover:bg-gray-500"
          >
            <ScrollArea.Thumb className="bg-gray-400 rounded-full transition-colors duration-150 hover:bg-gray-300" />
          </ScrollArea.Scrollbar>

          <ScrollArea.Corner className="bg-gray-500" />
        </ScrollArea.Root>
      </div>

      {/* Input Area (dummy, just for styling) */}
      <div className="w-[60%] flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg border border-zinc-700 bg-zinc-900"
        />
        <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}
