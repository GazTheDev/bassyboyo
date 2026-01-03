"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function togglePinTopic(prevState: any, formData: FormData) {
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") {
    return { success: false, message: "Unauthorized" };
  }

  const topicId = formData.get("topicId") as string;
  const currentStatus = formData.get("currentStatus") === "true";

  try {
    await prisma.forumTopic.update({
      where: { id: topicId },
      data: { isPinned: !currentStatus },
    });

    revalidatePath(`/forum/topic/${topicId}`);
    // We revalidate the specific category page if we could, but a broad revalidate works for the forum
    revalidatePath("/forum", "layout"); 
    return { success: true, message: currentStatus ? "Topic unpinned" : "Topic pinned" };
  } catch (e) {
    return { success: false, message: "Failed to update topic." };
  }
}