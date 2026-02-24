'use client';

import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Brands from "./components/Brands";
import Services from "./components/Services";
import Explore from "./components/Explore";
import Metrics from "./components/Metrics";
import BlogPosts from "./components/BlogPosts";
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
        <FeaturedPackages />
        <Services />
        <Explore />
        <Brands />
        <Metrics />
        <BlogPosts />
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
