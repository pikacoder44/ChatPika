import React from "react";

const Features = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-full flex-col items-center justify-center px-2 pb-2 flex-1">
        <h1 className="mb-6 text-4xl font-black text-center">Why ChatPika?</h1>

        <div className="grid w-[80%] auto-rows-min gap-6 md:grid-cols-4">
          {/* ----------------------------------------------------------------------- */}
          <div className="feature-card group ">
            <h1 className="text-xl font-bold mb-3">💬 Chat That Feels Alive</h1>
            <p className="feature-txt hover:text-black">
              Real-time, human-like responses. It’s like texting a friend who
              actually knows everything.
            </p>
          </div>
          {/* ----------------------------------------------------------------------- */}

          <div className="feature-card ">
            <h1 className="text-xl font-bold mb-3">
              ⚡ Lightning Fast Brainpower
            </h1>
            <p className="feature-txt">
              No waiting. Your questions → instant answers. Optimized for speed
              so you don’t lose your flow.
            </p>
          </div>
          {/* ----------------------------------------------------------------------- */}

          <div className="feature-card ">
            <h1 className="text-xl font-bold mb-3">
              🔒 Your Secrets Stay Yours
            </h1>
            <p className="feature-txt">
              Conversations stay private and secure — because your thoughts
              should never become someone else’s data.
            </p>
          </div>
          {/* ----------------------------------------------------------------------- */}

          <div className="feature-card ">
            <h1 className="text-xl font-bold mb-3">🎨 Minimal, Clean, Yours</h1>
            <p className="feature-txt">
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
