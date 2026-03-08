"use client";
import { Suspense } from "react";
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
        <Suspense>
          <PackagesGrid />
        </Suspense>
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
