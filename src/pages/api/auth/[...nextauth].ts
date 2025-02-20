import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Import Prisma client

export default NextAuth({
  adapter: PrismaAdapter(prisma), // Ensure Prisma client is passed
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // or "database" if you want DB sessions
  },
  secret: process.env.NEXTAUTH_SECRET,
});
