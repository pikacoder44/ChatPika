"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Smile, Cpu, ArrowUpRight, Sparkles } from "lucide-react";
import { PikaMascotIcon } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const values = [
  {
    icon: Shield,
    title: "Privacy first by default",
    description:
      "We believe your prompts, thoughts, and documents belong solely to you. We never sell your data or use private conversations to train models.",
    tag: "Integrity",
  },
  {
    icon: Zap,
    title: "Lightning speed & fluidity",
    description:
      "Latency kills flow. Every layer of ChatPika is optimized for instantaneous streaming, quick keyboard shortcuts, and minimal friction.",
    tag: "Performance",
  },
  {
    icon: Smile,
    title: "Approachable, cute UX",
    description:
      "Enterprise tools often feel cold and intimidating. We craft software with warmth, friendly typography, and thoughtful details.",
    tag: "Craft",
  },
  {
    icon: Cpu,
    title: "Open, modern stack",
    description:
      "Engineered on Next.js 16, React 19, Google Gemini, and Tailwind CSS. Built to be modular, reliable, and continuously evolving.",
    tag: "Foundation",
  },
];

const playfulQuotes = [
  "Pika! ⚡ Did you know? Keeping your code modular makes debugging 10x faster!",
  "Thinking about a new side project? Start with the smallest working feature first!",
  "A good cup of tea and a clean workspace solves 80% of creative blocks 🍵",
  "Your questions shape your thinking. Ask freely, explore deeply!",
];

export default function AboutPage() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % playfulQuotes.length);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-[#FAF9F6] dark:bg-[#0F1117] text-zinc-900 dark:text-zinc-100 overflow-x-hidden transition-colors duration-200">
      {/* Subtle fine dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60"
      />

      <main className="relative z-10 w-full flex flex-col items-center pt-16 sm:pt-20 px-4 max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-200/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span>Our story & philosophy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15]">
            We&apos;re building AI that feels{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-yellow-200">
              friendly
            </span>
            , simple, and alive.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            ChatPika started with a simple belief: artificial intelligence shouldn&apos;t feel like a clinical machine. It should feel like an energetic, thoughtful companion that helps you think, build, and create with joy.
          </p>
        </motion.div>

        {/* Story & Mission 2-Column Section */}
        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Why we started ChatPika
            </h2>
            <p>
              Most existing AI interfaces are either cluttered with enterprise bloat or stripped of any personality. We wanted a clean canvas where ideas flow naturally without cognitive overload.
            </p>
            <p>
              By combining Google Gemini&apos;s lightning-fast neural reasoning with a lightweight, Notion-inspired design language, ChatPika provides instant answers without sacrificing privacy or simplicity.
            </p>
          </div>

          {/* Stat Counters in clean border frames */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10">
              <div className="text-3xl font-semibold text-zinc-900 dark:text-yellow-200">
                180K+
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                Active companions
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                Students & developers worldwide
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10">
              <div className="text-3xl font-semibold text-zinc-900 dark:text-yellow-200">
                &lt;120ms
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                Response latency
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                Optimized Gemini streaming
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10">
              <div className="text-3xl font-semibold text-zinc-900 dark:text-yellow-200">
                99.98%
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                System uptime
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                Distributed edge infrastructure
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10">
              <div className="text-3xl font-semibold text-zinc-900 dark:text-yellow-200">
                Zero
              </div>
              <div className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-1">
                Data sold
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5">
                Encrypted sessions via Clerk
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="w-full mt-24">
          <div className="text-left md:text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Principles that guide our craft
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              How we approach engineering, product aesthetics, and user trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-6 bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-yellow-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-md font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5">
                        {v.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                      {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {v.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Mascot Companion Card */}
        <div className="w-full mt-20 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-yellow-300 dark:bg-yellow-400/90 flex items-center justify-center shrink-0 shadow-xs">
            <PikaMascotIcon className="w-10 h-10" />
          </div>

          <div className="flex-1 w-full">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-amber-700 dark:text-yellow-300 uppercase tracking-wider">
                Pika says
              </span>
              <button
                onClick={nextQuote}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 underline decoration-zinc-400 underline-offset-2 cursor-pointer transition-colors"
              >
                Tap for another spark ✨
              </button>
            </div>

            <div className="min-h-[48px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm sm:text-base font-medium text-zinc-800 dark:text-zinc-200"
                >
                  &ldquo;{playfulQuotes[quoteIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-950 bg-yellow-300 hover:bg-yellow-200 transition-colors shrink-0 cursor-pointer"
          >
            <span>Say hi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
