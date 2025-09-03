import Link from "next/link";
import { Button } from "./ui/button";
const CTA = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto text-center overflow-hidden cta-dark cursor-pointer rounded-md   transition-all duration-500 ease-in-out md:px-8 md:py-12 mb-8 mt-10 px-2 py-4 shadow-lg flex md:flex-row flex-col items-center justify-between cta  hover:scale-105 ">
      <div className="flex flex-col max-w-lg z-10">
        <h1 className="md:text-4xl text-xl font-extrabold mb-2  ">
          Chat smarter, not harder 🚀
        </h1>
        <p className="md:text-lg text-sm   ">
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
