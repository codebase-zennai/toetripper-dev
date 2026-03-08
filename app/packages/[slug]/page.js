'use client';

import { useParams } from 'next/navigation';
import { getPackageBySlug } from '../../../lib/db/packages';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import NewsletterCTA from '../../components/NewsletterCTA';
import WebflowClientOnly from '../../components/WebflowClientOnly';
import PackageDetailsHero from './components/PackageDetailsHero';
import PackageDetailsFeatures from './components/PackageDetailsFeatures';

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params.slug;
  
  const packageData = getPackageBySlug(slug);

  if (!packageData) {
    return (
      <WebflowClientOnly>
        <>
          <Navbar />
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Package Not Found</h1>
              <p className="text-xl text-gray-600 mb-8">Sorry, we couldn't find the package you're looking for.</p>
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
