"use client";
import "./services.css";
import Footer from "../../components/Footer";
import Metrics from "../../components/Metrics";
import Navbar from "../../components/Navbar";
import NewsletterCTA from "../../components/NewsletterCTA";
import WebflowClientOnly from "../../components/WebflowClientOnly";
import ExperientialScopeBento from "./components/ExperientialScopeBento";
import ServicesFeatures from "./components/ServicesFeatures";
import ServicesHero from "./components/ServicesHero";

export default function Services() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <ServicesHero />
        <ExperientialScopeBento />
        <ServicesFeatures />
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
