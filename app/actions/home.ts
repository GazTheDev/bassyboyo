"use server";

import { revalidatePath } from "next/cache";

// CHANGE: Added 'prevState' as the first argument
export async function submitFeedback(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const message = formData.get("message");
  
  console.log(`📬 FEEDBACK: ${name} says "${message}"`);

  // We don't need revalidatePath here strictly, but it doesn't hurt
  return { success: true, message: "Message sent successfully!" };
}