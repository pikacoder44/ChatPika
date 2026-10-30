"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Clock, Zap } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";

interface PikaRechargeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function PikaRechargeModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
}: PikaRechargeModalProps) {
  const {
    isModalOpen: hookIsOpen,
    closeRechargeModal,
    addCredits,
    upgradeToPro,
    timeUntilReset,
    resetDailyCredits,
    isPro,
    creditsRemaining,
  } = useCredits();

  const isOpen = propIsOpen !== undefined ? propIsOpen : hookIsOpen;
  const handleClose = propOnClose || closeRechargeModal;

  const [celebration, setCelebration] = useState<string | null>(null);

  const handleUpgrade = () => {
    upgradeToPro();
    setCelebration("Welcome to Pika Pro! Unlimited Energy unlocked ⚡");
    setTimeout(() => {
      setCelebration(null);
      handleClose();
    }, 1800);
  };

  const handleBuyCredits = () => {
    addCredits(100);
    setCelebration("+100 Pika Energy recharged successfully! ⚡");
    setTimeout(() => {
      setCelebration(null);
      handleClose();
    }, 1800);
  };

  const handleFreeRefresh = () => {
    resetDailyCredits();
    setCelebration("Restored 10 Daily Energy! ⚡");
    setTimeout(() => {
      setCelebration(null);
      handleClose();
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with Fade-in Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box with Spring Scale Physics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-[#151821] border border-white/10 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl text-zinc-100 z-10 overflow-hidden"
          >
            {/* Subtle background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -left-24 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"
            />

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors cursor-pointer z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </motion.button>

            {celebration ? (
              /* Success Celebration State */
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="py-8 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-300">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-yellow-300">Success!</h3>
                <p className="text-sm text-zinc-300 max-w-xs">{celebration}</p>
              </motion.div>
            ) : (
              /* Modal Content - Conditionally adapted based on credit balance */
              <div className="flex flex-col items-center text-center">
                {creditsRemaining <= 0 && !isPro ? (
                  /* Out of Credits: Cute Animated Sleeping Mascot State */
                  <div className="relative inline-flex items-center justify-center mb-1 mt-2">
                    <motion.div
                      animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut",
                      }}
                      className="text-4xl mb-2 select-none relative"
                    >
                      😴⚡
                    </motion.div>

                    {/* Floating "Zzz" micro-animations floating gently upward */}
                    <div className="absolute -top-3 -right-6 w-8 h-8 pointer-events-none select-none">
                      {["z", "Z", "Z"].map((letter, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 4, x: 0, scale: 0.6 }}
                          animate={{
                            opacity: [0, 0.9, 0],
                            y: [-2, -24 - i * 6],
                            x: [0, 6 + i * 4],
                            scale: [0.6, 1, 1.15],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: i * 0.7,
                            ease: "easeOut",
                          }}
                          className="absolute font-bold text-yellow-300/80 font-mono text-xs"
                          style={{ top: `${i * 2}px`, left: `${i * 3}px` }}
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Active Credits: Cheerful Energetic Mascot State */
                  <div className="relative inline-flex items-center justify-center mb-1 mt-2">
                    <motion.div
                      animate={{ y: [0, -3, 0], scale: [1, 1.04, 1] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                      className="text-4xl mb-2 select-none relative"
                    >
                      ⚡✨
                    </motion.div>
                  </div>
                )}

                {/* Modal Title & Description - Dynamically reflects user intent */}
                <h3 className="text-xl font-bold tracking-tight text-zinc-100">
                  {creditsRemaining <= 0 && !isPro
                    ? "Pika is out of energy!"
                    : "Recharge Pika Energy ⚡"}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xs leading-relaxed">
                  {creditsRemaining <= 0 && !isPro
                    ? "Your daily free allowance is exhausted. Pika needs a quick power nap to recharge his lightning pouch."
                    : `You currently have ${
                        isPro ? "Unlimited" : `${creditsRemaining} Energy`
                      } remaining. Top up your balance or upgrade to Pro for unrestricted streaming.`}
                </p>

                {/* 00:00 UTC Auto-refresh badge */}
                <div className="mt-4 mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>
                    Free 10 Daily Energy refreshes in{" "}
                    <strong className="text-yellow-300 font-semibold font-mono">
                      {timeUntilReset}
                    </strong>{" "}
                    (00:00 UTC)
                  </span>
                </div>

                {/* Interactive CTAs with Spring Feedback */}
                <div className="w-full space-y-2">
                  {/* Primary CTA: Upgrade to Unlimited Pro */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={handleUpgrade}
                    className="w-full bg-yellow-300 text-zinc-900 font-semibold text-sm rounded-xl py-3 hover:bg-yellow-200 transition-colors cursor-pointer shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-zinc-900" />
                    <span>Upgrade to Unlimited Pro ($9.99/mo) ⚡</span>
                  </motion.button>

                  {/* Secondary CTA: Buy 100 Credits */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={handleBuyCredits}
                    className="w-full bg-white/5 border border-white/10 text-zinc-200 font-medium text-sm rounded-xl py-2.5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Buy 100 Credits ($2.99)</span>
                  </motion.button>
                </div>

                {/* Subtle Demo Reset Link */}
                <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-[11px] text-zinc-500 px-1">
                  <span>Current: {isPro ? "Unlimited" : `${creditsRemaining} credits`}</span>
                  <button
                    onClick={handleFreeRefresh}
                    className="hover:text-yellow-300 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Demo: Reset Daily 10⚡
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
