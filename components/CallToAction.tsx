import Link from "next/link";
import { Button } from "./ui/button";
const CTA = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-bl from-[#E4EfE9] to-[#93A5CF] dark:bg-gradient-to-bl dark:from-[#D8B5FF] dark:to-[#1EAE98] md:bg-card-bg md:dark:bg-card-bg md:from-transparent md:to-transparent md:dark:from-transparent md:dark:to-transparent p-8 m-8 rounded-2xl shadow-lg flex md:flex-row flex-col items-center justify-between hover:scale-105 transition-all ease-in-out">
      <div className="flex flex-col max-w-lg z-10">
        <h1 className="md:text-4xl text-lg font-extrabold mb-2 text-zinc-900 dark:text-card-fg md:text-white">
          Chat smarter, not harder 🚀
        </h1>
        <p className="md:text-lg text-sm text-zinc-700 dark:text-card-fg md:text-white">
          Meet <span className="font-semibold">ChatPik</span> — your personal AI
          companion built for speed, simplicity, and real-time responses. Start
          now and see how effortless AI conversations can be.
        </p>
      </div>
      <Link href={"/chat"}>
        <Button variant="cta" size="lg">
          Try ChatPik{" "}
          <svg
            className="w-7 h-7 ml-2 transition-colors duration-200 ease-in-out fill-zinc-800 hover:fill-amber-50"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </Button>
      </Link>
    </div>
  );
};

export default CTA;
