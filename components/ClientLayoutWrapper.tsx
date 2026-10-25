"use client";

import React from "react";
import NavigationLoader from "./NavigationProgress";
import SmoothScrollProvider from "./SmoothScrollProvider";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <NavigationLoader />
      {children}
    </SmoothScrollProvider>
  );
}
