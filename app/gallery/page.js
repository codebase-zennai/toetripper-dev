'use client';

import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import WebflowClientOnly from "../components/WebflowClientOnly";
import "./gallery.css";
import NewsletterCTA from '../components/NewsletterCTA';
import GalleryHero from './components/GalleryHero';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([{ id: 'all', label: 'All' }]);

  useEffect(() => {
    let mounted = true;

    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const items = Array.isArray(data) ? data : [];
        setGalleryItems(items);

        // Build tag-based categories from DB tags
        const tagSet = new Set();
        items.forEach(item => {
          if (Array.isArray(item.tags)) {
            item.tags.forEach(t => { if (t) tagSet.add(t); });
          }
        });
        const tagCategories = [...tagSet].map(tag => ({
          id: tag,
          label: tag.charAt(0).toUpperCase() + tag.slice(1),
        }));
        setCategories([{ id: 'all', label: 'All' }, ...tagCategories]);
        setIsLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setGalleryItems([]);
        setIsLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const filteredItems = selectedFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item =>
        Array.isArray(item.tags) && item.tags.includes(selectedFilter)
      );

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <GalleryHero />

        {/* Gallery Section */}
        <section className="section">
          <div className="padding-9rem">
            <div className="space-7rem"></div>

            {isLoading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                {/* Filter Buttons — only shown if there are tag categories */}
                {categories.length > 1 && (
                  <motion.div
                    className="gallery-filters"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {categories.map((cat) => (
                      <motion.button
                        key={cat.id}
                        className={`filter-button ${selectedFilter === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedFilter(cat.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {cat.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Gallery Grid */}
                {filteredItems.length === 0 ? (
                  <div className="loader-container">
                    <p style={{ color: '#a0aec0', fontSize: '0.95rem', textAlign: 'center', padding: '3rem 0' }}>
                      No photos have been published yet.
                    </p>
                  </div>
                ) : (
                  <motion.div
                    className="gallery-grid"
                    layout
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    {filteredItems.map((item, index) => (
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
                            alt={item.title || 'Gallery photo'}
                            className="gallery-image"
                          />
                          <div className="gallery-overlay">
                            <div className="gallery-info">
                              {item.title && <h3>{item.title}</h3>}
                              {item.description && <p>{item.description}</p>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </>
            )}

            <div className="space-7rem"></div>
          </div>
        </section>

        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
