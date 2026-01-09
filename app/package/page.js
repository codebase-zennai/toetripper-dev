"use client";
import "./services.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsletterCTA from "../components/NewsletterCTA";
import ServicesHero from "./components/ServicesHero";
import WebflowClientOnly from "../components/WebflowClientOnly";
import Metrics from "../components/Metrics";
import Info from "./components/Info";

export default function Services() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <ServicesHero />
        {/* <ServicesFeatures /> */}
        {/* <Metrics /> */}
        <Info />
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
