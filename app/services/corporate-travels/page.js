"use client";
import "./services.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ServicesHero from "./components/ServicesHero";
import ServicesFeatures from "./components/ServicesFeatures";
import WebflowClientOnly from "../../components/WebflowClientOnly";
import Metrics from "../../components/Metrics";
import NewsletterCTACorporate from "@/app/components/NewsletterCTACorporate";

export default function Services() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <ServicesHero />
        <ServicesFeatures />
        {/* <Metrics /> */}
        <NewsletterCTACorporate />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
