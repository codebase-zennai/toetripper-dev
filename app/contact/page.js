"use client";

import "./contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WebflowClientOnly from "../components/WebflowClientOnly";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Create FormData for Web3Forms
      const form = new FormData();
      form.append('access_key', 'daf9a9ea-4b7c-4b7e-b541-5e80800c84d8');
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('message', formData.message);
      form.append('subject', `New Contact Form Submission from ${formData.name}`);
      form.append('from_name', 'Toe Tripper Contact Form');
      form.append('to_email', 'info@toetripper.com');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };
  return (
    <WebflowClientOnly>
      <>
        <Navbar />

        <section className="section contact-page">
          <div className="padding-4-5rem">
            <div className="space-page-top" />
            <div className="title-block contact-title-block">
              <motion.div
                className="subheading-flex"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <div className="icon-wrapper background-primary">
                  <img
                    width="Auto"
                    height="Auto"
                    alt="Toe Tripper Brand Icon"
                    src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e977b86095f9904467158e_svg_sTMW.svg"
                    loading="eager"
                    className="small-icon"
                  />
                </div>
                <h5>Toe Tripper</h5>
              </motion.div>
              <motion.h1
                className="hero-title contact-hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                CONTACT
              </motion.h1>
              <motion.h5
                className="max-width-31rem contact-hero-copy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                We&apos;re always ready for a coffee and a chat.
              </motion.h5>
            </div>
    <div className="space-7rem"></div>
            <div className="contact-hero-grid">
              <div className="contact-left-panel">
                <div className="contact-intro-block">
                  <h1 className="contact-heading">Book an Appointment</h1>
                  <p className="contact-subheading">
                    We&apos;re always ready for a coffee and a chat!
                  </p>
                </div>

                <form className="contact-form-minimal" onSubmit={handleSubmit} aria-label="Appointment contact form">
                  <div className="contact-field-row">
                    <label htmlFor="name">Name</label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      placeholder="Your name" 
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required 
                    />
                  </div>
                  <div className="contact-field-row">
                    <label htmlFor="email">Email</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required 
                    />
                  </div>
                  <div className="contact-field-row">
                    <label htmlFor="message">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      placeholder="Tell us what you want to plan" 
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === 'submitting'}
                      required 
                    />
                  </div>
                  <button type="submit" className="contact-submit-btn" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                  </button>
                  {status === 'success' && <p style={{ color: '#10b981', marginTop: '1rem' }}>✓ Message sent successfully!</p>}
                  {status === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem' }}>✗ {errorMessage}</p>}
                </form>

                <div className="contact-info-grid" aria-label="Contact details">
                  <article className="contact-info-card">
                    <Phone size={20} strokeWidth={1.8} />
                    <h3>Phone Number</h3>
                    <p>+91 98866 89001</p>
                  </article>

                  <article className="contact-info-card">
                    <Mail size={20} strokeWidth={1.8} />
                    <h3>Email</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                      <a href="mailto:nikita@toetripper.com" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">nikita@toetripper.com</a>
                      <a href="mailto:packages@toetripper.com" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">packages@toetripper.com</a>
                      <a href="mailto:traveldesk@toetripper.com" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:underline">traveldesk@toetripper.com</a>
                    </div>
                  </article>

                  <article className="contact-info-card contact-info-card-full">
                    <MapPin size={20} strokeWidth={1.8} />
                    <h3>Address</h3>
                    <p>1/3,Wellington Street, 1St Floor,
            R.No.6, Mehta House 
Dhobitalao, Mumbai 400002</p>
                  </article>
                </div>
              </div>

              <div className="contact-right-panel">
                <img
                  src="/images/explore2.jpg"
                  alt="Toe Tripper team consultation and travel planning session"
                  className="contact-side-image"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="contact-findus-section">
              <div className="office-block">
                <h5 className="office-kicker">Find Your Way</h5>
                <h2 className="office-heading">Find Our Office</h2>
                <p className="office-copy">
                  Visit us at Mumbai, a city rich in culture and heritage. Here, amidst the bustling streets and vibrant marketplaces, tradition meets modern business.
                </p>
              </div>

              <div className="contact-map-wrap">
                <iframe
                  title="Marine Drive Mumbai Map"
                  src="https://www.google.com/maps?q=Marine+Drive,+Mumbai&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </>
    </WebflowClientOnly>
  );
}
