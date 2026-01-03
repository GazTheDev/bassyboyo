"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateSettings(prevState: any, formData: FormData) {
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const youtubeVideoId = formData.get("youtubeVideoId") as string;

  if (!youtubeVideoId) {
    return { error: "Video ID is required" };
  }

  try {
    // Upsert ensures we create the row if it doesn't exist, or update if it does
    await prisma.siteConfig.upsert({
      where: { id: "config" },
      update: { youtubeVideoId },
      create: { id: "config", youtubeVideoId },
    });

    revalidatePath("/"); // Refresh homepage to show new video
    return { success: true, message: "Settings updated successfully!" };
  } catch (e) {
    return { error: "Failed to update settings." };
  }
}