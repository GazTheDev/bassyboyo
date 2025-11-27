import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // 1. Security Check: Only Admins can download this list
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 2. Fetch all subscribers
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // 3. Convert to CSV format
  // Header row
  let csvContent = "Email,Joined Date\n";
  
  // Data rows
  csvContent += subscribers.map(sub => {
    // Format date nicely (YYYY-MM-DD)
    const date = sub.createdAt.toISOString().split('T')[0];
    return `${sub.email},${date}`;
  }).join("\n");

  // 4. Return as a downloadable file
  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="bassyboy_subscribers_${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}