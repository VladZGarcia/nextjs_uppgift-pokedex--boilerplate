"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

export default function SharedError({
  error,
  reset,
  title = "Something went wrong",
  message,
  showHomeButton = true,
  showBackButton = false,
}: ErrorProps) {
  return (
    <div className="flex flex-col items-center p-10 rounded-md">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold text-red-700 mb-2">{title}</h2>
        <p className="text-red-600 mb-4">
          {message || error.message || "An unexpected error occurred"}
        </p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Try again
          </button>
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Go Back
            </button>
          )}
          {showHomeButton && (
            <a
              href="/"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors inline-block"
            >
              Go Home
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
