"use server";

import prisma from "@/lib/prisma";

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    await prisma.newsletterSubscriber.create({
      data: { email },
    });
    return { success: true, message: "You've been added to the Scouting Report!" };
  } catch (error: any) {
    // P2002 is the Prisma code for "Unique constraint failed" (Duplicate email)
    if (error.code === 'P2002') {
      return { success: true, message: "You're already on the list, boss!" };
    }
    return { success: false, message: "Something went wrong. Try again." };
  }
}