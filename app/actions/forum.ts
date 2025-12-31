"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(prevState: any, formData: FormData) {
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  if (!title || !description) {
    return { error: "Please fill out all fields." };
  }

  try {
    // Get highest order to append to end
    const lastCategory = await prisma.forumCategory.findFirst({
      orderBy: { order: 'desc' }
    });
    const newOrder = (lastCategory?.order || 0) + 1;

    await prisma.forumCategory.create({
      data: {
        title,
        description,
        slug,
        order: newOrder,
      },
    });

    revalidatePath("/forum");
    return { success: true, message: "Category created!" };
  } catch (e) {
    console.error(e);
    return { error: "Failed to create category. Slug might be taken." };
  }
}
export async function createTopic(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session || !session.user) return { error: "You must be logged in." };

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") as string;

  if (!title || !content || !categoryId) return { error: "Please fill out all fields." };

  try {
    const topic = await prisma.forumTopic.create({
      data: {
        title,
        content,
        categoryId,
        userId: session.user.id,
      },
    });
    
    revalidatePath(`/forum`);
    // Redirect is handled in the component usually, but we can return the ID
    return { success: true, topicId: topic.id };
  } catch (e) {
    return { error: "Failed to create topic." };
  }
}

export async function createReply(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session || !session.user) return { error: "You must be logged in." };

  const content = formData.get("content") as string;
  const topicId = formData.get("topicId") as string;

  if (!content) return { error: "Reply cannot be empty." };

  await prisma.forumPost.create({
    data: {
      content,
      topicId,
      userId: session.user.id,
    },
  });

  revalidatePath(`/forum/topic/${topicId}`);
  return { success: true, message: "Reply posted." };
}

// UPDATE THIS FUNCTION
export async function deleteCategory(prevState: any, formData: FormData) {
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") {
    return { success: false, message: "Unauthorized" };
  }

  const id = formData.get("id") as string;

  try {
    // 1. Delete all posts in topics belonging to this category
    // (Prisma doesn't support deep cascade delete on one relation easily without setup)
    // Actually, we can just delete the topics if we set relation to Cascade in schema.
    // Assuming schema doesn't have Cascade on Category->Topic, we do it manually:
    
    const topics = await prisma.forumTopic.findMany({ where: { categoryId: id } });
    const topicIds = topics.map(t => t.id);

    // Delete posts in those topics
    await prisma.forumPost.deleteMany({
      where: { topicId: { in: topicIds } }
    });

    // Delete topics
    await prisma.forumTopic.deleteMany({
      where: { categoryId: id }
    });

    // 2. Finally, delete the category
    await prisma.forumCategory.delete({
      where: { id },
    });

    revalidatePath("/forum");
    return { success: true, message: "Category deleted" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to delete category." };
  }
}