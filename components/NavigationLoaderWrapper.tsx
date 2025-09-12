
"use client";
import NavigationLoader from "./NavigationProgress";

export default function NavigationWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationLoader />
      {children}
    </>
  );
}
