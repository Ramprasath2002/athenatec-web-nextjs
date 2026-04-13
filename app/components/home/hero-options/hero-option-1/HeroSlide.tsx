import Image from "next/image";
import Link from "next/link";
import { HeroSlideData } from "./types";
import { ArrowRight, PlayCircle } from "lucide-react";

interface HeroSlideProps {
  slide: HeroSlideData;
  isActive: boolean;
}

export default function HeroSlide({ slide, isActive }: HeroSlideProps) {
  return (
    <div className="relative flex h-[100vh] w-full items-center">

      {/* Background Media — fully visible, no dimming */}
      <div className="absolute inset-0 z-0">
        {slide.media.type === "video" ? (
          <video
            src={slide.media.src}
            autoPlay={isActive}
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <Image
            src={slide.media.src}
            alt={slide.media.alt || slide.title}
            fill
            priority
            className="object-cover"
          />
        )}

        {/*
          ✅ AVEVA-style "blind" overlay:
          - Left 55%: strong charcoal/navy shadow so text is readable
          - Fades to transparent on the right so the image shows through clearly
          - No full-bleed dark overlay — background is visible on the right half
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e2a37]/95 via-[#1e2a37]/70 to-transparent" />
      </div>

      {/* Content — sits on the left over the gradient blind */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`max-w-2xl transform transition-all duration-1000 ease-out ${
            isActive
              ? "translate-y-0 opacity-100 delay-300"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {slide.title}
          </h1>

          {/* ✅ Purple accent underline — matches AVEVA style */}
          <div className="mb-5 h-[3px] w-20 rounded-full bg-[#8b3fc8]" />

          <p className="mb-8 max-w-xl text-lg text-white/80 sm:text-xl">
            {slide.subtitle}
          </p>

          {slide.ctas && slide.ctas.length > 0 && (
            <div className="flex flex-col gap-3 sm:flex-row">
              {slide.ctas.map((cta, index) => (
                <Link
                  key={index}
                  href={cta.href}
                  className={`inline-flex items-center justify-center rounded px-7 py-3 text-sm font-semibold transition-all ${
                    cta.variant === "secondary"
                      ? "border-2 border-white/60 text-white hover:border-white hover:bg-white/10"
                      : cta.variant === "outline"
                      ? "border-2 border-white text-white hover:bg-white hover:text-slate-900"
                      : "bg-[#3b5fc0] text-white hover:bg-[#2d4fa8]"
                  }`}
                >
                  {cta.label}
                  {cta.variant === "secondary" ? (
                    <PlayCircle className="ml-2 h-4 w-4" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}