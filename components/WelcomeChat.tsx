"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { PenLine, GraduationCap, Compass, Sparkles } from "lucide-react";

type WelcomeChatProps = {
  onPick?: (message: string) => void;
};

const starterPrompts = [
  {
    icon: PenLine,
    title: "Write & refine",
    subtitle: "Draft invitations, blog posts, and clear summaries",
    prompt:
      "Write a creative and engaging invitation message for a weekend team dinner, including date, time, location, and RSVP details.",
  },
  {
    icon: GraduationCap,
    title: "Study & analyze",
    subtitle: "Build structured study plans and simplify concepts",
    prompt:
      "Suggest a detailed 2-week study plan for exam preparation, including daily schedules, revision techniques, and time management tips.",
  },
  {
    icon: Compass,
    title: "Explore & travel",
    subtitle: "Discover itineraries, local gems, and budgets",
    prompt:
      "What is the best time of year to travel to Tokyo, Japan? Compare weather, festivals, crowds, and cost-effective tips.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const WelcomeChat = ({ onPick }: WelcomeChatProps) => {
  const { user } = useUser();
  const displayName = user?.firstName || "there";

  const handlePick = (prompt: string) => {
    if (onPick) {
      onPick(prompt);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center px-4 py-8 text-center my-auto">
      {/* Header Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Hi {displayName},{" "}
          <span className="font-serif italic font-normal text-amber-600 dark:text-yellow-200">
            What can I help with?
          </span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Choose a starter prompt or type your question below.
        </p>
      </motion.div>

      {/* 3-Column Uniform Charcoal Starter Prompt Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full"
      >
        {starterPrompts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePick(item.prompt)}
              className="group p-4 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 hover:border-yellow-300/60 dark:hover:border-yellow-200/40 text-left transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-[#1A1D27] flex items-center justify-center text-zinc-800 dark:text-yellow-300 mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-amber-600 dark:group-hover:text-yellow-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
                <span>Start thread</span>
                <Sparkles className="w-3 h-3 text-amber-500 dark:text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WelcomeChat;
