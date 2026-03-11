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

  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-start overflow-hidden text-white suppressHydrationWarning">
      <Image src={image} alt={title} fill priority className="object-cover" />

      <div
        className={`relative z-20 max-w-5xl px-6 flex flex-col ${
          align === "left"
            ? "items-start text-left"
            : "items-start text-start"
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>

        {description && (
          <p className="text-lg md:text-xl mb-8 max-w-3xl">{description}</p>
        )}

        {buttonText && buttonLink && (
          <button
            onClick={() => router.push(buttonLink)}
            className="    px-8 py-3
    bg-[#1c4584]
    text-white
    font-semibold
    rounded-lg
    transition-all duration-300 ease-in-out
    hover:bg-[#17ACE4]
    hover:-translate-y-1
    hover:shadow-[0_4px_14px_#17ace466 text-white
    active:translate-y-0 cursor-pointer"
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
}
