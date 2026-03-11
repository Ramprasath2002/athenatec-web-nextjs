import type { Metadata } from "next";
import CyberSecurityServices from "./CyberSecurityServices";

export const metadata: Metadata = {
  title: "Enterprise Cyber Security & GRC Services | Athenatec",
  description:
    "Athenatec delivers enterprise cyber security services: Governance Risk & Compliance (GRC), VAPT, vCISO advisory, and ISO 27001/NIST alignment. Protect and strengthen your digital ecosystem.",
  alternates: {
    canonical: "https://athenatec.com/solutions/cyber-security-service",
  },
  openGraph: {
    title: "Enterprise Cyber Security & GRC Services | Athenatec",
    description:
      "Athenatec delivers enterprise cyber security services: Governance Risk & Compliance (GRC), VAPT, vCISO advisory, and ISO 27001/NIST alignment. Protect and strengthen your digital ecosystem.",
    url: "https://athenatec.com/solutions/cyber-security-service",
    type: "website",
  },
};

export default function Page() {
  return <CyberSecurityServices />;
}