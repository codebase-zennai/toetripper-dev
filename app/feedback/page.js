'use client';

import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import WebflowClientOnly from "../components/WebflowClientOnly";
import "./feedback.css";
import NewsletterCTA from '../components/NewsletterCTA';
import FeedbackHero from './components/FeedbackHero';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function Feedback() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 5,
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  // Testimonials carousel data + pagination (fetched from Supabase via API)
  const [testimonials, setTestimonials] = useState([]);
  const itemsPerPage = 4;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(testimonials.length / itemsPerPage));

  // Fetch testimonials from our API (which reads Supabase)
  useEffect(() => {
    let mounted = true;

    const fallback = [
      { name: 'Sarah Johnson', destination: 'Bali, Indonesia', rating: 5, text: 'Toe Tripper made my dream vacation come true! Every detail was perfectly planned and executed.' },
      { name: 'Mike Chen', destination: 'Swiss Alps', rating: 5, text: 'The corporate travel experience was seamless. Professional, reliable, and genuinely caring.' },
      { name: 'Emily Rodriguez', destination: 'Japan Explorer', rating: 5, text: 'Best travel company I\'ve worked with. They understand what meaningful travel really means.' },
      { name: 'David Thompson', destination: 'Iceland Adventure', rating: 5, text: 'Exceptional service from start to finish. Toe Tripper truly delivers on their promise.' },
      { name: 'Aisha Khan', destination: 'Morocco', rating: 5, text: 'An unforgettable cultural journey — highly recommended.' },
      { name: 'Carlos Mendes', destination: 'Portugal', rating: 5, text: 'Seamless planning and thoughtful local experiences.' },
      { name: 'Lina Park', destination: 'South Korea', rating: 5, text: 'They took care of every little detail with care.' },
      { name: 'Tom Baker', destination: 'Canada', rating: 5, text: 'Excellent support throughout the trip.' },
      { name: 'Nora Ahmed', destination: 'Egypt', rating: 5, text: 'A deeply memorable and well-curated itinerary.' },
      { name: 'Oliver Grant', destination: 'New Zealand', rating: 5, text: 'Adventure-focused and safe — great guides.' },
      { name: 'Priya Mehra', destination: 'Sri Lanka', rating: 5, text: 'Thoughtful routing and warm local partnerships.' },
      { name: 'Jamal White', destination: 'South Africa', rating: 5, text: 'Impeccable logistics and great value.' },
      { name: 'Hannah Lee', destination: 'Thailand', rating: 5, text: 'Beautifully organized, great local touches.' },
      { name: 'Mateo Ruiz', destination: 'Mexico', rating: 5, text: 'Fantastic culinary experiences and smooth transport.' },
      { name: 'Sofia Petrova', destination: 'Greece', rating: 5, text: 'Romantic and relaxed — everything we wanted.' },
      { name: 'Ethan Brooks', destination: 'Iceland', rating: 5, text: 'Adventure and comfort balanced perfectly.' }
    ];

    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
        else setTestimonials(fallback);
      })
      .catch(() => {
        if (!mounted) return;
        setTestimonials(fallback);
      });

    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPage((p) => (p + 1) % totalPages), 6000);
    return () => clearInterval(id);
  }, [totalPages]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
        const response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: feedbackForm.name,
            destination: '',
            rating: feedbackForm.rating,
            message: feedbackForm.message,
            image_url: null
          })
        });

      if (!response.ok) throw new Error('Failed to submit');
      
      setFormStatus('success');
      setFeedbackForm({ name: '', email: '', rating: 5, message: '' });
      // optionally refresh testimonials after submit (commented out to avoid unexpected reflows)
      // fetch('/api/testimonials').then(r => r.json()).then(d => setTestimonials(d || []));
      
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <FeedbackHero />
        
        {/* Feedback Section */}
        <div>
          <div> 
            
            <div className="feedback-container">
            <div className="space-7rem"></div>
              {/* Testimonials Display */}
              <motion.div 
                className="testimonials-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="heading-2">What Our Travelers Say</h2>
                
                <div className="testimonials-carousel">
                  <motion.div
                    key={page}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="testimonials-grid">
                      {testimonials.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                          <div className="rating">{[...Array(testimonial.rating)].map((_, i) => <span key={i}>⭐</span>)}</div>
                          <p className="testimonial-text">{testimonial.text}</p>
                          <p className="testimonial-author">{testimonial.name}</p>
                          <p className="testimonial-destination">{testimonial.destination}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <div className="carousel-controls">
                    <button type="button" className="carousel-btn" onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}>‹</button>
                    <div className="carousel-dots">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button key={i} className={`dot ${i === page ? 'active' : ''}`} onClick={() => setPage(i)} aria-label={`Go to page ${i + 1}`} />
                      ))}
                    </div>
                    <button type="button" className="carousel-btn" onClick={() => setPage((p) => (p + 1) % totalPages)}>›</button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="feedback-form-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >

                <div className="feedback-form-layout">
                  <div className="feedback-form-left">
                    <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                <h2 className="heading-2">Share Your Experience</h2>
                <p className="text-body">Your feedback helps us improve and create better travel experiences for everyone.</p>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                      required
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={feedbackForm.email}
                      onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                      required
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="rating">How would you rate your experience?</label>
                    <div className="rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-button ${feedbackForm.rating >= star ? 'active' : ''}`}
                          onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Your Feedback</label>
                    <textarea
                      id="message"
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})}
                      required
                      placeholder="Tell us what you think..."
                      rows="6"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="button-primary"
                    disabled={formStatus === 'submitting'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {formStatus === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
                  </motion.button>

                  {formStatus === 'success' && (
                    <motion.p 
                      className="form-message success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Thank you! Your feedback has been received.
                    </motion.p>
                  )}
                  {formStatus === 'error' && (
                    <motion.p 
                      className="form-message error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                    </form>
                  </div>

                  <div className="feedback-form-right">
                    <div className="feedback-image">
                      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format&fit=crop" alt="Travelers" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
