"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return;

  // 1. Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    // In a real app, return an error. For now, we just stop.
    return;
  }

  // 2. Hash password (Security best practice)
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create User
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER", // Default role
    },
  });

  redirect("/api/auth/signin"); // Send them to login page
}