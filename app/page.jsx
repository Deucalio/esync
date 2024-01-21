import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <p className="text-roes-500 text-3xl">Hello World</p>
      <p className="text-roes-500 text-3xl">
        {JSON.stringify(session, null, 2)}
      </p>
    </>
  );
}
