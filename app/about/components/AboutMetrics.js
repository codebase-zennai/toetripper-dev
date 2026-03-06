'use client';

import { useEffect, useRef } from 'react';

export default function AboutMetrics() {
  const returnsLeftRef = useRef(null);
  const returnsRightRef = useRef(null);
  const metricsCardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (returnsLeftRef.current) observer.observe(returnsLeftRef.current);
    if (returnsRightRef.current) observer.observe(returnsRightRef.current);
    metricsCardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div>
        <div className="background-black rounded-corners">
          <div className="space-7rem"></div>
          <div className="returns-flex">
            <h1 ref={returnsLeftRef} className="large-text slide-from-left-animation">114%</h1>
            <h5 ref={returnsRightRef} className="max-width-30rem slide-from-right-animation">
              Cumulative Returns Since Inception - The Bento Wealth&#x27;s
              cumulative return outperforms the Nasdaq-100&#x27;s return during
              the same period
            </h5>
          </div>
          <div className="space-7rem"></div>
        </div>
      </div>
      <div className="background-black">
        <div className="padding-4-5rem">
          <div className="metrics-grid-quarter">
            <div
              ref={(el) => (metricsCardsRef.current[0] = el)}
              data-w-id="cf2a3ee0-14b5-9c0d-9642-1e4940080d5b"
              className="metrics-card"
            >
              <img
                width="Auto"
                height="Auto"
                alt="icon"
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e4292ee133fa3c0f9702ad_azm.svg"
                loading="eager"
                className="large-icon"
              />
              <h4 className="uppercase">Hardwork</h4>
              <h5>
                Lorem ipsum <br />
                dolor sit amet.
              </h5>
            </div>
            <div
              ref={(el) => (metricsCardsRef.current[1] = el)}
              data-w-id="cf2a3ee0-14b5-9c0d-9642-1e4940080d63"
              className="metrics-card background-dark-gray"
            >
              <img
                width="Auto"
                height="Auto"
                alt="icon"
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e4292f76389ea9042796c8_check_circle.svg"
                loading="eager"
                className="large-icon"
              />
              <h4 className="uppercase">Research</h4>
              <h5>
                Lorem ipsum <br />
                dolor sit amet.
              </h5>
            </div>
            <div
              ref={(el) => (metricsCardsRef.current[2] = el)}
              data-w-id="cf2a3ee0-14b5-9c0d-9642-1e4940080d6b"
              className="metrics-card background-primary"
            >
              <img
                width="Auto"
                height="Auto"
                alt="icon"
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e4292f859f2602266127cd_charger.svg"
                loading="eager"
                className="large-icon"
              />
              <h4 className="uppercase">Innovation</h4>
              <h5>
                Lorem ipsum <br />
                dolor sit amet.
              </h5>
            </div>
            <div
              ref={(el) => (metricsCardsRef.current[3] = el)}
              data-w-id="cf2a3ee0-14b5-9c0d-9642-1e4940080d73"
              className="metrics-card background-secondary"
            >
              <img
                width="Auto"
                height="Auto"
                alt="icon"
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e4292ef5549b4ceacc3b4e_double_arrow.svg"
                loading="eager"
                className="large-icon invert"
              />
              <h4 className="uppercase text-site-white">Veterans</h4>
              <h5 className="text-site-white">
                Lorem ipsum <br />
                dolor sit amet.
              </h5>
            </div>
          </div>
          <div className="space-7rem"></div>
        </div>
      </div>
    </>
  );
}
