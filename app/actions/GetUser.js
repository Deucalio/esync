"use server";
import { auth } from "../../auth";

async function CurrentUser() {
  const data = await auth();
  return data;
}
export { CurrentUser };
