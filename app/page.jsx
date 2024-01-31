"use client";
import { useSession } from "next-auth/react";
import { Logout } from "./actions/Logout";
import { CurrentUser } from "./actions/GetUser";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const data = useSession();
  const [user, setUser] = useState(null);

  const [orders, setOrders] = useState([]);

  const handleLogout = (e) => {
    e.preventDefault();
    Logout();
  };

  const getUser = async () => {
    const data = await CurrentUser();
    setUser(data);
  };

  const getData = async () => {
    // send request to backend (localhost:4000) email as a header
    const res = await axios.get("http://localhost:4000", {
      headers: { email: user.user.email },
    });
    const orders = await res.data;
    setOrders(orders.orders);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getData();
      console.log("user: ", user)
    }
  }, [user]);

  return (
    <div className="h-screen overflow-auto">
      <p>Dashboard</p>
      <p onClick={handleLogout}>Sign Out</p>
      <p>Your Email is: {user?.user?.email}</p>
      {orders?.map((order) => {
        return (
          <div key={order.id}>
            <p>{order.name}</p>
            <p>{order.price}</p>
          </div>
        );
      })}
    </div>
  );
}
