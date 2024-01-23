import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "asd",
      clientSecret: "asd",
    }),
  ],
  secret: "ImaAHEROE!123123",
});

export { handler as GET, handler as POST };
