'use client';

import { motion } from 'framer-motion';
import { HeartHandshake, TicketsPlane, TreePalm } from 'lucide-react';

/* ─────────────────────────────────────────
   Animation helpers (mirrors Services.js)
───────────────────────────────────────── */
const viewportOptions = { once: true, amount: 0.15, margin: '-60px' };
const baseTransition  = { duration: 0.55, ease: [0.16, 1, 0.3, 1] };

const createBentoVariants = ({ x = 0, y = 0 }) => ({
  hidden:  { opacity: 0, x, y },
  visible: { opacity: 1, x: 0, y: 0 },
});

const containerVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
export default function ServicesBento() {
  return (
    <section className="section bg-[#050505]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        transition={{ ...baseTransition, duration: 0.6 }}
      >
        <div className="features-flex-wrapper">

          {/* ── LEFT BLOCK ── */}
          <div className="features-block reverse-on-tab">

            {/* Row of two small cards */}
            <div className="features-flex-wrapper">

              {/* Card 1 — Experiential Holidays · icon label */}
              <motion.div
                className="features-card-small"
                variants={createBentoVariants({ x: -30 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.05 }}
              >
                <h5>Experience</h5>
                <TreePalm size={56} strokeWidth={0.9} />
                <h4>Experiential<br />Holidays</h4>
              </motion.div>

              {/* Card 2 — MICE & Events · icon label */}
              <motion.div
                className="features-card-small background-light-gray"
                variants={createBentoVariants({ y: -20 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.12 }}
              >
                <h5>Business</h5>
                <HeartHandshake size={56} strokeWidth={0.9} />
                <h4>MICE<br />&amp; Events</h4>
              </motion.div>

            </div>

            {/* Card 3 — Corporate Travels · wide, primary bg */}
            <motion.div
              className="features-card-wide background-primary"
              variants={createBentoVariants({ y: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.2 }}
            >
              <div className="features-flex space-between align-center">
                <h4 className="outline-black">Corporate<br />Travel Solutions</h4>
                <TicketsPlane size={72} strokeWidth={0.8} />
              </div>
              <h5>
                Seamless end-to-end travel management for businesses of every scale.
              </h5>
            </motion.div>

          </div>

          {/* ── RIGHT BLOCK ── */}
          <div className="features-block">

            {/* Card 4 — Experiential Holidays · wide, dark-gray bg */}
            <motion.div
              className="features-card-wide background-dark-gray"
              variants={createBentoVariants({ x: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.1 }}
            >
              <div className="features-flex space-between align-center">
                <h4 className="text-site-white">Experiential<br />Holidays</h4>
                <TreePalm size={72} strokeWidth={0.8} className="text-site-white" />
              </div>
              <h5 className="text-site-white">
                Premium travel designed for individuality — crafted around you.
              </h5>
            </motion.div>

            {/* Row of two small cards */}
            <div className="features-flex-wrapper">

              {/* Card 5 — MICE & Events · detail */}
              <motion.div
                className="features-card-small background-light-gray"
                variants={createBentoVariants({ y: 20 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.18 }}
              >
                <h5>Corporate</h5>
                <TicketsPlane size={56} strokeWidth={0.9} />
                <h4>Corporate<br />Travels</h4>
              </motion.div>

              {/* Card 6 — Corporate Travel · icon label */}
              <motion.div
                className="features-card-small"
                variants={createBentoVariants({ x: 30 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.25 }}
              >
                <h5>MICE</h5>
                <HeartHandshake size={56} strokeWidth={0.9} />
                <h4>MICE<br />&amp; Events</h4>
              </motion.div>

            </div>
          </div>

        </div>
      </motion.div>

      <div className="space-7rem" />
    </section>
  );
}
