import PartnersForm from "@/app/components/casestudies-form/PartnersForm";
import type { CaseStudyType } from "@/app/data/caseStudyContent";

type Props = {
  study: CaseStudyType;
};

export default function DownloadNow({ study }: Props) {
  return <PartnersForm study={study} />;
}
