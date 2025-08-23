import React from "react";

const Navbar = () => {
  return (
    <div className= " p-5 dark:bg-zinc-900 dark:text-white">
      <nav className="flex justify-between  flex-row ">
        <h1 className=" font-bold text-4xl">ChatPika</h1>
        <ul className="flex flex-row justify-between">
          <li className="p-2 m-2">Home</li>
          <li className="p-2 m-2">About</li>
          <li className="p-2 m-2">Contact</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
