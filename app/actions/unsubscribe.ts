"use server";

import prisma from "@/lib/prisma";

export async function unsubscribeUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  try {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return { success: false, message: "This email was not found on our list." };
    }

    await prisma.newsletterSubscriber.delete({
      where: { email },
    });

    return { success: true, message: "You have been successfully unsubscribed." };
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}