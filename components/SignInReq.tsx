import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Square, SendHorizonal, Lock, X } from "lucide-react";

type SignInReqProps = {
  onClose?: () => void;
};

const SignInReq = ({ onClose }: SignInReqProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Background blur overlay */}
      <button
        aria-label="Close sign in modal"
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={() => onClose?.()}
      />

      {/* Modal */}
      <div
        className="relative z-10 bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-8 max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
          onClick={() => onClose?.()}
        >
          <X className="w-5 h-5" />
        </button>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            Sign In Required
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Please sign in to access your chat conversations and save your
            progress.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <SignInButton mode="modal">
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="w-full bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-900 dark:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-zinc-300 dark:border-zinc-600">
              Create Account
            </button>
          </SignUpButton>
        </div>
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            New to ChatPika? Create a free account to get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInReq;
