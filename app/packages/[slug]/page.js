'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import NewsletterCTA from '../../components/NewsletterCTA';
import WebflowClientOnly from '../../components/WebflowClientOnly';
import PackageDetailsHero from './components/PackageDetailsHero';
import PackageDetailsFeatures from './components/PackageDetailsFeatures';

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params.slug;
  
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPackage() {
      try {
        const res = await fetch('/api/packages?status=published');
        const data = await res.json();
        if (data.success) {
          const found = data.data.find(pkg => pkg.slug === slug);
          if (found) {
            setPackageData(found);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch package:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPackage();
    }
  }, [slug]);

  if (loading) {
    return (
      <WebflowClientOnly>
        <>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-lg text-gray-500">Loading package details...</div>
          </div>
          <Footer />
        </>
      </WebflowClientOnly>
    );
  }

  if (error || !packageData) {
    return (
      <WebflowClientOnly>
        <>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
              <p className="text-xl text-gray-600 mb-8">Sorry, we couldn&apos;t find the package you&apos;re looking for.</p>
              <a
                href="/packages"
                className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
              >
                Back to Packages
              </a>
            </div>
          </div>
          <Footer />
        </>
      </WebflowClientOnly>
    );
  }

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <PackageDetailsHero package={packageData} />
        <PackageDetailsFeatures package={packageData} />
        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
