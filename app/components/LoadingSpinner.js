'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show spinner on initial page load
    setIsLoading(true);
    
    // Hide spinner after page is fully loaded
    const handleComplete = () => {
      setIsLoading(false);
    };

    // Wait for document to be fully loaded
    if (document.readyState === 'complete') {
      handleComplete();
    } else {
      window.addEventListener('load', handleComplete);
      return () => window.removeEventListener('load', handleComplete);
    }
  }, []);

  // Show spinner on route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!isLoading) return null;

  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner-container">
        <div className="spinner-circle">
          <Image
            src="/images/toetripper-logo.png"
            alt="Loading..."
            width={80}
            height={80}
            className="spinner-logo"
            priority
          />
        </div>
      </div>
    </div>
  );
}
