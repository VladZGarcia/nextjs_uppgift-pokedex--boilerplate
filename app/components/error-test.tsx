"use client";

export default function ErrorTest() {
  throw new Error("This is a test error");
  return <div>This won't be displayed</div>;
}
