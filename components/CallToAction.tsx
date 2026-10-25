"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Send, Bot, Check, Copy } from "lucide-react";
import { PikaMascotIcon } from "./Navbar";

const promptSuggestions = [
  "Summarize key takeaways from our meeting notes",
  "Write a TypeScript utility to debounce search inputs",
  "How does React 19 server actions manage form state?",
];

const mockChat = [
  {
    sender: "user",
    text: "Can you explain optimistic UI updates in one simple example?",
  },
  {
    sender: "pika",
    text: "Sure! Imagine tapping a 'Like' button on a post. Optimistic UI instantly increments the heart counter to 1 right under your finger before the server even answers. If the request fails, it quietly rolls back.",
  },
];

const CallToAction = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 mb-16">
      {/* Interactive Mockup Panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#151821] shadow-xl shadow-zinc-950/5 dark:shadow-black/20 overflow-hidden text-left"
      >
        {/* Top Minimal Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/70 dark:bg-[#1A1D27]/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            </div>
            <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Chat session
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Fast model
            </span>
            <button
              onClick={handleCopy}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              title="Copy snippet"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="p-5 sm:p-7 space-y-5">
          {mockChat.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg.sender === "user" ? (
                <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-700 dark:text-zinc-200 shrink-0">
                  U
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-yellow-300 dark:bg-yellow-400/90 flex items-center justify-center shrink-0">
                  <PikaMascotIcon className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-md sm:max-w-lg rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 font-medium"
                    : "bg-zinc-100 dark:bg-[#1E222E] text-zinc-800 dark:text-zinc-200 border border-zinc-200/50 dark:border-white/5"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Prompts Pills */}
        <div className="px-5 sm:px-7 pb-4">
          <div className="flex items-center gap-1.5 mb-2 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            <Sparkles className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
            <span>Suggested prompts</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setSelectedPrompt(i)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                  selectedPrompt === i
                    ? "bg-yellow-50 dark:bg-yellow-400/10 border-yellow-300 dark:border-yellow-400/30 text-zinc-900 dark:text-yellow-200"
                    : "bg-transparent border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/20"
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-[#161922]">
          <div className="flex items-center justify-between rounded-xl bg-white dark:bg-[#1A1D27] border border-zinc-200 dark:border-white/10 px-3.5 py-2.5">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 truncate pr-2">
              {promptSuggestions[selectedPrompt]}
            </span>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-300 hover:bg-yellow-200 text-zinc-900 text-xs font-medium transition-colors shrink-0"
            >
              <span>Try now</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Primary Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/chat"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-950 bg-yellow-300 hover:bg-yellow-200 transition-colors shadow-2xs"
        >
          <span>Start chatting</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 border border-zinc-200 dark:border-white/10 transition-colors"
        >
          <Bot className="w-4 h-4 text-zinc-500" />
          <span>Documentation</span>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
