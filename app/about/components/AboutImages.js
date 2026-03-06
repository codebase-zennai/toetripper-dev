'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutImages() {
  const containerRef = useRef(null);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to horizontal movement (right to left)
  // Moves from 0% to -50% as user scrolls down
  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-50%"]);

  return (
    <section
      id="About"
      ref={containerRef}
      className="section height-200vw"
    >
      <div className="about-stick">
        <motion.div 
          className="about-images-carousel"
          style={{ x }}
        >
          <img
            sizes="(max-width: 479px) 85vw, (max-width: 991px) 420px, 29vw"
            srcSet="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52a7e4b537205d4792604_img_NKZ0-p-500.webp 500w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52a7e4b537205d4792604_img_NKZ0-p-800.webp 800w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52a7e4b537205d4792604_img_NKZ0.webp 960w"
            alt="woman and man  sitting on a chair"
            src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52a7e4b537205d4792604_img_NKZ0.webp"
            loading="eager"
            className="about-image"
          />
          <div
            data-poster-url="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e53f0bf0ccaa6615d853c3_7679622-hd_1080_1920_25fps-poster-00001.jpg"
            data-video-urls="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e53f0bf0ccaa6615d853c3_7679622-hd_1080_1920_25fps-transcode.mp4,https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e53f0bf0ccaa6615d853c3_7679622-hd_1080_1920_25fps-transcode.webm"
            data-autoplay="true"
            data-loop="true"
            data-wf-ignore="true"
            className="about-image w-background-video w-background-video-atom"
          >
            <video
              id="9605f07c-9bf0-ac49-e742-540eed5452a2-video"
              autoPlay
              loop
              style={{
                backgroundImage:
                  "url('https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e53f0bf0ccaa6615d853c3_7679622-hd_1080_1920_25fps-poster-00001.jpg')",
              }}
              muted
              playsInline
              data-wf-ignore="true"
              data-object-fit="cover"
            >
              <source
                src="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e53f0bf0ccaa6615d853c3_7679622-hd_1080_1920_25fps-transcode.mp4"
                data-wf-ignore="true"
              />
              <source
                src="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e53f0bf0ccaa6615d853c3_7679622-hd_1080_1920_25fps-transcode.webm"
                data-wf-ignore="true"
              />
            </video>
          </div>
          <img
            sizes="(max-width: 479px) 85vw, (max-width: 991px) 420px, 29vw"
            srcSet="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52888311b2e77b16068ef_img_zOC2-p-500.webp 500w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52888311b2e77b16068ef_img_zOC2-p-800.webp 800w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52888311b2e77b16068ef_img_zOC2-p-1080.webp 1080w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52888311b2e77b16068ef_img_zOC2.webp 1440w"
            alt="woman and man standing"
            src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e52888311b2e77b16068ef_img_zOC2.webp"
            loading="eager"
            className="about-image"
          />
          <div
            data-poster-url="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e549034a3c1a3ac3603826_7679618-hd_1080_1920_25fps-poster-00001.jpg"
            data-video-urls="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e549034a3c1a3ac3603826_7679618-hd_1080_1920_25fps-transcode.mp4,https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e549034a3c1a3ac3603826_7679618-hd_1080_1920_25fps-transcode.webm"
            data-autoplay="true"
            data-loop="true"
            data-wf-ignore="true"
            className="about-image w-background-video w-background-video-atom"
          >
            <video
              id="cf76bbbc-00db-67c6-e409-091df139b35a-video"
              autoPlay
              loop
              style={{
                backgroundImage:
                  "url('https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e549034a3c1a3ac3603826_7679618-hd_1080_1920_25fps-poster-00001.jpg')",
              }}
              muted
              playsInline
              data-wf-ignore="true"
              data-object-fit="cover"
            >
              <source
                src="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e549034a3c1a3ac3603826_7679618-hd_1080_1920_25fps-transcode.mp4"
                data-wf-ignore="true"
              />
              <source
                src="https://cdn.prod.website-files.com/66e3df8d47eb3991ca9dbef7%2F66e549034a3c1a3ac3603826_7679618-hd_1080_1920_25fps-transcode.webm"
                data-wf-ignore="true"
              />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
