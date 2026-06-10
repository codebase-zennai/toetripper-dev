'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ThemesImages() {
  const containerRef = useRef(null);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to horizontal movement (right to left)
  // Moves from 20% to -50% as user scrolls down
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-50%"]);

  return (
    <section
      id="themes-carousel"
      ref={containerRef}
      className="section height-200vw"
    >
      <div className="about-stick">
        <motion.div 
          className="about-images-carousel"
          style={{ x }}
        >
          <img
            alt="Scenic mountain road adventure"
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&auto=format&fit=crop&q=80"
            loading="eager"
            className="about-image"
          />
          <img
            alt="Prisinte beach at sunset"
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80"
            loading="eager"
            className="about-image"
          />
          <img
            alt="Canoe trip on a crystal-clear lake"
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&auto=format&fit=crop&q=80"
            loading="eager"
            className="about-image"
          />
          <img
            alt="Hanging wooden bridge in a dense forest"
            src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&auto=format&fit=crop&q=80"
            loading="eager"
            className="about-image"
          />
        </motion.div>
      </div>
    </section>
  );
}
