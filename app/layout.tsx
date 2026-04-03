import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/components/home/header";
import Footer from "@/app/components/home/footer";
import "./globals.css";
import AIChatbot from "@/app/components/chatbot/chatbot";
import ScrollToTop from "@/app/components/ScrollToTop";
import {
  SITE_NAME,
  SITE_URL,
  buildMetadata,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const rootMetadata = buildMetadata({
  title: "Best MES Solution Provider | Athenatec",
  description:
    "Athenatec delivers MES, PLM, and smart factory solutions for medical device, semiconductor, and electronics manufacturers. Start your Industry 4.0 journey.",
  path: "/",
  keywords: [
    "MES implementation services",
    "Manufacturing execution systems",
    "Semiconductor MES solutions",
    "Manufacturing digital transformation",
    "PLM and ERP integration",
    "Industrial automation solutions",
  ],
});

export const metadata: Metadata = {
  ...rootMetadata,
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  applicationName: SITE_NAME,
  title: {
    default: "Best MES Solution Provider | Athenatec",
    template: "%s",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = buildWebSiteSchema();
  const organizationSchema = buildOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <Header />
        {children}
        <AIChatbot />
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
