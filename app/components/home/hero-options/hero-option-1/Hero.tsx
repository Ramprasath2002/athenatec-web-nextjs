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

export default function Hero({ slides, bottomStats, bottomDescription }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden bg-[#1e2a37]">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="hero-swiper h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <HeroSlide slide={slide} isActive={activeIndex === index} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 right-0 z-20">
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
          background-color: #8b3fc8;   /* ✅ purple to match accent */
          width: 32px;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          color: white; opacity: 0;
          transition: opacity 0.3s ease, transform 0.2s ease;
          transform: scale(0.8);
        }
        .hero-swiper:hover .swiper-button-next,
        .hero-swiper:hover .swiper-button-prev {
          opacity: 0.6; transform: scale(1);
        }
        /* Ensure pagination is above the bottom carousel */
        .hero-swiper .swiper-pagination { bottom: 200px !important; }
        @media (max-width: 640px) {
          .hero-swiper .swiper-pagination { bottom: 180px !important; }
        }
      `}</style>
    </section>
  );
}
