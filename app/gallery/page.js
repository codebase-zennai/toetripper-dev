"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WebflowClientOnly from "../components/WebflowClientOnly";
import "./gallery.css";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import NewsletterCTA from "../components/NewsletterCTA";
import GalleryHero from "./components/GalleryHero";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const items = Array.isArray(data) ? data : [];
        setGalleryItems(items);
        setIsLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setGalleryItems([]);
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <GalleryHero />

        {/* Gallery Section */}
        <section className="section">
          <div className="padding-9rem">
            <div className="space-7rem"></div>

            {isLoading
              ? <div className="loader-container">
                  <div className="spinner"></div>
                </div>
              : <>
                  {/* Gallery Grid */}
                  {galleryItems.length === 0
                    ? <div className="loader-container">
                        <p
                          style={{
                            color: "#a0aec0",
                            fontSize: "0.95rem",
                            textAlign: "center",
                            padding: "3rem 0",
                          }}
                        >
                          No photos have been published yet.
                        </p>
                      </div>
                    : <motion.div
                        className="gallery-grid"
                        layout
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        {galleryItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            className="gallery-item"
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: 0.05 * index }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="gallery-image-wrapper">
                              <img
                                src={item.image_url}
                                alt={item.title || "Gallery photo"}
                                className="gallery-image"
                              />
                              <div className="gallery-overlay">
                                <div className="gallery-info">
                                  {item.title && <h3>{item.title}</h3>}
                                  {item.description && (
                                    <p>{item.description}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>}
                </>}

            <div className="space-7rem"></div>
          </div>
        </section>

        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
