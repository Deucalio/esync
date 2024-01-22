import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: "392666276471000",
      clientSecret: "8e63766e1a05b7569adfc9b8af65624f",
    }),
  ],
  secret: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e",
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
