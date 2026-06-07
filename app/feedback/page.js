'use client';

import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import WebflowClientOnly from "../components/WebflowClientOnly";
import "./feedback.css";
import NewsletterCTA from '../components/NewsletterCTA';
import FeedbackHero from './components/FeedbackHero';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, MessageSquareText, PlusCircle, Star, ThumbsUp, ExternalLink, ShieldCheck, Heart, Share2 } from 'lucide-react';

function getEmbedUrl(url) {
  if (!url) return null;
  
  // Instagram parsing
  const instaMatch = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/i);
  if (instaMatch) {
    return `https://www.instagram.com/p/${instaMatch[1]}/embed`;
  }
  
  // LinkedIn parsing
  const linkedinMatch = url.match(/linkedin\.com\/posts\/[a-zA-Z0-9_-]+(?:-|_)(\d+)/i) || 
                        url.match(/linkedin\.com\/posts\/activity-(\d+)/i) ||
                        url.match(/linkedin\.com\/feed\/update\/urn:li:activity:(\d+)/i) ||
                        url.match(/linkedin\.com\/feed\/update\/urn:li:share:(\d+)/i);
  if (linkedinMatch) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share/${linkedinMatch[1]}`;
  }
  
  if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/') || url.includes('linkedin.com/embed')) {
    return url;
  }
  
  return null;
}

export default function Feedback() {
  const [formType, setFormType] = useState('direct'); // 'direct' or 'social'
  const [status, setStatus] = useState('idle');
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
    socialLink: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  // Testimonials state
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch testimonials from DB only — no fallback data
  useEffect(() => {
    let mounted = true;

    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        setTestimonials(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setTestimonials([]);
        setIsLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      // Determine what to save in the destination field based on the form type
      const destinationValue = formType === 'social' ? feedbackForm.socialLink : feedbackForm.message.substring(0, 30); // fallback or empty
      const messageValue = formType === 'social' ? `Social share request: ${feedbackForm.socialLink}` : feedbackForm.message;
      
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: feedbackForm.name,
          destination: formType === 'social' ? feedbackForm.socialLink : (feedbackForm.message.split(' ').slice(0, 2).join(' ') || 'User Review'),
          rating: formType === 'social' ? 5 : feedbackForm.rating,
          message: messageValue,
          image_url: null
        })
      });

      if (!response.ok) throw new Error('Failed to submit');
      
      setFormStatus('success');
      setFeedbackForm({ name: '', email: '', rating: 5, message: '', socialLink: '' });
      
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  // Filter testimonials dynamically
  const socialTestimonials = testimonials.filter(t => getEmbedUrl(t.destination) !== null);
  const directTestimonials = testimonials.filter(t => getEmbedUrl(t.destination) === null);

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <FeedbackHero />
        
        {/* Main Content Sections */}
        <div className="feedback-container" id="feedback-section">
          
          {/* Section 1: Echoes from the Feed (Social Media Testimonials) */}
          <section className="testimonials-section">
            <div className="section-header">
              <div className="subheading-flex">
                <div className="icon-wrapper background-primary">
                  <Share2 className="text-white" size={24} strokeWidth={1.5} />
                </div>
                <h5>Echoes from the Feed</h5>
              </div>
              <h2 className="w-full wrap-break-word text-3xl sm:text-4xl lg:text-[2.8vw] leading-tight" style={{ color: '#ffffff', marginTop: '0.75rem' }}>
                Live Social Feed
              </h2>
              <p className="w-full text-base sm:text-lg leading-relaxed wrap-break-word" style={{ color: '#a0aec0', fontSize: '0.875rem' }}>
                Real moments shared live. Direct social updates and posts from our travelers around the globe.
              </p>
            </div>

            {isLoading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : socialTestimonials.length === 0 ? (
              <div className="loader-container">
                <p style={{ color: '#a0aec0', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No social posts have been published yet.</p>
              </div>
            ) : (
              <div className="social-embeds-grid">
                {socialTestimonials.map((testimonial) => {
                  const embedUrl = getEmbedUrl(testimonial.destination);
                  const isInsta = testimonial.destination.includes('instagram.com');
                  return (
                    <motion.div 
                      key={testimonial.id}
                      className="social-card-wrapper"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="social-card-header">
                        <div className="platform-badge">
                          {isInsta ? (
                            <span className="badge-content insta">
                              <Instagram size={14} /> Instagram
                            </span>
                          ) : (
                            <span className="badge-content linkedin">
                              <Linkedin size={14} /> LinkedIn
                            </span>
                          )}
                        </div>
                        <a 
                          href={testimonial.destination} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="view-original-btn"
                          title="View original post"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                      
                      <div className="social-embed-frame">
                        <iframe
                          src={embedUrl}
                          width="100%"
                          height="480"
                          frameBorder="0"
                          scrolling="no"
                          allowtransparency="true"
                          allow="encrypted-media"
                          title={`Social post from ${testimonial.name}`}
                          className="social-iframe"
                          loading="lazy"
                        />
                      </div>
                      <div className="social-card-footer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <p className="author-name">Posted by {testimonial.name}</p>
                        <a 
                          href={isInsta ? "https://www.instagram.com/toetripper_travel_events/" : "https://www.linkedin.com/company/toe-tripper/posts/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="follow-platform-button"
                        >
                          {isInsta ? 'Follow us on Instagram' : 'Follow us on LinkedIn'}
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>

          <div className="space-7rem"></div>

          {/* Section 2: Corporate & Client Stories (Direct Reviews) */}
          <section className="testimonials-section">
            <div className="section-header">
              <div className="subheading-flex">
                <div className="icon-wrapper background-primary">
                  <MessageSquareText className="text-white" size={24} strokeWidth={1.5} />
                </div>
                <h5>Corporate & Client Stories</h5>
              </div>
              <h2 className="w-full wrap-break-word text-3xl sm:text-4xl lg:text-[2.8vw] leading-tight" style={{ color: '#ffffff', marginTop: '0.75rem' }}>
                Reviews & Testimonials
              </h2>
              <p className="w-full text-base sm:text-lg leading-relaxed wrap-break-word" style={{ color: '#a0aec0', fontSize: '0.875rem' }}>
                Detailed testimonials and reviews from corporate managers and experiential travelers who experienced seamless journeys with Toe Tripper.
              </p>
            </div>

            {isLoading ? (
              <div className="loader-container">
                <div className="spinner"></div>
              </div>
            ) : directTestimonials.length === 0 ? (
              <div className="loader-container">
                <p style={{ color: '#a0aec0', fontSize: '0.9rem', textAlign: 'center', padding: '2rem 0' }}>No client reviews have been published yet.</p>
              </div>
            ) : (
              <div className="direct-reviews-grid">
                {directTestimonials.map((testimonial, index) => (
                  <motion.div 
                    key={testimonial.id || index}
                    className="direct-review-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="card-top">
                      <div className="stars-row">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} size={16} fill="var(--secondary, #F4A300)" color="var(--secondary, #F4A300)" />
                        ))}
                      </div>
                      <ShieldCheck size={20} className="verified-icon" />
                    </div>
                    
                    <p className="review-message">"{testimonial.message || testimonial.text}"</p>
                    
                    <div className="review-meta">
                      <h4 className="client-name">{testimonial.name}</h4>
                      {testimonial.destination && (
                        <span className="client-destination">{testimonial.destination}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          <div className="space-7rem"></div>

          {/* Section 3: Redesigned Feedback Form */}
          <motion.div 
            className="feedback-form-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="form-layout-wrapper">
              <div className="form-info-side">
                <div className="form-info-content">
                  <span className="form-tagline">Share Your Journey</span>
                  <h2>How was your Toe Tripper experience?</h2>
                  <p>Whether it was a massive corporate MICE execution, an efficient VIP corporate transfer, or a hand-crafted experiential holiday, we want to hear your story.</p>
                  
                  <div className="form-bullets">
                    <div className="bullet-item">
                      <ThumbsUp className="bullet-icon" size={18} />
                      <p>Helps us maintain flawless planning standards.</p>
                    </div>
                    <div className="bullet-item">
                      <Heart className="bullet-icon" size={18} />
                      <p>Brings inspiration to travelers searching for unique routes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-input-side">
                {/* Tabs to select Direct Story vs. Social Post URL */}
                <div className="form-type-tabs">
                  <button 
                    type="button" 
                    className={`form-tab ${formType === 'direct' ? 'active' : ''}`}
                    onClick={() => setFormType('direct')}
                  >
                    Direct Story
                  </button>
                  <button 
                    type="button" 
                    className={`form-tab ${formType === 'social' ? 'active' : ''}`}
                    onClick={() => setFormType('social')}
                  >
                    Social Post Link
                  </button>
                </div>

                <form onSubmit={handleFeedbackSubmit} className="redesigned-form">
                  <div className="form-row-group">
                    <div className="form-field">
                      <label htmlFor="form-name">Name</label>
                      <input
                        type="text"
                        id="form-name"
                        value={feedbackForm.name}
                        onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                        required
                        placeholder="Your Name / Organization"
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="form-email">Email</label>
                      <input
                        type="email"
                        id="form-email"
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {formType === 'direct' ? (
                    <>
                      <div className="form-row-group">
                        <div className="form-field">
                          <label htmlFor="form-destination">Destination / Event Name</label>
                          <input
                            type="text"
                            id="form-destination"
                            value={feedbackForm.socialLink} // mapping to socialLink temporarily
                            onChange={(e) => setFeedbackForm({...feedbackForm, socialLink: e.target.value})}
                            placeholder="e.g., Swiss Alps, Annual MICE 2026"
                          />
                        </div>

                        <div className="form-field">
                          <label>Experience Rating</label>
                          <div className="form-stars-selector">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={`star-select-btn ${feedbackForm.rating >= star ? 'active' : ''}`}
                                onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                                aria-label={`Rate ${star} Stars`}
                              >
                                <Star size={20} fill={feedbackForm.rating >= star ? "var(--secondary, #F4A300)" : "transparent"} color={feedbackForm.rating >= star ? "var(--secondary, #F4A300)" : "#666"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="form-field">
                        <label htmlFor="form-message">Your Review</label>
                        <textarea
                          id="form-message"
                          value={feedbackForm.message}
                          onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})}
                          required
                          placeholder="Describe your itinerary experience, logistics, ground coordination, etc..."
                          rows="5"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="form-field">
                        <label htmlFor="form-social-link">Instagram or LinkedIn Post URL</label>
                        <input
                          type="url"
                          id="form-social-link"
                          value={feedbackForm.socialLink}
                          onChange={(e) => setFeedbackForm({...feedbackForm, socialLink: e.target.value})}
                          required
                          placeholder="e.g., https://www.instagram.com/p/DF2TebiyYgD/ or LinkedIn post URL"
                        />
                        <p className="field-hint">Paste the URL of your post or reel sharing your journey. We will embed it here!</p>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="redesigned-submit-btn"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Publishing...' : 'Share Review'}
                  </button>

                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div 
                        className="form-alert success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <ShieldCheck size={20} />
                        <p>Thank you! Your story has been submitted and is currently being published.</p>
                      </motion.div>
                    )}
                    {formStatus === 'error' && (
                      <motion.div 
                        className="form-alert error"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <p>Something went wrong with submission. Please verify details and try again.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>

        </div>

        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
