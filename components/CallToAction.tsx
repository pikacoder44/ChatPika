import Link from "next/link";
import { Button } from "./ui/button";
const CTA = () => {
  return (
    <div className="relative overflow-hidden dark:bg-foreground p-8 m-8 rounded-2xl shadow-lg flex flex-row items-center justify-between hover:bg-amber-400 cursor-default hover:scale-105 transition-all  ease-in-out">
      <div className="flex flex-col max-w-lg z-10">
        <h1 className="text-4xl font-extrabold mb-2 text-black ">
          Chat smarter, not harder 🚀
        </h1>
        <p className="text-lg text-gray-700 ">
          Meet <span className="font-semibold">ChatPik</span> — your personal AI
          companion built for speed, simplicity, and real-time responses. Start
          now and see how effortless AI conversations can be.
        </p>
      </div>
      <Link href={"/chat"}>
        <Button
          variant="default"
          size="lg"
          className="px-8 py-4 text-lg font-semibold rounded-xl mt-6 transition-all duration-200 ease-in-out 
                   shadow-lg hover:cursor-pointer hover:text-white hover:bg-zinc-800 hover:scale-105 "
        >
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
