import Hero from "./hero-option-1/Hero";
import { heroData } from "./hero-option-1/data";

export default function HeroOptionOne() {
  return (
    <main className="bg-[#06152d]">
      <Hero slides={heroData.slides} bottomStats={heroData.bottomStats} />
    </main>
  );
}
