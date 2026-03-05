"use client";

import React, { useState, useRef, useEffect } from "react";
import "./demo.scss";
import dynamic from "next/dynamic";

interface FormData {
  name: string;
  email: string;
  companyName: string;
  industry: string;
  country: string;
  demoSubject: string;
  comments: string;
  agreeToPolicy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  companyName?: string;
  industry?: string;
  country?: string;
  demoSubject?: string;
  agreeToPolicy?: string;
}

const INDUSTRY_OPTIONS = [
  "Semiconductor",
  "Electronics",
  "Medical Devices",
  "Discrete Manufacturing",
  "solar",
];

const DEMO_SUBJECT_OPTIONS = [
  "ECO Redliner",
  "Master Data Migrator",
  "Automation Scripting Tool",
];

function Speedometer() {
  const [needle, setNeedle] = useState(0);
  const [displayVal, setDisplayVal] = useState(0);
  const targetRef = useRef(78); // target % of full sweep

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;
    const target = targetRef.current;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setNeedle(current);
      setDisplayVal(Math.round(current * 3.2)); // map 0-100% → 0-320 km/h
      if (progress < 1) requestAnimationFrame(animate);
      else {
        let tick = 0;
        const idle = () => {
          tick += 0.04;
          const wobble = target + Math.sin(tick) * 1.5;
          setNeedle(wobble);
          setDisplayVal(Math.round(wobble * 3.2));
          requestAnimationFrame(idle);
        };
        requestAnimationFrame(idle);
      }
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), 400);
    return () => clearTimeout(timer);
  }, []);

  const CX = 100,
    CY = 110,
    R = 80;
  const START_DEG = 225; // bottom-left
  const SWEEP = 270; // degrees of arc

  const polar = (deg: number, radius = R) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
  };

  const arcPath = (startDeg: number, endDeg: number, r: number) => {
    const s = polar(startDeg, r);
    const e = polar(endDeg, r);
    const large = (endDeg - startDeg + 360) % 360 > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  // Zones: 0–60% cyan, 60–80% yellow, 80–100% red/pink
  const pctToDeg = (pct: number) => START_DEG + (SWEEP * pct) / 100;

  const ticks = Array.from({ length: 29 }, (_, i) => i); // 0..28 → 0..280 in steps of 10
  const needleDeg = pctToDeg(needle);
  const needleTip = polar(needleDeg, R * 0.82);
  const needleBase1 = polar(needleDeg + 90, 6);
  const needleBase2 = polar(needleDeg - 90, 6);

  return (
    <div className="speedo-wrap" aria-hidden="true">
      <svg viewBox="0 0 200 180" className="speedo-svg">
        <defs>
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-needle">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ff2fe" />
            <stop offset="60%" stopColor="#17ace4" />
            <stop offset="100%" stopColor="#0a3d5c" />
          </radialGradient>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a1e32" />
            <stop offset="100%" stopColor="#030e1a" />
          </radialGradient>
          <linearGradient id="needleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e040fb" />
          </linearGradient>
        </defs>

        {/* Outer atmosphere glow */}
        <circle
          cx={CX}
          cy={CY}
          r={R + 18}
          fill="none"
          stroke="rgba(0,200,224,0.08)"
          strokeWidth="14"
        />

        {/* Background disc */}
        <circle cx={CX} cy={CY} r={R + 4} fill="url(#bgGrad)" />

        {/* Track — full arc (dark) */}
        <path
          d={arcPath(START_DEG, START_DEG + SWEEP, R)}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Zone — cyan (0–60%) */}
        <path
          d={arcPath(pctToDeg(0), pctToDeg(60), R)}
          fill="none"
          stroke="#17ace4"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#glow-cyan)"
          strokeDasharray={
            needle >= 60 ? "none" : `${(needle / 60) * 100}% 200%`
          }
          opacity={needle > 0 ? 1 : 0}
          style={{ transition: "opacity 0.3s" }}
        />

        {/* Zone — yellow (60–80%) */}
        <path
          d={arcPath(pctToDeg(60), pctToDeg(80), R)}
          fill="none"
          stroke="#f5c518"
          strokeWidth="10"
          strokeLinecap="round"
          opacity={needle >= 65 ? 0.9 : 0}
          style={{ transition: "opacity 0.3s" }}
        />

        {/* Zone — red/pink (80–100%) */}
        <path
          d={arcPath(pctToDeg(80), pctToDeg(100), R)}
          fill="none"
          stroke="#e040fb"
          strokeWidth="10"
          strokeLinecap="round"
          opacity={needle >= 82 ? 0.95 : 0}
          style={{ transition: "opacity 0.3s" }}
        />

        {/* Tick marks */}
        {ticks.map((i) => {
          const pct = (i / 28) * 100;
          const deg = pctToDeg(pct);
          const outer = polar(deg, R + 2);
          const inner = polar(deg, R - (i % 4 === 0 ? 14 : 8));
          const isMajor = i % 4 === 0;
          const color = pct < 60 ? "#17ace4" : pct < 80 ? "#f5c518" : "#e040fb";
          return (
            <line
              key={i}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke={color}
              strokeWidth={isMajor ? 2 : 1}
              opacity={isMajor ? 0.9 : 0.4}
            />
          );
        })}

        {/* Speed labels at major ticks */}
        {[0, 40, 80, 120, 160, 200, 240, 280].map((val, idx) => {
          const pct = (idx / 7) * 100;
          const deg = pctToDeg(pct);
          const pt = polar(deg, R - 22);
          return (
            <text
              key={val}
              x={pt.x}
              y={pt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fill="rgba(180,210,255,0.7)"
              fontFamily="monospace"
            >
              {val}
            </text>
          );
        })}

        {/* Needle */}
        <polygon
          points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`}
          fill="url(#needleGrad)"
          filter="url(#glow-needle)"
          opacity="0.95"
        />

        {/* Center hub */}
        <circle
          cx={CX}
          cy={CY}
          r={10}
          fill="#0a1e32"
          stroke="rgba(0,200,224,0.6)"
          strokeWidth="1.5"
        />
        <circle cx={CX} cy={CY} r={5} fill="url(#coreGrad)" />

        {/* Digital readout */}
        <rect
          x={CX - 26}
          y={CY + 20}
          width={52}
          height={22}
          rx={4}
          fill="rgba(0,0,0,0.6)"
          stroke="rgba(0,200,224,0.3)"
          strokeWidth="1"
        />
        <text
          x={CX}
          y={CY + 35}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13"
          fill="#00e5ff"
          fontFamily="monospace"
          fontWeight="bold"
          letterSpacing="1"
        >
          {displayVal}
        </text>

        {/* km/h label */}
        <text
          x={CX}
          y={CY + 52}
          textAnchor="middle"
          fontSize="6"
          fill="rgba(170,200,255,0.6)"
          fontFamily="monospace"
          letterSpacing="1"
        >
          KM / S
        </text>

        {/* REDLINE label arc top */}
        <text
          x={CX}
          y={CY - R - 10}
          textAnchor="middle"
          fontSize="7"
          fill="rgba(224,64,251,0.65)"
          fontFamily="monospace"
          letterSpacing="3"
        >
          REDLINE
        </text>
      </svg>
      {/* Diagonal speed streaks behind orb */}
      <div className="speedo-streaks" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`speedo-streak speedo-streak--${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function GetADemoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    industry: "",
    country: "",
    demoSubject: "",
    comments: "",
    agreeToPolicy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email.";
    if (!formData.companyName.trim())
      e.companyName = "Company name is required.";
    if (!formData.industry) e.industry = "Please select an industry.";
    if (!formData.country.trim()) e.country = "Country is required.";
    if (!formData.demoSubject) e.demoSubject = "Please select a demo subject.";
    if (!formData.agreeToPolicy)
      e.agreeToPolicy = "You must agree to the privacy policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="demo-page">
      {/* ══════════ HERO BANNER ══════════ */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__teal-wash" />

        {/* Diagonal speed lines */}
        <div className="hero__streaks" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`hero__streak hero__streak--${i + 1}`} />
          ))}
        </div>

        {/* LEFT — text copy */}
        <div className="hero__copy">
          <h1 className="hero__title">
            Athena Accelerator
            <br />
            Get a Demo
          </h1>
          <p className="hero__desc">
            Leave us a little info, and we'll be in touch — our team moves fast.
          </p>
          <div className="hero__actions">
            <button className="hero-cta hero-cta--solid" onClick={scrollToForm}>
              Fill Out the Form
            </button>
            <a
              href="mailto:info@athenatec.com"
              className="hero-cta hero-cta--outline"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* RIGHT — Speedometer */}
        <Speedometer />
      </section>

      {/* ══════════ FORM SECTION ══════════ */}
      <section className="fs" ref={formRef}>
        <div className="fs__inner">
          <div className="fs__heading">
            <h2>Fill out the form below to get a demo</h2>
          </div>

          <div className="fs__body">
            {/* ── LEFT — image panel ── */}
            <div className="fs__image-panel">
              {/* Grid overlay */}
              <div className="fip__grid" aria-hidden="true" />

              {/* Glow orbs */}
              <div className="fip__orb fip__orb--1" aria-hidden="true" />
              <div className="fip__orb fip__orb--2" aria-hidden="true" />

              {/* Animated scan line */}
              <div className="fip__scan" aria-hidden="true" />

              {/* Content */}
              <div className="fip__content">
                <div className="fip__image-wrap">
                  <img
                    src="/assets/images/demo/demo-team.webp"
                    alt="Team working together"
                    className="fip__image"
                  />
                </div>
              </div>
            </div>

            {/* ── RIGHT — Form card ── */}
            <div className="fs__card">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success__ico">
                    <svg viewBox="0 0 52 52" fill="none">
                      <circle
                        cx="26"
                        cy="26"
                        r="25"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M14 26l8 8 16-16"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3>Request Submitted!</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Our team will
                    reach out to <strong>{formData.email}</strong> within 1
                    business day.
                  </p>
                  <button
                    className="submit-btn"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        companyName: "",
                        industry: "",
                        country: "",
                        demoSubject: "",
                        comments: "",
                        agreeToPolicy: false,
                      });
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="demo-form">
                  <div className="frow frow--2">
                    <div className={`field ${errors.name ? "field--err" : ""}`}>
                      <label htmlFor="name">
                        Name <span className="req">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span className="ferr">
                          <ErrIco />
                          {errors.name}
                        </span>
                      )}
                    </div>
                    <div
                      className={`field ${errors.email ? "field--err" : ""}`}
                    >
                      <label htmlFor="email">
                        Email <span className="req">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <span className="ferr">
                          <ErrIco />
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="frow frow--2">
                    <div
                      className={`field ${errors.companyName ? "field--err" : ""}`}
                    >
                      <label htmlFor="companyName">
                        Company Name <span className="req">*</span>
                      </label>
                      <input
                        id="companyName"
                        name="companyName"
                        type="text"
                        placeholder="Your Company"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                      {errors.companyName && (
                        <span className="ferr">
                          <ErrIco />
                          {errors.companyName}
                        </span>
                      )}
                    </div>
                    <div
                      className={`field field--sel ${errors.industry ? "field--err" : ""}`}
                    >
                      <label htmlFor="industry">
                        Industry <span className="req">*</span>
                      </label>
                      <div className="sel-wrap">
                        <select
                          id="industry"
                          name="industry"
                          value={formData.industry}
                          onChange={handleChange}
                        >
                          <option value="">Select industry…</option>
                          {INDUSTRY_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevDown />
                      </div>
                      {errors.industry && (
                        <span className="ferr">
                          <ErrIco />
                          {errors.industry}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="frow frow--2">
                    <div
                      className={`field ${errors.country ? "field--err" : ""}`}
                    >
                      <label htmlFor="country">
                        Country <span className="req">*</span>
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        placeholder="Your Country"
                        value={formData.country}
                        onChange={handleChange}
                        autoComplete="country-name"
                      />
                      {errors.country && (
                        <span className="ferr">
                          <ErrIco />
                          {errors.country}
                        </span>
                      )}
                    </div>
                    <div
                      className={`field field--sel ${errors.demoSubject ? "field--err" : ""}`}
                    >
                      <label htmlFor="demoSubject">
                        Demo Subject <span className="req">*</span>
                      </label>
                      <div className="sel-wrap">
                        <select
                          id="demoSubject"
                          name="demoSubject"
                          value={formData.demoSubject}
                          onChange={handleChange}
                        >
                          <option value="">Select subject…</option>
                          {DEMO_SUBJECT_OPTIONS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                        <ChevDown />
                      </div>
                      {errors.demoSubject && (
                        <span className="ferr">
                          <ErrIco />
                          {errors.demoSubject}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="comments">Comments</label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={4}
                      placeholder="Any comments regarding demo…"
                      value={formData.comments}
                      onChange={handleChange}
                    />
                  </div>

                  <p className="form-legal">
                    By submitting this form, you agree to receive communications
                    with related content from Athena Accelerators and can
                    unsubscribe at any time. For more information on our{" "}
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Privacy Policy
                    </a>
                    , click here.
                  </p>

                  <div
                    className={`field field--check ${errors.agreeToPolicy ? "field--err" : ""}`}
                  >
                    <label className="chk-label" htmlFor="agreeToPolicy">
                      <input
                        id="agreeToPolicy"
                        name="agreeToPolicy"
                        type="checkbox"
                        checked={formData.agreeToPolicy}
                        onChange={handleChange}
                      />
                      <span className="chk-box" />
                      <span className="chk-txt">
                        I agree <span className="req">*</span>
                      </span>
                    </label>
                    {errors.agreeToPolicy && (
                      <span className="ferr">
                        <ErrIco />
                        {errors.agreeToPolicy}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`submit-btn ${submitting ? "submit-btn--busy" : ""}`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Request My Demo
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ChevDown() {
  return (
    <svg className="sel-arrow" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ErrIco() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}
