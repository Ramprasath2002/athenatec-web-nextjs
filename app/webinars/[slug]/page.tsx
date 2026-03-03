import Image from "next/image";
import { notFound } from "next/navigation";
import "./webinar.scss";

interface PageProps {
  params: Promise<{ slug: string }>;
}
const webinarPages: Record<string, any> = {
  "medical-device-visibility": {
    title: "Gain End-to-End Visibility in Medical Device Manufacturing",
    heroImage:
      "/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp",
    heading: "Stop Manufacturing Blind Spots",
    description:
      "Get instant access to the full webinar recording, slides, and key insights from industry experts at Critical Manufacturing, Athena Technology Solutions, and Twinzo.",
  },

  "medtech-mes-accelerator": {
    title: "Accelerate MedTech Manufacturing with a Modern MES Accelerator",
    heroImage: "/assets/images/Medtech.webp",
    heading: "Accelerate Production with Smart MES",
    description:
      "Discover how digital transformation streamlines production systems.",
  },
};
export default async function WebinarSinglePage({ params }: PageProps) {
  const { slug } = await params;

  if (slug === "medical-device-visibility") {
    return <MedicalVisibilityLayout />;
  }

  if (slug === "medtech-mes-accelerator") {
    return <MedtechMESLayout />;
  }

  return notFound();
}

