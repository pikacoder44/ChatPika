import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className=" p-5 dark:bg-zinc-900 dark:text-white">
      <nav className="flex justify-between  flex-row ">
        <Link href="/" className="hover:cursor-pointer">
          <h1 className=" font-bold text-4xl">ChatPika</h1>
        </Link>
        <ul className="flex flex-row justify-between">
          <Link href="/">
            {" "}
            <li className="p-2 m-2">Home</li>
          </Link>
          <li className="p-2 m-2">About</li>
          <li className="p-2 m-2">Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
