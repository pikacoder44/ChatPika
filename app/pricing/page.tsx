"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import { PikaMascotIcon } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    badge: "Free forever",
    description: "Ideal for trying out ChatPika and casual daily questions.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "100 messages / month",
      "Standard Gemini response speed",
      "Sync across 2 devices",
      "Basic markdown & code formatting",
      "Community Discord support",
    ],
    ctaText: "Get started for free",
    ctaVariant: "outline",
    popular: false,
  },
  {
    id: "pro",
    name: "Pika Pro",
    badge: "Most popular",
    description: "For creators, developers, and thinkers who rely on fast AI every day.",
    monthlyPrice: 12,
    yearlyPrice: 10,
    features: [
      "Unlimited streaming messages",
      "High-priority sub-120ms token latency",
      "Full multimodal document & image context",
      "Persistent search across all conversation history",
      "Export chats to Markdown, JSON & PDF",
      "Priority customer support",
    ],
    ctaText: "Upgrade to Pro",
    ctaVariant: "primary",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    badge: "Collaboration",
    description: "Shared workspaces, centralized billing, and custom knowledge models.",
    monthlyPrice: 39,
    yearlyPrice: 32,
    features: [
      "Everything in Pika Pro",
      "Up to 10 team seats included",
      "Shared prompt library & templates",
      "Centralized admin management & Clerk SSO",
      "99.9% uptime SLA",
      "Dedicated Slack channel with founders",
    ],
    ctaText: "Contact for teams",
    ctaVariant: "outline",
    popular: false,
  },
];

const faqs = [
  {
    q: "Can I use ChatPika for free before upgrading?",
    a: "Yes! Our Starter tier is 100% free forever without requiring a credit card. You get access to the core chat interface, markdown syntax highlighting, and 100 messages every month.",
  },
  {
    q: "How does the annual billing discount work?",
    a: "When you choose yearly billing, you save 20% compared to paying monthly. You will be billed once annually, and you can switch back to monthly or cancel anytime.",
  },
  {
    q: "Which AI models power ChatPika?",
    a: "ChatPika is powered by Google's latest Gemini models via streaming API, tuned specifically for rapid comprehension, clean code generation, and approachable conversations.",
  },
  {
    q: "Are my personal chats and documents kept private?",
    a: "Absolutely. We authenticate accounts through Clerk and store your conversation threads in encrypted MongoDB databases. Your private chat data is never used to train public third-party models.",
  },
  {
    q: "Can I cancel or switch my plan later?",
    a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with a single click.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-[#FAF9F6] dark:bg-[#0F1117] text-zinc-900 dark:text-zinc-100 overflow-x-hidden transition-colors duration-200">
      {/* Subtle fine dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60"
      />

      <main className="relative z-10 w-full flex flex-col items-center pt-16 sm:pt-20 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15]">
            Simple, transparent{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-yellow-200">
              pricing
            </span>{" "}
            for everyone
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Choose the plan that fits your rhythm. No hidden charges or complicated tiers.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-zinc-200/70 dark:bg-[#1A1D27] border border-zinc-200 dark:border-white/10">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-[#151821] text-zinc-900 dark:text-zinc-100 shadow-2xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-[#151821] text-zinc-900 dark:text-zinc-100 shadow-2xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <span>Yearly billing</span>
              <span className="px-1.5 py-0.5 rounded-md text-[11px] font-semibold bg-yellow-300 text-zinc-950 dark:bg-yellow-300/90">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* 3 Pricing Cards */}
        <div className="w-full mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {pricingTiers.map((tier, idx) => {
            const isPro = tier.popular;
            const price =
              billingCycle === "yearly" ? tier.yearlyPrice : tier.monthlyPrice;

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  isPro
                    ? "bg-white dark:bg-[#151821] border-2 border-yellow-300/60 dark:border-yellow-200/40 shadow-xl shadow-yellow-500/5 dark:shadow-black/30"
                    : "bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 shadow-xs"
                }`}
              >
                {/* Most Popular Badge */}
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold bg-yellow-300 text-zinc-950 shadow-2xs">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {tier.name}
                    </h2>
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/5">
                      {tier.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[38px]">
                    {tier.description}
                  </p>

                  <div className="mt-5 pb-5 border-b border-zinc-100 dark:border-white/5 flex items-baseline gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      ${price}
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                      / month {billingCycle === "yearly" && price > 0 ? "billed annually" : ""}
                    </span>
                  </div>

                  {/* Feature list */}
                  <div className="mt-5 space-y-3">
                    <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      Included features
                    </p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-yellow-100 dark:bg-yellow-400/10 text-amber-700 dark:text-yellow-300 shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[2.8]" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={tier.id === "team" ? "/contact" : "/chat"}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isPro
                        ? "bg-yellow-300 hover:bg-yellow-200 text-zinc-950 font-semibold shadow-2xs"
                        : "bg-zinc-100 hover:bg-zinc-200/80 dark:bg-[#1A1D27] dark:hover:bg-[#222736] text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-white/10"
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-75" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimal FAQ Section */}
        <div className="w-full max-w-3xl mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Everything you need to know about plans, billing, and privacy.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#151821] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-amber-600 dark:hover:text-yellow-200 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-zinc-700 dark:text-zinc-200" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Mascot Invitation Banner */}
        <div className="w-full mt-20 p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-300 dark:bg-yellow-400/90 flex items-center justify-center shrink-0">
              <PikaMascotIcon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Ready to experience thoughtful AI?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Start with 100 free messages each month. No credit card required.
              </p>
            </div>
          </div>

          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-950 bg-yellow-300 hover:bg-yellow-200 transition-colors shrink-0 shadow-2xs"
          >
            <span>Try ChatPika free</span>
            <Sparkles className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}