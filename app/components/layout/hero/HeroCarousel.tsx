"use client";

import { useState, useEffect, SetStateAction } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { link } from "fs";
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
    image: "/assets/images/DME.png",
  },

  {
    title: "About Us",
    desc: "Athena is an Industry 4.0 Enterprise Manufacturing Solutions provider, assisting companies and driving their Industry 4.0 roadmap, centered on Digital Transformation.",
    cta: "About Us",
    link: "/about",
    image: "/assets/images/aboutus.png",
  },

  {
    title: "Expertise in MES, PLM, ERP & More",
    desc: "Specialized in MES, PLM, ERP, CMMS, and smart factory analytics.",
    cta: "MES, PLM & More",
    link: "/solutions/mes",
    image: "/assets/images/mlsandpls.png",
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
    title:
      "Athena Announces Strategic Authorised Reseller Partnership with twinzo",
    desc: "Strengthening smart manufacturing visibility and operational intelligence through Twinzo’s digital twin platform.",
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
    setFade(false); // start fade out

    setTimeout(() => {
      setIndex(newIndex);
      setFade(true); // fade in
    }, 300);
  };

  const prev = () => {
    const newIndex = index === 0 ? total - 1 : index - 1;
    changeSlide(newIndex);
  };

  const next = () => {
    const newIndex = index === total - 1 ? 0 : index + 1;
    changeSlide(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = index === total - 1 ? 0 : index + 1;
      changeSlide(newIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [index]);

  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[65vh] lg:min-h-[60vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <Image
            key={i}
            src={slide.image}
            alt="Hero background"
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-30 px-6 md:px-28 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="max-w-[700px] 
                  bg-white/10 
                  // backdrop-blur-xl 
                  border border-white/20 
                  shadow-2xl 
                  p-8 
                  rounded-2xl 
                  text-white"
        >
          <h1 className="text-3xl md:text-4xl font-semibold mb-6">
            {slides[index].title}
          </h1>

          <p className="text-base md:text-lg text-white/90 mb-8">
            {slides[index].desc}
          </p>

          <Link
            href={slides[index].link}
            className="cta-btn relative overflow-hidden text-white font-semibold px-8 py-3 rounded-xl cursor-pointer inline-block"
          >
            <span className="relative z-10">{slides[index].cta}</span>
            <span className="shine" />
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full cursor-pointer bg-white/20 hover:bg-white/30 text-white transition"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full cursor-pointer bg-white/20 hover:bg-white/30 text-white transition"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
