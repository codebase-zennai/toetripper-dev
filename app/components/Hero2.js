"use client";

import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

export default function Hero() {
  return (
    <section className="new-hero-section flex justify-center items-center py-6 md:py-0">
      <div className="h-full w-full flex flex-col md:flex-row gap-8 md:gap-4 new-hero-inner px-4 md:px-10">
        <div className="w-full md:w-1/2 h-full">
          <HeroLeft />
        </div>
        <div className="hidden md:block md:w-1/2 h-full md:me-10">
          <HeroRight />
        </div>
      </div>
    </section>
  );
}
