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
      title="Type Error"
      message="Failed to load Pokemon of this type"
      showHomeButton={true}
      showBackButton={true}
    />
  );
}
