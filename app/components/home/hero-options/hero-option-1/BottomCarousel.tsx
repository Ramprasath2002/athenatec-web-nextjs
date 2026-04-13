"use client";

import { CarouselStat } from "./types";

interface BottomCarouselProps {
  stats: CarouselStat[];
  description?: string; // e.g. "Achieve a fast time to value..."
}

export default function BottomCarousel({ stats, description }: BottomCarouselProps) {
  if (!stats || stats.length === 0) return null;

  return (
    // ✅ Bottom stats bar styled nicely to overlay the hero background
    <div className="w-full border-white/10  py-8">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

        {/* Optional description text — matches "Achieve a fast time to value..." */}
        {description && (
          <p className="mx-auto mb-6 max-w-3xl text-base text-white/90 sm:text-lg">
            {description}
          </p>
        )}

        {/* ✅ Centered stat cards — flex wrap, justify-center */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="min-w-[140px] rounded-lg border border-white/15 bg-white/10 px-6 py-4 text-center transition-colors hover:bg-white/15"
            >
              <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-[#7dd8f8]">
                {stat.label}
              </span>
              <span className="block text-3xl font-bold text-white">
                {stat.value}
              </span>
              {stat.description && (
                <span className="mt-1 block text-xs text-white/60">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    );
}