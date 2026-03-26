'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutImages() {
  const containerRef = useRef(null);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to horizontal movement (right to left)
  // Moves from 0% to -50% as user scrolls down
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-50%"]);

  return (
    <section
      id="About"
      ref={containerRef}
      className="section height-200vw"
    >
      <div className="about-stick">
        <motion.div 
          className="about-images-carousel"
          style={{ x }}
        >
          <img
            alt="Travel essentials with passport and maps"
            src="/images/explore1.jpg"
            loading="eager"
            className="about-image"
          />
          <img
            alt="Travelers at the airport"
            src="/images/explore2.jpg"
            loading="eager"
            className="about-image"
          />
          <img
            alt="Hot air balloons at sunset"
            src="/images/CTA.jpg"
            loading="eager"
            className="about-image"
          />
          <img
            alt="Couple walking on resort dock"
            src="/images/home.jpg"
            loading="eager"
            className="about-image"
          />
        </motion.div>
      </div>
    </section>
  );
}
