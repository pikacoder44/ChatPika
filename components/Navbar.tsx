"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
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
    <div className=" p-5 dark:bg-zinc-900  dark:text-white w-full">
      <nav className="navbar flex justify-between  flex-row ">
        <Link href="/" className="hover:cursor-pointer">
          <h1 className=" font-bold text-4xl mr-10">ChatPika</h1>
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
            <ThemeToggle/>
          </li>
          <Link href={"/signin"}><li>Sign In</li></Link>
          <Link href={"/signup"}><li className="dark:bg-foreground p-2 rounded-md dark:text-black">Get Started</li></Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
