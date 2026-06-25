"use client";

import { motion } from "framer-motion";
import HeroButton from "./HeroButton";

const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };
const cardGroupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroLeft() {
  return (
    <motion.div
      className="flex flex-col items-center justify-around h-full gap-10"
      // variants={heroBlockVariants}
      initial="hidden"
      animate="visible"
      transition={transition}
    >
      <div className="w-full new-hero-text-div flex flex-col justify-center items-center">
        <h1 className="">You Dream</h1>
        <h1 className="italics">We Deliver</h1>
        {/* <div> */}
        {/* </div> */}
      </div>
      <div className="flex gap-5 w-full justify-center items-center">
        <HeroButton text="Contact Us" url="/contact" />
        <HeroButton text="About Us" url="/about" />
      </div>

      <div>
        <motion.div
          className="card-flex-wrapper text-site-white"
          variants={cardGroupVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: 0.1 }}
        >
          <motion.div
            className="card background-primary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.2 }}
          >
            <div className="line-flex">
              <div className="line"></div>
              <h5>Effortless</h5>
              <div className="line"></div>
            </div>
            <h3>TRAVEL</h3>
          </motion.div>
          <motion.div
            className="card text-site-white background-secondary"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.3 }}
          >
            <h2>10K+</h2>
            <h5>Customers</h5>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
