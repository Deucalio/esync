"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { PHASE_TEST } from "next/dist/shared/lib/constants";

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(false);

  // useEffect(() => {
  //   if (!user && pathname !== "/login") {
  //     router.push("/login");
  //   }
  //   console.log("pathname", pathname);
  // });

  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
