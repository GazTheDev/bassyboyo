import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import { ResetEmail } from "@/components/email/ResetEmail"; 
import { FeedbackEmail } from "@/components/email/FeedbackEmail"; 

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); 

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

// --- FIX 1: Use JSX Syntax for Reset Email ---
export const sendPasswordResetEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "BassyBoy Mods <info@bassyboy.com>",
    to: email, 
    subject: "Reset your Password",
    react: <ResetEmail token={token} />, // <--- Changed from function call to JSX
  });
};

// --- FIX 2: Use JSX Syntax for Feedback Email ---
export const sendFeedbackEmail = async (name: string, message: string) => {
  await resend.emails.send({
    from: "BassyBoy Website <info@bassyboy.com>",
    // Remember to change this to your real email for testing!
    to: "info@bassyboy.com", 
    subject: `New Feedback from ${name}`,
    react: <FeedbackEmail name={name} message={message} />, // <--- Changed from function call to JSX
  });
};