"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";

export default function PikaEnergyWidget() {
  const {
    creditsRemaining,
    maxCredits,
    isPro,
    openRechargeModal,
    timeUntilReset,
  } = useCredits();

  const percentage = isPro
    ? 100
    : Math.min(100, Math.max(0, (creditsRemaining / maxCredits) * 100));

  return (
    <div className="px-2 pt-2 pb-1">
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-[#151821] border border-white/10 rounded-2xl p-3.5 shadow-sm text-zinc-100 relative group overflow-hidden"
      >
        {/* Header row: Title + Counter */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            {/* Animated Energy Counter & Badge with subtle pulse state on credit change */}
            <motion.span
              key={creditsRemaining}
              initial={{ scale: 1.4, color: "#FEF08A" }}
              animate={{ scale: 1, color: "#E4E4E7" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block text-xs select-none"
            >
              ⚡
            </motion.span>

            <span className="text-xs font-semibold tracking-tight text-zinc-200">
              {isPro ? "Unlimited Energy" : `${creditsRemaining} / ${maxCredits} Energy`}
            </span>
          </div>

          {/* Quick Recharge CTA button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            onClick={openRechargeModal}
            className="flex items-center gap-1 text-[10px] font-medium text-yellow-300 bg-yellow-400/10 hover:bg-yellow-400/20 px-2 py-0.5 rounded-full border border-yellow-400/20 transition-colors cursor-pointer"
            title="Recharge or upgrade energy"
          >
            {isPro ? (
              <>
                <Sparkles className="w-2.5 h-2.5" />
                <span>PRO</span>
              </>
            ) : (
              <>
                <Plus className="w-2.5 h-2.5" />
                <span>Top up</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Smooth Progress Bar Animation */}
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`h-full rounded-full ${
              isPro
                ? "bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-400"
                : creditsRemaining <= 2
                ? "bg-red-400"
                : "bg-yellow-300"
            }`}
          />
        </div>

        {/* Footer info: Reset timer or Pro badge */}
        <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400 font-medium">
          <span>
            {isPro
              ? "All models unlocked"
              : creditsRemaining <= 0
              ? "Recharging at 00:00 UTC"
              : `Refreshes in ${timeUntilReset}`}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">
            {isPro ? "⚡ Unlimited" : "Free Tier"}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
