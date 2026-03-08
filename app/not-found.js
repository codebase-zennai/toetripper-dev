'use client';

import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebflowClientOnly from './components/WebflowClientOnly';

export default function NotFound() {
  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
            <h1
              style={{
                fontSize: 'clamp(6rem, 15vw, 12rem)',
                fontWeight: 800,
                color: 'var(--color-primary, #193B9D)',
                lineHeight: 1,
                marginBottom: '1rem',
              }}
            >
              404
            </h1>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 600,
                color: 'var(--color-site-black, #050505)',
                marginBottom: '1rem',
              }}
            >
              Page Not Found
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#555',
                maxWidth: '500px',
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
              }}
            >
              Sorry, the page you are looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back on track.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/"
                className="button-primary"
                style={{
                  display: 'inline-block',
                  padding: '0.85rem 2rem',
                  backgroundColor: 'var(--color-primary, #193B9D)',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Go Home
              </Link>
              <Link
                href="/packages"
                style={{
                  display: 'inline-block',
                  padding: '0.85rem 2rem',
                  backgroundColor: 'var(--color-secondary, #F4A300)',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Explore Packages
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    </WebflowClientOnly>
  );
}
