import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  return (
    <section className="w-full pt-24">
      <footer className="mx-auto w-full max-w-6xl px-6 text-center">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
        <Image
            src="/android-chrome-192x192.png"
            alt="ChatPika Logo"
            width={50}
            height={50}
            className="rounded-full"
            unoptimized
          />
          <h1 className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-violet-500">
            ChatPika
          </h1>
          <p className="text-sm text-muted-foreground">
            Your Only Chatting App.
          </p>
        </div>

        {/* Primary links */}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <li className="hover:text-primary">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-primary">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-primary">
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className="hover:text-primary">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        {/* Socials */}
        <ul className="mt-6 flex items-center justify-center gap-5 text-sm">
          <li>
            <a
              className="text-muted-foreground hover:text-primary"
              href="https://x.com/SyedHashir37382"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              className="text-muted-foreground hover:text-primary"
              href="https://github.com/pikacoder44"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              className="text-muted-foreground hover:text-primary"
              href="https://www.linkedin.com/in/syedmhashirali/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="text-muted-foreground hover:text-primary"
              href="mailto:hashiralibusiness@gmail.com"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Bottom bar */}
        <div className="mt-10 border-t pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Syed Hashir Ali — All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};

export { Footer };