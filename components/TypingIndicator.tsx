"use client";

import React from "react";
import { PikaMascotIcon } from "./Navbar";
import { Sparkles } from "lucide-react";

const TypingIndicator = () => (
  <div className="flex items-center gap-2.5 text-xs text-zinc-400 dark:text-zinc-400">
    <div className="relative w-5 h-5 rounded-md bg-yellow-300 dark:bg-yellow-400/90 flex items-center justify-center shrink-0 animate-bounce [animation-duration:1.2s]">
      <PikaMascotIcon className="w-3.5 h-3.5" />
    </div>
    <span className="font-medium text-zinc-700 dark:text-yellow-200/90 flex items-center gap-1">
      <Sparkles className="w-3 h-3 text-amber-500 dark:text-yellow-300 animate-spin [animation-duration:3s]" />
      Pika is thinking
    </span>
    <div className="flex space-x-1 items-center ml-0.5">
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-duration:800ms]" />
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:150ms]" />
      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-duration:800ms] [animation-delay:300ms]" />
    </div>
  </div>
);

export default TypingIndicator;
