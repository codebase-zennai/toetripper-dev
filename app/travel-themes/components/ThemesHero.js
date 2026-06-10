'use client';

import { motion } from 'framer-motion';

export default function ThemesHero() {
  return (
    <section className="section">
      <div className="padding-9rem">
        <div className="space-page-top"></div>
        <div className="title-block">
          <motion.div 
            className="subheading-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div className="icon-wrapper background-primary">
              <img
                width="Auto"
                height="Auto"
                alt=""
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e977b86095f9904467158e_svg_sTMW.svg"
                loading="eager"
                className="small-icon"
              />
            </div>
            <h5>Toe Tripper</h5>
          </motion.div>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            TRAVEL THEMES
          </motion.h1>
          <motion.h5 
            className="max-width-31rem" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            Explore experiential travel themes custom-made for your lifestyle and preferences.
          </motion.h5>
          <div className="space-0-5rem"></div>
          <motion.a
            href="#themes-list"
            className="button-with-circle-icon w-inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="button-text">Explore Themes</p>
            <p className="button-text-absolute">Explore Themes</p>
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
          </motion.a>
        </div>
      </div>
      <div className="space-7rem"></div>
    </section>
  );
}
