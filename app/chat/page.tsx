"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  ArrowRight,
  Bot,
  Zap,
  Lock,
  MessageSquare,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import SignInReq from "@/components/SignInReq";
import { PikaMascotIcon } from "@/components/Navbar";

interface ChatItem {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

function timeAgo(dateString?: string) {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function ChatPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentChats, setRecentChats] = useState<ChatItem[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isSignedIn } = useUser();

  const handleNewChat = async () => {
    setIsCreating(true);
    try {
      if (!isSignedIn) {
        setShowAuthModal(true);
        return;
      }

      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Chat" }),
      });

      if (response.ok) {
        const chat = await response.json();
        router.push(`/chat/${chat._id}`);
      } else if (response.status === 401) {
        setShowAuthModal(true);
      } else {
        throw new Error("Failed to create chat");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    const getRecentChats = async () => {
      setLoading(true);
      try {
        const result = await fetch("/api/chats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (result.ok) {
          const data = await result.json();
          if (Array.isArray(data)) {
            setRecentChats(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isSignedIn) {
      getRecentChats();
    }
  }, [isSignedIn]);

  const openChat = (id: string) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-[#FAF9F6] dark:bg-[#0F1117] text-zinc-900 dark:text-zinc-100 overflow-x-hidden transition-colors duration-200">
      {/* Subtle fine dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60"
      />

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-14 max-w-4xl mx-auto text-center">
        {/* Welcome Mascot Avatar Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-yellow-300 dark:bg-yellow-400/90 shadow-md shadow-yellow-500/10 flex items-center justify-center">
              <PikaMascotIcon className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            {/* Tiny playful status pip */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#FAF9F6] dark:border-[#0F1117] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
            Welcome to{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-yellow-200">
              ChatPika
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed">
            Your friendly, lightning-fast AI workspace. Ask questions, brainstorm solutions, or explore new ideas in a distraction-free flow.
          </p>

          {/* Primary CTA: Start New Chat */}
          <div className="mt-7">
            <motion.button
              onClick={handleNewChat}
              disabled={isCreating}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -2 }}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-zinc-950 bg-yellow-300 hover:bg-yellow-200 shadow-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                  <span>Preparing workspace...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Start New Chat</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Chats Section */}
        <div className="w-full mt-12 sm:mt-14">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Recent conversations
              </h2>
            </div>
            {recentChats.length > 0 && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {recentChats.length} {recentChats.length === 1 ? "thread" : "threads"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-6 h-6 border-2 border-zinc-300 border-t-yellow-400 dark:border-zinc-700 dark:border-t-yellow-300 rounded-full animate-spin" />
            </div>
          ) : recentChats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {recentChats.slice(0, 6).map((chat) => (
                <motion.button
                  key={chat._id}
                  onClick={() => openChat(chat._id)}
                  whileHover={{ y: -2 }}
                  className="group p-3.5 rounded-xl text-left bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all cursor-pointer flex flex-col justify-between shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-yellow-200 line-clamp-1 transition-colors">
                      {chat.title || "Untitled conversation"}
                    </p>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 shrink-0 transition-colors" />
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                    <MessageSquare className="w-3 h-3" />
                    <span>{timeAgo(chat.updatedAt || chat.createdAt)}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="py-8 px-4 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-[#151821]/40 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              No previous threads found. Tap &ldquo;Start New Chat&rdquo; above to start your first conversation!
            </div>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div className="w-full mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 text-left">
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#1A1D27] flex items-center justify-center text-zinc-800 dark:text-yellow-300 mb-3">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Neural reasoning
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Google Gemini powered for accurate analysis, writing, and code assistance.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#1A1D27] flex items-center justify-center text-zinc-800 dark:text-yellow-300 mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Live token streaming
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Sub-120ms latency delivers responses word-by-word with zero awkward pauses.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-[#1A1D27] flex items-center justify-center text-zinc-800 dark:text-yellow-300 mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              Private & encrypted
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Authenticated securely via Clerk. Your prompts remain strictly private.
            </p>
          </div>
        </div>
      </main>

      {/* Minimalist Seamless Footer matching exact background */}
      <footer className="w-full py-4 px-4 text-center text-xs text-zinc-400 dark:text-zinc-600 border-t border-zinc-200/40 dark:border-white/5 bg-[#FAF9F6] dark:bg-[#0F1117]">
        <span>ChatPika • Clean & quiet AI companion</span>
      </footer>

      {showAuthModal && <SignInReq onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}
