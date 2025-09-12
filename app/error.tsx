"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="text-gray-600">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
