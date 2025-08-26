"use client";

import CTA from "@/components/CallToAction";
import Features from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import Stats from "@/components/StatsSection";
export default function Home() {
  return (
    <div className="relative p-6 w-full min-h-[989px] flex flex-col items-center bg-gradient-to-b from-sky-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.25),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_40%)]" />
      <h1 className="text-6xl mt-10 font-extrabold tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-violet-500">
        Chat with your personal AI assistant
      </h1>
      <p className="mt-3 text-2xl text-slate-600 dark:text-slate-300">“Built with Next.js + AI”</p>
      <CTA />

      <Features />
      <Stats/>
      <Footer/>
    </div>
  );
}