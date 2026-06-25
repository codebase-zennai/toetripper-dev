'use client';

import { useState, useEffect } from 'react';
import '../feedback/feedback.css'; 
import TestimonialCard from './TestimonialCard';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) {
          // Filter for the specifically added Toe Tripper Recommendations
          const filtered = data.filter(t => t.destination !== 'Toe Tripper Recommendation');
          setRecommendations(filtered);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch recommendations:', err);
        if (mounted) setIsLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  if (isLoading || recommendations.length === 0) {
    return null; // Do not render if empty or loading
  }

  return (
    <section className="section background-black rounded-corners" style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
      <div className="padding-4-5rem" style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'center', width: '100%', maxWidth: '100%' }}>
          <h2 className="w-full text-center text-3xl sm:text-4xl lg:text-[2.8vw] leading-tight mx-auto font-bold" style={{ color: '#ffffff' }}>
            Client Recommendations
          </h2>
          <p className="w-full text-center text-base sm:text-lg leading-relaxed mx-auto" style={{ color: '#a0aec0', fontSize: '0.9rem', maxWidth: '650px', marginTop: '1rem' }}>
            Discover the experiences of our distinguished clients. From seamless visa processing to meticulously curated travel itineraries.
          </p>
        </div>

        {/* CSS Grid from feedback.css (2 rows horizontally scrolling) */}
        <div className="direct-reviews-grid">
          {recommendations.map((rec, index) => (
            <TestimonialCard key={rec.id || index} rec={rec} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
