"use server";

import { generatePasswordResetToken, sendPasswordResetEmail } from "@/lib/mail";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// Step 1: User requests the email
export async function resetRequest(formData: FormData) {
  const email = formData.get("email") as string;
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  
  if (existingUser) {
    const verificationToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, verificationToken.token);
  }

  // We always return success to prevent email fishing/scanning
  return { success: "If an account exists, email sent!" };
}

// Step 2: User enters new password
export async function newPassword(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;

  const existingToken = await prisma.passwordResetToken.findUnique({
    where: { token }
  });

  if (!existingToken) return { error: "Invalid token" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token expired" };

  const existingUser = await prisma.user.findUnique({
    where: { email: existingToken.email }
  });

  if (!existingUser) return { error: "Email does not exist" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword }
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id }
  });

  redirect("/api/auth/signin");
}