"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="p-6 w-full min-h-[989] flex flex-col items-center   dark:bg-zinc-900 dark:text-white">
      <h1 className="text-6xl mt-6 font-medium">Welcome to Home Page of ChatPika</h1>
      <Link href={"/chat"}>
        <Button variant="outline" size="sm" className=" mt-6 hover:cursor-pointer">
          Try ChatPik{" "}
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Button>
      </Link>
    </div>
  );
}
