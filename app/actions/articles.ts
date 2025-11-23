"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const content = formData.get("content") as string;

  await prisma.article.create({
    data: {
      title,
      category,
      content,
    },
  });

  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.article.delete({
    where: { id },
  });

  revalidatePath("/articles");
  revalidatePath("/admin/articles");
}