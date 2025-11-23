"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

// 1. UPDATE USER DETAILS (Including Role)
export async function updateUserAsAdmin(formData: FormData) {
  // Security Check
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") return;

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string; // "USER" or "ADMIN"

  await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      role,
    },
  });

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

// 2. DELETE USER (Ban Hammer)
export async function deleteUserAsAdmin(formData: FormData) {
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") return;

  const id = formData.get("id") as string;

  // CRITICAL: Prevent deleting yourself!
  if (id === session.user.id) {
    throw new Error("You cannot delete your own admin account.");
  }

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/admin/users");
}