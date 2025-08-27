export default function AboutPage() {
  return (
    <main className="relative w-full flex justify-center items-center">
      <section className="max-w-3xl w-full px-6 py-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-violet-500">
          About ChatPika
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          ChatPika is a minimalist AI chat experience built for clarity, speed,
          and everyday usefulness. No clutter—just a fast, thoughtful assistant
          that helps you get answers and get things done.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-5 bg-white/60 dark:bg-zinc-900/40">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Fast
            </h3>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
              Streaming responses with a smooth, distraction-free UI.
            </p>
          </div>
          <div className="rounded-xl border p-5 bg-white/60 dark:bg-zinc-900/40">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Simple
            </h3>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
              Minimal design that puts your conversation first.
            </p>
          </div>
          <div className="rounded-xl border p-5 bg-white/60 dark:bg-zinc-900/40">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Helpful
            </h3>
            <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
              Answers, ideas, and drafts—ready when you are.
            </p>
          </div>
        </div>

        <p className="mt-12 text-sm text-slate-500 dark:text-slate-400">
          Built with Next.js, Tailwind CSS, and Google Gemini.
        </p>
      </section>
    </main>
  );
}
