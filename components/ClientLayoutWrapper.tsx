"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import NavigationLoader from "./NavigationProgress";
import SmoothScrollProvider from "./SmoothScrollProvider";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatRoute = pathname?.startsWith("/chat");

  return (
    <SmoothScrollProvider>
      <NavigationLoader />
      {isChatRoute ? (
        // Chat workspace has its own internal h-screen flex layout
        <div className="w-full h-full">{children}</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen flex flex-col"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      )}
    </SmoothScrollProvider>
  );
}
