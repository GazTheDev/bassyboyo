"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { Resend } from "resend";
import { CampaignEmail } from "@/components/email/CampaignEmail";
import { redirect } from "next/navigation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCampaign(prevState: any, formData: FormData) {
  // 1. Security Check
  const session = await auth();
  // @ts-ignore
  if (session?.user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;

  if (!subject || !content) {
    return { error: "Subject and content are required." };
  }

  try {
    // 2. Fetch all subscribers
    const subscribers = await prisma.newsletterSubscriber.findMany({
      select: { email: true }
    });

    if (subscribers.length === 0) {
      return { error: "No subscribers found to send to." };
    }

    // 3. Batch Sending (Resend Limit is usually 50 per batch or rate limits)
    // We will send individually to 'to' field to avoid exposing emails in 'cc'
    // but run them in parallel batches.
    
    const emails = subscribers.map(sub => sub.email);
    const batchSize = 20; 
    
    // Simple Loop for MVP (For 1000+ users, you'd want a queue system like Inngest)
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      const emailPromises = batch.map(email => 
        resend.emails.send({
          from: "BassyBoy Mods <info@bassyboy.com>", // Change to your verified domain later
          to: email,
          subject: subject,
          react: CampaignEmail({ subject, content }) as React.ReactElement,
        })
      );

      await Promise.all(emailPromises);
    }

    return { success: true, message: `Campaign sent to ${subscribers.length} managers!` };

  } catch (e) {
    console.error(e);
    return { error: "Failed to send campaign. Check logs." };
  }
}