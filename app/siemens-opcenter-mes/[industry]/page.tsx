import { notFound } from "next/navigation";
import { industries } from "@/app/data/industries";
import Image from "next/image";
import "./industry.scss";
import Link from "next/link";
import CTASection from "@/app/components/CTASection";
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;

  const data = industries[industry];

  if (!data) return notFound();

  return (
    <div className="industry-page">
       <section className="hero">
        <Image src={data.heroImage} alt={data.title} fill priority />

        <div className="overlay">
          <div>
            <h1>{data.title}</h1>

            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

       <section className="intro container">
        <p>{data.intro}</p>
      </section>

       {data.videoUrl && (
        <section className="video container">
          <div className="video-wrapper">
            <video autoPlay loop muted playsInline>
              <source
                src={data.videoUrl}
                title="Industry Video"
                type="video/mp4"
              />
            </video>
          </div>
        </section>
      )}

       <section className="content container">
        {data.sections.map((sec, i) => (
          <div key={i} className="section-block">
            {/* <h2>{sec.heading}</h2> */}
            <p>{sec.content}</p>
          </div>
        ))}
      </section>
      <CTASection
        title={
          <>
            Let’s talk
            <br /> Got an enquiry?
          </>
        }
        description="At Athena, our team guides your Industry 4.0 journey with deep expertise in digital transformation and manufacturing solutions."
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.webp"
      />
    </div>
  );
}
