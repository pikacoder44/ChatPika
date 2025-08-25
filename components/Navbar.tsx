"use client";
import { useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const [mode, setMode] = useState("dark");
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
    console.log(mode);
  };
  return (
    <div className=" p-5 dark:bg-zinc-900  dark:text-white w-full">
      <nav className="navbar flex justify-between  flex-row ">
        <Link href="/" className="hover:cursor-pointer">
          <h1 className=" font-bold text-4xl mr-10">ChatPika</h1>
        </Link>
        <ul className="main-nav flex flex-row justify-between cursor-pointer">
          <Link href={'/'}><li className="p-2 m-2">Home</li></Link>
          <Link href={'/pricing'}><li className="p-2 m-2">Pricing</li></Link>
          <Link href={'/about'}><li className="p-2 m-2">About</li></Link>
          <Link href={'/contact'}><li className="p-2 m-2">Contact</li></Link>
        </ul>
        {/* Login  */}
        <ul className="flex flex-row justify-between items-center gap-4">
          <li className="flex items-center">
            {mode === "dark" ? (
              <button onClick={toggleMode}>
                {/* DarkMode  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              </button>
            ) : (
              <button onClick={toggleMode}>
                {/* LightMode  */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              </button>
            )}
          </li>
          <li>Sign In</li>
          <li className="dark:bg-foreground p-2 rounded-md">Get Started</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