function MedicalVisibilityLayout() {
  return (
    <>
      <section className="single-hero">
        <Image
          src="/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp"
          alt="Medical Device Visibility"
          fill
          priority
          className="hero-img"
        />
        <div className="overlay" />
        <div className="hero-content">
          <h1>Gain End-to-End Visibility in Medical Device Manufacturing</h1>
        </div>
      </section>
      <section className="single-content">
        <div className="content-grid">
          <div className="image-side">
            <Image
              src="/assets/images/Medical-Device-Manufacturing-5.webp"
              alt="{data.title}"
              width={600}
              height={400}
            />
          </div>

          <div className="text-side">
            <h2>Stop Manufacturing Blind Spots</h2>
            <p>
              Get instant access to the full webinar recording, slides, and key
              insights from industry experts at Critical Manufacturing, Athena
              Technology Solutions, and Twinzo.
            </p>

            <a
              href="https://zoom.us/rec/share/IPqPCIvoKLPUDAj8UkwaYArrT8lLUTe1ZTs7cv63Cvp_xT-727JtF97t0o5OzEtT.OZG81X_pSQ8vnj8t"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Download the Full Webinar Now
            </a>
          </div>
        </div>
      </section>
      <section className="challenge-section">
        <div className="challenge-container">
          <div className="challenge-header">
            <h2>How Do We Solve Our Biggest Operational Challenges?</h2>
            <p>
              If you’re navigating the relentless pressures of speed, quality,
              and compliance, you’re not alone. This webinar was created for
              leaders facing:
            </p>
          </div>

          <div className="challenge-list">
            <div className="challenge-item">
              <span>01</span>
              <p>Time-to-Market Delays from siloed data.</p>
            </div>

            <div className="challenge-item">
              <span>02</span>
              <p>Unpredictable Yield & Uptime.</p>
            </div>

            <div className="challenge-item">
              <span>03</span>
              <p>Spiraling Costs from quality events and scrap.</p>
            </div>

            <div className="challenge-item">
              <span>04</span>
              <p>
                The constant burden of Audit Readiness & Regulatory Compliance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="solution-section">
        <div className="solution-container">
          <div className="solution-content">
            <span className="solution-tag">Webinar Session</span>

            <h2>
              The Solution Explored: A Unified Tech Stack for True Visibility
            </h2>

            <p>
              In this 45-minute session, our experts provide a clear roadmap to
              an intelligent, transparent operation. This is your chance to see
              the integrated solution in action.
            </p>

            <a
              href="https://zoom.us/rec/share/IPqPCIvoKLPUDAj8UkwaYArrT8lLUTe1ZTs7cv63Cvp_xT-727JtF97t0o5OzEtT.OZG81X_pSQ8vnj8t"
              target="_blank"
              rel="noopener noreferrer"
              className="solution-btn"
            >
              Download the Full Webinar Now
            </a>
          </div>

          <div className="solution-image">
            <Image
              src="/assets/images/shutterstock_1096141913.webp"
              alt="Manufacturing Automation"
              width={600}
              height={450}
            />
          </div>
        </div>
      </section>
      <section className="learn-section">
        <div className="learn-container">
          <div className="learn-header">
            <h2>What You'll Learn in This Webinar Recording</h2>
            <p>Watch the recording to get a detailed breakdown of:</p>
          </div>

          <div className="learn-grid">
            <div className="learn-item">
              <span>01</span>
              <p>
                <strong>The Automated Foundation:</strong> How Critical
                Manufacturing’s MES creates the backbone for flawless
                traceability and automated compliance (FDA 21 CFR Part 820,
                MDR/IVDR).
              </p>
            </div>

            <div className="learn-item">
              <span>02</span>
              <p>
                <strong>The Connective Tissue:</strong> Why Athena Technology
                Solutions’ expert implementation is critical for seamless
                integration across ERP, PLM, and QMS to eliminate data silos.
              </p>
            </div>

            <div className="learn-item">
              <span>03</span>
              <p>
                <strong>The Living Intelligence Layer:</strong> How Twinzo’s
                real-time 3D Digital Twin visualizes your entire operation to
                optimize capacity and enable predictive decision-making
              </p>
            </div>

            <div className="learn-item">
              <span>04</span>
              <p>
                <strong>Unified Live Demonstration:</strong> See a real-world
                scenario where these technologies unite to detect, analyze, and
                resolve a non-conformance event—minimizing downtime and
                protecting quality.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="speakers-section">
        <div className="speakers-container">
          <div className="speakers-header">
            <h2>Featured Expert Speakers</h2>
          </div>

          <div className="speakers-grid">
            <div className="speaker-card">
              <h3>Will Trodon</h3>
              <p>
                Sales Leader | Partners and Alliances, Critical Manufacturing
              </p>
            </div>

            <div className="speaker-card">
              <h3>Jason Adams</h3>
              <p>
                Global Vice President, Industry, Athena Technology Solutions
              </p>
            </div>

            <div className="speaker-card">
              <h3>Tomas Vojtek</h3>
              <p>Chief Strategy Officer, Twinzo</p>
            </div>
          </div>
        </div>
      </section>
      <section className="audience-section">
        <div className="audience-container">
          <div className="audience-image">
            <Image
              src="/assets/images/AdobeStock_819976268-scaled-1.webp"
              alt="Manufacturing Line"
              width={650}
              height={450}
            />
          </div>

          <div className="audience-content">
            <h2>This Webinar is Essential For:</h2>

            <div className="audience-list">
              <div className="audience-item">
                <span>01</span>
                <p>
                  VPs & Directors of Manufacturing, Operations, and Engineering
                </p>
              </div>

              <div className="audience-item">
                <span>02</span>
                <p>Heads of Quality Assurance & Regulatory Compliance</p>
              </div>

              <div className="audience-item">
                <span>03</span>
                <p>Digital Transformation and Industry 4.0 Leads</p>
              </div>

              <div className="audience-item">
                <span>04</span>
                <p>Operations & Plant Managers</p>
              </div>

              <div className="audience-item">
                <span>05</span>
                <p>IT Leaders supporting manufacturing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="takeaways-section">
        <div className="takeaways-container">
          <div className="takeaways-header">
            <h2>Key Takeaways You'll Gain</h2>
            <p>By watching, you will understand how to:</p>
          </div>

          <div className="takeaways-grid">
            <div className="takeaway-item">
              <span>01</span>
              <p>
                Reduce Time-to-Market with streamlined, automated processes.
              </p>
            </div>

            <div className="takeaway-item">
              <span>02</span>
              <p>Maximize Yield & Uptime through real-time monitoring.</p>
            </div>

            <div className="takeaway-item">
              <span>03</span>
              <p>Control Costs by minimizing scrap and unplanned downtime.</p>
            </div>

            <div className="takeaway-item">
              <span>04</span>
              <p>Automate Compliance and ensure 24/7 audit readiness.</p>
            </div>

            <div className="takeaway-item">
              <span>05</span>
              <p>
                Leverage Predictive AI & Data Analytics to become proactive.
              </p>
            </div>
          </div>

          <div className="takeaways-cta">
            <a
              href="https://zoom.us/rec/share/IPqPCIvoKLPUDAj8UkwaYArrT8lLUTe1ZTs7cv63Cvp_xT-727JtF97t0o5OzEtT.OZG81X_pSQ8vnj8t"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn"
            >
              Download the Full Webinar Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function MedtechMESLayout() {
  return (
    <>
      <section className="single-hero">
        <Image
          src="/assets/images/Gain-End-to-End-Visibility-in-Medical-Device.webp"
          alt="Medical Device Visibility"
          fill
          priority
          className="hero-img"
        />
        <div className="overlay" />
        <div className="hero-content">
          <h1>
            Download Webinar : Accelerate MedTech Manufacturing with a Modern
            MES Accelerator
          </h1>
        </div>
      </section>

      <section className="mes-hero">
        <div className="mes-hero-container">
          <div className="mes-hero-image">
            <Image
              src="/assets/images/MV.webp"
              alt="MES Accelerator"
              width={750}
              height={600}
              className="mes-img"
            />
          </div>

          <div className="mes-hero-content">
            <h1>Is Manual Testing Holding Your MedTech Innovation Back?</h1>

            <h3 className="sub-heading">
              Stop Letting Manual Processes Dictate Your Pace
            </h3>

            <p>
              In the race to bring life-saving MedTech innovations to market,
              speed and compliance are non-negotiable. Yet, many manufacturers
              are trapped by outdated, manual testing and validation methods
              that create bottlenecks and introduce risk.
            </p>

            <ul className="hero-list">
              <li>Painfully slow time-to-market</li>
              <li>The constant threat of human error in documentation.</li>
              <li>A compliance tracking nightmare.</li>

            </ul>
            <p>....then our recently concluded webinar is for you.</p>
          </div>
        </div>
      </section>
      <section className="mes-discovery-section">
  <div className="mes-container">

    {/* TOP INTRO BLOCK */}
    <div className="discovery-intro">
      <h2>You Will Discover</h2>

      <div className="intro-grid">
        <div>
          <h4>The True Cost of Inefficiency</h4>
          <p>
            Understand how manual processes create delays, increase human error,
            and make compliance tracking a nightmare—costing millions and slowing
            your time-to-market.
          </p>
        </div>

        <div>
          <h4>The Industry Reality</h4>
          <p>
            See why MedTech needs speed without compromising compliance,
            and how disconnected systems are holding manufacturers back.
          </p>
        </div>
      </div>
    </div>

    {/* BOTTOM SPLIT BLOCK */}
    <div className="solution-split">
      <div className="solution-content">
        <h2>The Modern Solution: A Path to Digital Control</h2>

        <p>
          Get a live introduction to the Modern MES Accelerator for MedTech—
          a plug-and-play solution designed to:
        </p>

        <ul>
          <li>1. Automate testing and traceability</li>
          <li>2. Simplify compliance documentation</li>
          <li>3. Integrate seamlessly with existing systems</li>
          <li>4. Accelerate new device introduction</li>
        </ul>
      </div>

      <div className="solution-image">
        <Image
          src="/assets/images/Medtech.webp"
          alt="Modern MES Solution"
          width={700}
          height={550}
        />
      </div>
    </div>

  </div>
</section>
<section className="webinar-form-split">
  <div className="split-container">

    {/* LEFT IMAGE */}
    <div className="split-image">
      <Image
        src="/assets/images/form-img.webp"
        alt="MedTech"
        fill
        className="split-img"
      />
    </div>

    {/* RIGHT FORM */}
    <div className="split-form">
      <div className="form-inner">
        <h2>Fill out the form below to view the webinar</h2>

        <form className="webinar-form">
          <div className="form-group">
            <label>Name*</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Email*</label>
            <input type="email" />
          </div>

          <div className="form-group">
            <label>Company Name*</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Job Title*</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Industry*</label>
            <select>
              <option>Medical Devices</option>
            </select>
          </div>

          <div className="form-checkbox">
            <input type="checkbox" />
            <span>
              I would like to receive relevant updates and resources from Athena Technology Solutions.
            </span>
          </div>

          <p className="form-note">
            By registering, you agree to our Privacy Policy and consent to receive
            communications about this event and related content.
          </p>

          <div className="form-checkbox">
            <input type="checkbox" />
            <span>I agree*</span>
          </div>

          <button className="submit-btn">
            Click here to view the Webinar
          </button>
        </form>
      </div>
    </div>

  </div>
</section>
    </>
  );
}
