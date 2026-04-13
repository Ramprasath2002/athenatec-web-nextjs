import type { Metadata } from "next";
import HeroOptionOne from "@/app/components/home/hero-options/HeroOptionOne";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Hero Option 1 | Athenatec",
  description:
    "Concept route for a premium, cinematic full-view hero layout for Athenatec.",
  path: "/hero-option-1",
  noIndex: true,
});

export default function HeroOptionOnePage() {
  return <HeroOptionOne />;
}
