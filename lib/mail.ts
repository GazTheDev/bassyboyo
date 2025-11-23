import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid"; // We need to install this: npm install uuid @types/uuid

const prisma = new PrismaClient();

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

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

// MOCK EMAIL SENDER
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;
  
  console.log("========================================");
  console.log(`📧 EMAIL TO: ${email}`);
  console.log(`🔗 RESET LINK: ${resetLink}`);
  console.log("========================================");
};