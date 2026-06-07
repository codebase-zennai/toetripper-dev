'use client';

import Link from 'next/link';
import { Briefcase, Check, Award } from 'lucide-react';

const sections = [
  {
    title: 'Benefits for Corporates',
    heading: 'Benefits for Corporates',
    description: 'Reduced internal load, stronger cost control, and a consistent travel experience for your teams.',
    items: [
      'Reduced internal load: your HR and Admin teams spend less time coordinating vendors and managing escalations.',
      'Cost visibility and control: clear, structured travel planning aligned with policy and budget frameworks.',
      'Consistent brand experience: every employee and executive travels in a way that reflects your organisation\'s standards.',
      'Dedicated support: human-led escalation handling when urgency matters most.',
    ],
    icon: Check,
    image: '/images/corporate_benefits.jpg',
    reverse: true,
  },
  {
    title: 'Corporate Travel Desk Model',
    heading: 'Corporate Travel Desk Model',
    description: 'We can begin with a pilot structure and scale into a full travel desk partnership based on volume and trust.',
    items: [
      'Structured onboarding and account mapping',
      'Single accountable coordination framework',
      'Scalable operating model aligned to travel volume',
      'Set up designed for long-term partnership outcomes',
    ],
    icon: Award,
    image: '/images/corporate_desk.jpg',
    reverse: false,
  },
  {
    title: 'CXO & VIP TRAVEL',
    heading: 'High-touch, discreet, and reliable planning for leadership teams and board members.',
    description: 'Precision without noise. High-touch, discreet, and reliable planning for leadership teams and board members.',
    items: [
      'Priority handling',
      'Premium hotel curation',
      'Confidential coordination',
      'Efficient routing',
      'Smooth ground transitions',
    ],
    icon: Award,
    image: '/images/cxo_vip_travel.jpg',
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

      </div>
    </section>
  );
}
