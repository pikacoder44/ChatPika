"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import TypingIndicator from "./TypingIndicator";
import {
  Copy,
  Check,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Share2,
} from "lucide-react";
import { PikaMascotIcon } from "./Navbar";
import { motion } from "framer-motion";

const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-3 rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-[#0B0D13] text-zinc-100">
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#12151F] border-b border-white/5 text-[11px] font-mono text-zinc-400">
        <span className="font-semibold text-yellow-300">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.825rem",
          lineHeight: "1.6",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

interface MessageActionsProps {
  content: string;
  onRetry?: () => void;
}

const ResponseActions = ({ content, onRetry }: MessageActionsProps) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator?.share) {
      navigator.share({ title: "ChatPika Response", text: content });
    } else {
      navigator.clipboard?.writeText(content);
      alert("Response copied for sharing!");
    }
  };

  return (
    <div className="pt-2 mt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Copy"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>

        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            title="Regenerate"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="text-[11px]">Regenerate ⚡</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFeedback(feedback === "up" ? null : "up")}
          className={`p-1 rounded-md transition-colors cursor-pointer ${
            feedback === "up"
              ? "text-amber-500 dark:text-yellow-300"
              : "hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
          title="Thumbs Up"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setFeedback(feedback === "down" ? null : "down")}
          className={`p-1 rounded-md transition-colors cursor-pointer ${
            feedback === "down"
              ? "text-rose-500"
              : "hover:text-zinc-700 dark:hover:text-zinc-300"
          }`}
          title="Thumbs Down"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleShare}
          className="p-1 rounded-md hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          title="Share Thread"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const ChatWindow = ({ messages, streaming, error, onRetry }: any) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  // Smooth scroll to bottom when a new message or token arrives
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const markdownComponents: Components = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const value = String(children).replace(/\n$/, "");

      if (!inline && match) {
        return <CodeBlock language={match[1]} value={value} />;
      }
      return (
        <code
          className="px-1.5 py-0.5 rounded-md text-xs font-mono bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-zinc-200 font-medium"
          {...props}
        >
          {children}
        </code>
      );
    },
    h1({ children, ...props }) {
      return (
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-4 mb-2 first:mt-0" {...props}>
          {children}
        </h1>
      );
    },
    h2({ children, ...props }) {
      return (
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-3 mb-1.5 first:mt-0" {...props}>
          {children}
        </h2>
      );
    },
    h3({ children, ...props }) {
      return (
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-2 mb-1" {...props}>
          {children}
        </h3>
      );
    },
    p({ children, ...props }) {
      return (
        <p className="mb-2.5 last:mb-0 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>
          {children}
        </p>
      );
    },
    ul({ children, ...props }) {
      return (
        <ul className="list-disc list-inside mb-2.5 space-y-1.5 pl-1 text-zinc-700 dark:text-zinc-300" {...props}>
          {children}
        </ul>
      );
    },
    ol({ children, ...props }) {
      return (
        <ol className="list-decimal list-inside mb-2.5 space-y-1.5 pl-1 text-zinc-700 dark:text-zinc-300" {...props}>
          {children}
        </ol>
      );
    },
    li({ children, ...props }) {
      return (
        <li className="text-xs sm:text-sm leading-relaxed" {...props}>
          {children}
        </li>
      );
    },
    blockquote({ children, ...props }) {
      return (
        <blockquote
          className="border-l-2 border-yellow-400 dark:border-yellow-300/80 pl-3.5 my-2.5 italic text-zinc-600 dark:text-zinc-400"
          {...props}
        >
          {children}
        </blockquote>
      );
    },
  };

  return (
    <div
      data-lenis-prevent
      className="w-full h-full min-h-0 flex-1 overflow-y-auto px-4 sm:px-6 py-6 scroll-smooth"
    >
      <div className="max-w-3xl w-full mx-auto space-y-6 pb-28">
        {messages.map((msg: any, index: number) => {
          const isUser = msg.role === "user";

          if (isUser) {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className="flex justify-end gap-2.5 items-end my-4"
              >
                <div className="bg-zinc-900 dark:bg-[#232734] border border-zinc-800 dark:border-white/10 text-white dark:text-zinc-100 rounded-2xl rounded-tr-xs px-4 py-2.5 max-w-xl shadow-xs flex items-center gap-2 text-xs sm:text-sm leading-relaxed">
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                <div className="w-6 h-6 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 flex items-center justify-center text-[10px] font-semibold shrink-0 mb-1">
                  U
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="flex gap-3 my-6 max-w-3xl w-full"
            >
              {/* Avatar */}
              <div className="shrink-0 mt-0.5">
                <div className="bg-yellow-100 dark:bg-yellow-300/10 border border-yellow-300/50 dark:border-yellow-300/30 p-1.5 rounded-xl shadow-2xs flex items-center justify-center w-8 h-8">
                  <PikaMascotIcon className="w-5 h-5" />
                </div>
              </div>

              {/* AI Response Card */}
              <div className="flex-1 min-w-0 bg-white dark:bg-[#151821] border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-tl-xs p-5 shadow-xs transition-colors duration-200 w-full">
                <div className="text-xs sm:text-sm">
                  <ReactMarkdown components={markdownComponents}>
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Actions toolbar */}
                <ResponseActions
                  content={msg.content}
                  onRetry={index === messages.length - 1 ? onRetry : undefined}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Error Message notice */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex gap-3 items-start my-4"
          >
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 flex items-center justify-center text-xs shrink-0 font-bold">
              !
            </div>
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-300 text-xs sm:text-sm">
              <p>{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-red-100 dark:bg-red-900/40 hover:bg-red-200 transition-colors cursor-pointer text-red-800 dark:text-red-200"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Try again</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Typing Indicator */}
        {streaming && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex gap-3 my-6 max-w-3xl w-full"
          >
            <div className="shrink-0 mt-0.5">
              <div className="bg-yellow-100 dark:bg-yellow-300/10 border border-yellow-300/50 dark:border-yellow-300/30 p-1.5 rounded-xl shadow-2xs flex items-center justify-center w-8 h-8">
                <PikaMascotIcon className="w-5 h-5" />
              </div>
            </div>

            <div className="px-5 py-4 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200 dark:border-white/10 rounded-tl-xs shadow-xs transition-colors duration-200">
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        {/* Scroll anchor */}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatWindow;
