"use client";

import SharedError from "@/app/components/shared-error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <SharedError
      error={error}
      reset={reset}
      title="Pokemon Not Found"
      message="Failed to load Pokemon details"
      showHomeButton={true}
      showBackButton={true}
    />
  );
}
