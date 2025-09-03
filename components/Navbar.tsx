"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Clerk components (client-only, no SSR to avoid hydration mismatch)
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

const Navbar = () => {
  return (
    <div className="py-2 md:py-5 px-5 md:px-6 dark:bg-zinc-900 dark:text-white w-full sticky top-0 z-50 bg-white border-b border-zinc-200 dark:border-zinc-800">
      <nav className="navbar flex justify-between items-center flex-row">
        <Link href="/" className="hover:cursor-pointer flex items-center">
          <span className="font-bold md:text-4xl text-3xl">ChatPika</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="hover:text-green-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="hover:text-green-500 transition-colors"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-green-500 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-green-500 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <SignedOut>
              <SignInButton className="hover:text-green-500 cursor-pointer" />
              <SignUpButton>
                <button className="bg-[#13d75e] hover:bg-[#342b54] hover:text-white text-black rounded-full font-medium text-sm px-4 h-10 cursor-pointer transition-colors">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="[&_.cl-userButtonTrigger]:!h-10 [&_.cl-userButtonTrigger]:!w-10 [&_.cl-userButtonAvatarBox]:!h-8 [&_.cl-userButtonAvatarBox]:!w-8">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-3">
          <SignedIn>
            <div className="[&_.cl-userButtonTrigger]:!h-8 [&_.cl-userButtonTrigger]:!w-8 [&_.cl-userButtonAvatarBox]:!h-6 [&_.cl-userButtonAvatarBox]:!w-6">
              <UserButton />
            </div>
          </SignedIn>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-50 mt-2 dark:bg-gray-400 dark:text-black opacity-95">
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pricing" className="w-full">
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about" className="w-full">
                  About
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/contact" className="w-full">
                  Contact
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="flex items-center justify-between p-2">
                <span className="text-sm">Theme</span>
                <ThemeToggle />
              </div>
              <SignedOut>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <SignInButton className="w-full text-left" />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SignUpButton>
                    <button className="w-full text-left bg-[#13d75e] hover:bg-[#342b54] hover:text-white text-black rounded font-medium text-sm px-3 py-2 cursor-pointer transition-colors">
                      Get Started
                    </button>
                  </SignUpButton>
                </DropdownMenuItem>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
