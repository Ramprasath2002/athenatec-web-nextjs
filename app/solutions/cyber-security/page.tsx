import type { Metadata } from "next";
import CyberSecurityServices from "./CyberSecurityServices";

export const metadata: Metadata = {
  title: "Enterprise Cyber Security & GRC Services",
  description:
    "Enterprise cyber security services including GRC, IT security, vCISO advisory, compliance, risk management, and secure SDLC for modern organizations.",
  alternates: {
    canonical: "https://athenatec.com/solutions/cyber-security",
  },
  openGraph: {
    title: "Enterprise Cyber Security & GRC Services",
    description:
      "GRC, IT security, vCISO, compliance and risk management services for enterprise cyber resilience.",
    url: "https://athenatec.com/solutions/cyber-security",
    type: "website",
  },
};

export default function Page() {
  return <CyberSecurityServices />;
}