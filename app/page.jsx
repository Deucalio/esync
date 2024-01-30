"use client";
import { useSession } from "next-auth/react";
import { Logout } from "./actions/Logout";
import { CurrentUser } from "./actions/GetUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { copyStringIntoBuffer } from "pdf-lib";

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
    if (user) {
      getData();
    }
  }, [user]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4000", {
        headers: {
          "X-User-Email": user.user.email,
        },
      });

      // Process the response data
      console.log("response: ", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching data:", error);
    }
  };

  if (data.status === "authenticated") {
    return (
      <div>
        <p>Dashboard</p>
        <p>Your Email is {user.user.email}</p>
        <p onClick={handleLogout}>Sign Out</p>
      </div>
    );
  }
}
