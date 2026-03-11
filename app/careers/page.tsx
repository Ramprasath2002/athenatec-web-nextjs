 import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers at Athenatec | MES & Manufacturing Technology Jobs",
  description:
    "Join Athenatec's team building intelligent manufacturing solutions. Explore open roles in Oracle SCM, .NET development, and AI/ML across India.",
  openGraph: {
    title: "Careers at Athenatec | MES & Manufacturing Technology Jobs",
    description:
      "Join Athenatec's team building intelligent manufacturing solutions. Explore open roles in Oracle SCM, .NET development, and AI/ML across India.",
    url: "https://www.athenatec.com/careers",
    siteName: "Athenatec",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Athenatec | MES & Manufacturing Technology Jobs",
    description:
      "Join Athenatec's team building intelligent manufacturing solutions. Explore open roles in Oracle SCM, .NET development, and AI/ML across India.",
  },
  alternates: {
    canonical: "https://www.athenatec.com/careers",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}