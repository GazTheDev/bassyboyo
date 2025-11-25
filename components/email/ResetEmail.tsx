import * as React from "react";
import {
  Html,
  Body,
  Button,
  Container,
  Head,
  Heading,
  Text,
  Preview,
  Section,
} from "@react-email/components";

interface ResetEmailProps {
  token: string;
}

export const ResetEmail: React.FC<ResetEmailProps> = ({ token }) => {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetLink = `${baseUrl}/new-password?token=${token}`;

  return (
    <Html>
      <Head />
      <Preview>Reset your BassyBoy Mods password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset Your Password</Heading>
          <Text style={text}>Hello Manager,</Text>
          <Text style={text}>
            Someone requested a password reset for your account. If this was you, click the button below.
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={resetLink}>
              Reset Password
            </Button>
          </Section>

          <Text style={footer}>
            If you didn't ask for this, you can safely ignore this email.
            <br />
            <br />
            Or copy this link: <a href={resetLink} style={link}>{resetLink}</a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// --- STYLES ---
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "10px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "5px",
  margin: "0 auto",
  padding: "45px",
  maxWidth: "480px",
};

const h1 = {
  color: "#064E3B",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 20px",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "25px 0",
};

const button = {
  backgroundColor: "#F97316",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 25px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  marginTop: "20px",
};

const link = {
  color: "#F97316",
};