"use client";

import { motion } from "framer-motion";
import { IceCream } from "lucide-react";

const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };
const marqueeTransition = { duration: 27, ease: "linear", repeat: Infinity };
const spinnerTransition = { duration: 8, ease: "linear", repeat: Infinity };
const headingItems = [
  "Travel Desk",
  "Travel Desk",
  "Travel Desk",
  "Travel Desk",
  "Travel Desk",
];

const heroBlockVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

const heroImageVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const cardGroupVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="section ">
      <div className="padding-4-5rem">
        <div className="flex">
          <motion.div
            className="flex flex-col justify-between my-20"
            // variants={heroBlockVariants}
            initial="hidden"
            animate="visible"
            transition={transition}
          >
            <div className="">
            <div className="subheading-flex">
              {/* <div className="icon-wrapper background-primary">
                <img
                  width="Auto"
                  height="Auto"
                  alt=""
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e9774998ae29f000632c22_svg_BKz3.svg"
                  loading="eager"
                  className="small-icon"
                />
              </div>
              <h5>Travel & Hospitality</h5> */}
            </div>
            <div className="">
              <p className="hero-text">
                Journey Beyond <span className="italics">Tickets</span>
              </p>
              <div className="hero-line"></div>
            </div>
            </div>
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
                <div className="move-flex">
                  <h4
                    data-w-id="7f686655-205d-dfce-349c-464c2a11efdc"
                    className="move"
                  >
                    TRAVEL
                  </h4>
                  <h4
                    data-w-id="2654ea20-eee1-abff-ff89-8a6ab3d2ad9d"
                    className="move-up"
                  >
                    Experiences
                  </h4>
                  <IceCream size={48} className="ice-cream-icon" />
                </div>
              </motion.div>
              <motion.div
                className="card text-site-white background-secondary"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.3 }}
              >
                <h2>36K+</h2>
                <h5>Customers</h5>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-image-wrapper"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.15 }}
          >
            <div className="cut-out-wrapper align-center">
              <div className="hero-heading-wrapper">
                <motion.div
                  className="hero-heading"
                  initial={{ x: "0%" }}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={marqueeTransition}
                >
                  {headingItems.map((label, index) => (
                    <div key={`heading-${index}`} className="hero-heading-flex">
                      <img
                        width="Auto"
                        height="Auto"
                        alt="Dot Icon"
                        src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f268777327d085522c22a0_svg_2ltJ.svg"
                        loading="eager"
                        className="arrow"
                      />
                      <h5 className="hero-heading-text">{label}</h5>
                    </div>
                  ))}
                  {headingItems.map((label, index) => (
                    <div
                      key={`heading-dup-${index}`}
                      className="hero-heading-flex"
                    >
                      <img
                        width="Auto"
                        height="Auto"
                        alt="Dot Icon"
                        src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f268777327d085522c22a0_svg_2ltJ.svg"
                        loading="eager"
                        className="arrow"
                      />
                      <h5 className="hero-heading-text">{label}</h5>
                    </div>
                  ))}
                </motion.div>
              </div>
              <img
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f257dcb7e01b8ca88410bc_Top%20Left.svg"
                loading="lazy"
                alt="Cut out SVG"
                className="cut-out-image top-left-absolute"
              />
            </div>
            <div className="cut-out-flex align-bottom">
              <img
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f259b32188a2962beb6d0b_Bottom%20Left.svg"
                loading="lazy"
                alt="Cut out SVG"
                className="cut-out-image"
              />
              <img
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f25bfadd1d6739297ac960_Bottom%20Right%20.svg"
                loading="lazy"
                alt="Cut out SVG"
                className="cut-out-image"
              />
              <a
                href="#explore"
                className="arrow-border-wrapper w-inline-block"
              >
                <div
                  data-w-id="022bdf7a-1da5-487f-e90a-10a13619b2dd"
                  className="icon-wrapper"
                >
                  <img
                    width="Auto"
                    height="Auto"
                    alt="arrow up"
                    src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f449091e597be1c4c815_arrow_outward.svg"
                    loading="eager"
                    className="arrow invert"
                  />
                </div>
              </a>
            </div>
            <img
              src="/images/home.jpg"
              loading="lazy"
              sizes="(max-width: 479px) 80vw, (max-width: 767px) 420px, (max-width: 991px) 632px, 44vw"
              alt="woman and man  sitting on a chair"
              className="hero-image"
            />
            <a
              href="#learn-more"
              data-w-id="5df85663-d46d-b744-b25a-bb603e0e3bf9"
              className="spinner-wrapper w-inline-block"
            >
              <motion.div
                data-w-id="5df85663-d46d-b744-b25a-bb603e0e3bfa"
                className="spinner-image"
                animate={{ rotate: 360 }}
                transition={spinnerTransition}
              ></motion.div>
            </a>
          </motion.div>
        </div>
        <div className="space-7rem"></div>
      </div>
    </section>
  );
}
