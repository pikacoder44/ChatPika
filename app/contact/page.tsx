"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Twitter, Github, Send, CheckCircle2, Zap } from "lucide-react";
import { PikaMascotIcon } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate brief network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "general", message: "" });
    setSubmitted(false);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-[#FAF9F6] dark:bg-[#0F1117] text-zinc-900 dark:text-zinc-100 overflow-x-hidden transition-colors duration-200">
      {/* Subtle fine dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-grid-pattern opacity-60"
      />

      <main className="relative z-10 w-full flex flex-col items-center pt-16 sm:pt-20 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-200/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Support & Community</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15]">
            Have a question?{" "}
            <span className="font-serif italic font-normal text-amber-600 dark:text-yellow-200">
              Let&apos;s chat.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Whether you found a bug, want to suggest a new feature, or need custom team licensing, our inbox is open.
          </p>
        </motion.div>

        {/* 2-Column Split Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct channels & System status */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 text-left space-y-5">
              <div>
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Direct channels
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Pick the fastest way to get in touch with our core team.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:hashiralibusiness@gmail.com"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 bg-zinc-50/70 dark:bg-[#1A1D27] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Email support
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      hashiralibusiness@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://x.com/SyedHashir37382"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 bg-zinc-50/70 dark:bg-[#1A1D27] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-300 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      Twitter / X
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      @SyedHashir37382
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com/pikacoder44"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-zinc-200/60 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/15 bg-zinc-50/70 dark:bg-[#1A1D27] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-200/60 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-300 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      GitHub repository
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      pikacoder44 / ChatPika
                    </div>
                  </div>
                </a>
              </div>

              {/* Status pill badge */}
              <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>All systems operational • Response &lt; 2 hrs</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form Panel */}
          <div className="md:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#151821] border border-zinc-200/80 dark:border-white/10 text-left">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-12 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-yellow-300 dark:bg-yellow-400/90 flex items-center justify-center shadow-xs">
                      <PikaMascotIcon className="w-10 h-10" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Message received!</span>
                      </div>
                      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                        Thank you for reaching out
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
                        Pika has delivered your note to our inbox. We usually reply within a couple of hours.
                      </p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="mt-4 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-zinc-100 hover:bg-zinc-200/80 dark:bg-[#1A1D27] dark:hover:bg-[#222736] text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-white/10 transition-colors cursor-pointer"
                    >
                      Send another note
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Send us a note
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                        Fill out the details below and we&apos;ll be in touch.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          Your name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Pikachu"
                          className="w-full rounded-xl bg-zinc-50/80 dark:bg-[#0F1117] border border-zinc-200/80 dark:border-white/10 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/30 transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          Email address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="pika@example.com"
                          className="w-full rounded-xl bg-zinc-50/80 dark:bg-[#0F1117] border border-zinc-200/80 dark:border-white/10 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/30 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full rounded-xl bg-zinc-50/80 dark:bg-[#0F1117] border border-zinc-200/80 dark:border-white/10 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/30 transition-all cursor-pointer"
                      >
                        <option value="general">General inquiry</option>
                        <option value="feedback">Product feedback & ideas</option>
                        <option value="bug">Report a bug</option>
                        <option value="team">Team / enterprise pricing</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us what's on your mind..."
                        className="w-full rounded-xl bg-zinc-50/80 dark:bg-[#0F1117] border border-zinc-200/80 dark:border-white/10 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/30 transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold text-zinc-950 bg-yellow-300 hover:bg-yellow-200 transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send note</span>
                          <Zap className="w-4 h-4 fill-zinc-950" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
