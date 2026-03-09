"use client"
import { useState } from "react";

type CaseStudyType = {
  slug: string;
  fullTitle: string;
  image: string;
  description: string;
};

type Props = {
  study: CaseStudyType;
};

type FormData = {
  fullName: string;
  email: string;
  companyName: string;
  industry: string;
  country: string;
  agree: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INDUSTRIES = ["Semiconductor", "Electronics", "Medical Devices", "Discrete Manufacturing", "Solar",];
const COUNTRIES = ["USA", "India", "China", "United Kingdom", "Canada", "California", "Singapore", "Other"];

// ── CHANGE THIS to your WordPress site URL ──────────────
const WP_API_URL = "https://your-wordpress-site.com/wp-json/athena/v1/case-study-form";

export default function CaseStudy({ study }: Props) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    companyName: "",
    industry: "",
    country: "",
    agree: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.companyName.trim()) {
      errs.companyName = "Company name is required.";
    }

    if (!formData.industry) {
      errs.industry = "Please select your industry.";
    }

    if (!formData.country) {
      errs.country = "Please select your country.";
    }

    if (!formData.agree) {
      errs.agree = "You must agree to receive communications.";
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear submit-level error when user edits anything
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch(WP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          industry: formData.industry,
          country: formData.country,
          caseStudyTitle: study.fullTitle,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to submit. Please check your connection and try again.";
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="case-study">
       <div className="cs-bg-orb cs-bg-orb--1" />
      <div className="cs-bg-orb cs-bg-orb--2" />

      <div className="case-container">
         <div className="case-intro">
          <h2>{study.fullTitle}</h2>
          <p>{study.description}</p>
        </div>

         <div className="download-wrapper">
          <div className="download-card">
             <div className="download-image">
              <img
                src={study.image || "/assets/images/download-preview.jpg"} loading="lazy"
                alt={study.fullTitle}
              />
              <div className="download-image__overlay">
                <div className="overlay-badge">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Featured Research</span>
                </div>
                
              </div>
            </div>

             <div className="download-content">
              {submitted ? (
                <div className="success-state">
                  <div className="success-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3>You're all set!</h3>
                  <p>
                    Your download link has been sent to <strong>{formData.email}</strong>. Check your inbox in the next few minutes.
                  </p>
                  <button className="download-btn" onClick={() => setSubmitted(false)}>
                    Download Another
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-header">
                    <h3>Download the Full Case Study</h3>
                    <p>
                      Fill out the form to access the complete document and learn how Athena implemented this solution.
                    </p>
                  </div>

                  <form className="download-form" onSubmit={handleSubmit} noValidate>
                     <div className={`form-field ${errors.fullName ? "form-field--error" : formData.fullName ? "form-field--valid" : ""}`}>
                      <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                      <div className="input-wrapper">
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={handleChange}
                          autoComplete="name"
                        />
                        {formData.fullName && !errors.fullName && (
                          <span className="input-icon input-icon--valid">✓</span>
                        )}
                      </div>
                      {errors.fullName && <p className="error-msg">{errors.fullName}</p>}
                    </div>

                     <div className={`form-field ${errors.email ? "form-field--error" : formData.email && !errors.email ? "form-field--valid" : ""}`}>
                      <label htmlFor="email">Work Email <span className="required">*</span></label>
                      <div className="input-wrapper">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                        {formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                          <span className="input-icon input-icon--valid">✓</span>
                        )}
                      </div>
                      {errors.email && <p className="error-msg">{errors.email}</p>}
                    </div>

                     <div className={`form-field ${errors.companyName ? "form-field--error" : formData.companyName ? "form-field--valid" : ""}`}>
                      <label htmlFor="companyName">Company Name <span className="required">*</span></label>
                      <div className="input-wrapper">
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          placeholder="Your organization"
                          value={formData.companyName}
                          onChange={handleChange}
                          autoComplete="organization"
                        />
                        {formData.companyName && !errors.companyName && (
                          <span className="input-icon input-icon--valid">✓</span>
                        )}
                      </div>
                      {errors.companyName && <p className="error-msg">{errors.companyName}</p>}
                    </div>

                     <div className="form-row-2col">
                      <div className={`form-field ${errors.industry ? "form-field--error" : formData.industry ? "form-field--valid" : ""}`}>
                        <label htmlFor="industry">Industry <span className="required">*</span></label>
                        <div className="input-wrapper select-wrapper">
                          <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                          >
                            <option value="">Select industry</option>
                            {INDUSTRIES.map((i) => (
                              <option key={i} value={i}>{i}</option>
                            ))}
                          </select>
                          <span className="select-arrow">▾</span>
                        </div>
                        {errors.industry && <p className="error-msg">{errors.industry}</p>}
                      </div>

                      <div className={`form-field ${errors.country ? "form-field--error" : formData.country ? "form-field--valid" : ""}`}>
                        <label htmlFor="country">Country <span className="required">*</span></label>
                        <div className="input-wrapper select-wrapper">
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                          >
                            <option value="">Select country</option>
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <span className="select-arrow">▾</span>
                        </div>
                        {errors.country && <p className="error-msg">{errors.country}</p>}
                      </div>
                    </div>

                     <div className={`form-checkbox ${errors.agree ? "form-checkbox--error" : ""}`}>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="agree"
                          checked={formData.agree}
                          onChange={handleChange}
                        />
                        <span className="checkbox-custom" />
                        <span className="checkbox-text">
                          I agree to receive communications related to this content from Athena.
                        </span>
                      </label>
                      {errors.agree && <p className="error-msg">{errors.agree}</p>}
                    </div>

                     {submitError && (
                      <p className="error-msg" style={{ fontSize: "13px", padding: "10px 12px", background: "#fff5f5", borderRadius: "8px" }}>
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className={`download-btn ${loading ? "download-btn--loading" : ""}`}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                          Download Case Study
                        </>
                      )}
                    </button>

                    <p className="form-privacy">
                      🔒 Your data is safe. We never share your information.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}