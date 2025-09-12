"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function NotFoundContent() {
  const searchParams = useSearchParams();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg text-gray-600">
          Page not found{" "}
          {searchParams.get("q") && `(search: ${searchParams.get("q")})`}
        </p>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NotFoundContent />
    </Suspense>
  );
}
