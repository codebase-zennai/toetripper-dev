'use client';

import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <section className="section">
      <div className="w-layout-blockcontainer container padding-9rem w-container">
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
            <h5>Wealth Bento</h5>
          </motion.div>
          <motion.h1
            data-w-id="c38081aa-76c9-6f89-8f7c-35d481bf5668"
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            ABOUT US
          </motion.h1>
          <motion.h5 
            className="max-width-20rem"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            We are a research site that manages a portfolio in real-time.
          </motion.h5>
          <div className="space-0-5rem"></div>
          <motion.a
            href="#About"
            data-w-id="5636032a-1271-e473-ecbe-20e393bd2447"
            className="button-with-circle-icon w-inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="button-text">Explore</p>
            <p className="button-text-absolute">Explore</p>
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
