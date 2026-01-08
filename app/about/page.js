'use client';

import { useState } from 'react';
import Navbar from "../components/Navbar";
import WebflowClientOnly from "../components/WebflowClientOnly";
import "./about.css";
import NewsletterCTA from '../components/NewsletterCTA';
import AboutHero from './components/AboutHero';
import AboutImages from './components/AboutImages';
import AboutMetrics from './components/AboutMetrics';
import AboutTeam from './components/AboutTeam';
import Footer from '../components/Footer';
import Brands from '../components/Brands';

export default function About() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Add your form submission logic here (e.g., API call)
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <AboutHero />
        <AboutImages />
      <section className="section">
        <div className="w-layout-blockcontainer container padding-9rem w-container">
          <div className="space-7rem"></div>
        </div>
      </section>
      <AboutMetrics />
      <AboutTeam />
      {/* <Brands /> */}
      <NewsletterCTA />
      <Footer />
    </>
    </WebflowClientOnly>
  );
}
