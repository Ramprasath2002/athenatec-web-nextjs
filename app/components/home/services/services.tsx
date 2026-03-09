"use client";
import { useRouter } from "next/navigation";
import "./services.scss";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import WheelGestures from "embla-carousel-wheel-gestures";
import Image from "next/image";
import { ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const autoScroll = useRef(
    AutoScroll({
      speed: 0.6, // lower = slower
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      containScroll: false,
    },
    [autoScroll.current],
  );

  const handleManagedTabChange = (index: number) => {
    if (index === active || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setActive(index);
      setIsTransitioning(false);
    }, 400);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate");
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      q: "What services does Athena offer?",
      a: "Athena offers enterprise application support, custom software development, testing, infrastructure support, and managed services tailored to business needs.",
    },
    {
      q: "When was Athena founded?",
      a: "Athena was founded with a vision to deliver innovative technology solutions and has grown into a global services partner.",
    },
    {
      q: "What industries does Athena serve?",
      a: "We serve manufacturing, technology, enterprise IT, and industrial sectors worldwide.",
    },
    {
      q: "What certifications does Athena hold?",
      a: "Athena holds multiple industry and technology certifications ensuring quality and compliance.",
    },
    {
      q: "How many staff members does Athena have?",
      a: "Athena has a global team of skilled professionals supporting clients across regions.",
    },
    {
      q: "What sets Athena apart from others?",
      a: "Our combination of domain expertise, innovation mindset, and customer-first approach sets us apart.",
    },
  ];

  const testimonials = [
    {
      name: "Jon Baker",
      image: "/assets/Clients/InnovaFlex_Foundry.jpg",
      role: "IT Manager – InnovaFlex Foundry",
      text: "Athena provides expertise in MES and beyond.  They have proven extremely easy to work with, offering project management, SW development, integration, support and expertise ensuring projects are completed successfully.  I strongly recommend Athena for MES implementations or Opcenter upgrades.",
    },
    {
      name: "Wei Wu",
      image: "/assets/Clients/Dexcom.png",
      role: "Senior Manager, IT",
      text: "I strongly recommend Athena based on their exceptional performance and successful completion of our recent Camstar v8.9 launch. Their dedication, expertise, and professionalism have greatly contributed to the success of our project and have exceeded our expectations.Throughout the project, Athena demonstrated an in-depth understanding of our unique requirements and objectives.",
    },
    {
      name: "Siva Papaiya",
      image: "/assets/Clients/Miasole.png",
      role: "Senior Director, MiaSole Hi-Tech",
      text: "Athena team has unrivalled proficiency in manufacturing and their commitment towards successful execution has been a very positive experience.",
    },
    {
      name: "Alonso Moya",
      image: "/assets/Clients/Nevro.png",
      role: "Site Director, Nevro",
      text: "Having a commercial partner is vital for an exemplary, seamless implementation, and throughout the development and setup of MES in Nevro Costa Rica, Athena has been a criticalpiece. With high support for our needs, Athena was always proactive in looking for critical and strategic solutions to the Business’s needs and taking care of the integrity and structure of the systems. It was a satisfactory experience to our liking due to all the knowledge transmitted during this journey of implementing MES in our plant.An excellent partner for us.",
    },

    {
      name: "Viavi",
      image: "/assets/Clients/VLAVI.png",
      text: "Through Athena’s exhaustive efforts and deep domain expertise, we were able to implement a ‘Viavi Aligned Solution’ of Siemens Opcenter 8.x that met our complex MES System requirements. This was done via streamlined manufacturing processes, user friendly UI/ UX, seamless integration with our factory equipment / metrology and a single source for factory insights. Athena utilized Industry 4.0 foundations and architected a cookie-cutter approach that is ready for all our global factories.",
    },
    {
      name: "Jamie Lohrungruang",
      image: "/assets/Clients/Emcore.png",
      role: "VP of Information Technology",
      text: "We were very fortunate to have found Athena as they helped us turnaround our Opcenter Semi 8.9 MES project after our initial attempt working with a different Solution Integrator was unsuccessful. Their expertise of the OpCenter product along with their experience in semiconductor allowed them to help us completely change the design of the solution to better leverage best practices and meet our business needs. We cannot be happier working with Athena, and can see that they went above and beyond what was documented to make sure we are happy with the solution. They really came through for us. You will not be disappointed working with them.",
    },
    {
      name: "Aim Khan",
      image: "/assets/Clients/Neophotonics.png",
      role: "CIO / VP, Neophotonics",
      text: "Athena consistently exceeds our business targets, overcomes challenges and goes the extra mile.~ Great Company, Excellent Team and Partner.",
    },
    {
      name: "Glo-USA",
      image: "/assets/Clients/GLO-USA.png",
      // role: "Manufacturing Leadership Team",
      text: "Great partnership with Athena! We appreciate Athena’s consistent dedication, attention to detail and innovative approach in delivering a Shop Floor Management solution that is enabling better visibility of our manufacturing resulting in improvements in both product quality and cost.",
    },
    {
      name: "Marki Microwave",
      image: "/assets/Clients/Marki.png",
      // role: "Manufacturing Operations",
      text: "We reviewed several MES suppliers and selected Siemens Opscenter MES / APS as the best fit for Marki Microwave. Selecting the platform is part of the journey but a successful implementation requires an experienced system integrator.We choose Athena Technologies as our implementation partner as they had several successful implementations in the electronics / medical devices customers. The company resourced our project with an experienced project manager and technical team who were flexible and collaborated well with our small internal team to ensure we get the solution that fits the needs of our manufacturing operations. We used a phase and sprint approach to complete our implementation in a 9-month time frame.We will continue to work together with Athena to carry out continuous process improvement and harmonization to deliver greater efficiency and quality to meet our customers’ demands today and well into the more digital future.",
    },
    {
      name: "Conformis",
      image: "/assets/Clients/Conformis.png",
      // role: "Manufacturing Systems",
      text: "A few years ago, Conformis was looking for a boutique Camstar consulting SI. Athena was selected and has continuously delivered on all projects, There was no red tape. as with larger organizations, and while still receiving all the proper documentation and validation.“I am happy to consider Athena a Conformis partner”.",
    },
  ];

  const managedServices = [
    {
      title: "Application Support",
      subtitle: "Global enterprise-grade support",
      points: [
        "Athena's Global Application experts offer support for a wide range of Enterprise Applications.",
        "Supported platforms include Oracle R12 EBS, Agile PLM, and Siemens MOM Camstar MES.",
        "Flexible pricing structures are available, tailored to meet customer needs and budgets.",
      ],
      image: "/assets/images/application-support.jpg",
    },
    {
      title: "Automation Testing",
      subtitle: "Faster, safer releases",
      points: [
        "Our Automated Systems Testing Suite delivers rigorous script-based testing for production releases.",
        "Ensures a smooth, error free release process.",
        "Achieves faster, more cost-effective deployments.",
      ],
      image: "/assets/images/automation-test.jpg",
    },
    {
      title: "Defect & Ticket Tracking",
      subtitle: "Closed-loop issue management",
      points: [
        "In manufacturing, effective issue tracking and remediation require a strong Root Cause Analysis (RCA) process.",
        "Manufacturers that implement a closed-loop system for tracking issues through RCA, along with corrective and preventative actions, become industry leaders.",
        "At Athena, we specialize in managing the issue remediation process, primarily using a CaPa approach, ensuring all issues are addressed with preventative actions to prevent future operational setbacks",
      ],
      image: "/assets/images/ticket-tracking.jpg",
    },
    {
      title: "Remote Monitoring",
      subtitle: "Always-on visibility",
      points: [
        "The quality of services depends on uptime and performance.",
        "Athena offers flexible solutions for remote monitoring and remediation across Applications, Databases, Networks, OS, and Server Hardware.",
        "We provide timely notifications at critical threshold levels, ensuring issues are addressed before they impact users or business operations.",
      ],
      image: "/assets/images/remote-monitering.jpg",
    },
    {
      title: "Staff Augmentation",
      subtitle: "Scale teams instantly",
      points: [
        "Athena understands that during challenging times, temporary expertise is often preferred over permanent hires to manage peak workloads.",
        "Our Staff Augmentation Services cover a wide range of needs, including Enterprise Application Support, Software Development and Testing, and Infrastructure Support.",
        "We offer flexible pricing models based on Off-shore or Near-shore solutions to meet each customer’s specific requirements.",
      ],
      image: "/assets/images/staff-augement.jpg",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeRef.current + 1) % managedServices.length;

      handleManagedTabChange(next);
    }, 8000);

    return () => clearInterval(interval);
  }, [managedServices.length]);
  const service = managedServices[active];

  return (
    <>
      <section className="services">
        <div className="container">
          <h2 className="services-title">Athena Professional Services</h2>

          <div className="services-timeline">
            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/discover.svg"
                  alt="Discovery"
                  width={80}
                  height={80}
                />
              }
              title="Discovery"
              items={[
                "Requirements",
                "POC’s",
                "Software Selection",
                "Scope Definition",
                "Project Planning",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/design.svg"
                  alt="Design"
                  width={80}
                  height={80}
                />
              }
              title="Design"
              items={[
                "Solution Design",
                "Custom Requirements",
                "Functional Specifications",
                "Use Cases",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/deploy.svg"
                  alt="Develop"
                  width={80}
                  height={80}
                />
              }
              title="Develop"
              items={[
                "Software Development",
                "Unit / System Testing",
                "Source Code Control",
                "Package / Delivery",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/implement.svg"
                  alt="Implement"
                  width={80}
                  height={80}
                />
              }
              title="Implement"
              items={[
                "Integration Testing",
                "Conference Room Pilots",
                "User Acceptance",
                "User Training",
                "Cutover Strategy",
              ]}
            />

            <TimelineStep
              icon={
                <Image
                  src="/assets/logo/technical-support.svg"
                  alt="Support"
                  width={80}
                  height={80}
                />
              }
              title="Support"
              items={[
                "Sustained Support",
                "User Adoption",
                "Continuous Improvement",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="managed-switch">
        <div className="container">
          <h2 className="managed-title">Athena Managed Services</h2>

          <div className="managed-layout">
             <div className="managed-tabs-wrapper">
              <div className="managed-tabs">
                {managedServices.map((item, i) => (
                  <button
                    key={i}
                    className={`managed-tab ${i === active ? "active" : ""}`}
                    onClick={() => handleManagedTabChange(i)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

             <div
              className={`managed-content ${isTransitioning ? "fade-out" : ""}`}
            >
              <div className="managed-image">
                <img src={service.image} alt={service.title} loading="lazy"/>
              </div>

              <div className="managed-text">
                <h3>{service.title}</h3>
                <p>{service.subtitle}</p>

                <ul>
                  {service.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="why-us">
        <div className="container why-us-grid">
           <div className="why-us-content">
            <span className="why-us-label">WHY US</span>
            <h2>Expertise, Innovation, and Global Excellence</h2>
            <p>
              At Athena, we blend deep industry expertise with a commitment to
              excellence, offering a comprehensive range of services tailored to
              meet your unique needs. From our origins in Fremont, California,
              to our global presence today, our track record of innovation and
              client satisfaction underscores why we are a trusted partner in
              technology and manufacturing solutions.
            </p>
            <Link href="/about" className="why-us-btn">
              See More
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <h2 className="testimonial-title">Meet Our Happy Customers</h2>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="embla__slide"
                onClick={() => router.push("/about")}
              >
                <div className="testimonial-card">
                  <img src={item.image} alt={item.name} className="avatar" loading="lazy" />
                  <h3>{item.name}</h3>
                  <div className="role">{item.role}</div>
                  <p className="testimonial-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-overlay" />

          <div className="cta-content">
            <h2>
              A New <br />
              Requirement?
            </h2>

            <p>
              Connect us for expert solutions in MES, PLM, ERP, and more. Reach
              out today. Our dedicated team is here to assist you!
            </p>

            <Link href="contact" className="cta-button">
              Contact Us
            </Link>

            <span className="cta-subtext">
              We typically respond within 24 hours.
            </span>
          </div>
        </div>
      </section>

      <section className="why-us-faq">
        <div className="container">
          <h2 className="faq-title">FAQ</h2>

          <div className="faq-grid">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <div className="faq-left">
                      <span className="faq-number">{i + 1}</span>
                      <span className="faq-text">{item.q}</span>
                    </div>

                    <span className="faq-arrow">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {isOpen && <p className="faq-answer">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
function TimelineStep({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="timeline-step">
      <div className="timeline-node">{icon}</div>

      <div className="timeline-content">
        <h3>{title}</h3>
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServiceTile({
  title,
  points,
  icon,
}: {
  title: string;
  points: string[];
  icon: string;
}) {
  return (
    <div className="managed-card">
      <div className="managed-icon">{icon}</div>
      <h3>{title}</h3>
      <ul>
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
