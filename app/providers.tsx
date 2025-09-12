"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { shadcn } from "@clerk/themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadcn,
        variables: { colorPrimary: "#3b82f6" },
        elements: {
          userButtonPopoverCard: "max-w-[200px] sm:max-w-[300px]",
          userButtonPopover: "p-2 text-sm",
        },
      }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
