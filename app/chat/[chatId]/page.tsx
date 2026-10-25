"use client";

import { useState, useEffect, useRef } from "react";
import ChatWindow from "@/components/ChatWindow";
import WelcomeChat from "@/components/WelcomeChat";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { mutate } from "swr";
import { ArrowUp, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
  };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatTitle, setChatTitle] = useState("New Chat");
  const [titleGenerated, setTitleGenerated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { isSignedIn } = useUser();
  const params = useParams();
  const chatId = params.chatId as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxPx = 160;
    el.style.height = Math.min(el.scrollHeight, maxPx) + "px";
  }, [message]);

  function generateId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  useEffect(() => {
    const dbDataLoad = async () => {
      try {
        const response = await fetch(`/api/chats/${chatId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 401) return;
        if (response.ok) {
          const chat = await response.json();
          if (chat) {
            if (chat.title) setChatTitle(chat.title);
            if (chat.messages) {
              setMessages(
                chat.messages.map((msg: any) => ({
                  id: msg._id,
                  role: msg.role,
                  content: msg.content,
                }))
              );
              if (chat.messages.length > 0) {
                setTitleGenerated(true);
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load chat:", err);
      }
    };

    if (chatId) {
      dbDataLoad();
    }
  }, [chatId]);

  useEffect(() => {
    const updateTitle = async () => {
      if (messages.length === 2 && !titleGenerated) {
        const [userMsg, assistantMsg] = messages;
        if (
          userMsg?.content &&
          assistantMsg?.content &&
          assistantMsg.content.trim() !== ""
        ) {
          setTitleGenerated(true);
          try {
            const response = await fetch("/api/ai/generatetitle", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ messages, chatId }),
            });
            if (response.ok) {
              mutate("/api/chats");
            }
          } catch (e) {
            console.error("Failed to update title:", e);
          }
        }
      }
    };

    updateTitle();
  }, [messages, chatId, titleGenerated]);

  const handleChat = async (input?: string) => {
    const text = input ?? message;
    if (!text || typeof text !== "string" || !text.trim()) return;

    setLoading(true);
    setIsStreaming(true);
    setError(null);
    setLastInput(text);

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          chatId: isSignedIn ? chatId : undefined,
        }),
      });

      if (!res.body) throw new Error("No response body");
      if (!res.ok) {
        setError(`Error ${res.status}: ${res.statusText}`);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const assistantId = generateId();

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      let gotFirstChunk = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (!gotFirstChunk && chunk.trim() !== "") {
          setIsStreaming(false);
          gotFirstChunk = true;
        }

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
    } finally {
      setIsStreaming(false);
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastInput) handleChat(lastInput);
  };

  const handleExport = () => {
    if (messages.length === 0) {
      alert("No messages to export.");
      return;
    }
    const markdown = messages
      .map(
        (m) =>
          `### ${m.role === "user" ? "You" : "ChatPika"}\n\n${m.content}\n`
      )
      .join("\n---\n\n");

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chatTitle.replace(/\s+/g, "_") || "ChatPika"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#FAF9F6] dark:bg-[#0F1117] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Subtle fine dot grid (visible in dark and light modes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60"
      />

      {/* Workspace Top Header Bar */}
      <WorkspaceHeader
        chatId={chatId}
        chatTitle={chatTitle}
        onTitleUpdate={(newTitle) => setChatTitle(newTitle)}
        onExport={handleExport}
      />

      {/* Main Conversation Stream */}
      <div className="flex-1 w-full flex flex-col min-h-0 overflow-hidden relative z-10">
        {messages.length === 0 ? (
          <WelcomeChat onPick={(m) => setMessage(m)} />
        ) : (
          <ChatWindow
            messages={messages}
            streaming={isStreaming}
            error={error}
            onRetry={handleRetry}
          />
        )}
      </div>

      {/* Floating Bottom Input Dock */}
      {mounted && (
        <div className="sticky bottom-4 mx-auto max-w-2xl w-full px-4 mb-4 z-20 shrink-0">
          {/* Subtle Pika is thinking floating status indicator */}
          <AnimatePresence>
            {isStreaming && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="mb-2 flex items-center gap-1.5 text-xs text-amber-600 dark:text-yellow-300 font-medium px-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
                <span>⚡ Pika is thinking...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full rounded-2xl bg-white/95 dark:bg-[#151821]/90 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 p-2.5 shadow-xl shadow-zinc-900/5 dark:shadow-2xl flex items-center gap-3 transition-colors duration-200 focus-within:border-yellow-400 dark:focus-within:border-yellow-400/40">
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me something..."
              className="w-full max-h-36 resize-none bg-transparent border-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:ring-0 text-sm focus:outline-none px-2 py-1"
            />

            {loading ? (
              <button
                disabled
                className="p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center shrink-0 cursor-not-allowed text-zinc-400"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.92 }}
                disabled={!message.trim()}
                onClick={() => handleChat(message)}
                className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer font-medium ${
                  message.trim()
                    ? "bg-yellow-300 hover:bg-yellow-200 text-zinc-950 shadow-sm"
                    : "bg-zinc-100 dark:bg-white/5 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
                }`}
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
