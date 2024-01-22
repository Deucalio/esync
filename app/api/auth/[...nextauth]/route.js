import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "373888449280-t3nijpkkc53p5lq2es7o49buhjng6hbi.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  secret: "asdasdasdasd",
});

export { handler as GET, handler as POST };
