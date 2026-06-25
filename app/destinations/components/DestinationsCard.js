'use client';

import { useState } from 'react';
import CustomizeItineraryModal from '../../packages/components/CustomizeItineraryModal';

export default function DestinationsCard({ title, description, imageSrc }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

            <p className="h-16 text-sm leading-6 text-black/60 md:text-[0.95rem]">
              {description}
            </p>

          </div>

          <div className="mt-15 pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex w-full items-center justify-center border border-black bg-(--primary) px-4 py-4 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-(--secondary) hover:text-black cursor-pointer"
            >
              Customize Itinerary
            </button>
          </div>
        </div>
      </article>

      <CustomizeItineraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageTitle={title}
        packageDestination={title}
      />
    </>
  );
}
