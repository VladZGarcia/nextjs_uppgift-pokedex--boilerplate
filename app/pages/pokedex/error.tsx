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
      title="Pokédex Error"
      message="Failed to load Pokédex. Please try again."
      showHomeButton={true}
      showBackButton={true}
    />
  );
}
