'use client';

import { useState } from 'react';

export default function NewsletterCTA() {
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
    <div className="background-black">
      <section className="section">
        <div className="space-7rem"></div>
        <div className="space-7rem"></div>
        <div className="space-7rem"></div>
        <div className="w-layout-blockcontainer cta-container w-container">
          <div className="cta-wrapper">
            <div className="w-layout-hflex cta-card slide-down-animation">
              <h2 className="text-white">
                  Let’s Plan Your <span className="italics">Trip</span>
              </h2>
              <div className="space-1rem"></div>
              <p className="max-width-30rem text-white">
                Share your travel requirements with us and our team will get in
                touch to curate a personalized travel solution for you.
              </p>
              <div className="space-2rem"></div>
   
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
