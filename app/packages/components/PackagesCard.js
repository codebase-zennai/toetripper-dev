'use client';

import { useState } from 'react';
import { DockIcon, MapPin, Plane } from 'lucide-react';
import CustomizeItineraryModal from './CustomizeItineraryModal';
import { stripRichText } from '../../../lib/utils/richText';
import { formatCategoryTags } from '../../../lib/utils/categoryTags';

export default function PackagesCard({
  title,
  description,
  imageSrc,
  href = '/packages',
  destination,
  category,
  travelType,
  getYourGuideLink,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const summaryText = stripRichText(description);
  const categoryText = formatCategoryTags(category);
  const bookNowHref = getYourGuideLink?.trim() || href;

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden border border-transparent bg-transparent transition-all duration-300 hover:border-black">
        <div className="block overflow-hidden" aria-label={title}>
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-88 md:h-108"
          />
        </div>

        <div className="flex flex-1 flex-col px-2 py-2 md:py-3">
          <div className="space-y-1">
            <p className="text-lg font-semibold leading-tight text-black md:text-[1.25rem]">
              {title}
            </p>

            <p className="h-12 overflow-hidden text-sm leading-6 text-black/60 md:text-[0.95rem]">
              {summaryText}
            </p>
          </div>

          <div className="mt-auto space-y-2 pt-3">
            {destination && (
              <div className="flex items-center gap-2 text-sm text-black/75">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{destination}</span>
              </div>
            )}
            {categoryText && (
              <div className="flex items-center gap-2 text-sm text-black/75">
                <DockIcon className="h-4 w-4 shrink-0" />
                <span className="truncate">{categoryText}</span>
              </div>
            )}
            {travelType && (
              <div className="flex items-center gap-2 text-sm text-black/75">
                <Plane className="h-4 w-4 shrink-0" />
                <span className="truncate">{travelType}</span>
              </div>
            )}

            <div className="mt-3 grid grid-cols-1 gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex w-full items-center justify-center border border-black bg-(--primary) px-4 py-4 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-(--secondary) hover:text-black cursor-pointer"
              >
                Customize Your Itinerary
              </button>
              <a
                href={bookNowHref}
                target={getYourGuideLink ? '_blank' : undefined}
                rel={getYourGuideLink ? 'noopener noreferrer' : undefined}
                className="inline-flex w-full items-center justify-center border border-black px-4 py-4 text-sm font-semibold text-black no-underline transition-colors duration-200 hover:bg-black hover:text-white"
              >
                Book Now
              </a>
            </div>
          </div>
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
