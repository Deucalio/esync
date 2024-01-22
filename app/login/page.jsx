"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const session = useSession();
  console.log("ses", session);
  return (
    <>
      <button onClick={() => signIn("google")}>Login with Google</button>
    </>
  );
};

export default Page;
