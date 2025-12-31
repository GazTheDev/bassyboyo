"use server";

import prisma from "@/lib/prisma";

export async function trackVisit() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight to group by day

  try {
    await prisma.dailyAnalytics.upsert({
      where: { date: today },
      update: { views: { increment: 1 } },
      create: { date: today, views: 1 },
    });
  } catch (e) {
    // Silently fail if something goes wrong so we don't break the user experience
    console.error("Analytics error", e);
  }
}