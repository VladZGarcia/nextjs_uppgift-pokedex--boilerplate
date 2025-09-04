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
      title="Unexpected Error"
      message="Something went wrong"
      showHomeButton={true}
      showBackButton={false}
    />
  );
}
