'use client';

import { useEffect, useRef } from 'react';

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
    <section className="section">
      <div className="w-layout-blockcontainer container background-black w-container">
        <div className="padding-13-5rem">
          <div className="about-flex gap-4rem">
            <div
              ref={(el) => (teamRefs.current[0] = el)}
              className="team-image slide-from-left-animation"
            >
              <div className="cut-out-wrapper">
                <img
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f25f231d9a991540f23a96_Top%20Left%20Long%20Dark.svg"
                  loading="lazy"
                  alt="Cut out SVG"
                  className="cut-out-image"
                />
              </div>
              <div className="cut-out-wrapper align-bottom-right">
                <img
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f25f236650d29c73be169c_Bottom%20Right%20Dark.svg"
                  loading="lazy"
                  alt="Cut out SVG"
                  className="cut-out-image"
                />
              </div>
              <img
                sizes="(max-width: 479px) 80vw, (max-width: 767px) 420px, (max-width: 991px) 596px, 41vw"
                srcSet="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a693adf8275599be0cd0_Jane-p-500.webp 500w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a693adf8275599be0cd0_Jane-p-800.webp 800w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a693adf8275599be0cd0_Jane.webp 960w"
                alt="woman sitting on a chair"
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a693adf8275599be0cd0_Jane.webp"
                loading="lazy"
                className="features-image"
              />
            </div>
            <div
              ref={(el) => (teamRefs.current[1] = el)}
              className="team-block slide-from-right-animation"
            >
              <h3>Jane Doe</h3>
              <p className="max-width-18rem">
                With over 15 years of experience as a stock analyst on Wall
                Street, Jane has solidified her reputation as a seasoned
                professional. <br />
                <br />
                Her insights, honed during the post-financial crisis, have
                consistently garnered attention and respect. <br />
                <br />
                Since 2015, Jane has been a prominent figure at stock
                conferences and in the media, sharing her bold predictions and
                in-depth analyses.
              </p>
              <div className="socials-wrapper">
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  className="w-inline-block"
                >
                  <img
                    width="Auto"
                    height="Auto"
                    alt=""
                    src="https://wubflow-shield.NOCODEXPORT.DEV/669f719e32c9ea42465af181/669f719e32c9ea42465af1c5_youtube.png"
                    loading="eager"
                    className="social-icon smaller invert"
                  />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="w-inline-block"
                >
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
                <a
                  href="https://www.tiktok.com/en/"
                  target="_blank"
                  className="w-inline-block"
                >
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
          <div className="about-flex reverse-on-tab gap-4rem">
            <div
              ref={(el) => (teamRefs.current[2] = el)}
              className="team-block slide-from-left-animation"
            >
              <h3>Jacob Smith</h3>
              <p className="max-width-18rem">
                Our seasoned Portfolio Manager, actively oversees the Bento
                Wealth Fund, delivering insights and actionable strategies. He
                manages our real-time trade alerts and stock positions.
                <br />
                <br />
                Jacob&#x27;s proven track record of outperforming the market
                during volatile times underscores his expertise in navigating
                the dynamic world of investing.
              </p>
              <div className="socials-wrapper">
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  className="w-inline-block"
                >
                  <img
                    width="Auto"
                    height="Auto"
                    alt=""
                    src="https://wubflow-shield.NOCODEXPORT.DEV/669f719e32c9ea42465af181/669f719e32c9ea42465af1c5_youtube.png"
                    loading="eager"
                    className="social-icon smaller invert"
                  />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="w-inline-block"
                >
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
                <a
                  href="https://www.tiktok.com/en/"
                  target="_blank"
                  className="w-inline-block"
                >
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
            <div
              ref={(el) => (teamRefs.current[3] = el)}
              className="team-image slide-from-right-animation"
            >
              <div className="cut-out-wrapper align-right">
                <img
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f260676650d29c73bf40d3_Top%20Right%20Mid.svg"
                  loading="lazy"
                  alt="Cut out SVG"
                  className="cut-out-image"
                />
              </div>
              <div className="cut-out-wrapper align-bottom">
                <img
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66f260b5c5d70dd0e0ffb487_Bottom%20Left%20Mid.svg"
                  loading="lazy"
                  alt="Cut out SVG"
                  className="cut-out-image"
                />
              </div>
              <img
                sizes="(max-width: 479px) 80vw, (max-width: 767px) 420px, (max-width: 991px) 596px, 41vw"
                srcSet="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a69375bed8324826235e_Jacob-p-500.webp 500w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a69375bed8324826235e_Jacob-p-800.webp 800w, https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a69375bed8324826235e_Jacob.webp 960w"
                alt="man sitting on a chair"
                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e5a69375bed8324826235e_Jacob.webp"
                loading="lazy"
                className="features-image"
              />
            </div>
          </div>
          <div className="space-7rem hide-on-tab"></div>
        </div>
      </div>
    </section>
  );
}
