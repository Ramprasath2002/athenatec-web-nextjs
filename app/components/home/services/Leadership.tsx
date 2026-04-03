"use client";

import "./leadership.scss";
import Image from "next/image";

type Leader = {
  name: string;
  role: string;
  image: string;
  bio?: string;
};

export default function Leadership() {
  const leadershipTeam: Leader[] = [
    {
      name: "Senthil Ranganathan",
      role: "Founder & CEO",
      image: "/assets/images/Senthil.webp",
      bio: "Visionary leader with over two decades of experience driving digital manufacturing and MES transformations globally.",
    },
    {
      name: "Peter Nakaso",
      role: "VP of Sales",
      image: "/assets/images/Peter-Picture.webp",
      bio: "Sales strategist focused on enterprise manufacturing solutions, partnerships, and global revenue growth.",
    },
    {
      name: "Sachi Javli",
      role: "Managing Director & Global Delivery",
      image: "/assets/images/Sachii.webp",
      bio: "Leads global delivery and execution with a strong focus on operational excellence and customer success.",
    },
    {
      name: "Chaitra Raviprakash",
      role: "Director of Manufacturing Systems (Opcenter COE) & Site Head",
      image: "/assets/images/Media.webp",
      bio: "Experienced leader driving MES implementations and smart manufacturing initiatives.",
    },
  ];

  const advisoryBoard: Leader[] = [
    {
      name: "Maryanne Steidinger",
      role: "Advisor",
      image:
        "/assets/images/IMG_4310-2021_12_09-22_37_18-UTC-e1748495136653.webp",
      bio: "Maryanne Steidinger is a member of Athena's Advisory Board. She concentrates on partner strategy, encompassing go to market, strategic alliances, marketing and positioning. Maryanne has a strong background in operational software (MES) and industrial controls, spending over 35 years in marketing and partner management with companies including Siemens, Rockwell and Schneider Electric.",
    },
    {
      name: "ED Mathias",
      role: "Advisor",
      image: "/assets/images/ed-mathias.webp",
      bio: "Ed Mathias is an Advisor at Athena Technology Solutions, bringing decades of leadership experience in manufacturing operations and systems integration. Since joining Athena in 2017, Ed has played a key role in guiding strategic initiatives and ensuring operational alignment with customer expectations. With a strong focus on lean principles and data-driven decision-making, Ed helps Athena maintain transparency and efficiency across its delivery processes.",
    },
  ];

  return (
    <section className="leadership">
      {/* ── Decorative Background Elements ── */}
      <div className="glow-shape shape-1"></div>
      <div className="glow-shape shape-2"></div>

      {/* Center Logo Watermark */}
      <div className="bg-logo-watermark">
        <Image src="/assets/images/logo.webp" alt="Athena Watermark" fill className="watermark-img" unoptimized />
      </div>

      <div className="decorative-side left">
        <span className="watermark">ATHENA</span>
      </div>
      <div className="decorative-side right">
        <span className="watermark">LEADERS</span>
      </div>

      <div className="container">
        {/* ── Leadership Team ── */}
        <div className="header">
          <h2>Meet Our Leadership Team</h2>
          <p>
            Meet the visionaries behind our success. Our leadership team brings
            a wealth of experience, expertise, and a commitment to driving
            innovation and excellence in every aspect of our business.
          </p>
        </div>

        <div className="leadership-grid">
          {leadershipTeam.map((leader, i) => (
            <div className="flip-card" key={i}>
              <div className="flip-inner">
                <div className="flip-front">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 580px"
                    className="leader-img"
                    quality={80}
                  />
                  <div className="overlay">
                    <h4>{leader.name}</h4>
                    <span>{leader.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Advisory Board ── */}
        <div className="header advisory-header">
          <h2>Advisory Board</h2>
          <p>
            Our advisory board provides strategic guidance, industry insight,
            and long-term vision to support Athena's growth.
          </p>
        </div>

        <div className="advisory-list">
          {advisoryBoard.map((advisor, i) => (
            <div className="advisory-card" key={i}>
              <div className="advisory-image">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  width={280}
                  height={280}
                  sizes="(max-width: 900px) 100vw, 280px"
                  className="advisor-img"
                  quality={80}
                />
              </div>
              <div className="advisory-content">
                <h3>{advisor.name}</h3>
                <h4>{advisor.role}</h4>
                <p>{advisor.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}