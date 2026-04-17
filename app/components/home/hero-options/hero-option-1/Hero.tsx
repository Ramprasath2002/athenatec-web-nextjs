"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { HeroProps } from "./types";
import HeroSlide from "./HeroSlide";
import BottomCarousel from "./BottomCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero({ slides, bottomStats, bottomDescription }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[100vh] min-h-[680px] w-full overflow-hidden bg-[#1e2a37]">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.hero-btn-next',
          prevEl: '.hero-btn-prev',
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="hero-swiper h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} isActive={activeIndex === index} />
          </SwiperSlide>
        ))}

        <button
          aria-label="Previous slide"
          className="hero-btn-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex
                     items-center justify-center
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
          aria-label="Next slide"
          className="hero-btn-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex
                     items-center justify-center
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
      </Swiper>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#1e2a37]/90 via-[#1e2a37]/60 to-transparent pt-12">
        <BottomCarousel stats={bottomStats} description={bottomDescription} />
      </div>

      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          background-color: rgba(255,255,255,0.35);
          width: 8px; height: 8px;
          transition: all 0.3s ease;
          border-radius: 4px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background-color: #17ace4;
          width: 32px;
        }
        /* Custom Nav arrows — hidden if swiper uses disabled class (i.e. if loop relies on arrows) but we just hide them on mobile via Tailwind as well */
        .hero-swiper .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
          pointer-events: none;
        }
        /* Keep pagination above the bottom overlay so the bullets stay clickable */
        .hero-swiper .swiper-pagination {
          bottom: 175px !important;
          z-index: 30 !important;
          pointer-events: auto;
        }
        @media (min-width: 640px)  { .hero-swiper .swiper-pagination { bottom: 160px !important; } }
        @media (min-width: 768px)  { .hero-swiper .swiper-pagination { bottom: 168px !important; } }
        @media (min-width: 1024px) { .hero-swiper .swiper-pagination { bottom: 150px !important; } }
      `}</style>
    </section>
  );
}
