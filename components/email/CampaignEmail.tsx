import * as React from "react";
import {
  Html,
  Body,
  Container,
  Head,
  Heading,
  Text,
  Preview,
  Hr,
  Section,
  Button,
  Img,
} from "@react-email/components";

interface CampaignEmailProps {
  subject: string;
  content: string;
}

export const CampaignEmail: React.FC<CampaignEmailProps> = ({ subject, content }) => {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header / Logo Area */}
          <Section style={header}>
            <Heading style={brand}>BASSY<span style={{color: '#F97316'}}>BOY</span></Heading>
          </Section>

          <Heading style={h1}>{subject}</Heading>
          
          {/* Main Content - We preserve newlines */}
          <Section style={contentSection}>
            {content.split('\n').map((paragraph, i) => (
              <Text key={i} style={text}>
                {paragraph}
              </Text>
            ))}
          </Section>

          <Section style={buttonContainer}>
            <Button style={button} href={`${baseUrl}/downloads`}>
              Visit Download Center
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            You received this email because you subscribed to the BassyBoy Scouting Report.
            <br />
            <a href={`${baseUrl}/unsubscribe`} style={link}>Unsubscribe</a>
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
  borderRadius: "8px",
  margin: "0 auto",
  padding: "40px",
  maxWidth: "600px",
};

const header = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const brand = {
  color: "#064E3B",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
};

const h1 = {
  color: "#333",
  fontSize: "22px",
  fontWeight: "bold",
  margin: "0 0 20px",
};

const contentSection = {
  marginBottom: "30px",
};

const text = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#F97316",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};

const link = {
  color: "#F97316",
  textDecoration: "underline",
};