"use client";

import { motion } from "framer-motion";
import { PikaMascotIcon } from "./Navbar";

export function PikaLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Aura */}
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.75, 0.25] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="absolute w-14 h-14 rounded-full bg-yellow-400/25 blur-md"
        />
        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-10 h-10 border-2 border-yellow-300/20 border-t-yellow-400 rounded-full"
        />
        {/* Center Mascot or Lightning Icon */}
        <span className="absolute flex items-center justify-center w-5 h-5 rounded-full bg-yellow-300 text-[10px] shadow-2xs font-bold text-zinc-950">
          ⚡
        </span>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">
        {label}
      </p>
    </div>
  );
}

export default PikaLoader;
