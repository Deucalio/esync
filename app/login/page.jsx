"use client";
import { signIn } from "next-auth/react";

function MyComponent() {
  return (
    <button onClick={() => signIn("facebook")}>Sign in with Facebook</button>
  );
}

export default function Page() {
  return (
    <>
      <MyComponent />
    </>
  );
}
