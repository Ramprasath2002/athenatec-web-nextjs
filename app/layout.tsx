import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Outfit } from "next/font/google";
import Header from "@/app/components/home/header";
import Footer from "@/app/components/home/footer";
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
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
export const metadata: Metadata = {
  metadataBase: new URL("https://athenatec.com"),

  manifest: "/manifest.json",
  applicationName: "Athenatec",

  title: {
    default: "Best MES Solution Provider | Athenatec |",
    template: "%s",
  },

  description:
    "Athenatec delivers MES, PLM, and smart factory solutions for medical device, semiconductor, and electronics manufacturers. Start your Industry 4.0 journey.",

  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://athenatec.com/",
    title: "Best MES Solution Provider | Athenatec |",
    description:
      "Athenatec delivers MES, PLM, and smart factory solutions for medical device, semiconductor, and electronics manufacturers. Start your Industry 4.0 journey.",
    images: [
      {
        url: "https://athenatec.com/og-image.webp",
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
              logo: "https://athenatec.com/logo.webp",
              sameAs: [
                "https://www.linkedin.com/company/athena-technology-solutions/",
              ],
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
