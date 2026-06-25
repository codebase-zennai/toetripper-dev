"use client";

import { motion } from "framer-motion";
import RotatingGlobe from "./RotatingGlobe";

const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };
const marqueeTransition = { duration: 27, ease: "linear", repeat: Infinity };
const headingItems = [
  "Corporate Travel",
  "Curated Holiday",
  "MICE Events",
];

const heroImageVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

export default function HeroRight() {
    return (
        <>
            <style>{`
                    @media (max-width: 768px) {
                      .hero-image-wrapper {
                        display: none !important;
                      }
                    }
                  `}</style>
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
                <video
                    src="/hero.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-image"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <a
                    href="#learn-more"
                    data-w-id="5df85663-d46d-b744-b25a-bb603e0e3bf9"
                    className="spinner-wrapper w-inline-block"
                >
                    <motion.div
                        data-w-id="5df85663-d46d-b744-b25a-bb603e0e3bfa"
                        className="earth-spinner"
                    >
                        <RotatingGlobe />
                    </motion.div>
                </a>
            </motion.div>
        </>
    )

}
