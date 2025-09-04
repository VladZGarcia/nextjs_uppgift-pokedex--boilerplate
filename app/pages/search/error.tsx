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
      title="Search Error"
      message="Failed to search for Pokemon"
      showHomeButton={true}
      showBackButton={true}
    />
  );
}
