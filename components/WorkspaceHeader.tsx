"use client";

import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import {
  Share2,
  Download,
  Settings,
  Pencil,
  Check,
} from "lucide-react";
import { mutate } from "swr";
import { motion } from "framer-motion";
import { useCredits } from "@/hooks/useCredits";

interface WorkspaceHeaderProps {
  chatId?: string;
  chatTitle?: string;
  onTitleUpdate?: (newTitle: string) => void;
  onExport?: () => void;
}

export default function WorkspaceHeader({
  chatId,
  chatTitle = "New Chat",
  onTitleUpdate,
  onExport,
}: WorkspaceHeaderProps) {
  const { creditsRemaining, maxCredits, isPro, openRechargeModal } =
    useCredits();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chatTitle);

  React.useEffect(() => {
    setTitle(chatTitle);
  }, [chatTitle]);

  const handleSaveTitle = async () => {
    setIsEditing(false);
    if (!chatId || title.trim() === "" || title === chatTitle) return;

    try {
      if (onTitleUpdate) onTitleUpdate(title);
      await fetch(`/api/chats/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      mutate("/api/chats");
    } catch (e) {
      console.error("Failed to update chat title:", e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSaveTitle();
    if (e.key === "Escape") {
      setTitle(chatTitle);
      setIsEditing(false);
    }
  };

  return (
    <header className="h-14 w-full bg-[#FAF9F6]/85 dark:bg-[#0F1117]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10 px-4 flex items-center justify-between shrink-0 sticky top-0 z-10 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Left: Sidebar trigger + Thread Title + Model pill */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <SidebarTrigger className="h-8 w-8 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-white/5 transition-colors shrink-0" />

        <div className="h-4 w-px bg-zinc-200 dark:bg-white/10 shrink-0" />

        {/* Thread Title with Inline Edit */}
        <div className="flex items-center gap-1.5 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveTitle}
                autoFocus
                className="text-xs sm:text-sm font-medium px-2 py-0.5 rounded-md bg-white dark:bg-[#1A1D27] border border-yellow-400 dark:border-yellow-400/50 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
              <button
                onClick={handleSaveTitle}
                className="p-1 rounded-md text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="group/title flex items-center gap-1.5 px-1.5 py-1 rounded-md hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-colors text-left truncate max-w-[140px] sm:max-w-xs cursor-pointer"
              title="Click to rename chat"
            >
              <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {title || "New Chat"}
              </span>
              <Pencil className="w-3 h-3 text-zinc-400 dark:text-zinc-500 opacity-0 group-hover/title:opacity-100 transition-opacity shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Quick Energy Pill */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          onClick={openRechargeModal}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 text-zinc-900 dark:text-yellow-300 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          title="Pika Energy (Click to recharge)"
        >
          <span className="text-yellow-500 dark:text-yellow-300">⚡</span>
          <span>{isPro ? "Unlimited" : `${creditsRemaining}/${maxCredits}`}</span>
        </motion.button>

        <ThemeToggle />

        {/* Export / Copy Thread */}
        <button
          onClick={onExport}
          className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Export conversation"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={() => {
            if (navigator?.share) {
              navigator.share({ title: `ChatPika - ${title}`, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(window.location.href);
              alert("Chat link copied to clipboard!");
            }
          }}
          className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Share conversation"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-white/5 transition-colors cursor-pointer"
          title="Thread settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
