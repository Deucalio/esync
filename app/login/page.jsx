"use client";
import { signIn } from "next-auth/react";

function MyComponent() {
  const facebook = () => {
    signIn("facebook");
  };
  return (
    <button
      className="bg-blue-400 text-md text-slate-100 py-2 px-3"
      onClick={facebook}
    >
      Sign in with Facebook
    </button>
  );
}
export default async function Home() {
  return (
    <>
      <p className="text-roes-500 text-3xl">Login</p>
      <p className="text-roes-500 text-3xl"></p>
      <MyComponent />
    </>
  );
}
