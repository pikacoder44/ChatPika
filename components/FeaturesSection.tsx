"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, MessageSquare, Shield, Smile } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant streaming",
    description:
      "Get real-time word-by-word streaming responses with sub-second latency powered by Google Gemini.",
    badge: "Fast",
  },
  {
    icon: Smile,
    title: "Thoughtful personality",
    description:
      "A friendly companion designed with approachable tone, insightful context awareness, and natural communication.",
    badge: "Friendly",
  },
  {
    icon: MessageSquare,
    title: "Persistent chat history",
    description:
      "Every dialogue is saved cleanly with MongoDB and synchronized instantly across your devices.",
    badge: "Organized",
  },
  {
    icon: Shield,
    title: "Privacy first",
    description:
      "Authenticated with Clerk and encrypted in transit. Your prompts and chats are yours alone.",
    badge: "Secure",
  },
];

const Features = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16">
      <div className="text-left md:text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Everything you need in an everyday AI companion
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
          Crafted to be quiet when you are focused, and capable when you need answers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group rounded-xl p-6 bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-yellow-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-md font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;