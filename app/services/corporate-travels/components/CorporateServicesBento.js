'use client';

import { motion } from 'framer-motion';
import {
  Plane,
  Hotel,
  ShieldCheck,
  Car,
  Clock3,
  Route,
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

export default function CorporateServicesBento() {
  return (
    <section className="section bg-site-black corporate-bento">
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
                <h5>Flights</h5>
                <Plane size={56} strokeWidth={0.9} />
                <h4>Domestic &amp; International Bookings</h4>
              </motion.div>

              <motion.div
                className="features-card-small background-light-gray"
                variants={createBentoVariants({ y: -20 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.12 }}
              >
                <h5>Hotels</h5>
                <Hotel size={56} strokeWidth={0.9} />
                <h4>Hotel Bookings</h4>
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
                <h4 className="outline-black">Visa &amp; Travel Insurance Coordination</h4>
                <ShieldCheck size={72} strokeWidth={0.8} />
              </div>
              <h5>Documentation support aligned to timelines and travel policies.</h5>
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
                <h4 className="text-site-white">Ground Logistics &amp; Transfers</h4>
                <Car size={72} strokeWidth={0.8} className="text-site-white" />
              </div>
              <h5 className="text-site-white">End-to-end movement planning from arrival to departure.</h5>
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
                <h5>Priority</h5>
                <Clock3 size={56} strokeWidth={0.9} />
                <h4>Urgent, Last-Minute &amp; CXO Movement</h4>
              </motion.div>

              <motion.div
                className="features-card-small"
                variants={createBentoVariants({ x: 30 })}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOptions}
                transition={{ ...baseTransition, delay: 0.25 }}
              >
                <h5>Routing</h5>
                <Route size={56} strokeWidth={0.9} />
                <h4>Multi-City &amp; Complex Itineraries</h4>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-7rem" />
    </section>
  );
}
