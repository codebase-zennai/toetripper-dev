'use client';

import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Brands from "./components/Brands";
import Services from "./components/Services";
import Explore from "./components/Explore";
import Metrics from "./components/Metrics";
import BlogPosts from "./components/BlogPosts"; // kept — used by /blog routes
import NewsletterCTA from "./components/NewsletterCTA";
import Footer from "./components/Footer";
import WebflowClientOnly from "./components/WebflowClientOnly";
import FeaturedPackages from "./components/FeaturedPackages";

export default function Home() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <Hero />
        <Services />
        <FeaturedPackages />
        <Explore />
        {/* <Brands /> */}
        <Metrics />
        {/* TrendingDestinations grid removed — destinations are in the FeaturedPackages marquee above */}
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
