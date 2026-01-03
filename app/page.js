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

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Explore />
      <Brands />
      <Metrics />
      {/* <BlogPosts /> */}
      <NewsletterCTA />
      <Footer />
      <script
        src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=66e3df8d47eb3991ca9dbef7"
        type="text/javascript"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://wubflow-shield.nocodexport.dev/66e3df8d47eb3991ca9dbef7/js/webflow.9633dd252.js"
        type="text/javascript"
      ></script>
    </>
  );
}
