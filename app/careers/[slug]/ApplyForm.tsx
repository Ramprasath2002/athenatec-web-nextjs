"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "./job-details.scss";

const API_URL = "/api/apply";

interface FormData {
  fullName:    string;
  email:       string;
  phone:       string;
  coverLetter: string;
  resume:      File | null;
}

interface FormErrors {
  fullName?:    string;
  email?:       string;
  phone?:       string;
  coverLetter?: string;
  resume?:      string;
}

interface ApplyFormProps {
  jobTitle?: string;
  jobId:     string | number;
}

export default function ApplyForm({
  jobTitle = "this position",
  jobId,
}: ApplyFormProps) {
  const router       = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "", email: "", phone: "", coverLetter: "", resume: null,
  });

  const [errors,       setErrors]       = useState<FormErrors>({});
  const [fileName,     setFileName]     = useState("No file chosen");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError,  setSubmitError]  = useState("");

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim())    e.fullName    = "Full name is required.";
    if (!formData.email.trim())       e.email       = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.phone.trim())       e.phone       = "Phone number is required.";
    if (!formData.coverLetter.trim()) e.coverLetter = "Cover letter is required.";
    else if (formData.coverLetter.trim().length < 30) e.coverLetter = "At least 30 characters.";
    if (!formData.resume)             e.resume      = "Please upload your resume.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      // Use multipart FormData so resume file can be included
      const fd = new FormData();
      fd.append("job_id",       String(jobId));
      fd.append("name",         formData.fullName.trim());
      fd.append("email",        formData.email.trim());
      fd.append("phone",        formData.phone.trim());
      fd.append("cover_letter", formData.coverLetter.trim());
      if (formData.resume) fd.append("resume", formData.resume);

      const res  = await fetch(API_URL, { method: "POST", body: fd });
      const json = await res.json();

      if (json?.success === true) {
        router.push("/thank-you");
      } else {
        setSubmitError(json?.message || "Application could not be submitted. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
    setFileName(file?.name || "No file chosen");
    if (errors.resume) setErrors((prev) => ({ ...prev, resume: undefined }));
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, resume: null }));
    setFileName("No file chosen");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="apply-box">
      <div className="apply-box__header">
        <div className="apply-box__icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
            <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
          </svg>
        </div>
        <div>
          <h2>Apply for this Position</h2>
          <p className="apply-box__subtitle">Fill in the details below for {jobTitle} and we&apos;ll be in touch.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>

        <div className={`form-group ${errors.fullName ? "has-error" : ""}`}>
          <label htmlFor="fullName">Full Name <span>*</span></label>
          <div className="input-wrap">
            <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <input id="fullName" name="fullName" type="text" placeholder="Full Name"
              value={formData.fullName} onChange={handleChange} required />
          </div>
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>

        <div className="form-row">
          <div className={`form-group ${errors.email ? "has-error" : ""}`}>
            <label htmlFor="email">Email <span>*</span></label>
            <div className="input-wrap">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input id="email" name="email" type="email" placeholder="Your email"
                value={formData.email} onChange={handleChange} required />
            </div>
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
            <label htmlFor="phone">Phone <span>*</span></label>
            <div className="input-wrap">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.44 6.44l1.51-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <input id="phone" name="phone" type="tel" placeholder="Phone Number"
                value={formData.phone} onChange={handleChange} required />
            </div>
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>
        </div>

        <div className={`form-group ${errors.coverLetter ? "has-error" : ""}`}>
          <label htmlFor="coverLetter">Cover Letter <span>*</span></label>
          <textarea id="coverLetter" name="coverLetter" rows={5}
            placeholder="Tell us why you're a great fit for this role…"
            value={formData.coverLetter} onChange={handleChange} required />
          <div className="char-count">{formData.coverLetter.length} characters</div>
          {errors.coverLetter && <span className="field-error">{errors.coverLetter}</span>}
        </div>

        <div className={`form-group ${errors.resume ? "has-error" : ""}`}>
          <label className="upload-label">
            Resume <span className="upload-formats">.pdf, .doc, .docx</span>
          </label>
          <div className={`upload-field ${formData.resume ? "has-file" : ""}`}>
            <input ref={fileInputRef} type="file" id="resume" className="file-hidden"
              accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            {!formData.resume ? (
              <label htmlFor="resume" className="file-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Choose File
              </label>
            ) : (
              <div className="file-preview">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c4584" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="file-name">{fileName}</span>
                <button type="button" className="file-remove" onClick={removeFile} aria-label="Remove file">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          {errors.resume && <span className="field-error">{errors.resume}</span>}
        </div>

        {submitError && (
          <div className="submit-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {submitError}
          </div>
        )}

        <button type="submit" className="apply-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <><span className="spinner" /> Submitting…</>
          ) : (
            <>
              Submit Application
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </>
          )}
        </button>

        <p className="privacy-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Your information is kept private and never shared.
        </p>
      </form>
    </div>
  );
}
