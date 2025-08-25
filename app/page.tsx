"use client";

import CTA from "@/components/CallToAction";
import Features from "@/components/FeaturesSection";
import Stats from "@/components/StatsSection";
export default function Home() {
  return (
    <div className="p-6 w-full min-h-[989] flex flex-col items-center   dark:bg-zinc-900 dark:text-white">
      <h1 className="text-6xl mt-10 dark:text-foreground font-medium ">
        Chat with your personal AI assistant
      </h1>
      <p className="mt-2 text-3xl">“Built with Next.js + AI”</p>
      <CTA />

      <Features />
      <Stats/>
    </div>
  );
}
