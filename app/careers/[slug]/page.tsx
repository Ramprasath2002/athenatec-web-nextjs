import Link from "next/link";
import { jobs } from "@/app/data/jobs";
import "./job-details.scss";
import ApplyForm from "./ApplyForm";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return <div style={{ padding: "100px" }}>Job Not Found</div>;
  }

  return (
    <div className="job-details-page">
      <div className="container job-layout">
         <div className="job-info">
          <h1>{job.title}</h1>

          <div className="meta">
            <p>
              <strong>Job Type:</strong> {job.type}
            </p>
            <p>
              <strong>Experience:</strong> {job.experience}
            </p>
            <p>
              <strong>Location:</strong> {job.locations.join(", ")}
            </p>
          </div>

          <p className="overview">{job.overview}</p>

          <h3 className="font-bold py-5">Key Responsibilities</h3>
          <ul className="description-list">
            {job.responsibilities?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3  className="font-bold py-5">Requirements</h3>
          <ul className="description-list">
            {job.requirements?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <ApplyForm />
      </div>
    </div>
  );
}
