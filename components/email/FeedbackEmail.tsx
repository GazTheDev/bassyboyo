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
} from "@react-email/components";

interface FeedbackEmailProps {
  name: string;
  message: string;
}

export const FeedbackEmail: React.FC<FeedbackEmailProps> = ({ name, message }) => {
  return (
    <Html>
      <Head />
      <Preview>New Feedback from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Website Feedback</Heading>
          
          <Section style={section}>
            <Text style={label}>From:</Text>
            <Text style={content}>{name}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={content}>{message}</Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Sent from BassyBoy Mods Homepage
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
  padding: "40px",
  maxWidth: "480px",
};

const h1 = {
  color: "#064E3B",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const section = {
  marginBottom: "20px",
};

const label = {
  color: "#8898aa",
  fontSize: "12px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  marginBottom: "5px",
};

const content = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginTop: "20px",
};