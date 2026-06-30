'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

export default function FeaturedPackages() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    let active = true;

    const loadDestinations = async () => {
      try {
        const response = await fetch('/api/destinations?status=published&trending=true');
        const payload = await response.json();
        if (!active) return;
        setDestinations(payload.success ? payload.data : []);
      } catch (error) {
        console.error('Failed to load featured destinations', error);
        if (active) {
          setDestinations([]);
        }
      }
    };

    void loadDestinations();

    return () => {
      active = false;
    };
  }, []);

  const scrollItems = useMemo(() => [...destinations, ...destinations], [destinations]);

  return (
    <div className="m-0 mb-10 p-0 relative flex-col items-center justify-center flex" id="trending-destinations">
      <div className="px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 mb-10 md:mb-12">
          <h1 className="text-center px-2 py-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Trending Destinations
          </h1>
          <p className="max-w-3xl text-black/65 text-sm sm:text-base text-center">
            Discover our most popular getaways curated for unforgettable experiences
          </p>
        </div>
      </div>

      <div className="relative w-screen overflow-hidden">
        {/* Infinite Scroll Marquee Container */}
        <div className="flex flex-nowrap w-max animate-marquee pt-4 pb-6 md:pt-6 md:pb-8 items-center">
          {scrollItems.map((dest, idx) => (
            <div
              key={`${dest.slug}-${idx}`}
              className="flex-none flex justify-center pb-4 min-w-55 sm:min-w-65 md:min-w-80 lg:min-w-100 pr-5 sm:pr-8 md:pr-12"
            >
              {(dest.linkType === 'instagram' && dest.instagramUrl) ? (
                <div
                  className="group flex flex-col items-center gap-6 no-underline w-full"
                >
                  {/* Circle with destination photo */}
                  <div className="dest-circle-wrap group-hover:-translate-y-3 group-hover:shadow-[0_15px_30px_rgba(15,15,15,0.3)]">
                    <img
                      src={dest.cardImage || dest.heroImage}
                      alt={dest.name}
                      className="dest-circle-img group-hover:scale-110"
                    />
                  </div>

                  {/* Name + country */}
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b-2 border-transparent group-hover:border-black pb-1 transition-all duration-300 whitespace-nowrap">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-black/50 font-medium tracking-wide uppercase">
                      {dest.country}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="group flex flex-col items-center gap-6 no-underline w-full">
                  {/* Circle with destination photo */}
                  <div className="dest-circle-wrap group-hover:-translate-y-3 group-hover:shadow-[0_15px_30px_rgba(15,15,15,0.3)]">
                    <img
                      src={dest.cardImage || dest.heroImage}
                      alt={dest.name}
                      className="dest-circle-img group-hover:scale-110"
                    />
                  </div>

                  {/* Name + country */}
                  <div className="flex flex-col items-center gap-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black border-b-2 border-transparent group-hover:border-black pb-1 transition-all duration-300 whitespace-nowrap">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-black/50 font-medium tracking-wide uppercase">
                      {dest.country}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {destinations.length === 0 ? (
        <div className="px-4 sm:px-6 text-center text-black/60">No trending destinations have been published yet.</div>
      ) : null}

      <div className="px-4 sm:px-6">
        {/* <div className="flex justify-center mt-8">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center py-3.5 px-8 rounded-[10px] font-semibold no-underline transition-all duration-200 text-center bg-black text-white hover:bg-[#333] hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(15,15,15,0.2)]"
          >
            View All Destinations
          </Link>
        </div> */}

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0%   { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite !important;
            will-change: transform;
          }
          .animate-marquee:has(.group:hover) {
            animation-play-state: paused;
          }

          /* Circle wrapper — mirrors the original round shape */
          .dest-circle-wrap {
            width: clamp(8rem, 30vh, 15rem);
            height: clamp(8rem, 30vh, 15rem);
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
            position: relative;
          }

          .dest-circle-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            transition: transform 0.5s ease;
          }

          @media (max-width: 768px) {
            .animate-marquee {
              animation: marquee 25s linear infinite !important;
            }
          }
        `}} />
      </div>
    </div>
  );
}
