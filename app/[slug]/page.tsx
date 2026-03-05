import { caseStudyContent } from "@/app/data/caseStudyContent";
import { notFound } from "next/navigation";
import CaseStudy from "./caseStudy";
import HeroSection from "@/app/components/HeroSection";
import "./casecontent.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const study = caseStudyContent.find((item) => item.slug === slug);

  if (!study) return notFound();

  return (
    <>
      <HeroSection
        title={study.fullTitle}
        description="Leave us a little info, and we’ll be in touch."
        image={study.image}
        align="left"
        buttonText="Send us Email"
        buttonLink="mailto:info@athenatec.com"
      />

      <CaseStudy study={study} />
    </>
  );
}