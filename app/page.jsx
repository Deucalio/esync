"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";

function MyComponent() {
  const facebook = () => {
    signIn("facebook");
  };
  return <button className="bg-blue-400 text-md text-slate-100" onClick={facebook}>Sign in with Facebook</button>;
}
export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <p className="text-roes-500 text-3xl">Hello World</p>
      <p className="text-roes-500 text-3xl">
        {session ? `Welcome, ${session.user.name}` : "You are not signed in."}
      </p>
      <MyComponent />
    </>
  );
}
