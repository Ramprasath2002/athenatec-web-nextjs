import Image from "next/image";
import "./siemens.scss";
import ScrollReveal from "@/app/components/ScrollReveal";
import CTASection from "@/app/components/CTASection";
import HeroSection from "@/app/components/HeroSection";
import CaseStudiesSection from "@/app/components/CaseStudiesSection";
import GallerySection from "@/app/components/GallerySection";
import PracticeSection from "@/app/components/PracticeSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Siemens Opcenter MES Implementation Partner",

  description:
    "Expert Siemens Opcenter MES implementation, upgrades, and Smart Factory integration for semiconductor, electronics, and medical device manufacturing.",

  alternates: {
    canonical: "https://athenatec.com/partners/siemens-opcenter",
  },

  openGraph: {
    title: "Siemens Opcenter MES Implementation Partner",
    description:
      "Specialized Siemens Opcenter MES solutions including Semiconductor, Electronics, Medical Devices, APS, and Smart Factory integration.",
    url: "https://athenatec.com/partners/siemens-opcenter",
    type: "website",
    images: [
      {
        url: "https://athenatec.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Siemens Opcenter MES by Athenatec",
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

const services = [
  {
    title: "Siemens Opcenter Execution – Semiconductor",
    desc: `Opcenter Execution Semiconductor (formerly known as “Camstar Semiconductor Suite”) replaces legacy manufacturing systems that haven’t kept pace with the demanding needs of semiconductor manufacturing. `,
    video:
      "https://athenatec.com/wp-content/uploads/2024/07/Semi-conductor-1.mp4",
  },
  {
    title: "Siemens Opcenter Execution – Electronics",
    desc: `Opcenter Execution Electronics (formerly known as “Camstar Electronics Suite”) is a comprehensive manufacturing solution for the electronics industry. `,
    video: "https://athenatec.com/wp-content/uploads/2024/07/electronics.mp4",
  },
  {
    title: "Siemens Opcenter Execution – Medical Devices",
    desc: `Siemens Opcenter MES for Medical Devices (formerly known as Camstar) is a unified and holistic application to drive digital initiatives faster and further to gain the benefits from Industry 4.0.`,
    video:
      "https://athenatec.com/wp-content/uploads/2024/07/Siemens-Medical.mp4",
  },
  {
    title: "Siemens Opcenter Execution – Discrete",
    desc: `Siemens Opcenter Core (formerly known as Camstar Enterprise Platform) is the global MES platform for Production and Quality Management.`,
    video: "https://athenatec.com/wp-content/uploads/2024/07/Discrete-1-1.mp4",
  },
  {
    title: "Siemens APS – Advance Planning & Scheduling",
    desc: `In Manufacturing, product variability, available production resources and customer order changes directly affect the time sensitive work effort of optimizing Jobs on the Shop Floor.`,
    video: "https://athenatec.com/wp-content/uploads/2024/07/aps.mp4",
  },
  {
    title: "Siemens Mendix",
    desc: `Low Code and Analytics features of Mendix helps to design KPIs and Dashboards for better visibility of the Data.`,
    video:
      "https://athenatec.com/wp-content/uploads/2024/11/6747645_Animation_Diagrams_1280x720.mp4",
  },
];
const testimonials = [
  {
    company: "InnovaFlex Foundry",
    name: "Jon Baker",
    role: "IT Manager – InnovaFlex Foundry",
    image: "/assets/Clients/InnovaFlex_Foundry.jpg",
    text: `Athena provides expertise in MES and beyond.  They have proven extremely easy to work with, offering project management, SW development, integration, support and expertise ensuring projects are completed successfully.  I strongly recommend Athena for MES implementations or Opcenter upgrades.`,
  },
  {
    company: "Nevro",
    name: "Alonso Moya",
    role: "Site Director, Nevro",
    image: "/assets/Clients/Nevro.png",
    text: `Having a commercial partner is vital for an exemplary, seamless implementation, and throughout the development and setup of MES in Nevro Costa Rica, Athena has been a critical piece. With high support for our needs, Athena was always proactive in looking for critical and strategic solutions to the Business’s needs and taking care of the integrity and structure of the systems. It was a satisfactory experience to our liking due to all the knowledge transmitted during this journey of implementing MES in our plant.
An excellent partner for us.`,
  },
  {
    company: "Dexcom",
    name: "Wei Wu",
    role: "Senior Manager, IT",
    image: "/assets/Clients/Dexcom.png",
    text: `“I strongly recommend Athena based on their exceptional performance and successful completion of our recent Camstar v8.9 launch. Their dedication, expertise, and professionalism have greatly contributed to the success of our project and have exceeded our expectations.
Throughout the project, Athena demonstrated an in-depth understanding of our unique requirements and objectives. They showcased their comprehensive knowledge of manufacturing processes, industry best practices, and Camstar latest version 8.9 solutions. Their ability to translate our complex needs into an efficient and tailored manufacturing execution system was truly remarkable. We have experienced improved productivity, streamlined workflows, enhanced quality control, and real-time visibility into our manufacturing processes. Their commitment to transparency and open communication fostered a strong working relationship, allowing us to have full confidence in their abilities.
Moreover, the post-implementation hypercare support provided by Athena has been exceptional. They have been responsive to our ongoing needs, promptly addressing any questions or concerns that arise. Their dedication to customer satisfaction and their commitment to ensuring the software’s continued optimal performance are highly commendable`,
  },
  {
    company: "Marki Microwave",
    name: "Marki Microwave",
    role: "",
    image: "/assets/Clients/Marki.png",
    text: `We reviewed several MES suppliers and selected Siemens Opscenter MES / APS as the best fit for Marki Microwave. Selecting the platform is part of the journey but a successful implementation requires an experienced system integrator.
We choose Athena Technologies as our implementation partner as they had several successful implementations in the electronics / medical devices customers. The company resourced our project with an experienced project manager and technical team who were flexible and collaborated well with our small internal team to ensure we get the solution that fits the needs of our manufacturing operations. We used a phase and sprint approach to complete our implementation in a 9-month time frame.
We will continue to work together with Athena to carry out continuous process improvement and harmonization to deliver greater efficiency and quality to meet our customers’ demands today and well into the more digital future.`,
  },
  {
    company: "Viavi",
    name: "Viavi",
    role: "",
    image: "/assets/Clients/VLAVI.png",
    text: `Through Athena’s exhaustive efforts and deep domain expertise, we were able to implement a ‘Viavi Aligned Solution’ of Siemens Opcenter 8.x that met our complex MES System requirements. This was done via streamlined manufacturing processes, user friendly UI/ UX, seamless integration with our factory equipment / metrology and a single source for factory insights. Athena utilized Industry 4.0 foundations and architected a cookie-cutter approach that is ready for all our global factories.`,
  },
  {
    company: "MiaSolé Hi-Tech",
    name: "Siva Papaiya",
    role: "Senior Director, MiaSolé Hi-Tech",
    image: "/assets/Clients/Miasole.png",
    text: `Athena team has unrivalled proficiency in manufacturing and their commitment towards successful execution has been a very positive experience.`,
  },

  {
    company: "Emcore",
    name: "Jamie Lohrungruang",
    role: "VP of Information Technology",
    image: "/assets/Clients/Emcore.png",

    text: `We were very fortunate to have found Athena as they helped us turnaround our Opcenter Semi 8.9 MES project after our initial attempt working with a different Solution Integrator was unsuccessful. Their expertise of the OpCenter product along with their experience in semiconductor allowed them to help us completely change the design of the solution to better leverage best practices and meet our business needs. We cannot be happier working with Athena, and can see that they went above and beyond what was documented to make sure we are happy with the solution. They really came through for us. You will not be disappointed working with them.`,
  },

  {
    company: "Conformis",
    name: "Conformis",
    role: "",
    image: "/assets/Clients/Conformis.png",
    text: `A few years ago, Conformis was looking for a boutique Camstar consulting SI. Athena was selected and has continuously delivered on all projects, There was no red tape. as with larger organizations, and while still receiving all the proper documentation and validation.
“I am happy to consider Athena a Conformis partner”.`,
  },
  {
    company: "Neophotonics",
    name: "Aim Khan",
    role: "CIO / VP Neophotonics",
    image: "/assets/Clients/Neophotonics.png",
    text: `Athena consistently exceeds our business targets, overcomes challenges and goes the extra mile.~ Great Company, Excellent Team and Partner.`,
  },
];

const logos = [
  "/assets/Clients/Conformis.png",
  "/assets/Clients/Dexcom.png",
  "/assets/Clients/Edtech.jpg",
  "/assets/Clients/Emcore.png",
  "/assets/Clients/Enovix.png",
  "/assets/Clients/Finisar.png",
  "/assets/Clients/InnovaFlex_Foundry.jpg",
  "/assets/Clients/Lumentum.png",
  "/assets/Clients/Marki.png",
  "/assets/Clients/Miasole.png",
  "/assets/Clients/mission-solar.png",
  "/assets/Clients/Neophotonics.png",
  "/assets/Clients/Nevro.png",
  "/assets/Clients/Penumbra.png",
  "/assets/Clients/PSi-Quantum.png",
  "/assets/Clients/View-Dynamic-Glass.png",
  "/assets/Clients/VLAVI.png",
];
const caseStudies = [
  {
    id: 1,
    title: "Surgical Plan Approval",
    tag: "Case Study #1",
    description:
      "Our Medical device customer had an external system to get approval for Surgical Plans from the surgeon which had to be integrated to Opcenter in several Operations.",
    image: "/assets/images/freepik-export-202412191322302WRy-1920x1280.webp",
    link: "/downloads/case1.pdf",
  },
  {
    id: 2,
    title: "Factory Separation",
    tag: "Case Study #2",
    description:
      "Customer has Multiple Factories where they manufacture different devices. Required to Display Modeling and WIP Data based on the Employee Role and Factory.",
    image: "/assets/images/FS.png",
    link: "/downloads/case2.pdf",
  },
  {
    id: 3,
    title: "Manage Shipper Case",
    tag: "Case Study #3",
    description:
      "Customer had a requirement to implement Shipper case association to the Container during Packaging Process​.",
    image: "/assets/images/freepik-export-20241219133957E1bW-1920x1280.webp",
    link: "/downloads/case3.pdf",
  },
  {
    id: 4,
    title: "Optimize Opcenter Execution Electronics Production Client",
    tag: "Case Study #4",
    description:
      "Production Client which is a main UI for Operator in Electronics Suite was Optimized to cover maximum WIP transactions​.",
    image: "/assets/images/close-up-computer-keyboard-1920x1280.webp",
    link: "/downloads/case4.pdf",
  },
  {
    id: 5,
    title: "Optimize Opcenter Execution Semiconductor Suite WIP Main",
    tag: "Case Study #5",
    description:
      "WIP Main page which is Key UI for all the WIP transactions in Semi Suite was optimized to reduce clicks and scrolls and enhanced color codes for better user experience and quick navigations​.",
    image:
      "/assets/images/WhatsApp-Image-2024-07-17-at-10.11.32-e1734616151384.webp",
    link: "/downloads/case5.pdf",
  },
  {
    id: 6,
    title: "Data Correction",
    tag: "Case Study #6",
    description:
      "Data Correction: Customer had a requirement to correct the collected data and also record Audit Trail for the same.",
    image:
      "/assets/images/businessman-compliance-rules-law-regulation-policy-virtual-screen-documents-with-checkbox-lists-1920x1277.webp",
    link: "/downloads/case6.pdf",
  },
];
const galleryItems = [
  {
    title: "Realize Live Americas 2025",
    image: "/assets/images/Media-9-768x576.webp",
    slug: "/gallery/realize-live-americas-2025",
  },
  {
    title: "Americas Partner Conference 2025",
    image: "/assets/images/Media-2-768x576.webp",
    slug: "/gallery/americas-partner-conference-2025",
  },
  {
    title: "Realize Live Americas 2024",
    image: "/assets/images/Media-26-768x576.webp",
    slug: "/gallery/realize-live-americas-2024",
  },
  {
    title: "Realize Live Europe 2024",
    image: "/assets/images/Media-17-768x1024.webp",
    slug: "/gallery/realize-live-europe-2024",
  },
  {
    title: "Realize Live Americas 2023",
    image: "/assets/images/shared-image-8-1-768x576.webp",
    slug: "/gallery/realize-live-americas-2023",
  },
];
export default function SiemensOpcenter() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Siemens Opcenter MES Implementation",
            provider: {
              "@type": "Organization",
              name: "Athenatec",
              url: "https://athenatec.com",
            },
            areaServed: "Worldwide",
            description:
              "Expert Siemens Opcenter MES implementation, upgrades, and Smart Factory integration for semiconductor, electronics, and medical device manufacturing.",
          }),
        }}
      />

      <HeroSection
        title="Siemens Opcenter MES"
        description="Experienced in implementing and upgrading Opcenter MES across versions."
        image="/assets/images/siemens.png"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

      {/* DESCRIPTION SECTION */}
      <section className="soc-description">
        <div className="soc-description__card">
          <p>
            Siemens Opcenter (formally known as Siemens Camstar) is a
            comprehensive Manufacturing Solution enabling a complete
            digitalization of manufacturing operations.   All Opcenter MES
            Solutions provide end-to-end control and visibility into the
            production manufacturing process. As a Siemens Alliance Partner,
            Athena leverages Industry specific Opcenter solutions for;
            Semiconductor, Electronics, Medical Devices and Discrete
            Manufacturing.   A typical MES Implementation will replace multiple
            disconnected point solutions with one, fully integrated and
            centralized MES factory system. Ultimately, MES Opcenter seamlessly
            operates across multiple functional areas and roles with built-in
            integration capabilities with all factory equipment types, as well
            as both ancillary factory and business systems.
          </p>
        </div>
      </section>

      <section className="soc-services">
        <div className="soc-services__container">
          <div className="soc-services__grid">
            {services.map((service, index) => (
              <div className="soc-card" key={index}>
                <div className="soc-card__media">
                  <video
                    src={service.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                  />
                </div>

                <div className="soc-card__content">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <a href="#">Learn More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* EXPERTISE SECTION */}
      <section className="soc-expertise">
        <div className="soc-expertise__container">
          <div className="soc-expertise__content">
            <h2>Athena Opcenter Siemens Expertise</h2>

            <p>
              Since 2011, Athena’s expertise in Camstar/Opcenter has expanded
              across diverse industries such as Semi Conductors, Medical
              Devices, Electronics, and Clean energy. Our experience includes
              working with product versions ranging from v3.x to v8.9, and
              versions 2304, 2310, and 2404 of Opcenter, MIO, and APS.
            </p>

            <p>
              Our team possesses specialized skills in Designer, Portal Studio,
              APS, and Mendix.
            </p>
            {/*  */}
          </div>

          <div className="soc-expertise__timeline">
            <img
              src="/assets/images/Seimens-Roadmap.png"
              alt="Opcenter Timeline"
            />
          </div>
        </div>
      </section>
      {/* TEAM SECTION */}
      <section className="soc-team">
        <div className="soc-team__container">
          <h2 className="soc-team__title">
            Athena Opcenter Siemens Expertise Team
          </h2>

          <div className="soc-team__image">
            <img
              src="/assets/images/siemens-img.webp"
              alt="Athena Opcenter Team"
            />
          </div>
        </div>
      </section>

      {/* FACTORY OVERVIEW SECTION */}
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
                width={1000}
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
      />
      <section className="siemens-analytics">
        <div className="container">
          {/* Top Process Flow Image */}
          <div className="analytics-diagram">
            <Image
              src="/assets/images/07-4.webp"
              alt="Manufacturing Process Flow"
              width={1200}
              height={600}
              priority
            />
          </div>

          {/* Title */}
          <div className="analytics-content">
            <h2 className="analytics-title">Analytics</h2>

            <p>
              Industry 4.0 Smart Factory Analytics add enormous value to the
              Manufacturing Enterprise versus historical reporting platforms.
              Smart Factory Analytics collect data from factory digital assets
              and systems enabling production visibility in real-time,
              trend-based, descriptive and predictive formats.
            </p>

            <p>
              One of the key benefits is driving production toward KPI targets
              and enabling accurate root cause analysis. Organizations strive
              for yield, equipment utilization, and quality performance.
            </p>

            <p>
              Smart Factory Analytics provide daily cycles of learning with
              rapid issue identification to support faster remediation.
            </p>
          </div>

          {/* Title */}
          <h2 className="analytics-title">Smart Factory Analytics</h2>

          {/* Top Infographic */}
          <div className="analytics-block">
            <Image
              src="/assets/images/10-1.webp"
              alt="Smart Factory Analytics"
              width={1400}
              height={700}
            />
          </div>

          {/* DMAIC Section */}
          <div className="analytics-block dmaic-section">
            <Image
              src="/assets/images/04-6.webp"
              alt="DMAIC Process"
              width={1200}
              height={500}
            />
          </div>
        </div>
      </section>
      <section className="clients-section">
        <div className="container">
          <div className="clients-header">
            <h2 className="clients-title">Our Customer</h2>
          </div>
          <div className="logos-grid">
            {logos.map((logo, index) => (
              <div key={index} className="logo-item">
                <Image src={logo} alt="client logo" width={180} height={100} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="siemens-testimonial-section">
        <div className="container">
          <ScrollReveal>
            <h2 className="testimonial-title">Testimonial</h2>
          </ScrollReveal>

          <div className="testimonial-grid">
            {testimonials.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="testimonial-card">
                  <div className="card-header">
                    <div className="company-info">
                      <h4>{item.company}</h4>
                    </div>

                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.company}
                        className="testimonial-logo"
                      />
                    )}
                  </div>

                  <div className="card-body">
                    <p>{item.text}</p>
                  </div>

                  <div className="card-footer">
                    <strong>{item.name || ""}</strong>
                    {item.role && <span>{item.role}</span>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CaseStudiesSection title="Case Studies" data={caseStudies} bg="light" />
      <GallerySection title="Event Gallery" data={galleryItems} bg="light" />
      <CTASection
        title={
          <>
            Let’s talk <br />
            Got an enquiry?
          </>
        }
        description="At Athena, our team guides your Industry 4.0 journey with deep expertise in digital transformation and manufacturing solutions. "
        buttonText="Contact Us"
        buttonLink="/contact"
        note="We typically respond within 24 hours."
        backgroundImage="/assets/images/new-req.jpg"
      />
    </main>
  );
}
