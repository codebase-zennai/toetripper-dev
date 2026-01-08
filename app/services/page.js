"use client";
import "./services.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsletterCTA from "../components/NewsletterCTA";
import ServicesHero from "./components/ServicesHero";
import ServicesFeatures from "./components/ServicesFeatures";
import WebflowClientOnly from "../components/WebflowClientOnly";
import Metrics from "../components/Metrics";

export default function Services() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <ServicesHero />
        <ServicesFeatures />
        {/* <Metrics /> */}
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
