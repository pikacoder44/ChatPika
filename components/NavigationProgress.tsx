"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const NavigationLoader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show loader when route changes
    setIsVisible(true);

    // Hide loader after a short delay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/10 dark:bg-white/5 backdrop-blur-sm" />

      {/* Main loader container */}
      <div className="relative">
        {/* Spinning ring */}
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />

        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
        </div>

        {/* Orbiting dots */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "2s" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-purple-500 rounded-full" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-pink-500 rounded-full" />
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-green-500 rounded-full" />
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 w-2 h-2 bg-yellow-500 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default NavigationLoader;
