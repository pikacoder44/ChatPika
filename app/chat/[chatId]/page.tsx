"use client";
import { useState, useEffect, useRef } from "react";
import ChatWindow from "@/components/ChatWindow";
import WelcomeChat from "@/components/WelcomeChat";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { Square, SendHorizonal } from "lucide-react";
export default function Chat() {
  type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
  };
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [titleGenerated, setTitleGenerated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  //Detect if a user is logged in (via Clerk).
  const { user, isSignedIn } = useUser(); // Clerk State

  const params = useParams();
  const searchParams = useSearchParams();

  const chatId = params.chatId as string;
  const prompt = searchParams.get("prompt");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-resize textarea as user types (up to a reasonable max)
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxPx = 192; // ~12rem (Tailwind h-48)
    el.style.height = Math.min(el.scrollHeight, maxPx) + "px";
  }, [message]);

  function generateId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    // Fallback: generate UUID manually
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  useEffect(() => {
    let dbDataLoad = async () => {
      let response = await fetch(`/api/chats/${chatId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let chat = await response.json();
      setMessages(
        chat.messages.map((msg: any) => ({
          id: msg._id,
          role: msg.role,
          content: msg.content,
        }))
      );
      // If chat already has messages, mark title as generated
      if (chat.messages.length > 0) {
        setTitleGenerated(true);
      }
    };

    dbDataLoad();
  }, [chatId]);

  useEffect(() => {
    const updateTitle = async () => {
      // Only generate title if we have exactly 2 messages and haven't generated it yet
      if (messages.length === 2 && !titleGenerated) {
        // Check if both messages have content (assistant message is complete)
        const [userMsg, assistantMsg] = messages;
        if (
          userMsg?.content &&
          assistantMsg?.content &&
          assistantMsg.content.trim() !== ""
        ) {
          setTitleGenerated(true); // Mark as generated immediately to prevent duplicate calls

          let response = await fetch("/api/ai/generatetitle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: messages, chatId: chatId }),
          });
          if (response.status === 429) {
            alert(
              "Can't generate title.You have reached the maximum number of requests. Please try again later."
            );
            console.log(
              "Can't generate title. You have reached the maximum number of requests. Please try again later."
            );
            return;
          }
          if (response.ok) {
            mutate("/api/chats");
          }
        }
      }
    };

    updateTitle();
  }, [messages, chatId, titleGenerated]);

  // Helper function to create new chat
  const createNewChat = () => {
    fetch("/api/chats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Chat" }),
    })
      .then((res) => res.json())
      .then((chat) => {
        console.log("New chat created:", chat);
        localStorage.setItem("chatId", chatId);
      })
      .catch((error) => {
        console.error("Error creating chat:", error);
      });
  };

  const handleChat = async () => {
    if (!message.trim()) return;

    setLoading(true);

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: message,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    console.log("Prompt: ", prompt);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          chatId: isSignedIn ? chatId : undefined,
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // Add empty assistant message once
      const assistantId = generateId();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      console.log("Chat ID: ", chatId);
      // Stream chunks
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      }
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: "Error: " + error.message,
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };
  return (
    <div className="flex flex-col h-[100svh] w-full overflow-x-hidden dark:bg-zinc-900 dark:text-white">
      <div className="self-stretch ">
        <div className="fixed mt-[-10px] z-50">
          <SidebarTrigger className="size-10 rounded-full bg-zinc-900/80 text-white border border-zinc-800 hover:bg-zinc-900 hover:text-white backdrop-blur shadow-lg" />
        </div>
      </div>
      {messages.length === 0 ? (
        <WelcomeChat
          onPick={(m) => {
            setMessage(m);
          }}
        />
      ) : (
        <div className="flex w-full justify-center px-2 sm:px-4 min-h-0 min-w-0 overflow-hidden flex-1 ">
          <ChatWindow messages={messages} />
        </div>
      )}
      {mounted && (
        <div className="flex justify-center px-2 sm:px-4 ">
          <div className="m-2 flex w-full max-w-3xl mb-30 flex-row justify-center items-center rounded-[28px] dark:bg-zinc-700 dark:border-0 border-2 border-zinc-300 min-h-10 dark:text-white shadow-sm p-2 ">
            <textarea
              suppressHydrationWarning
              ref={textareaRef}
              rows={1}
              className="w-full  max-h-40 sm:max-h-48 resize-none bg-transparent px-2 py-2 rounded-md focus:outline-none scroll-smooth placeholder-zinc-300"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onInput={() => {
                const el = textareaRef.current;
                if (!el) return;
                el.style.height = "auto";
                const maxPx = 192;
                el.style.height = Math.min(el.scrollHeight, maxPx) + "px";
              }}
              placeholder="Ask me something..."
            />
            {loading ? (
              <button
                disabled
                className="w-15 h-full flex items-center justify-center"
              >
                <div className="bg-gray-300 p-3 rounded-full animate-pulse">
                <Square size={13} fill="black" strokeWidth={0}/>
                </div>
              </button>
            ) : message.length == 0 ? (
              <button
                disabled
                className="w-15 h-full flex items-center justify-center cursor-not-allowed text-gray-600 dark:text-gray-900 "
              >
                <SendHorizonal size={25} fill="gray" />
              </button>
            ) : (
              <button
                onClick={handleChat}
                className="w-15 h-full flex items-center justify-center"
              >
                <SendHorizonal size={25} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
