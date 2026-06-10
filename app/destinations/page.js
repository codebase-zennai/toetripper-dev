'use client';

import { Suspense } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import NewsletterCTA from '../components/NewsletterCTA';
import WebflowClientOnly from '../components/WebflowClientOnly';
import DestinationsHero from './components/DestinationsHero';
import DestinationsGrid from './components/DestinationsGrid';

export default function DestinationsPage() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <DestinationsHero />
        <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading destinations...</div>}>
          <DestinationsGrid />
        </Suspense>
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
