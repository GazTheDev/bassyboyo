import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // Use JSON Web Tokens for session
  pages: {
    signIn: "/login", // We are telling it to use our custom page
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // 1. Find user in DB
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        // 2. Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // This adds the User ID and Role to the session so we can access it in the frontend
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
        // @ts-ignore
        session.user.role = token.role; 
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
  },
});