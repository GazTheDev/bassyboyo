"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// CHANGE: Add 'prevState: any' as the first argument
export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session || !session.user) return { error: "Not logged in" };

  const name = formData.get("name") as string;
  const newPassword = formData.get("newPassword") as string;
  const oldPassword = formData.get("oldPassword") as string;

  // 1. Update Name
  if (name && name !== session.user.name) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });
  }

  // 2. Update Password
  if (newPassword && oldPassword) {
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    
    // Check if old password is correct
    const passwordsMatch = await bcrypt.compare(oldPassword, user?.password || "");
    if (!passwordsMatch) {
      return { error: "Incorrect old password!" }; // Return error to UI
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword },
    });
  }

  revalidatePath("/");
  return { success: "Profile updated successfully" }; // Return success to UI
}