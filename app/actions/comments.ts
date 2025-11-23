"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function addComment(formData: FormData) {
  const session = await auth();
  if (!session || !session.user) return;

  const content = formData.get("content") as string;
  const targetId = formData.get("targetId") as string;
  const type = formData.get("type") as string; // "download" or "article"

  if (!content) return;

  // Prepare the data object
  let data: any = {
    content,
    userId: session.user.id,
  };

  // Decide where to link the comment
  if (type === "download") {
    data.downloadId = targetId;
  } else if (type === "article") {
    data.articleId = targetId;
  }

  await prisma.comment.create({ data });

  // Refresh the page
  const path = type === "download" ? `/downloads/${targetId}` : `/articles/${targetId}`;
  revalidatePath(path);
}