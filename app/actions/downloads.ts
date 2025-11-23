"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createDownload(formData: FormData) {
  // 1. Extract data from the HTML form
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const fileUrl = formData.get("fileUrl") as string;

  // 2. Save to SQLite
  await prisma.download.create({
    data: {
      title,
      description,
      category,
      fileUrl,
      downloads: 0, // Start with 0 downloads
    },
  });

  // 3. Refresh the public page so the new mod shows up immediately
  revalidatePath("/downloads");
  
  // 4. Send the admin back to the list
  redirect("/admin/downloads");
}

export async function deleteDownload(formData: FormData) {
  const id = formData.get("id") as string;
  
  await prisma.download.delete({
    where: { id },
  });

  revalidatePath("/downloads");
  revalidatePath("/admin/downloads");
}