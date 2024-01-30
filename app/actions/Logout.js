"use server";
import { auth, signIn, signOut } from "../../auth";

async function Logout() {
  return await signOut();
}
export { Logout };
