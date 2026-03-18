'use client';
import Link from 'next/link';
import { Building2, Palmtree, Building, Landmark, MapPin, Castle } from 'lucide-react';

const TRENDING_DESTINATIONS = [
  {
    id: 1,
    destination: "Singapore",
    Icon: Building2,
    href: "/destinations/singapore",
  },
  {
    id: 2,
    destination: "Malaysia",
    Icon: Palmtree,
    href: "/destinations/malaysia",
  },
  {
    id: 3,
    destination: "Dubai",
    Icon: Building,
    href: "/destinations/dubai",
  },
  {
    id: 4,
    destination: "Paris",
    Icon: Landmark,
    href: "/destinations/paris",
  },
  {
    id: 5,
    destination: "Italy",
    Icon: MapPin,
    href: "/destinations/italy",
  },
  {
    id: 6,
    destination: "France",
    Icon: Castle,
    href: "/destinations/france",
  }
];

// Duplicate the items for seamless infinite marquee effect
const SCROLL_ITEMS = [...TRENDING_DESTINATIONS, ...TRENDING_DESTINATIONS];

export default function FeaturedPackages() {
  return (
    <div className="m-0 mb-10 p-0 relative">
      <div className="">
        <div className="flex flex-col items-center gap-3 mb-12">
          <h1 className="text-center p-10 text-8xl">
            Trending Destinations
          </h1>
          <p className="max-w-136 text-black/65 text-base text-center">
            Discover our most popular getaways curated for unforgettable experiences
          </p>
        </div>

        <div className="relative w-full max-w-[100vw] overflow-hidden">
          {/* Infinite Scroll Marquee Container */}
          <div className="flex w-max animate-marquee pt-10 pb-12 items-center">
            {SCROLL_ITEMS.map((dest, idx) => (
              <div
                key={`${dest.id}-${idx}`}
                className="flex-none flex justify-center pb-4 min-w-[280px] md:min-w-[320px] lg:min-w-[400px] pr-8 md:pr-12"
              >
                <Link href={dest.href} className="group flex flex-col items-center gap-6 no-underline w-full">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 background-primary rounded-full flex items-center justify-center transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_15px_30px_rgba(15,15,15,0.3)] group-hover:bg-secondary">
                    <dest.Icon className="text-white w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b-2 border-transparent group-hover:border-black pb-1 transition-all duration-300 whitespace-nowrap">
                    {dest.destination}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center py-3.5 px-8 rounded-[10px] font-semibold no-underline transition-all duration-200 text-center bg-black text-white hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(15,15,15,0.2)]"
          >
            View All Destinations
          </Link>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          /* Pauses animation ONLY when hovering directly over an individual destination item */
          .animate-marquee:has(.group:hover) {
            animation-play-state: paused;
          }
        `}} />
      </div>
    </div>
  );
}
