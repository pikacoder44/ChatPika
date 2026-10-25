"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
  className = "w-full h-full",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If containerRef exists, we can bind Lenis to it or the window
    const lenis = new Lenis({
      wrapper: containerRef.current || undefined,
      content: containerRef.current?.firstElementChild as HTMLElement || undefined,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
