import { CircleQuestionMark, Search } from "lucide-react";

export default function Explore() {
  return (
    <section className="section">
      <div className="w-layout-blockcontainer container padding-4-5rem w-container">
        <div id="explore" className="card-flex">
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
              src="./images/explore1.jpg"
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
        </div>
        <div className="space-7rem"></div>
        <div className="card-flex reverse-on-tab">
          <div className="large-card">
            <div className="card-text-block slide-up-animation">
              <div className="subheading-flex">
                <div className="icon-wrapper background-primary">
                  <CircleQuestionMark className="text-white"/>
                </div>
                <h5>Why Us?</h5>
              </div>
              <h2>
                Seamless travel, executed
                <span className="italics"> with precision.</span>
              </h2>
              <div className="metrics-flex space-between align-center">
                <p>
                  Never miss a chance for seamless travel through expert planning and on-ground execution.
                </p>
                <a
                  href="/services"
                  data-w-id="c0341e22-4b5c-b0e6-d122-e43ef5c5890f"
                  className="services-link w-inline-block"
                >
                  <img
                    width="Auto"
                    height="Auto"
                    alt="Link Arrow"
                    src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e44551aba3c50e102266ed_ArrowSide.svg"
                    loading="eager"
                    className="large-icon invert"
                  />
                </a>
              </div>
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
                src="./images/explore2.jpg"
              loading="lazy"
              className="features-image align-top"
            />
          </div>
        </div>
        <div className="space-7rem"></div>
      </div>
    </section>
  );
}
