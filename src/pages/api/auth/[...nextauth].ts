import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) throw new Error("No user found");
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Could not log in");
        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session:{strategy:'jwt'},
  callbacks:{
    async session({session,token}){
        session.user.id = token.sub;
        return session;
    }
  }
});
