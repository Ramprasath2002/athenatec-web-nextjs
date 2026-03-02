"use client";

import "./leadership.scss";

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
      image: "/assets/images/CEO.webp",
      bio: "Visionary leader with over two decades of experience driving digital manufacturing and MES transformations globally.",
    },
    {
      name: "Peter Nakaso",
      role: "VP of Sales",
      image:
        "/assets/images/Peter-Picture.webp",
      bio: "Sales strategist focused on enterprise manufacturing solutions, partnerships, and global revenue growth.",
    },
    {
      name: "Jason Adams",
      role: "Global Vice President, Industry",
      image: "/assets/images/GV.webp",
      bio: "Industry expert helping manufacturers adopt smart factory and Industry 4.0 practices at scale.",
    },
    {
      name: "Sachi Javli",
      role: "Managing Director & Global Delivery",
      image:
        "/assets/images/409933-e1754047370496.webp",
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
      bio: "Maryanne Steidinger is a member of Athena’s Advisory Board. She concentrates on partner strategy, encompassing go to market, strategic alliances, marketing and positioning. Maryanne has a strong background in operational software (MES) and industrial controls, spending over 35 years in marketing and partner management with companies including Siemens, Rockwell and Schneider Electric.",
    },
    {
      name: "ED Mathias",
      role: "Advisor",
      image: "/assets/images/ed-mathias.webp",
      bio: "Ed Mathias is an Advisor at Athena Technology Solutions, bringing decades of leadership experience in manufacturing operations and systems integration. Since joining Athena in 2017, Ed has played a key role in guiding strategic initiatives and ensuring operational alignment with customer expectations.With a strong focus on lean principles and data-driven decision-making, Ed helps Athena maintain transparency and efficiency across its delivery processes.",
    },
  ];

  const centeredLeaders = leadershipTeam.filter(
    (l) => l.name === "Sachi Javli" || l.name === "Chaitra Raviprakash",
  );

  const gridLeaders = leadershipTeam.filter(
    (l) => !centeredLeaders.includes(l),
  );

  const renderGrid = (data: Leader[]) => (
    <div className="leadership-grid">
      {data.map((leader, i) => (
        <div className="flip-card" key={i}>
          <div className="flip-inner">
            <div className="flip-front">
              <img src={leader.image} alt={leader.name} />
              <div className="overlay">
                <h4>{leader.name}</h4>
                <span>{leader.role}</span>
              </div>
            </div>

            <div className="flip-back">
              <h4>{leader.name}</h4>
              <p>{leader.bio ?? "Profile coming soon."}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="leadership">
      <div className="container">
        {/* LEADERSHIP */}
        <div className="header">
          <h2>Meet Our Leadership Team</h2>
          <p>
            Meet the visionaries behind our success. Our leadership team brings
            a wealth of experience, expertise, and a commitment to driving
            innovation and excellence in every aspect of our business.
          </p>
        </div>

        {renderGrid(leadershipTeam)}

        {/* ADVISORY BOARD */}
        <div className="header advisory-header">
          <h2>Advisory Board</h2>
          <p>
            Our advisory board provides strategic guidance, industry insight,
            and long-term vision to support Athena’s growth.
          </p>
        </div>

        <div className="advisory-list">
          {advisoryBoard.map((advisor, i) => (
            <div className="advisory-card" key={i}>
              {/* LEFT IMAGE */}
              <div className="advisory-image">
                <img src={advisor.image} alt={advisor.name} />
              </div>

              {/* RIGHT CONTENT */}
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
