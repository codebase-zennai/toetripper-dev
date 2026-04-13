'use client';

import { motion } from 'framer-motion';
import { Users, Presentation, Gift, Rocket, Building2, Globe } from 'lucide-react';

const viewportOptions = { once: true, amount: 0.15, margin: '-60px' };
const baseTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] };

const createBentoVariants = ({ x = 0, y = 0 }) => ({
  hidden: { opacity: 0, x, y },
  visible: { opacity: 1, x: 0, y: 0 },
});

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function MICEScopeBento() {
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

              {/* Card 1 — Leadership Offsites */}
              <motion.div
                className="features-card-small"
                variants={createBentoVariants({ x: -30 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.05 }}
              >
                <h5>Leadership</h5>
                <Users size={56} strokeWidth={0.9} />
                <h4>Leadership<br />Offsites</h4>
              </motion.div>

              {/* Card 2 — Annual Conferences */}
              <motion.div
                className="features-card-small background-light-gray"
                variants={createBentoVariants({ y: -20 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.12 }}
              >
                <h5>Conferences</h5>
                <Presentation size={56} strokeWidth={0.9} />
                <h4>Annual<br />Conferences</h4>
              </motion.div>

            </div>

            {/* Card 3 — Incentive Travel Programs · wide, primary bg */}
            <motion.div
              className="features-card-wide background-primary"
              variants={createBentoVariants({ y: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.2 }}
            >
              <div className="features-flex space-between align-center">
                <h4 className="outline-black">Incentive<br />Travel Programs</h4>
                <Gift size={72} strokeWidth={0.8} />
              </div>
              <h5>
                Reward and motivate your teams with unforgettable experiences.
              </h5>
            </motion.div>

          </div>

          {/* ── RIGHT BLOCK ── */}
          <div className="features-block">

            {/* Card 4 — Product Launches · wide, dark-gray bg */}
            <motion.div
              className="features-card-wide background-dark-gray"
              variants={createBentoVariants({ x: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.1 }}
            >
              <div className="features-flex space-between align-center">
                <h4 className="text-site-white">Product<br />Launches</h4>
                <Rocket size={72} strokeWidth={0.8} className="text-site-white" />
              </div>
              <h5 className="text-site-white">
                Create buzz and impact for your brand's biggest moments.
              </h5>
            </motion.div>

            {/* Row of two small cards */}
            <div className="features-flex-wrapper">

              {/* Card 5 — Exhibitions & Trade Shows */}
              <motion.div
                className="features-card-small background-light-gray"
                variants={createBentoVariants({ y: 20 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.18 }}
              >
                <h5>Exhibitions</h5>
                <Building2 size={56} strokeWidth={0.9} />
                <h4>Exhibitions<br />&amp; Trade Shows</h4>
              </motion.div>

              {/* Card 6 — International Meetings */}
              <motion.div
                className="features-card-small"
                variants={createBentoVariants({ x: 30 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.25 }}
              >
                <h5>International</h5>
                <Globe size={56} strokeWidth={0.9} />
                <h4>International<br />Meetings</h4>
              </motion.div>

            </div>
          </div>

        </div>
      </motion.div>

      <div className="space-7rem" />
    </section>
  );
}
