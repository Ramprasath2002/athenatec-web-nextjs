import type { Metadata } from "next";
import Hero from "@/app/components/home/hero/hero";
import WhoWeAre from "./components/home/who-we-are/WhoWeAre";
import Services from "./components/home/services/services";
import Leadership from "./components/home/services/Leadership";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best MES Solution Provider | Athenatec",
  description:
    "Athenatec delivers MES, PLM, and smart factory solutions for medical device, semiconductor, and electronics manufacturers. Start your Industry 4.0 journey.",
  path: "/",
  keywords: [
    "MES solutions",
    "manufacturing execution system",
    "smart factory solutions",
    "PLM integration",
    "Industry 4.0 consulting",
  ],
});

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <Leadership />
      <Services />
    </>
  );
}
