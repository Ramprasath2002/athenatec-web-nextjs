import type { Metadata } from "next";
import CyberSecurityServices from "./CyberSecurityServices";

export const metadata: Metadata = {
  title: "Enterprise Cyber Security & GRC Services | Athenatec",
  description:
    "Athenatec delivers GRC, VAPT, and vCISO services. Aligns with ISO 27001, NIST, and compliance frameworks to protect your digital ecosystem.",
  alternates: {
    canonical: "https://athenatec.com/solutions/cyber-security-service",
  },
  openGraph: {
    title: "Enterprise Cyber Security & GRC Services | Athenatec",
    description:
      "Athenatec delivers GRC, VAPT, and vCISO services. Aligns with ISO 27001, NIST, and compliance frameworks to protect your digital ecosystem.",
    url: "https://athenatec.com/solutions/cyber-security-service",
    type: "website",
  },
};

export default function Page() {
  return <CyberSecurityServices />;
}