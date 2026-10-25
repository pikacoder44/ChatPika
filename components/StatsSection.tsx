"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "2.4M+", label: "Messages streamed", caption: "Word-by-word streaming" },
  { value: "180K+", label: "Active conversations", caption: "Across web & mobile" },
  { value: "<120ms", label: "Time to first token", caption: "Gemini Flash optimized" },
  { value: "99.9%", label: "Uptime guarantee", caption: "Always accessible" },
];

const Stats = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12 border-t border-zinc-200/60 dark:border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            className="text-left"
          >
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {stat.value}
            </div>
            <div className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {stat.label}
            </div>
            <div className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
              {stat.caption}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
