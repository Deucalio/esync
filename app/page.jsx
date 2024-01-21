"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./pages/api/auth/[...nextauth]";

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
  const session = await getServerSession(authOptions);

  return (
    <>
      <p className="text-roes-500 text-3xl">Hello World</p>
      <p className="text-roes-500 text-3xl">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </p>
      <MyComponent />
    </>
  );
}
