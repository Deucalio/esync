"use server";
import { auth, signIn, signOut } from "../../auth";
import axios from "axios";

const validCredentials = async (credential) => {
  // send request to nodejs backened
  // const res = await fetch("http://127.0.0.1:4000/login", {
  //   method: "POST",
  //   body: JSON.stringify(credential),
  //   headers: { "Content-Type": "application/json" },
  // });

  // use axios
  const res = await axios.post("http://localhost:4000/login", credential);
  return res;

  if (res.status === 401 || res.status === 400) {
    return false;
  }
  return true;
};

export default async function Login(data) {
  // First Verify the credentials
  const valid = await validCredentials(data);
  if (!valid) {
    return null;
  }
  return valid;

  // const user = await signIn("credentials", {
  //   email: data.email,
  //   password: data.password,
  // });

  // if (user) {
  //   return user;
  // }

  // return user;
}
