import React from "react";

const Features = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-full flex-col items-center justify-center px-2 pb-2 flex-1">
        <h1 className="mb-6 text-4xl font-black text-center bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-violet-500">
          Why ChatPika?
        </h1>

        <div className="grid w-[80%] auto-rows-min gap-6 md:grid-cols-4">
  
          <div className="group relative overflow-hidden rounded-2xl p-6 flex flex-col border bg-gradient-to-b from-sky-50 to-white dark:from-sky-900/30 dark:to-slate-900/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-200/30 to-transparent dark:from-sky-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h1 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">💬 Chat That Feels Alive</h1>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Real-time, human-like responses. It’s like texting a friend who actually knows everything.
            </p>
          </div>

 
          <div className="group relative overflow-hidden rounded-2xl p-6 flex flex-col border bg-gradient-to-b from-violet-50 to-white dark:from-violet-900/30 dark:to-slate-900/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-200/30 to-transparent dark:from-violet-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h1 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              ⚡ Lightning Fast Brainpower
            </h1>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              No waiting. Your questions → instant answers. Optimized for speed so you don’t lose your flow.
            </p>
          </div>

  
          <div className="group relative overflow-hidden rounded-2xl p-6 flex flex-col border bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900/30 dark:to-slate-900/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200/30 to-transparent dark:from-emerald-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h1 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
              🔒 Your Secrets Stay Yours
            </h1>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Conversations stay private and secure — because your thoughts should never become someone else’s data.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-2xl p-6 flex flex-col border bg-gradient-to-b from-fuchsia-50 to-white dark:from-fuchsia-900/30 dark:to-slate-900/40 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-200/30 to-transparent dark:from-fuchsia-300/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h1 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">🎨 Minimal, Clean, Yours</h1>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Built with a distraction-free design. Sleek UI, smooth animations, and a dark/light mode that feels at home.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;