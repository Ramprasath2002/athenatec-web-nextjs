import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Outfit } from "next/font/google";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";
import "./globals.css";
import AIChatbot from "@/app/components/chatbot/chatbot";
import ScrollToTop from "@/app/components/ScrollToTop";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Athenatec: Best MES Solution provider",
//   description:
//     "Athena specializes in the implementation of MES (Manufacturing Execution Systems) and integration, seamlessly connecting with all other enterprise systems",
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://athenatec.com"),

  manifest: "/manifest.json",
  applicationName: "Athenatec",

  title: {
    default: "Athenatec | MES Implementation & Manufacturing Solutions",
    template: "%s | Athenatec",
  },

  description:
    "Athenatec provides MES implementation, system integration, and manufacturing digital transformation solutions for semiconductor and electronics industries.",

  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://athenatec.com/",
    title: "Athenatec | MES Implementation & Manufacturing Solutions",
    description:
      "Expert MES implementation and integration services for semiconductor, electronics, and advanced manufacturing industries.",
    images: [
      {
        url: "https://athenatec.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Athenatec MES Solutions",
      },
    ],
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

  keywords: [
    "MES implementation services",
    "Manufacturing execution systems",
    "Semiconductor MES solutions",
    "Manufacturing digital transformation",
    "PLM and ERP integration",
    "Industrial automation solutions",
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Athenatec",
              url: "https://athenatec.com",
              logo: "https://athenatec.com/logo.png",
              sameAs: ["https://www.linkedin.com/company/athena-technology-solutions/"],
            }),
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
