'use client';

import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, PartyPopper, TicketsPlane, TreePalm } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const viewportOptions = { once: true, amount: 0.2, margin: "-80px" };
const baseTransition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] };
const hoverTransition = { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] };

const createBentoVariants = ({ x = 0, y = 0 }) => ({
  hidden: { opacity: 0, x, y },
  visible: { opacity: 1, x: 0, y: 0 },
});

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export default function Services() {
  const router = useRouter();
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleServiceNavigation = (href) => {
    router.push(href);
  };

  const handleServiceKeyDown = (event, href) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleServiceNavigation(href);
    }
  };

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="section" onMouseMove={handleMouseMove}>
      <motion.div
        data-w-id="26f29636-e130-073f-81a3-5680a2a67ade"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        transition={{ ...baseTransition, duration: 0.6 }}
      >
        <h1 className="text-center p-10">
          Our Services
        </h1>
        <div id="learn-more" className="features-flex-wrapper">
          <motion.div
            data-w-id="e08b3125-39b3-ccaa-a963-34378cadaf2d"
            className="features-card-large"
            style={{ cursor: isHovering ? 'none' : 'pointer' }}
            variants={createBentoVariants({ y: 40, scale: 0.93 })}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            transition={{ ...baseTransition, delay: 0.05 }}
            whileHover={{ y: -6, transition: hoverTransition }}
            whileTap={{ y: -3, transition: hoverTransition }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => handleServiceNavigation('/services/experiential-holidays')}
            onKeyDown={(event) => handleServiceKeyDown(event, '/services/experiential-holidays')}
            role="link"
            tabIndex={0}
          >
            <div className="features-flex">
              <div className="w-full items-center justify-center">
                <div className="flex justify-center">
                  <TreePalm
                    size={200}
                    strokeWidth={0.5}
                    className="text-white"
                  />
                </div>
                <div className="flex m-10 justify-center">
                  <h2 className="text-white text-center">Experiential Holidays</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <h5 className="text-white text-center">
                Premium travel designed for individuality
              </h5>
            </div>
          </motion.div>
          <div className="features-block">
            <div className="features-flex-wrapper">
            <motion.div
              data-w-id="e08b3125-39b3-ccaa-a963-34378cadaf48"
              className="features-card-wide bg-white"
              style={{ cursor: isHovering ? 'none' : 'pointer' }}
              variants={createBentoVariants({ y: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.18 }}
              whileHover={{ y: -5, transition: hoverTransition }}
              whileTap={{ y: -3, transition: hoverTransition }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => handleServiceNavigation('/services/mice-incentive')}
              onKeyDown={(event) => handleServiceKeyDown(event, '/services/mice-incentive')}
              role="link"
              tabIndex={0}
            >
              <div className="features-flex space-between align-center">
                <h4 className="">MICE & Events</h4>
                <HeartHandshake
                  size={125}
                  strokeWidth={1}
                  className=""
                />
              </div>
              <h5 className="">
                Alerts to safely participate in the market
              </h5>
            </motion.div>
            </div>
            <motion.div
              data-w-id="e08b3125-39b3-ccaa-a963-34378cadaf48"
              className="features-card-wide bg-black"
              style={{ cursor: isHovering ? 'none' : 'pointer' }}
              variants={createBentoVariants({ y: 30 })}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, delay: 0.18 }}
              whileHover={{ y: -5, transition: hoverTransition }}
              whileTap={{ y: -3, transition: hoverTransition }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => handleServiceNavigation('/services/corporate-travels')}
              onKeyDown={(event) => handleServiceKeyDown(event, '/services/corporate-travels')}
              role="link"
              tabIndex={0}
            >
              <div className="features-flex space-between align-center">
                <h4 className="text-white">Corporate Travel Solutions</h4>
                <HeartHandshake
                  size={125}
                  strokeWidth={1}
                  className="text-white"
                />
              </div>
              <h5 className="text-site-white">
                Alerts to safely participate in the market
              </h5>
            </motion.div>
          </div>
        </div>
        <div className="space-7rem"></div>
      </motion.div>
      
      <AnimatePresence>
        {isHovering && (
          <motion.div
            key="services-cursor"
            initial={{ scale: 0.4, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.4, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              left: cursorPos.x,
              top: cursorPos.y,
              width: 100,
              height: 100,
              backgroundColor: "#F4A300",
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              color: 'white',
              fontSize: 12,
              fontWeight: 500,
              textAlign: 'center',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Click Here
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
