"use client";

import { CircleQuestionMark, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Explore() {
  return (
    <div>
      <div className="padding-4-5rem">
        <div className="h-screen items-center flex justify center bg-black text-white">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-20"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              className="text-center"
            >
              Not a Booking Vendor. <br></br>A Structured Travel Partner.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-center px-110"
            >
              We do not compete on discounts or mass inventory. We compete on
              clarity, execution discipline, and long-term trust.
            </motion.p>
          </motion.div>
        </div>
        {/* <div id="explore" className="card-flex">
          <div className="features-image-wrapper slide-from-left-animation">
            <div className="cut-out-wrapper">
              <img
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f25cd00629b62fa3a975c5_Top%20Left%20Long.svg"
                loading="lazy"
                alt="Cut out SVG"
                className="cut-out-image"
              />
            </div>
            <img
              sizes="(max-width: 479px) 80vw, (max-width: 767px) 420px, (max-width: 991px) 632px, 44vw"
              alt="woman on laptop"
              src="/images/explore1.jpg"
              loading="lazy"
              className="features-image"
            />
          </div>
          <div className="large-card">
            <div className="card-text-block slide-from-right-animation">
              <div className="subheading-flex">
                <div className="icon-wrapper background-primary">
                  <Search className="text-white"/>
                </div>
                <h5>Tailor-Made Experiential Travel</h5>
              </div>
              <h2>
                curated by experienced{" "}
                <span className="italics">travel specialists</span>
              </h2>
              <p>
                Crafted through deep destination expertise and trusted global partnerships to deliver truly personalized, immersive journeys.
              </p>
              <a
                href="/about"
                data-w-id="5636032a-1271-e473-ecbe-20e393bd2447"
                className="button-with-circle-icon w-inline-block"
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
              </a>
            </div>
          </div>
        </div> */}
        <div className="space-7rem"></div>
        <div className="card-flex reverse-on-tab">
          <div className="large-card">
            <div className="card-text-block slide-up-animation">
              <div className="subheading-flex">
                <div className="icon-wrapper background-primary">
                  <CircleQuestionMark className="text-white" />
                </div>
                <h5>Our Approach</h5>
              </div>
              <h2>
                What truly sets us
                <span className="italics"> apart.</span>
              </h2>
              <p>
                We craft bespoke itineraries through trusted global partnerships
                and local expertise, ensuring transparent pricing and human
                support at every stage of your journey.
              </p>
              <a
                href="/about"
                data-w-id="5636032a-1271-e473-ecbe-20e393bd2447"
                className="button-with-circle-icon w-inline-block"
              >
                <p className="button-text">Know More</p>
                <p className="button-text-absolute">Know More</p>
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
              </a>
            </div>
          </div>
          <div className="features-image-wrapper align-botton slide-down-animation">
            <div className="cut-out-wrapper align-bottom">
              <img
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f25dc0a21e0d0875d8d501_Bottom%20Left%20Long.svg"
                loading="lazy"
                alt="Cut out SVG"
                className="cut-out-image"
              />
            </div>
            <img
              sizes="(max-width: 479px) 80vw, (max-width: 767px) 420px, (max-width: 991px) 632px, 44vw"
              alt="woman and man  sitting on a chair"
              src="/images/explore2.jpg"
              loading="lazy"
              className="features-image align-top"
            />
          </div>
        </div>
        <div className="space-7rem"></div>
      </div>
    </div>
  );
}
