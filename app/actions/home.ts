"use server";

import { sendFeedbackEmail } from "@/lib/mail"; // Import the helper

// We accept prevState because we are using useActionState
export async function submitFeedback(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  
  if (!name || !message) {
    return { success: false, message: "Please fill out all fields." };
  }

  try {
    // Send the email to YOU (the admin)
    await sendFeedbackEmail(name, message);
    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Feedback Error:", error);
    return { success: false, message: "Failed to send message. Try again." };
  }
}