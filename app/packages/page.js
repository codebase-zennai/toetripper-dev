"use client";
import "./packages.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsletterCTA from "../components/NewsletterCTA";
import WebflowClientOnly from "../components/WebflowClientOnly";
import PackagesHero from "./components/PackagesHero";
import PackagesGrid from "./components/PackagesGrid";

export default function Services() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <PackagesHero />
        <PackagesGrid />
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
