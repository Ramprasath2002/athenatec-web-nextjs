import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";
import "./case.scss";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing MES & ERP Case Studies",
  description:
    "Explore real-world MES, ERP, and digital transformation case studies across semiconductor and medical device manufacturing industries.",
  alternates: {
    canonical: "https://athenatec.com/case-studies",
  },
  openGraph: {
    title: "Manufacturing MES & ERP Case Studies",
    description:
      "Real transformation stories in MES, ERP and Industry 4.0 implementation.",
    url: "https://athenatec.com/case-studies",
    type: "website",
  },
};
type CaseStudy = {
  slug: string;
  title: string;
  image: string;
  desc: string;
};
const caseStudies: CaseStudy[] = [
  {
    slug: "medical-device-mes-modernization",
    title: "Enabling Continuous Innovation in Medical Device",
    image: "/assets/images/form-img.webp",
    desc: "A U.S.-based global leader in CGM has been pioneering real-time health insights for over 25 years.",
  },
  {
    slug: "nevro-paperless-mes",
    title: "From Paper to Paperless – Modernizing MES",
    image: "/assets/images/From-Paper.webp",
    desc: "Nevro, a globally recognized medical device company, is transforming operations with digital MES.",
  },
];

export default function CaseStudies() {
  return (
    <>
      <HeroSection
        title="Case Studies"
        description="Leave us a little info, and we’ll be in touch."
        image="/assets/images/business-women-signature-document-scaled.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="case-study-section">
        <div className="container">
          <div className="section-header">
            <h2>Case Studies</h2>
            <p>Real transformation stories from our clients</p>
          </div>

          <div className="case-grid">
            {caseStudies.map((item) => (
              <Link
                href={`/case-studies/${item.slug}`}
                key={item.slug}
                className="case-card"
              >
                <div className="case-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="img"
                  />
                </div>

                <div className="case-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>

                  <span className="case-btn">
                    <span>Know More</span>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
