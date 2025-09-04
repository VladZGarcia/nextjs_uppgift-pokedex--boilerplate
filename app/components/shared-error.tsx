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
    <div className="min-h-[60vh] flex items-center justify-center p-8">
      <article
        className="relative w-[42rem] mx-auto flex flex-col bg-gradient-to-br from-orange-50 to-rose-200 border-[6px] border-orange-400 rounded-3xl p-8 font-verdana
        transform-gpu transition-all duration-300 ease-out hover:translate-y-[-8px]
        shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
        before:absolute before:inset-0 before:rounded-2xl before:bg-black/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:pointer-events-none
        after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-white/20 after:to-transparent after:pointer-events-none group"
      >
        {/* Error Icon */}
        <div className="relative flex justify-center items-center mb-8">
          <div
            className="absolute w-28 h-28 rounded-full bg-rose-100 opacity-70 transition-transform duration-300 group-hover:scale-110"
            style={{
              boxShadow:
                "inset 0 4px 8px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.2)",
              transform: "perspective(1000px) translateZ(0)",
            }}
          />
          <div className="relative z-10 text-6xl transition-transform duration-300 group-hover:-translate-y-1">
            ⚠️
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 group-hover:shadow-xl">
          <h2 className="text-3xl font-extrabold text-rose-700 tracking-wide text-center mb-6 transition-all duration-300 group-hover:text-rose-800 group-hover:scale-105">
            {title}
          </h2>
          <p className="text-lg text-rose-600 mb-8 text-center transition-all duration-300 group-hover:translate-y-[-2px]">
            {message || error.message || "An unexpected error occurred"}
          </p>

          <div className="flex justify-center items-center gap-6">
            <button
              onClick={reset}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transform-gpu text-lg"
            >
              Try again
            </button>
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transform-gpu text-lg"
              >
                Go Back
              </button>
            )}
            {showHomeButton && (
              <a
                href="/"
                className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transform-gpu inline-block text-lg"
              >
                Go Home
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
