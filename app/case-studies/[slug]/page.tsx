import { caseStudies } from "@/app/data/caseStudies";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import HeroSection from "@/app/components/HeroSection";
import "./studies.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) return notFound();

  return (
    <>
    
      <HeroSection 
        title={study.fullTitle}
        description={"Leave us a little info, and we’ll be in touch."}
        image={study.image}
        align="left"
        buttonText="Send us Email"
        buttonLink="mailto:info@athenatec.com"
      />

      <CaseStudyClient study={study} />
    </>
  );
}