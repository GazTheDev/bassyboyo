"use server";

import { signOut } from "@/auth";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// CHANGE: Added 'prevState' as the first argument
export async function loginAction(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/", 
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function handleSignOut() {
  await signOut();
}