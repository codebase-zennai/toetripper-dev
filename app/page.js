'use client';

import Image from "next/image";
import Hero from "./components/Hero";
import Hero2 from "./components/Hero2";
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
import Recommendations from "./components/Recommendations";
import HeroRight from "./components/HeroRight";

export default function Home() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        {/* <HeroRight /> */}
        <Hero2 />
        {/* <Hero /> */}
        <Services />
        <FeaturedPackages />
        <Explore />
        {/* <Brands /> */}
        <Metrics />
        <Recommendations />
        {/* TrendingDestinations grid removed — destinations are in the FeaturedPackages marquee above */}
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
