"use client";

import React, { useState, useRef, useEffect } from "react";
import "./demo.scss";

// ── TYPES ─────────────────────────────────────────────────────────────────
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

// ── CONSTANTS ─────────────────────────────────────────────────────────────
const INDUSTRY_OPTIONS = [
  "Semiconductor",
  "Electronics",
  "Medical Devices",
  "Discrete Manufacturing",
  "Solar",
];

const DEMO_SUBJECT_OPTIONS = [
  "ECO Redliner",
  "Master Data Migrator",
  "Automation Scripting Tool",
];

// WordPress REST API base URL — set NEXT_PUBLIC_WP_API_URL in your .env.local
// e.g.  NEXT_PUBLIC_WP_API_URL=https://your-wordpress-site.com
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL ?? "";

// ── WARP CANVAS ───────────────────────────────────────────────────────────
function WarpCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;

    // ── Particle pool ─────────────────────────────────────────────────────
    const PARTICLE_COUNT = 220;

    interface Star {
      angle: number;   // radians
      dist: number;    // current distance from origin
      speed: number;   // px per frame
      maxDist: number; // reset distance
      size: number;    // tail thickness
      hue: number;     // colour pick
      alpha: number;
    }

    const stars: Star[] = [];

    const mkStar = (dist = 0): Star => {
      const huePool = [185, 195, 200, 280, 295, 310]; // cyan ↔ magenta
      return {
        angle:   Math.random() * Math.PI * 2,
        dist:    dist,
        speed:   2.5 + Math.random() * 5.5,
        maxDist: 0, // set after resize
        size:    0.4 + Math.random() * 1.2,
        hue:     huePool[Math.floor(Math.random() * huePool.length)],
        alpha:   0,
      };
    };

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      W = canvas.offsetWidth  || canvas.parentElement?.offsetWidth  || 400;
      H = canvas.offsetHeight || canvas.parentElement?.offsetHeight || 600;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const maxDist = Math.sqrt(W * W + H * H) / 2 + 40;
      if (stars.length === 0) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const s = mkStar(Math.random() * maxDist * 0.8);
          s.maxDist = maxDist;
          stars.push(s);
        }
      } else {
        stars.forEach(s => { s.maxDist = maxDist; });
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    resize();

    // ── Pulse rings ───────────────────────────────────────────────────────
    interface Ring { r: number; alpha: number; color: string; }
    const rings: Ring[] = [];
    let ringTimer = 0;

    const spawnRing = () => {
      const colors = ["rgba(23,172,228,", "rgba(224,64,251,", "rgba(0,229,255,"];
      rings.push({ r: 0, alpha: 0.7, color: colors[Math.floor(Math.random() * colors.length)] });
    };

    // ── Draw loop ─────────────────────────────────────────────────────────
    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;

      // Background
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.75);
      bg.addColorStop(0,   "#0d2340");
      bg.addColorStop(0.5, "#071528");
      bg.addColorStop(1,   "#030e1a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.save();
      ctx.strokeStyle = "rgba(0,200,224,0.035)";
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.restore();

      // ── Warp stars ──────────────────────────────────────────────────────
      stars.forEach(s => {
        s.dist  += s.speed * (1 + s.dist / s.maxDist * 1.8); // accelerate outward
        s.alpha  = Math.min(1, s.dist / (s.maxDist * 0.18));

        if (s.dist >= s.maxDist) {
          const fresh = mkStar(2);
          fresh.maxDist = s.maxDist;
          Object.assign(s, fresh);
          return;
        }

        const tailLen = s.dist * 0.18 + 4;
        const x1 = cx + Math.cos(s.angle) * s.dist;
        const y1 = cy + Math.sin(s.angle) * s.dist;
        const x0 = cx + Math.cos(s.angle) * Math.max(0, s.dist - tailLen);
        const y0 = cy + Math.sin(s.angle) * Math.max(0, s.dist - tailLen);

        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `hsla(${s.hue},95%,70%,0)`);
        grad.addColorStop(1, `hsla(${s.hue},95%,75%,${s.alpha * 0.9})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = s.size;
        ctx.lineCap     = "round";
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.restore();
      });

      // ── Pulse rings ──────────────────────────────────────────────────────
      ringTimer += 16;
      if (ringTimer > 1400) { spawnRing(); ringTimer = 0; }

      rings.forEach((ring, i) => {
        ring.r     += 2.8;
        ring.alpha -= 0.008;
        if (ring.alpha <= 0) { rings.splice(i, 1); return; }
        ctx.save();
        ctx.strokeStyle = ring.color + ring.alpha + ")";
        ctx.lineWidth   = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // ── Core glow ─────────────────────────────────────────────────────────
      const pulse = 0.7 + Math.sin(ts * 0.0018) * 0.3;

      // outer halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * pulse);
      halo.addColorStop(0,   `rgba(0,229,255,${0.18 * pulse})`);
      halo.addColorStop(0.5, `rgba(23,172,228,${0.06 * pulse})`);
      halo.addColorStop(1,    "rgba(0,229,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, 60 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // inner bright core
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14 * pulse);
      core.addColorStop(0,   `rgba(220,245,255,${0.95 * pulse})`);
      core.addColorStop(0.3, `rgba(0,229,255,${0.8 * pulse})`);
      core.addColorStop(0.7, `rgba(23,172,228,${0.3 * pulse})`);
      core.addColorStop(1,    "rgba(23,172,228,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, 14 * pulse, 0, Math.PI * 2);
      ctx.fill();

      // centre pinpoint
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 * pulse, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="warp-canvas" />;
}

// ── SPEEDOMETER ───────────────────────────────────────────────────────────
function Speedometer() {
  const [mounted, setMounted] = useState(false);
  const [needle, setNeedle] = useState(0);
  const [displayVal, setDisplayVal] = useState(0);
  const targetRef = useRef(78);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    let start: number | null = null;
    const duration = 2200;
    const target = targetRef.current;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setNeedle(current);
      setDisplayVal(Math.round(current * 3.2));
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

  if (!mounted) return null;

  const CX = 100, CY = 110, R = 80;
  const START_DEG = 225;
  const SWEEP = 270;

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

  const pctToDeg = (pct: number) => START_DEG + (SWEEP * pct) / 100;
  const ticks = Array.from({ length: 29 }, (_, i) => i);
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
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-needle">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
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

        <circle cx={CX} cy={CY} r={R + 18} fill="none" stroke="rgba(0,200,224,0.08)" strokeWidth="14" />
        <circle cx={CX} cy={CY} r={R + 4} fill="url(#bgGrad)" />
        <path d={arcPath(START_DEG, START_DEG + SWEEP, R)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" strokeLinecap="round" />
        <path d={arcPath(pctToDeg(0), pctToDeg(60), R)} fill="none" stroke="#17ace4" strokeWidth="10" strokeLinecap="round" filter="url(#glow-cyan)" opacity={needle > 0 ? 1 : 0} style={{ transition: "opacity 0.3s" }} />
        <path d={arcPath(pctToDeg(60), pctToDeg(80), R)} fill="none" stroke="#f5c518" strokeWidth="10" strokeLinecap="round" opacity={needle >= 65 ? 0.9 : 0} style={{ transition: "opacity 0.3s" }} />
        <path d={arcPath(pctToDeg(80), pctToDeg(100), R)} fill="none" stroke="#e040fb" strokeWidth="10" strokeLinecap="round" opacity={needle >= 82 ? 0.95 : 0} style={{ transition: "opacity 0.3s" }} />

        {ticks.map((i) => {
          const pct = (i / 28) * 100;
          const deg = pctToDeg(pct);
          const outer = polar(deg, R + 2);
          const inner = polar(deg, R - (i % 4 === 0 ? 14 : 8));
          const isMajor = i % 4 === 0;
          const color = pct < 60 ? "#17ace4" : pct < 80 ? "#f5c518" : "#e040fb";
          return <line key={i} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} stroke={color} strokeWidth={isMajor ? 2 : 1} opacity={isMajor ? 0.9 : 0.4} />;
        })}

        {[0, 40, 80, 120, 160, 200, 240, 280].map((val, idx) => {
          const pct = (idx / 7) * 100;
          const deg = pctToDeg(pct);
          const pt = polar(deg, R - 22);
          return <text key={val} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="rgba(180,210,255,0.7)" fontFamily="monospace">{val}</text>;
        })}

        <polygon points={`${needleTip.x},${needleTip.y} ${needleBase1.x},${needleBase1.y} ${needleBase2.x},${needleBase2.y}`} fill="url(#needleGrad)" filter="url(#glow-needle)" opacity="0.95" />
        <circle cx={CX} cy={CY} r={10} fill="#0a1e32" stroke="rgba(0,200,224,0.6)" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={5} fill="url(#coreGrad)" />

        <rect x={CX - 26} y={CY + 20} width={52} height={22} rx={4} fill="rgba(0,0,0,0.6)" stroke="rgba(0,200,224,0.3)" strokeWidth="1" />
        <text x={CX} y={CY + 35} textAnchor="middle" dominantBaseline="middle" fontSize="13" fill="#00e5ff" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{displayVal}</text>
        <text x={CX} y={CY + 52} textAnchor="middle" fontSize="6" fill="rgba(170,200,255,0.6)" fontFamily="monospace" letterSpacing="1">KM / S</text>
        <text x={CX} y={CY - R - 10} textAnchor="middle" fontSize="7" fill="rgba(224,64,251,0.65)" fontFamily="monospace" letterSpacing="3">REDLINE</text>
      </svg>
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
  // "idle" | "success" | "error"
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  // ── Validation ────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email.";
    if (!formData.companyName.trim()) e.companyName = "Company name is required.";
    if (!formData.industry) e.industry = "Please select an industry.";
    if (!formData.country.trim()) e.country = "Country is required.";
    if (!formData.demoSubject) e.demoSubject = "Please select a demo subject.";
    if (!formData.agreeToPolicy) e.agreeToPolicy = "You must agree to the privacy policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ── Submit → WordPress REST API ───────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError("");

    try {
      /**
       * WordPress endpoint:  POST /wp-json/athena/v1/demo-request
       *
       * On the WordPress side add this to functions.php (or a custom plugin):
       *
       * add_action('rest_api_init', function () {
       *   register_rest_route('athena/v1', '/demo-request', [
       *     'methods'             => 'POST',
       *     'callback'            => 'athena_handle_demo_request',
       *     'permission_callback' => '__return_true',
       *   ]);
       * });
       *
       * function athena_handle_demo_request(WP_REST_Request $request) {
       *   $data    = $request->get_json_params();
       *   $to      = get_option('admin_email');   // or your sales inbox
       *   $subject = 'New Demo Request – ' . sanitize_text_field($data['demoSubject'] ?? '');
       *   $body    = "Name: {$data['name']}\n"
       *            . "Email: {$data['email']}\n"
       *            . "Company: {$data['companyName']}\n"
       *            . "Industry: {$data['industry']}\n"
       *            . "Country: {$data['country']}\n"
       *            . "Demo Subject: {$data['demoSubject']}\n"
       *            . "Comments: {$data['comments']}\n";
       *   $headers = ['Content-Type: text/plain; charset=UTF-8',
       *               'Reply-To: ' . sanitize_email($data['email'])];
       *   $sent = wp_mail($to, $subject, $body, $headers);
       *   if ($sent) {
       *     return new WP_REST_Response(['success' => true], 200);
       *   }
       *   return new WP_REST_Response(['success' => false, 'message' => 'Mail failed.'], 500);
       * }
       */
      // Guard: NEXT_PUBLIC_WP_API_URL must be set in .env.local
      if (!WP_API_URL) {
        throw new Error(
          "API URL is not configured. Set NEXT_PUBLIC_WP_API_URL in your .env.local file."
        );
      }

      const endpoint = `${WP_API_URL}/wp-json/athena/v1/demo-request`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:        formData.name,
          email:       formData.email,
          companyName: formData.companyName,
          industry:    formData.industry,
          country:     formData.country,
          demoSubject: formData.demoSubject,
          comments:    formData.comments,
        }),
      });

      // Safely parse response — if WordPress returns HTML (e.g. 404 page),
      // res.json() would throw "Unexpected token '<'". We catch that here.
      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          `Server returned an unexpected response (HTTP ${res.status}). ` +
          "Please verify the WordPress REST API endpoint is registered and reachable."
        );
      }

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(
          json.message ?? `Request failed with status ${res.status}. Please try again.`
        );
      }

      setSubmitStatus("success");
      setSubmitted(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or contact us directly.";
      setApiError(msg);
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitStatus("idle");
    setApiError("");
    setFormData({
      name: "", email: "", companyName: "", industry: "",
      country: "", demoSubject: "", comments: "", agreeToPolicy: false,
    });
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="demo-page">
       <section className="hero">
        <div className="hero__bg" />
        <div className="hero__teal-wash" />

        <div className="hero__streaks" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`hero__streak hero__streak--${i + 1}`} />
          ))}
        </div>

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
            <a href="mailto:info@athenatec.com" className="hero-cta hero-cta--outline">
              Contact Us
            </a>
          </div>
        </div>

        <Speedometer />
      </section>

       <section className="fs" ref={formRef}>
        <div className="fs__inner">
          <div className="fs__heading">
            <h2>Fill out the form below to get a demo</h2>
          </div>

           <div className="fs__combined-card">

             <div className="fip">
              <WarpCanvas />
            </div>

             <div className="fs__form-side">
              {submitted ? (
                <div className="form-success">
                  <div className="form-success__ico">
                    <svg viewBox="0 0 52 52" fill="none">
                      <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="2" />
                      <path d="M14 26l8 8 16-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3>Request Submitted!</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Our team will
                    reach out to <strong>{formData.email}</strong> within 1 business day.
                  </p>
                  <button className="submit-btn" onClick={handleReset}>
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="demo-form">

                  <div className="frow frow--2">
                    <div className={`field ${errors.name ? "field--err" : ""}`}>
                      <label htmlFor="name">Name <span className="req">*</span></label>
                      <input id="name" name="name" type="text" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} autoComplete="name" />
                      {errors.name && <span className="ferr"><ErrIco />{errors.name}</span>}
                    </div>
                    <div className={`field ${errors.email ? "field--err" : ""}`}>
                      <label htmlFor="email">Email <span className="req">*</span></label>
                      <input id="email" name="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange} autoComplete="email" />
                      {errors.email && <span className="ferr"><ErrIco />{errors.email}</span>}
                    </div>
                  </div>

                  <div className="frow frow--2">
                    <div className={`field ${errors.companyName ? "field--err" : ""}`}>
                      <label htmlFor="companyName">Company Name <span className="req">*</span></label>
                      <input id="companyName" name="companyName" type="text" placeholder="Your Company" value={formData.companyName} onChange={handleChange} />
                      {errors.companyName && <span className="ferr"><ErrIco />{errors.companyName}</span>}
                    </div>
                    <div className={`field field--sel ${errors.industry ? "field--err" : ""}`}>
                      <label htmlFor="industry">Industry <span className="req">*</span></label>
                      <div className="sel-wrap">
                        <select id="industry" name="industry" value={formData.industry} onChange={handleChange}>
                          <option value="">Select industry…</option>
                          {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <ChevDown />
                      </div>
                      {errors.industry && <span className="ferr"><ErrIco />{errors.industry}</span>}
                    </div>
                  </div>

                  <div className="frow frow--2">
                    <div className={`field ${errors.country ? "field--err" : ""}`}>
                      <label htmlFor="country">Country <span className="req">*</span></label>
                      <input id="country" name="country" type="text" placeholder="Your Country" value={formData.country} onChange={handleChange} autoComplete="country-name" />
                      {errors.country && <span className="ferr"><ErrIco />{errors.country}</span>}
                    </div>
                    <div className={`field field--sel ${errors.demoSubject ? "field--err" : ""}`}>
                      <label htmlFor="demoSubject">Demo Subject <span className="req">*</span></label>
                      <div className="sel-wrap">
                        <select id="demoSubject" name="demoSubject" value={formData.demoSubject} onChange={handleChange}>
                          <option value="">Select subject…</option>
                          {DEMO_SUBJECT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <ChevDown />
                      </div>
                      {errors.demoSubject && <span className="ferr"><ErrIco />{errors.demoSubject}</span>}
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="comments">Comments</label>
                    <textarea id="comments" name="comments" rows={4} placeholder="Any comments regarding demo…" value={formData.comments} onChange={handleChange} />
                  </div>

                  <p className="form-legal">
                    By submitting this form, you agree to receive communications from Athena Accelerators and can unsubscribe at any time.{" "}
                    <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                  </p>

                  <div className={`field field--check ${errors.agreeToPolicy ? "field--err" : ""}`}>
                    <label className="chk-label" htmlFor="agreeToPolicy">
                      <input id="agreeToPolicy" name="agreeToPolicy" type="checkbox" checked={formData.agreeToPolicy} onChange={handleChange} />
                      <span className="chk-box" />
                      <span className="chk-txt">I agree <span className="req">*</span></span>
                    </label>
                    {errors.agreeToPolicy && <span className="ferr"><ErrIco />{errors.agreeToPolicy}</span>}
                  </div>

                   {submitStatus === "error" && (
                    <div className="api-error" role="alert">
                      <ErrIco />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`submit-btn ${submitting ? "submit-btn--busy" : ""}`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <><span className="spinner" />Submitting…</>
                    ) : (
                      <>
                        Request My Demo
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function ErrIco() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );
}