"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = () => {
  const session = useSession();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session.status === "authenticated") {
      setUser(session);
      console.log("session", session.data.user.email);
    }
  });

  return (
    <>
      <button onClick={() => signIn("google")}>Login with Google</button>
      <p className="m-6 text-violet-400">
        {session.status === "authenticated" && user
          ? `Welcome ${user.data.user.name}, your email is ${user.data.user.email}`
          : "Not signed in"}
      </p>
      <button onClick={() => signOut("google")}>Logout with Google</button>
    </>
  );
};

export default Page;
