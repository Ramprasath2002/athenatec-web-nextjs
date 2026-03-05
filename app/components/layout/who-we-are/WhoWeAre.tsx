"use client";
import "./whoWeAre.scss";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function WhoWeAre() {
  return (
    <>
      <section className="who-we-are">
        <div className="container">
          {/* LEFT CONTENT */}
          <div className="who-content">
            <span className="section-eyebrow">Who We Are</span>

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
            <Link href="/about" className="who-button">
              Explore Us
            </Link>
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

      {/* PARTNERS SECTION */}
      <section className="partners">
        <div className="container">
          <h3 className="partners-title">
            Our Strategic Technology Partnerships
          </h3>

          <div className="partners-grid">
            {/* Siemens */}
            <div className="partner-card">
              <img
                src="/assets/images/images-3.webp"
                alt="Siemens"
                className="partner-logo"
              />

              <h4>Siemens Alliance Partner</h4>

              <p>
                As a trusted Siemens Alliance Partner, Athena boasts an
                excellent team specializing in the implementation and upgrade of
                Opcenter solutions, driving innovation and operational
                efficiency across industries including Semiconductor,
                Electronics, Medical Devices, Discrete Manufacturing, and Clean
                Energy.
              </p>
              <Link href="/siemens-opcenter-mes" className="partner-btn">
                Know More
              </Link>
            </div>

            {/* Critical Manufacturing */}
            <div className="partner-card">
              <img
                src="/assets/images/critical_manufacturing_logo-e1727901256634-1.webp"
                alt="Critical Manufacturing"
                className="partner-logo"
              />

              <h4>Critical Manufacturing Premier Partner</h4>

              <p>
                As a Critical Manufacturing Premier Partner, our certified team
                of experts specializes in implementing Critical Manufacturing
                MES, delivering customized solutions that ensure seamless
                integration and optimize performance throughout your entire
                manufacturing process.
              </p>

          

               <Link href="/critical-manufacturing" className="partner-btn">
                Know More
              </Link>
            </div>

            {/* Eyelit */}
            <div className="partner-card">
              <img
                src="/assets/images/00.webp"
                alt="Eyelit"
                className="partner-logo"
              />

              <h4>Eyelit Implementation Partner</h4>

              <p>
                As an implementation partner of Eyelit Technologies, Athena
                Technology Solutions brings extensive expertise in deploying
                both Eyelit MES and Equipment Connect across various industries
                such as semiconductor, solar, LED/laser diode, and medical
                devices.
              </p>

              <Link href="/eyelit" className="partner-btn">
                Know More
              </Link>
            </div>
            <div className="partner-card">
              <img
                src="/assets/Clients/twinzo-img.png"
                alt="Eyelit"
                className="partner-logo"
              />

              <h4>Twinzo Authorized Reseller Partner</h4>

              <p>
                Authorized Twinzo reseller and implementation partner providing
                industrial digital twin and smart factory solutions. We help
                manufacturers adopt real-time visualization, performance
                monitoring, and data-driven operations across sectors.
              </p>

             <Link href="/twinzo" className="partner-btn">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="what-we-do">
        <div className="what-container">
          {/* IMAGE SIDE */}
          <div className="what-media">
            <div className="what-image-wrapper">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-md"
              >
                <source
                  src="https://athenatec.com/wp-content/uploads/2024/07/aps.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* CONTENT SIDE */}
          <div className="what-content">
            <span className="section-eyebrow">WHAT WE DO</span>

            <h2 className="what-title">
              Comprehensive Professional <br /> and Managed Services
            </h2>

            <p className="what-text">
              Central to our expertise is a robust suite of professional
              services, focused on the end-to-end implementation of MES
              (Manufacturing Execution Systems), as well as PLM, ERP, CMMS,
              Smart Factory Analytics, and customized Managed Services, all
              engineered to enhance efficiency and drive digital transformation
              for our clients.
            </p>

            <div className="divider" />

            <div className="stats">
              <Counter label="Project Excellence" end={100} />
              <Counter label="Client Success Stories" end={60} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
function PartnerCard({
  logo,
  title,
  text,
}: {
  logo: string;
  title: string;
  text: string;
}) {
  return (
    <div className="partner-card">
      <img src={logo} alt={title} className="partner-logo" />
      <h4>{title}</h4>
      <p>{text}</p>
      <button className="partner-btn">Know More</button>
    </div>
  );
}

function ImageBlock() {
  return (
    <div className="what-image">
      <img
        src="\assets\images\who-we-do.jpg"
        alt="MES analytics and smart manufacturing"
      />
      <div className="image-overlay" />
    </div>
  );
}

/* ---------------- COUNTER ---------------- */

function Counter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let start = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / end), 15);

        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, stepTime);

        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="stat">
      <div className="stat-value">
        {count}
        <span>+</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
