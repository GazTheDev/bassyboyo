"use server";

import { revalidatePath } from "next/cache";

export async function submitFeedback(formData: FormData) {
  const name = formData.get("name");
  const message = formData.get("message");
  
  // In a real app, you would save this to prisma.feedback.create()
  console.log("--------------------------------");
  console.log("📬 NEW FEEDBACK RECEIVED");
  console.log(`From: ${name}`);
  console.log(`Message: ${message}`);
  console.log("--------------------------------");

  // We don't redirect, we just want to clear the form (conceptually)
  revalidatePath("/"); 
  return { success: true };
}