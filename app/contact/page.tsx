import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="relative w-full flex justify-center items-center">
      <section className="max-w-3xl w-full px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-violet-500">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            We&apos;d love to hear from you. Send a message and we&apos;ll get
            back soon.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link href={`mailto:hashiralibusiness@gmail.com`}>
            <div className="rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5 bg-white/60 dark:bg-zinc-900/40 text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Email
              </h3>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                hashiralibusiness@gmail.com
              </p>
            </div>
          </Link>
          <Link href={`https://x.com/SyedHashir37382`} target="_blank">
            <div className="rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5 bg-white/60 dark:bg-zinc-900/40 text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Twitter
              </h3>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                @SyedHashir37382
              </p>
            </div>
          </Link>
          <Link href={`https://github.com/pikacoder44`} target="_blank">
            <div className="rounded-xl border p-5 cursor-pointer transition-all duration-200 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:shadow-md hover:-translate-y-0.5 bg-white/60 dark:bg-zinc-900/40 text-center">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                GitHub
              </h3>
              <p className="text-sm mt-1 text-slate-600 dark:text-slate-300">
                pikacoder44
              </p>
            </div>
          </Link>
        </div>

        <form className="mt-12 grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-lg border bg-white/70 dark:bg-zinc-900/40 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border bg-white/70 dark:bg-zinc-900/40 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <textarea
            rows={5}
            placeholder="How can we help?"
            className="w-full rounded-lg border bg-white/70 dark:bg-zinc-900/40 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <div className="flex justify-center">
            <button
              type="button"
              className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 hover:opacity-95 transition-all"
            >
              Send Message
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
          We usually respond within 1–2 business days.
        </p>
      </section>
    </main>
  );
}
