import React from "react";
import Link from "next/link";
import { PikaMascotIcon } from "./Navbar";

const Footer = () => {
  return (
    <footer className="w-full mt-16 border-t border-zinc-200/60 dark:border-white/5 py-12 text-sm text-zinc-500 dark:text-zinc-400">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-yellow-300 dark:bg-yellow-400/90">
            <PikaMascotIcon className="w-4 h-4" />
          </div>
          <span className="font-medium text-zinc-900 dark:text-zinc-200">
            ChatPika
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-xs">
            © {new Date().getFullYear()} Syed Hashir Ali
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium">
          <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
            About
          </Link>
          <Link href="/pricing" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
            Contact
          </Link>
          <a
            href="https://github.com/pikacoder44"
            target="_blank"
            rel="noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };