"use client";
import "./services.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ServicesHero from "./components/ServicesHero";
import ServicesFeatures from "./components/ServicesFeatures";
import CorporateServicesBento from "./components/CorporateServicesBento";
import WebflowClientOnly from "../../components/WebflowClientOnly";
import Metrics from "../../components/Metrics";
import NewsletterCTACorporate from "@/app/components/NewsletterCTACorporate";

export default function Services() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <ServicesHero />
        <CorporateServicesBento />
        <ServicesFeatures />
        <NewsletterCTACorporate />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
