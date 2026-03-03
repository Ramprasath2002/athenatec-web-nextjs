import type { Metadata } from "next";
import WebinarsClient from "./webinarsClient";

export const metadata: Metadata = {
  title: "Manufacturing & MES Webinars",
  description:
    "Join live and on-demand webinars covering MES, Industry 4.0, digital transformation and smart manufacturing strategies.",
  alternates: {
    canonical: "https://athenatec.com/webinars",
  },
  openGraph: {
    title: "Manufacturing & MES Webinars",
    description:
      "Live and on-demand webinars on MES, MedTech manufacturing and Industry 4.0 solutions.",
    url: "https://athenatec.com/webinars",
    type: "website",
  },
};

export default function Page() {
  return <WebinarsClient />;
}