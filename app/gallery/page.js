'use client';

import { useState } from 'react';
import Navbar from "../components/Navbar";
import WebflowClientOnly from "../components/WebflowClientOnly";
import "./gallery.css";
import NewsletterCTA from '../components/NewsletterCTA';
import GalleryHero from './components/GalleryHero';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Bali Sunset',
      category: 'destinations',
      image: 'https://images.unsplash.com/photo-1537225228614-b19960eeb2e0?w=600&h=400&fit=crop',
      location: 'Bali, Indonesia'
    },
    {
      id: 2,
      title: 'Mountain Peaks',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      location: 'Swiss Alps'
    },
    {
      id: 3,
      title: 'Beach Vibes',
      category: 'destinations',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
      location: 'Maldives'
    },
    {
      id: 4,
      title: 'Corporate Event',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      location: 'Singapore'
    },
    {
      id: 5,
      title: 'Hiking Trail',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1551516730-2f2ca89d3e9f?w=600&h=400&fit=crop',
      location: 'New Zealand'
    },
    {
      id: 6,
      title: 'Island Paradise',
      category: 'destinations',
      image: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&h=400&fit=crop',
      location: 'Seychelles'
    },
    {
      id: 7,
      title: 'Team Building',
      category: 'corporate',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      location: 'Tokyo'
    },
    {
      id: 8,
      title: 'Forest Adventure',
      category: 'adventure',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      location: 'Costa Rica'
    }
  ];

  const filteredItems = selectedFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedFilter);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'corporate', label: 'Corporate' }
  ];

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <GalleryHero />

        {/* Gallery Section */}
        <section className="section">
          <div className="padding-9rem">
            <div className="space-7rem"></div>

            {/* Filter Buttons */}
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

            {/* Gallery Grid */}
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
                      src={item.image}
                      alt={item.title}
                      className="gallery-image"
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-info">
                        <h3>{item.title}</h3>
                        <p>{item.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="space-7rem"></div>
          </div>
        </section>

        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
