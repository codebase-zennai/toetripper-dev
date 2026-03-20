'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DockIcon, MapPin } from 'lucide-react';
import CustomizeItineraryModal from './CustomizeItineraryModal';

export default function PackagesCard({
  title,
  description,
  imageSrc,
  href = '/packages',
  destination,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className="group flex flex-col overflow-hidden border border-transparent bg-transparent transition-all duration-300 hover:border-black">
        <Link
          href={href}
          className="block overflow-hidden"
          aria-label={title}
        >
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="h-[27rem] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="flex flex-col justify-between gap-2 px-2 py-2 md:py-3">
          <div className="space-y-1">
            <Link href={href} className="block no-underline">
              <p className="text-lg font-semibold leading-tight text-black md:text-[1.25rem]">
                {title}
              </p>
            </Link>

            <p className="text-sm text-black/60 md:text-[0.95rem]">
              {description}
            </p>

            {destination && (
              <div className="flex items-center gap-2 mt-15 text-sm text-black/75">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{destination}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-black/75">
              <DockIcon className="h-4 w-4 shrink-0" />
              <span className="truncate">Cat</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center border border-black bg-[var(--primary)] px-4 py-4 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-[var(--secondary)] hover:text-black cursor-pointer"
          >
            Customize Your Itinerary
          </button>
        </div>
      </article>

      <CustomizeItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageTitle={title}
        packageDestination={destination || ''}
      />
    </>
  );
}
