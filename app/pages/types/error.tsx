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
      title="Failed to Load Pokemon Types"
      message="Unable to load Pokemon types. Please try again."
      showBackButton={true}
    />
  );
}
