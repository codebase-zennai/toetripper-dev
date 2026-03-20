'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Diamond, FileCheck, Gem, HeartHandshake, Medal, PartyPopper, Target, TargetIcon, TicketsPlane, TreePalm } from 'lucide-react';

const viewportOptions = { once: true, amount: 0.2, margin: '-80px' };
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

export default function AboutTeam() {
  const teamRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    teamRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="background-black">
        <div className="padding-13-5rem">
          <div className="about-flex gap-4rem">
            <div
              ref={(el) => (teamRefs.current[0] = el)}
              className="team-image slide-from-left-animation"
            >
              <img
                alt="Travel destination"
                src="/images/home.jpg"
                loading="lazy"
                className="features-image"
              />
            </div>
            <div
              ref={(el) => (teamRefs.current[1] = el)}
              className="team-block slide-from-right-animation"
            >
              <h3>Founder's Note</h3>
              <p className="max-width-18rem">
                Toe Tripper was built on a simple belief: travel should feel
                structured, reliable, and meaningful, not chaotic or
                transactional. <br />
                <br />
                With over 16 years of hands-on experience in corporate travel
                and MICE execution, I have seen how fragmented vendor
                management, price-driven decisions, and rushed planning can
                dilute both business outcomes and personal experiences. <br />
                <br />
                Toe Tripper exists to restore clarity and intention to travel,
                whether for board meetings, incentive programs, or family
                journeys. <br />
                <br />
                Nikita Rajpuut <br />
                Founder, Toe Tripper
              </p>
              <div className="socials-wrapper">
                <a href="https://www.youtube.com/" target="_blank" className="w-inline-block">
                  <img
                    width="Auto"
                    height="Auto"
                    alt=""
                    src="https://wubflow-shield.NOCODEXPORT.DEV/669f719e32c9ea42465af181/669f719e32c9ea42465af1c5_youtube.png"
                    loading="eager"
                    className="social-icon smaller invert"
                  />
                </a>
                <a href="https://www.instagram.com/" target="_blank" className="w-inline-block">
                  <img
                    width="Auto"
                    height="Auto"
                    alt=""
                    src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f49146e48580f1782a45_instagram.png"
                    loading="eager"
                    srcSet="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f49146e48580f1782a45_instagram-p-500.png 500w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f49146e48580f1782a45_instagram.png 512w"
                    sizes="(max-width: 767px) 16px, (max-width: 991px) 2vw, 1vw"
                    className="social-icon smaller"
                  />
                </a>
                <a href="https://www.tiktok.com/en/" target="_blank" className="w-inline-block">
                  <img
                    width="Auto"
                    height="Auto"
                    alt=""
                    src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f49146e48580f1782b02_tiktok.png"
                    loading="eager"
                    srcSet="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f49146e48580f1782b02_tiktok-p-500.png 500w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f49146e48580f1782b02_tiktok.png 512w"
                    sizes="(max-width: 767px) 16px, (max-width: 991px) 2vw, 1vw"
                    className="social-icon smaller"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="space-7rem"></div>

          <section
            ref={(el) => (teamRefs.current[2] = el)}
            className="about-difference-wrap team-block slide-from-right-animation"
          >
            <div className="about-difference-header mb-20">
              <p className="about-redesign-kicker">Our Positioning</p>
              <h3 className="text-white">What Makes Us Different</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              transition={{ ...baseTransition, duration: 0.6 }}
            >
              <div className="features-flex-wrapper about-difference-bento">
                <motion.div
                  className="features-card-large"
                  variants={createBentoVariants({ y: 40 })}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOptions}
                  transition={{ ...baseTransition, delay: 0.05 }}
                  whileHover={{ y: -6, transition: hoverTransition }}
                  whileTap={{ y: -3, transition: hoverTransition }}
                >
                  <div className="features-flex">
                    <div className="w-full items-center justify-center">
                      <div className="flex justify-center">
                        {/* <TargetIcon size={200} strokeWidth={0.5} className="text-white" /> */}
                        <Gem size={200} strokeWidth={0.5} className="text-white" />
                        
                      </div>
                      <div className="flex m-10 justify-center">
                        <h3 className="text-white text-center"> We do not chase volume</h3>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-center w-full">
                    <h5 className="text-white text-center">
                      We do not chase volume.
                    </h5>
                  </div> */}
                </motion.div>

                <div className="features-block">
                  <div className="features-flex-wrapper text-black">
                    <motion.div
                      className="features-card-small pt-10"
                      variants={createBentoVariants({ x: -40 })}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportOptions}
                      transition={{ ...baseTransition, delay: 0.1 }}
                      whileHover={{ y: -4, transition: hoverTransition }}
                      whileTap={{ y: -2, transition: hoverTransition }}
                    >
                      <h5 className='text-black mb-10'>We don't compete on discounts.</h5>
                      <div className="w-full justify-center flex">
                        <TicketsPlane size={100} strokeWidth={0.5} />
                        {/* <Medal size={100} strokeWidth={0.5} className="text-black" /> */}
                      </div>
                    </motion.div>

                    <motion.div
                      className="features-card-small pt-10"
                      variants={createBentoVariants({ x: 40 })}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportOptions}
                      transition={{ ...baseTransition, delay: 0.14 }}
                      whileHover={{ y: -4, transition: hoverTransition }}
                      whileTap={{ y: -2, transition: hoverTransition }}
                    >
                      <div className="features-flex space-between mb-10">
                        <h5>We design for clarity and accountability.</h5>
                      </div>
                      <div className="w-full justify-center flex">
                        <FileCheck size={100} strokeWidth={0.5} />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="features-card-wide bg-[#F4A300]" 
                    variants={createBentoVariants({ y: 30 })}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOptions}
                    transition={{ ...baseTransition, delay: 0.18 }}
                    whileHover={{ y: -5, transition: hoverTransition }}
                    whileTap={{ y: -3, transition: hoverTransition }}
                  >
                    <div className="features-flex space-between align-center">
                      <h4 className="text-white">Long-term partnership value.</h4>
                      <HeartHandshake size={125} strokeWidth={1} className="text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </section>

          <div className="space-7rem hide-on-tab"></div>
        </div>
      </div>
    </div>
  );
}
