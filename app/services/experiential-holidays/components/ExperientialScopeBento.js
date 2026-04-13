'use client';

import { motion } from 'framer-motion';
import {
  Compass,
  Users,
  Utensils,
  Wallet,
  Hotel,
  Sparkles,
} from 'lucide-react';

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

export default function ExperientialScopeBento() {
  return (
    <section className="section bg-site-black experiential-bento">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        transition={{ ...baseTransition, duration: 0.6 }}
      >
        <div className="features-flex-wrapper">
          <div className="features-block reverse-on-tab">
            <div className="features-flex-wrapper">
              <motion.div
                className="features-card-small"
                variants={createBentoVariants({ x: -30 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.05 }}
              >
                <h5>Travel Intent</h5>
                <h4>Why You Travel &amp; Who You Travel With</h4>
              </motion.div>

              <motion.div
                className="features-card-small background-light-gray"
                variants={createBentoVariants({ y: -20 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.12 }}
              >
                <h5>Pace &amp; Lifestyle</h5>
                <h4>Pace Preference, Food &amp; Lifestyle Choices</h4>
              </motion.div>
            </div>

            <motion.div
              className="features-card-wide background-primary"
              variants={createBentoVariants({ y: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.2 }}
            >
              <div className="features-flex space-between align-center">
                <h4 className="outline-black">Budget Comfort with Smart Routing</h4>
                <Wallet size={72} strokeWidth={0.8} />
              </div>
              <h5>Plans are built around comfort level, not a generic template.</h5>
            </motion.div>
          </div>

          <div className="features-block">
            <motion.div
              className="features-card-wide background-dark-gray"
              variants={createBentoVariants({ x: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.1 }}
            >
              <div className="features-flex space-between align-center">
                <h4 className="text-site-white">Right-Duration Stays in Carefully Selected Hotels</h4>
                <Hotel size={72} strokeWidth={0.8} className="text-site-white" />
              </div>
              <h5 className="text-site-white">Stay length and property choice are matched to trip flow.</h5>
            </motion.div>

            <div className="features-flex-wrapper">
              <motion.div
                className="features-card-small background-light-gray"
                variants={createBentoVariants({ y: 20 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.18 }}
              >
                <h5>Experiences</h5>
                <Sparkles size={56} strokeWidth={0.9} />
                <h4>Experience-Led Inclusions</h4>
              </motion.div>

              <motion.div
                className="features-card-small"
                variants={createBentoVariants({ x: 30 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.25 }}
              >
                <h5>Flow</h5>
                <Users size={56} strokeWidth={0.9} />
                <h4>Balanced Day Pacing</h4>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-7rem" />
    </section>
  );
}
