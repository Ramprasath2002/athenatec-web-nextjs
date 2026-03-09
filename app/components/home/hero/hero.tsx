"use client";
import HeroCarousel from "./HeroCarousel";
import "./hero.scss";
import { useEffect, useState, useRef } from "react";
import { logos } from "@/app/components/ClientLogos";
export default function HeroSection() {
  return (
    <>
    <section className="relative flex flex-col overflow-hidden pt-[62px]">
         <div className="relative flex-1">
          <HeroCarousel />
        </div>

         <div className="bg-[#F5FAFD] py-5">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-xl md:text-2xl font-semibold mb-8 text-black">
              A Decade of Delivering Manufacturing Excellence
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-black">
              <StatCard
                title="Founded"
                value={2011}
                subtitle="13+ years experience"
              />

              <StatCard
                title="Team Strength"
                value={150}
                suffix="+"
                subtitle="Industry experts"
              />

              <InfoCard title="Global HQ" value="USA" subtitle="California" />
              <InfoCard
                title="Delivery Centers"
                value="India"
                subtitle="Bangalore, Hyderabad, Chennai & Trichy"
              />
            </div>
          </div>
        </div>
      </section>

       <section className="relative bg-white py-16 overflow-hidden">
        <div className="mx-auto px-6 mb-8">
          <h3 className="text-center text-lg text-gray-600 font-bold">
            Trusted by Global Manufacturing Leaders
          </h3>
        </div>

        <div className="relative overflow-hidden w-full">
          <div className="marquee-track">
            {[...logos, ...logos].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Client logo"
                className="h-22 w-auto object-contain opacity-80"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
function InfoCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 md:p-6 text-center shadow-sm">
      <p className="text-[17px] text-gray-500 mb-2">{title}</p>
      <p className="text-3xl font-semibold mb-2">{value}</p>
      <p className="text-sm text-gray-600 leading-snug">{subtitle}</p>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  suffix?: string;
  subtitle: string;
};

function StatCard({ title, value, suffix = "", subtitle }: StatCardProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCount = () => {
    const duration = 1500;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div
      ref={ref}
      className="rounded-2xl bg-white p-2 md:p-4 text-center shadow-sm"
    >
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      <p className="text-3xl font-semibold mb-2">
        {count}
        {suffix}
      </p>
      <p className="text-sm text-gray-600 leading-snug">{subtitle}</p>
    </div>
  );
}
 