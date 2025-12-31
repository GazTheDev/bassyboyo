"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Helper for security
async function requireAdmin() {
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

export async function createDownload(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const version = formData.get("version") as string; // <--- Capture Version

  await prisma.download.create({
    data: {
      title,
      description,
      category,
      fileUrl,
      version: version || "1.0",
      downloads: 0,
    },
  });

  revalidatePath("/downloads");
  redirect("/admin/downloads");
}

// --- NEW FUNCTION: EDIT DOWNLOAD ---
export async function updateDownload(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const version = formData.get("version") as string;

  await prisma.download.update({
    where: { id },
    data: {
      title,
      description,
      category,
      fileUrl,
      version,
    },
  });

  revalidatePath("/downloads");
  revalidatePath(`/downloads/${id}`);
  redirect("/admin/downloads");
}

export async function deleteDownload(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  
  await prisma.download.delete({
    where: { id },
  });

  revalidatePath("/downloads");
  revalidatePath("/admin/downloads");
}