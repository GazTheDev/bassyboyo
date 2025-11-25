"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// CHANGE: Added 'prevState: any' to support useActionState
export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const terms = formData.get("terms"); // Checkbox value

  // 1. Validation
  if (!name || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  if (!terms) {
    return { error: "You must accept the Terms and Conditions to join." };
  }

  // 2. Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "This email is already registered. Try logging in." };
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create User
  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });
  } catch (e) {
    return { error: "Something went wrong. Please try again." };
  }

  // 5. Redirect to Login
  redirect("/login");
}