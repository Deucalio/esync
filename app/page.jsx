"use client";
import { useSession } from "next-auth/react";
import { Logout } from "./actions/Logout";
import { CurrentUser } from "./actions/GetUser";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const data = useSession();
  const [user, setUser] = useState(null);

  const handleLogout = (e) => {
    e.preventDefault();
    Logout();
  };

  const getUser = async () => {
    const data = await CurrentUser();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log("user", user);
    // if (user) {
    //   getData();
    // }
  }, [user]);

  return (
    <div>
      <p>Dashboard</p>
      <p onClick={handleLogout}>Sign Out</p>
    </div>
  );
}
