"use client";

import React from "react";
import CallToAction from "@/components/CallToAction";
import Features from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import Stats from "@/components/StatsSection";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-[#FAF9F6] dark:bg-[#0F1117] text-zinc-900 dark:text-zinc-100 overflow-x-hidden selection:bg-yellow-200 selection:text-zinc-950 transition-colors duration-200">
      {/* Subtle fine grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60"
      />

      {/* Main Content Area */}
      <main className="relative z-10 w-full flex flex-col items-center pt-16 sm:pt-24 px-4 max-w-6xl mx-auto">
        {/* Typography-driven Hero */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.12]">
            Chat with your{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-yellow-200">
              personal
            </span>{" "}
            AI companion
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Fast, approachable, and focused on helping you think clearly. Designed with care for curious minds and builders.
          </p>
        </motion.div>

        {/* Interactive Chat Preview Panel */}
        <CallToAction />

        {/* Features ("Why ChatPika?") */}
        <Features />

        {/* Statistics Section */}
        <Stats />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
