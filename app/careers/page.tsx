"use client";

import { useState } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import "./career.scss";
import HeroSection from "../components/HeroSection";
import { jobs } from "@/app/data/jobs";

// const jobs = [
//   {
//     slug: "rag-system-expert",
//     title: "RAG System Expert for AI/ML Chatbot Development",
//     locations: ["Bangalore", "Chennai"],
//   },
//   {
//     slug: "oracle-technical-scm",
//     title: "Oracle Technical Requirement with SCM Modules",
//     locations: ["Bangalore", "Chennai", "Hyderabad", "Pune"],
//   },
//   {
//     slug: "dotnet-developer",
//     title: ".NET Developer",
//     locations: ["Chennai", "India"],
//   },
// ];

export default function CareersPage() {
  const [selectedLocation, setSelectedLocation] = useState("All");

  const filteredJobs =
    selectedLocation === "All"
      ? jobs
      : jobs.filter((job) => job.locations.includes(selectedLocation));

  return (
    <div className="careers-page">
      <HeroSection
        title="Join Our Team"
        description="We build intelligent manufacturing solutions with a culture that values innovation, ownership, and trust."
        image="/assets/images/careerbanner.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />

{/* FILTER */}
<section className="careers-filter">
  <div className="container filter-wrapper">

    <div className="select-group">
      <label>Job Type</label>
      <select>
        <option>All Job Type</option>
        <option>Full Time</option>
      </select>
    </div>

    <div className="select-group">
      <label>Location</label>
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="All">All Job Location</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Pune">Pune</option>
        <option value="India">India</option>
      </select>
    </div>

  </div>
</section>

       <section className="careers-jobs">
        <div className="container jobs-grid">
          {filteredJobs.length === 0 ? (
            <p className="no-jobs">No openings available for this location.</p>
          ) : (
            filteredJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>

                <div className="location">
                  <MapPin size={18} />
                  <span>{job.locations.join(", ")}</span>
                </div>

                <Link href={`/careers/${job.slug}`} className="details-link">
                  {" "}
                  More Details
                  <ChevronRight size={18} />
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

       <section className="careers-culture">
        <div className="container">
          <h2>Our Culture</h2>
          <p>
            Athena Technology has a performance-based culture that talented
            people find very attractive. Employees share a sense of community
            and work in an environment that values intelligence and innovation.
            You will find yourself working with some of the brightest and the
            best – in a company that has complete trust in you and your
            capabilities.
          </p>
        </div>
      </section>
    </div>
  );
}
