import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";
import "./mes.scss";
import CTASection from "@/app/components/CTASection";
import PracticeSection from "@/app/components/PracticeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Execution Systems Implementation",
  description:
    "Expert MES implementation and integration services connecting ERP, PLM, and factory systems to enable Industry 4.0 and Smart Manufacturing.",
  alternates: {
    canonical: "https://athenatec.com/solutions/mes",
  },
  openGraph: {
    title: "Manufacturing Execution Systems Implementation",
    description:
      "Manufacturing Execution Systems implementation and factory system integration for advanced manufacturing enterprises.",
    url: "https://athenatec.com/mes-solutions",
    type: "website",
    images: [
      {
        url: "https://athenatec.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MES Implementation Services",
      },
    ],
  },
};

const practiceData = [
  {
    title: "Process / Modules",
    icon: "/assets/icons/process.png",
    items: [
      "WIP Workflow Management",
      "Asset and Durables",
      "Dispatching",
      "Product Costing",
      "ERP / PLM Integration",
      "Equipment Integration",
    ],
  },
  {
    title: "Implementation",
    icon: "/assets/icons/Implementation.png",
    active: true,
    items: [
      "Project Management",
      "Requirements / Design",
      "Process Reengineering",
      "Systems Integration Test",
      "Custom Development",
      "Automated Testing",
      "User Training",
    ],
  },
  {
    title: "Application Support",
    icon: "/assets/icons/Application-Support.png",
    items: [
      "Support all MES Modules",
      "Ticket based Tracking",
      "Troubleshooting",
      "Enhancements / Reporting",
    ],
  },
];
export default function MESPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "MES Implementation Services",
            description:
              "Manufacturing Execution Systems (MES) implementation and integration services connecting ERP, PLM, and factory systems for Industry 4.0 transformation.",
            provider: {
              "@type": "Organization",
              name: "Athenatec",
              url: "https://athenatec.com",
            },
            areaServed: {
              "@type": "Place",
              name: "Worldwide",
            },
            serviceType: "Manufacturing Execution Systems Implementation",
          }),
        }}
      />
      <HeroSection
        title="MES Solutions"
        description="Leave us a little info, and we’ll be in touch."
        image="/assets/images/MES.jpg"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="who-we-are">
        <div className="container">
          {/* LEFT CONTENT */}
          <div className="who-content">
            <h2 className="who-title">
              Seamless Support from Prototyping to Delivery
            </h2>

            <p className="who-description">
              Athena specializes in the implementation of MES (Manufacturing
              Execution Systems) and integration , seamlessly connecting with
              all other enterprise systems and Equipments to optimize the entire
              manufacturing process. From prototyping to delivery, our dedicated
              teams work closely with clients to ensure smooth, efficient
              program execution, enabling greater visibility and control at
              every stage of implementation.
            </p>

            <button className="who-button">Explore Us</button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="who-image">
            <Image
              src="/assets/images/Prototyping-to-Delivery.jpg"
              alt="Prototyping to Delivery"
              width={600}
              height={400}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </section>
      <section className="soc-factory">
        <div className="soc-factory__container">
          <h2 className="soc-factory__title">
            Factory System Overview and Integration
          </h2>

          <div className="soc-factory__grid">
            <div className="soc-factory__card">
              <div className="soc-factory__stars">★★★★★</div>
              <p>
                The <strong> Factory MES System</strong> has become the heart of
                the Industry 4.0 / Smart Factory trend. Unlike ERP / SFC
                systems, MES Systems effectively Control and Track the flow of
                Product in the factory with full traceability. MES Systems also
                intelligently communicate with Factory Equipment, Automation
                Cells and a variety of Quality and other Factory Applications,
                resulting in a more Automated Production Process. At Athena,
                Siemens Opcenter MES is the Centerpiece of our MOM Consulting
                Practice. With Siemens, a well established leader in MOM /
                Manufacturing Operations Management, we are likewise proud to be
                a Siemens Strategic Alliance Partner.
              </p>
              <p className="mt-6">
                <strong>Factory Systems Integration</strong> creates intelligent
                connections between Factory Systems and Factory Assets. The key
                is to first align around the Production Life Cycle and then to
                digitally connect all the Digitally capable Assets within for
                each Operational step. In the Smart Factory, PLM, ERP, MES and
                CMMS are integrated along their respective process life Cycles.
                Likewise, to gain the value of a Smart Factory, the MES System
                is also integrated with; Factory Equipment, Quality Systems,
                Automation Controls and other Digitally capable Factory Systems
                to achieve orders of magnitude in Production benefits. These
                include; Higher Yield, Increased Production output, reduced
                human dependencies and Product cost.{" "}
                <strong>
                  In Summary, The Smart Factory is essentially a ‘Connected
                  Factory’.
                </strong>
              </p>
            </div>
            <div className="mt-8 flex justify-center">
              <Image
                src="/assets/images/02-8.webp"
                alt="Factory System Integration Diagram"
                width={1200}
                height={600}
                className="rounded-lg  "
              />
            </div>
          </div>
        </div>
      </section>
      <PracticeSection
        title="Enterprise Systems Practice MES and Factory Systems"
        cards={practiceData}
        bottomImage="/assets/images/07-4.webp"
      />
      <CTASection
        title={
          <>
            Let’s talk
            <br /> Got an enquiry?
          </>
        }
        description="At Athena, our team guides your Industry 4.0 journey with deep expertise in digital transformation and manufacturing solutions. "
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.jpg"
      />
    </>
  );
}
