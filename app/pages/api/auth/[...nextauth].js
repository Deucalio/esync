import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: "392666276471000",
      clientSecret: "8e63766e1a05b7569adfc9b8af65624f",
    }),
  ],
});
