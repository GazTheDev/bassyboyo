import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { ResetEmail } from "@/components/email/ResetEmail"; // Import your template
import { FeedbackEmail } from "@/components/email/FeedbackEmail"; // Import the new template
const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { email }
  });

  if (existingToken) {
    await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return passwordResetToken;
};

// --- UPDATED SENDING FUNCTION ---
export const sendPasswordResetEmail = async (email: string, token: string) => {
  
  // IMPORTANT: Until you verify a real domain (like bassyboymods.com) on Resend,
  // you MUST use 'onboarding@resend.dev' as the "from" address.
  // Also, you can ONLY send emails to the email address you signed up to Resend with.
  
  await resend.emails.send({
    from: "BassyBoy Mods <onboarding@resend.dev>",
    to: email, 
    subject: "Reset your Password",
    react: ResetEmail({ token }), // Use the component we made
  });

  console.log("📧 Email sent via Resend!");
};

export const sendFeedbackEmail = async (name: string, message: string) => {
  
  await resend.emails.send({
    from: "BassyBoy Website <onboarding@resend.dev>",
    
    // ⚠️ CHANGE THIS TO YOUR REAL EMAIL ADDRESS ⚠️
    to: "daviesg77@gmail.com", 
    
    subject: `New Feedback from ${name}`,
    react: FeedbackEmail({ name, message }),
  });

  console.log("📬 Feedback email sent via Resend!");
};