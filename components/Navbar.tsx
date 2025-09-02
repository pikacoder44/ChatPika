"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const Navbar = () => {
  const [mode, setMode] = useState("");

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
    console.log(mode);
  };
  return (
    <div className=" p-3 dark:bg-zinc-900  dark:text-white w-full fixed z-50">
      <nav className="navbar flex justify-between  flex-row ">
        <Link href="/" className="hover:cursor-pointer flex items-center">
          <span className="font-bold text-4xl">ChatPika</span>
        </Link>

        <ul className="main-nav flex flex-row justify-between cursor-pointer">
          <Link href={"/"}>
            <li className="p-2 m-2">Home</li>
          </Link>
          <Link href={"/pricing"}>
            <li className="p-2 m-2">Pricing</li>
          </Link>
          <Link href={"/about"}>
            <li className="p-2 m-2">About</li>
          </Link>
          <Link href={"/contact"}>
            <li className="p-2 m-2">Contact</li>
          </Link>
        </ul>
        {/* Login  */}
        <ul className="flex flex-row justify-between items-center gap-4">
          <li className="flex items-center">
            <ThemeToggle />
          </li>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton className=" hover:text-green-500 cursor-pointer" />
              <SignUpButton>
                <button className="bg-[#13d75e] hover:bg-[#342b54] hover:text-white text-black rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <div className="[&_.cl-userButtonTrigger]:!h-16 [&_.cl-userButtonTrigger]:!w-16 [&_.cl-userButtonAvatarBox]:!h-12 [&_.cl-userButtonAvatarBox]:!w-12">
                <UserButton />
              </div>
            </SignedIn>
          </header>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
