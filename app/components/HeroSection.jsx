"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection({
  title,
  description,
  image,
  buttonText,
  buttonLink,
  align = "center",
}) {
  const router = useRouter();

  const isLeft = align === "left";

  return (
    <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden text-white">
        <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover"
      />
       <div className="absolute inset-0 z-10" />
       <div
        className={`relative z-20 w-full max-w-5xl px-6 sm:px-10 lg:px-16 py-16 flex flex-col gap-4
          items-center text-center
          ${
            isLeft
              ? "sm:items-start sm:text-left sm:ml-0 lg:ml-12"
              : "sm:items-start sm:text-start"
          }
        `}
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
          {title}
        </h1>

        {description && (
          <p className="text-base sm:text-lg md:text-xl max-w-2xl text-white/90">
            {description}
          </p>
        )}

        {buttonText && buttonLink && (
          <button
            onClick={() => router.push(buttonLink)}
            className="mt-2 px-8 py-3 bg-[#1c4584] text-white font-semibold rounded-lg
              transition-all duration-300 ease-in-out
              hover:bg-[#17ACE4] hover:-translate-y-1
              hover:shadow-[0_4px_14px_#17ace466]
              active:translate-y-0 cursor-pointer"
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}