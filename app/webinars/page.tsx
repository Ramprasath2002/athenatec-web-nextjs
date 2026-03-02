 
"use client";

import { useState } from "react";
import Link from "next/link";
import "./web.scss";
import HeroSection from "@/app/components/HeroSection";
import Image from "next/image";
type WebinarType = "live" | "ondemand";

interface Webinar {
  title: string;
  slug: string;
  image: string;
  type: WebinarType;
  date: string;
  time: string;
  description: string;
}

const webinarData: Webinar[] = [
  {
    title: "Gain End-to-End Visibility in Medical Device Manufacturin",
   slug: "medical-device-visibility",
    image: "/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp",
    type: "ondemand",
    date: "12 March 2026",
    time: "4:00 PM IST",
    description:
      " Watch the Webinar On-Demand",
  },
  {
    title: "Accelerate MedTech Manufacturing with a Modern MES Accelerator",
    slug: "medtech-mes-accelerator",
    image: "/assets/images/Accelerate-Medtech.webp",
    type: "live",
    date: "25 March 2026",
    time: "3:00 PM IST",
    description:
      "Learn how digital transformation streamlines production systems.",
  },
];

export default function Webinars() {
  const [filter, setFilter] = useState<"all" | WebinarType>("all");

  const filtered =
    filter === "all"
      ? webinarData
      : webinarData.filter((item) => item.type === filter);

  return (
    <>
      <HeroSection
        title="Webinars"
        description="Leave us a little info, and we’ll be in touch."
        image="/assets/images/webinars.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <div className="webinars-page">
        {/* HERO */}

        {/* FILTER */}
        <section className="webinars-filter">
          {["all", "live", "ondemand"].map((tab) => (
            <button
              key={tab}
              className={filter === tab ? "active" : "cursor-pointer"}
              onClick={() => setFilter(tab as any)}
            >
              {tab === "all"
                ? "All"
                : tab === "live"
                  ? "Upcoming"
                  : "On-Demand"}
            </button>
          ))}
        </section>

        {/* GRID */}
        <section className="webinars-grid">
          {filtered.map((webinar) => (
            <div key={webinar.slug} className="webinar-card">
              <div className="card-image">
                <Image src={webinar.image} width={400} height={300} alt={webinar.title} />
                <span className={`badge ${webinar.type}`}>
                  {webinar.type === "live" ? "LIVE" : "ON-DEMAND"}
                </span>
              </div>

              <div className="card-content">
                <h3>{webinar.title}</h3>
                <p>{webinar.description}</p>

                <div className="card-meta">
                  <span className="meta-item">
                    <Image src="/assets/icons/calendar.svg"  width={22} height={22} alt="calendar" />
                    {webinar.date}
                  </span>

                  <span className="meta-item">
                    <Image src="/assets/icons/clock.svg" width={22} height={22} alt="clock" />
                    {webinar.time}
                  </span>
                </div>

                <Link
                  href={`/webinars/${webinar.slug}`}
                  className="card-btn cursor-pointer"
                >
                  {webinar.type === "live" ? "Register Now →" : "Watch Now →"}
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
