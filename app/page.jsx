import { signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <p className="text-roes-500 text-3xl">Hello World </p>
      <p className="text-roes-500 text-3xl">
        {JSON.stringify(session, null, 2)}
      </p>
    </>
  );
}
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const repo = await res.json();
//   // Pass data to the page via props
//   return { props: { repo } };
// }
