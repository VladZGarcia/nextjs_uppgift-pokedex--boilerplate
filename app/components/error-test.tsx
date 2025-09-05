"use client";

export default function ErrorTest() {
  throw new Error("This is a test error");
  return <div>This won&apos;t be displayed</div>;
}
