"use client";

import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Clerk components (client-only, no SSR)
const SignInButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.SignInButton),
  { ssr: false }
);
const SignUpButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.SignUpButton),
  { ssr: false }
);
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((m) => m.SignedIn),
  { ssr: false }
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((m) => m.SignedOut),
  { ssr: false }
);
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.UserButton),
  { ssr: false }
);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Cute minimalist Pikachu-inspired SVG Icon
export function PikaMascotIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head */}
      <rect x="4" y="7" width="16" height="13" rx="6" fill="#FDE047" />
      {/* Left ear */}
      <path
        d="M5 8L2.5 3C2.3 2.6 2.8 2.2 3.2 2.4L8 5.5"
        stroke="#FDE047"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.5 3L4 5" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Right ear */}
      <path
        d="M19 8L21.5 3C21.7 2.6 21.2 2.2 20.8 2.4L16 5.5"
        stroke="#FDE047"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21.5 3L20 5" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="8.5" cy="12.5" r="1.3" fill="#18181B" />
      <circle cx="9" cy="12.2" r="0.4" fill="#FFFFFF" />
      <circle cx="15.5" cy="12.5" r="1.3" fill="#18181B" />
      <circle cx="16" cy="12.2" r="0.4" fill="#FFFFFF" />
      {/* Cute rosy cheeks */}
      <ellipse cx="6.5" cy="14.8" rx="1.2" ry="0.9" fill="#F87171" opacity="0.85" />
      <ellipse cx="17.5" cy="14.8" rx="1.2" ry="0.9" fill="#F87171" opacity="0.85" />
      {/* Cute tiny mouth */}
      <path
        d="M10.8 15C11.3 15.5 12 15.5 12.5 15C13 15.5 13.7 15.5 14.2 15"
        stroke="#18181B"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const isChatRoute = pathname?.startsWith("/chat");

  if (isChatRoute) {
    return null;
  }

  return (
    <header className="w-full z-40 sticky top-0 bg-[#FAF9F6]/85 dark:bg-[#0F1117]/85 backdrop-blur-md border-b border-zinc-200/60 dark:border-white/5 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-transform duration-150 hover:opacity-90 active:scale-98"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-300 dark:bg-yellow-400/90 shadow-2xs">
            <PikaMascotIcon className="w-6 h-6" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
            ChatPika
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-150 font-medium ${
                  isActive
                    ? "text-zinc-900 dark:text-zinc-50 font-semibold"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <SignedOut>
            <SignInButton>
              <button className="text-sm font-medium px-3 py-1.5 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                Log in
              </button>
            </SignInButton>

            <SignUpButton>
              <button className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-zinc-900 bg-yellow-300 hover:bg-yellow-200 dark:bg-yellow-300 dark:hover:bg-yellow-200 transition-colors cursor-pointer">
                Get started
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="[&_.cl-userButtonTrigger]:!h-8 [&_.cl-userButtonTrigger]:!w-8 [&_.cl-userButtonAvatarBox]:!h-7 [&_.cl-userButtonAvatarBox]:!w-7">
              <UserButton />
            </div>
          </SignedIn>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <SignedIn>
            <div className="[&_.cl-userButtonTrigger]:!h-8 [&_.cl-userButtonTrigger]:!w-8 [&_.cl-userButtonAvatarBox]:!h-6 [&_.cl-userButtonAvatarBox]:!w-6">
              <UserButton />
            </div>
          </SignedIn>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mt-2 rounded-xl p-1.5 bg-white dark:bg-[#1A1D27] border border-zinc-200 dark:border-white/10 shadow-lg">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link
                    href={link.href}
                    className="w-full px-2.5 py-2 text-sm font-medium rounded-md hover:bg-zinc-100 dark:hover:bg-white/5"
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="my-1 border-zinc-200 dark:border-white/5" />
              <div className="flex items-center justify-between px-2.5 py-1.5">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Theme</span>
                <ThemeToggle />
              </div>
              <SignedOut>
                <DropdownMenuSeparator className="my-1 border-zinc-200 dark:border-white/5" />
                <DropdownMenuItem asChild>
                  <SignInButton>
                    <button className="w-full text-left px-2.5 py-1.5 text-sm font-medium">
                      Log in
                    </button>
                  </SignInButton>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SignUpButton>
                    <button className="w-full text-center mt-1 py-1.5 rounded-lg bg-yellow-300 text-zinc-900 font-medium text-sm">
                      Get started
                    </button>
                  </SignUpButton>
                </DropdownMenuItem>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
