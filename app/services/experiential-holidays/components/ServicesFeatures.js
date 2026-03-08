'use client';

import Link from 'next/link';
import { Briefcase, Check, Award } from 'lucide-react';

const sections = [
  {
    title: 'How We Design Your Holiday',
    heading: 'Intentional Travel for Families, Couples, and Small Groups',
    description: 'Not rushed. Not checklist-driven. Not template-based. Toe Tripper designs holidays for families, couples, and small groups who value intentional travel.',
    items: [
      'Why you are travelling',
      'Who you are travelling with',
      'Your pace preference',
      'Food and lifestyle choices',
      'Budget comfort',
      'Smart routing',
      'Right-duration stays',
      'Carefully selected hotels',
      'Experience-led inclusions',
      'Balanced day pacing',
    ],
    icon: Briefcase,
    image: '/images/explore1.jpg',
    reverse: false,
  },
  {
    title: 'What We Manage',
    heading: 'End-to-End Holiday Operations',
    description: 'We coordinate all essential travel layers so your journey feels seamless from start to finish.',
    items: [
      'International and domestic flights',
      'Hotels and boutique stays',
      'Local logistics',
      'Visas and insurance',
      'Activity and experience bookings',
    ],
    icon: Check,
    image: '/images/explore2.jpg',
    reverse: true,
  },
  {
    title: 'Our Travel Philosophy',
    heading: 'Experience-Weighted Spending',
    description: 'Premium does not mean excess. Affordable does not mean compromise. We focus on experience-weighted spending, placing your budget where it truly enhances the journey.',
    items: [
      'Budget placed where it improves experience',
      'Quality without unnecessary excess',
      'Value without compromise on essentials',
    ],
    icon: Award,
    image: '/images/explore1.jpg',
    reverse: false,
  },
  {
    title: 'Travel Styles We Support',
    heading: 'Tailored for How You Want to Travel',
    description: 'We support diverse travel styles with curated recommendations and practical planning.',
    items: [
      'Luxury travel',
      'Family holidays',
      'Honeymoons',
      'Spiritual and wellness journeys',
      'Europe and international itineraries',
      'Japan, Bali, and curated Asia routes',
      'India experiential circuits',
    ],
    icon: Briefcase,
    image: '/images/explore2.jpg',
    reverse: true,
  },
];

export default function ServicesFeatures() {
  return (
    <section className="section background-black text-white">
      <div className="padding-4-5rem">
        {sections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx}>
              <div className={`card-flex ${section.reverse ? 'reverse-on-tab' : ''} gap-8 lg:gap-10 w-full items-stretch`}>
                {/* Image Section */}
                {!section.reverse && (
                  <div
                    className="features-image-wrapper slide-from-left-animation w-full" 
                    style={{ minWidth: 0, maxWidth: 'none', flex: '1 1 0%' }}
                  >
                    <div className="cut-out-wrapper">
                      <img
                        src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f25cd00629b62fa3a975c5_Top%20Left%20Long.svg"
                        loading="lazy"
                        alt="Cut out SVG"
                        className="cut-out-image"
                        style={{ filter: 'brightness(0.02)' }}
                      />
                    </div>
                    <img
                      sizes="(max-width: 479px) 80vw, (max-width: 767px) 420px, (max-width: 991px) 632px, 44vw"
                      alt={section.title}
                      src={section.image}
                      loading="lazy"
                      className="features-image "
                    />
                  </div>
                )}

                {/* Content Section */}
                <div
                  className="large-card w-full p-6 sm:p-8 lg:p-[4.4vw]"
                  style={{ minWidth: 0, maxWidth: 'none', flex: '1 1 0%' }}
                >
                  <div className={`card-text-block ${section.reverse ? 'slide-up-animation' : 'slide-from-right-animation'} w-full min-w-0 gap-4 sm:gap-5`}>
                    <div className="subheading-flex">
                      <div className="icon-wrapper background-primary">
                        <Icon className="text-white" size={24} strokeWidth={1.5} />
                      </div>
                      <h5>{section.title}</h5>
                    </div>
                    <h2 className="w-full wrap-break-word text-3xl sm:text-4xl lg:text-[2.8vw] leading-tight">
                      {section.heading}
                    </h2>
                    <p className="w-full text-base sm:text-lg leading-relaxed wrap-break-word">
                      {section.description}
                    </p>
                    <ul className="w-full list-disc pl-6 space-y-3 text-left">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-base sm:text-lg leading-relaxed wrap-break-word">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Image Section (Reverse) */}
                {section.reverse && (
                  <div
                    className="features-image-wrapper align-botton slide-down-animation w-full"
                    style={{ minWidth: 0, maxWidth: 'none', flex: '1 1 0%' }}
                  >
                    <div className="cut-out-wrapper align-bottom">
                      <img
                        src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f25dc0a21e0d0875d8d501_Bottom%20Left%20Long.svg"
                        loading="lazy"
                        alt="Cut out SVG"
                        className="cut-out-image"
                        style={{ filter: 'brightness(0.02)' }}
                      />
                    </div>
                    <img
                      sizes="(max-width: 479px) 80vw, (max-width: 767px) 420px, (max-width: 991px) 632px, 44vw"
                      alt={section.title}
                      src={section.image}
                      loading="lazy"
                      className="features-image align-top"
                    />
                  </div>
                )}
              </div>
              <div className="space-7rem"></div>
            </div>
          );
        })}

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/contact" className="button-with-circle-icon w-inline-block">
            <p className="button-text">Design My Holiday</p>
            <p className="button-text-absolute">Design My Holiday</p>
            <div className="button-arrow-wrapper">
              <img
                width="Auto"
                height="Auto"
                alt=""
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f449091e597be1c4c815_arrow_outward.svg"
                loading="eager"
                className="arrow"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
