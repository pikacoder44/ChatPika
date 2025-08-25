import React from "react";

const Features = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-full flex-col items-center justify-center px-2 pb-2 flex-1">
        <h1 className="mb-6 text-4xl font-bold text-center">Why ChatPika?</h1>

        <div className="grid w-[80%] auto-rows-min gap-6 md:grid-cols-4">
          {/* ----------------------------------------------------------------------- */}
          <div
            className="flex flex-col items-center px-6 py-10 rounded-2xl text-center 
        dark:bg-foreground/90 dark:text-black bg-white shadow-md 
        cursor-default transition-all duration-500 ease-out
        hover:scale-[1.07] hover:shadow-[0_0_35px_rgba(0,200,255,0.25)]"
          >
            <h1 className="text-xl font-bold mb-3">💬 Chat That Feels Alive</h1>
            <p className="text-sm opacity-80 leading-relaxed">
              Real-time, human-like responses. It’s like texting a friend who
              actually knows everything.
            </p>
          </div>
          {/* ----------------------------------------------------------------------- */}

          <div
            className="flex flex-col items-center px-6 py-10 rounded-2xl text-center 
        dark:bg-foreground/90 dark:text-black bg-white shadow-md 
        cursor-default transition-all duration-500 ease-out
        hover:scale-[1.07] hover:shadow-[0_0_35px_rgba(255,200,0,0.25)]"
          >
            <h1 className="text-xl font-bold mb-3">
              ⚡ Lightning Fast Brainpower
            </h1>
            <p className="text-sm opacity-80 leading-relaxed">
              No waiting. Your questions → instant answers. Optimized for speed
              so you don’t lose your flow.
            </p>
          </div>
          {/* ----------------------------------------------------------------------- */}

          <div
            className="flex flex-col items-center px-6 py-10 rounded-2xl text-center 
        dark:bg-foreground/90 dark:text-black bg-white shadow-md 
        cursor-default transition-all duration-500 ease-out
        hover:scale-[1.07] hover:shadow-[0_0_35px_rgba(0,255,150,0.25)]"
          >
            <h1 className="text-xl font-bold mb-3">
              🔒 Your Secrets Stay Yours
            </h1>
            <p className="text-sm opacity-80 leading-relaxed">
              Conversations stay private and secure — because your thoughts
              should never become someone else’s data.
            </p>
          </div>
          {/* ----------------------------------------------------------------------- */}

          <div
            className="flex flex-col items-center px-6 py-10 rounded-2xl text-center 
        dark:bg-foreground/90 dark:text-black bg-white shadow-md 
        cursor-default transition-all duration-500 ease-out
        hover:scale-[1.07] hover:shadow-[0_0_35px_rgba(200,100,255,0.25)]"
          >
            <h1 className="text-xl font-bold mb-3">🎨 Minimal, Clean, Yours</h1>
            <p className="text-sm opacity-80 leading-relaxed">
              Built with a distraction-free design. Sleek UI, smooth animations,
              and a dark/light mode that feels at home.
            </p>
          </div>
          {/* ----------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Features;
