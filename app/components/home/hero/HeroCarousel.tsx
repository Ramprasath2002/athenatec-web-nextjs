"use client";

import { useState, useEffect, SetStateAction } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
   // {
  //   title: "Gain End-to-End Visibility in Medical Device Manufacturing",
  //   desc: "Watch the on-demand webinar to learn how manufacturers achieve visibility, compliance, and operational excellence.",
  //   cta: "Download Now",
  //   image: "/assets/images/MDM.png",
  // },
  {
    title: "Digitizing the Manufacturing Enterprise Since 2011",
    desc: "Leveraging deep expertise to enhance partnerships and drive long-term manufacturing success.",
    cta: "Connect Us",
    link: "/contact",
    image: "/assets/images/DME.webp",
  },
  {
    title: "About Us",
    desc: "Athena is an Industry 4.0 Enterprise Manufacturing Solutions provider, assisting companies and driving their Industry 4.0 roadmap, centered on Digital Transformation.",
    cta: "About Us",
    link: "/about",
    image: "/assets/images/aboutus.webp",
  },
  {
    title: "Expertise in MES, PLM, ERP & More",
    desc: "Specialized in MES, PLM, ERP, CMMS, and smart factory analytics.",
    cta: "MES, PLM & More",
    link: "/solutions/mes",
    image: "/assets/images/mlsandpls.webp",
  },
  {
    title: "Siemens Alliance Partner",
    desc: "Experienced in implementing and upgrading Opcenter MES across versions, from Camstar 3.2 to Opcenter 2410, ensuring seamless transitions and optimized performance.",
    cta: "Siemens Alliance Partner",
    link: "/siemens-opcenter-mes",
    image: "/assets/images/siemens.webp",
  },
  {
    title: "Critical Manufacturing Premier Implementation Partner",
    desc: "Athena specializes in the implementation, upgrade, and customization of CM MES, along with seamless integrations with PLM, ERP, LIMS, and Camline.",
    cta: "CM",
    link: "/critical-manufacturing",
    image: "/assets/images/CMC.webp",
  },
  {
    title: "Athena Announces Strategic Authorised Reseller Partnership with twinzo",
    desc: "Strengthening smart manufacturing visibility and operational intelligence through Twinzo's digital twin platform.",
    cta: "twinzo",
    link: "/critical-manufacturing",
    image: "/assets/images/twinzobanners.webp",
  },
  {
    title: "Eyelit Implementation Partner",
    desc: "As an official Eyelit Technologies partner, Athena delivers expertise in deploying Eyelit MES and Equipment Connect across semiconductor, solar, LED/laser diode, and medical device industries.",
    cta: "Eyelit",
    link: "/eyelit",
    image: "/assets/images/eyelitsbanner.webp",
  },
  {
    title: "ECO Accelerators",
    desc: "Speed up engineering change workflows with intelligent automation. ECO Accelerators handle tracking, approvals, execution, and traceability while ensuring compliance.",
    cta: "Accelerators",
    link: "/accelerators",
    image: "/assets/images/eco-accelerators.webp",
  },
   // {
  //   title:
  //     "Athena and Tech Mahindra Announce Partnership to Accelerate Smart Manufacturing",
  //   desc: "Driving AI-enabled MES solutions to accelerate smart manufacturing adoption and digital transformation.",
  //   cta: "Tech Mahindra",
  //   image: "/assets/images/tech-mahindra.jpg",
  // },

];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const total = slides.length;

  const changeSlide = (newIndex: SetStateAction<number>) => {
    setFade(false);
    setTimeout(() => {
      setIndex(newIndex);
      setFade(true);
    }, 300);
  };

  const prev = () => changeSlide(index === 0 ? total - 1 : index - 1);
  const next = () => changeSlide(index === total - 1 ? 0 : index + 1);

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide(index === total - 1 ? 0 : index + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="relative w-full min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[60vh] flex items-center overflow-hidden">

       <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <Image
            key={i}
            src={slide.image}
            alt="Hero background"
            fill
            priority={i === 0}
            loading="lazy"
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
         <div className="absolute inset-0 z-20 via-black/30 to-transparent" />
      </div>

       <div
        className={`relative z-30 w-full px-4 sm:px-10 md:px-16 lg:px-28 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-full max-w-[90%] sm:max-w-[75%] md:max-w-[620px] lg:max-w-[700px] backdrop-blur-xl 
                        bg-white/10 border border-white/20 shadow-2xl
                        p-5 sm:p-7 md:p-8 rounded-2xl text-white">

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-5 leading-snug">
            {slides[index].title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-5 sm:mb-7 leading-relaxed">
            {slides[index].desc}
          </p>

          <Link
            href={slides[index].link}
            className="cta-btn relative overflow-hidden inline-block
                       text-white font-semibold
                       text-sm sm:text-base
                       px-5 sm:px-7 md:px-8
                       py-2.5 sm:py-3
                       rounded-xl cursor-pointer"
          >
            <span className="relative z-10">{slides[index].cta}</span>
            <span className="shine" />
          </Link>
        </div>
      </div>

       <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40
                   flex items-center justify-center
                   w-9 h-9 sm:w-11 sm:h-11
                   rounded-full cursor-pointer
                   bg-black/50 hover:bg-black/70
                   border border-white/20 hover:border-white/40
                   text-white shadow-lg
                   backdrop-blur-sm
                   transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft size={20} strokeWidth={2.2} />
      </button>

       <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40
                   flex items-center justify-center
                   w-9 h-9 sm:w-11 sm:h-11
                   rounded-full cursor-pointer
                   bg-black/50 hover:bg-black/70
                   border border-white/20 hover:border-white/40
                   text-white shadow-lg
                   backdrop-blur-sm
                   transition-all duration-200 hover:scale-110"
      >
        <ChevronRight size={20} strokeWidth={2.2} />
      </button>

       <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 sm:gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer
              ${i === index
                ? "w-6 sm:w-7 h-2.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}