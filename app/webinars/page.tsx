import type { Metadata } from "next";
import WebinarsClient from "./webinarsClient";

export const metadata: Metadata = {
  title: "MES & Manufacturing Webinars | Athenatec",
  description:
    "Access Athenatec's webinar library on MES accelerators, real-time visibility, and digital transformation for medical device and high-tech industries.",
  alternates: {
    canonical: "https://athenatec.com/webinars",
  },
  openGraph: {
    title: "MES & Manufacturing Webinars | Athenatec",
    description:
      "Access Athenatec's webinar library on MES accelerators, real-time visibility, and digital transformation for medical device and high-tech industries.",
    url: "https://athenatec.com/webinars",
    type: "website",
  },
};

export default function Page() {
  return <WebinarsClient />;
}