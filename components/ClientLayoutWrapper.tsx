
"use client";
import NavigationLoader from "./NavigationProgress";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
      <>
        <NavigationLoader />
        {children}
      </>
    );
  }
