import { HeartHandshake, PartyPopper, TicketsPlane, TreePalm } from "lucide-react";

export default function Services() {
  return (
    <section className="section">
      <div
        data-w-id="26f29636-e130-073f-81a3-5680a2a67ade"
        className="w-layout-blockcontainer container w-container"
      > 
        <h1 className="text-center p-10">Our <span className="italics">Services</span></h1>
        <div id="learn-more" className="features-flex-wrapper">
          <div
            data-w-id="e08b3125-39b3-ccaa-a963-34378cadaf2d"
            className="features-card-large hover:scale-95 transition-transform duration-100"
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
                  <h2 className="text-white text-center"> Tailored journeys</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full">
              <h5 className="text-white text-center">
                Luxury travel designed for individuality
              </h5>
            </div>
          </div>
          <div className="features-block">
            <div className="features-flex-wrapper">
              <div
                data-w-id="e08b3125-39b3-ccaa-a963-34378cadaf3a"
                className="features-card-small hover:scale-95 transition-transform duration-100"
              >
                <h5>MICE & Incentive Travel </h5>
                <div className="w-full justify-center flex">
                  <TicketsPlane size={100} strokeWidth={0.5} />
                </div>
              </div>
              <div
                data-w-id="e08b3125-39b3-ccaa-a963-34378cadaf3f"
                className="features-card-small hover:scale-95 transition-transform duration-100"
              >
                <div className="features-flex space-between">
                  <h5>Corporate Events</h5>
                </div>
                <div className="w-full justify-center flex">
                  <PartyPopper size={100} strokeWidth={0.5} />
                </div>
              </div>
            </div>
            <div
              data-w-id="e08b3125-39b3-ccaa-a963-34378cadaf48"
              className="features-card-wide hover:scale-95 transition-transform duration-100"
            >
              <div className="features-flex space-between align-center">
                <h4 className="text-white">Consultative & Support Services</h4>
                <HeartHandshake size={125} strokeWidth={1} className="text-white"/>
                
              </div>
              <h5 className="font-white">
                Alerts to safely participate in the market
              </h5>
            </div>
          </div>
        </div>
        <div className="space-7rem"></div>
      </div>
    </section>
  );
}
