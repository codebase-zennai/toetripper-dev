'use client';

import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <section className="section background-black">
      <div className="padding-4-5rem">
        <div className="space-2rem"></div>
        <div
          data-w-id="fa36639f-bc34-8f1a-4024-d088998077f8"
          className="footer-top"
        >
          <div className="footer-block">
            <a
              href="/"
              aria-current="page"
              className="footer-logo-link-wrapper w-nav-brand w--current"
            >
              <img
                width="Auto"
                height="Auto"
                alt="Logo"
                src="/Brand Kit for Toe Tripper/Toe Tripper Logo.png"
                loading="eager"
                sizes="(max-width: 479px) 139.984375px, (max-width: 991px) 124.4296875px, 9vw"
                className="footer-logo"
              />
            </a>
            <div className="socials-wrapper" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginTop: '1rem' }}>
              <a
                href="https://www.instagram.com/toetripper_travel_events/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-inline-block"
                style={{ color: '#cbd5e0', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#F4A300'}
                onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e0'}
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/company/toe-tripper/posts/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-inline-block"
                style={{ color: '#cbd5e0', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.color = '#193B9D'}
                onMouseOut={(e) => e.currentTarget.style.color = '#cbd5e0'}
              >
                <Linkedin size={24} />
              </a>
            </div>
            <p className="max-width-17vw" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', marginTop: '1rem', lineHeight: '1.4' }}>
              You Dream. We Deliver. Redefining Corporate Travel, MICE & Experiential Holidays.
            </p>
          </div>
          <div className="footer-right-flex">
            <div className="footer-wrapper">
              <h5 className="text-site-white">Main</h5>
              <div className="footer-link-wrapper">
                <a
                  href="/"
                  aria-current="page"
                  className="footer-link w--current"
                >
                  Home
                </a>
                <a
                  href="/"
                  aria-current="page"
                  className="footer-link move-down w--current"
                >
                  Home
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/about" className="footer-link">
                  About
                </a>
                <a href="/about" className="footer-link move-down">
                  About
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/services" className="footer-link">
                  Services
                </a>
                <a href="/services" className="footer-link move-down">
                  Services
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/blog" className="footer-link">
                  Blog
                </a>
                <a href="/blog" className="footer-link move-down">
                  Blog
                </a>
              </div>
            </div>
            <div className="footer-wrapper">
              <h5 className="text-site-white">Pages</h5>
              <div className="footer-link-wrapper">
                <a href="/contact" className="footer-link">
                  Contact
                </a>
                <a href="/contact" className="footer-link move-down">
                  Contact
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/terms-conditions" className="footer-link">
                  Terms &amp; Conditions
                </a>
                <a href="/terms-conditions" className="footer-link move-down">
                  Terms &amp; Conditions
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/privacy-policy" className="footer-link">
                  Privacy Policy
                </a>
                <a href="/privacy-policy" className="footer-link move-down">
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="footer-wrapper">
              <h5 className="text-site-white">Utilities</h5>
              <div className="footer-link-wrapper">
                <a href="/utilties/style-guide" className="footer-link">
                  Style Guide
                </a>
                <a
                  href="/utilties/style-guide"
                  className="footer-link move-down"
                >
                  Style Guide
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/utilties/instructions" className="footer-link">
                  Instructions
                </a>
                <a
                  href="/utilties/instructions"
                  className="footer-link move-down"
                >
                  Instructions
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/utilties/licenses" className="footer-link">
                  Licenses
                </a>
                <a
                  href="/utilties/licenses"
                  className="footer-link move-down"
                >
                  Licenses
                </a>
              </div>
              <div className="footer-link-wrapper">
                <a href="/utilties/changelog" className="footer-link">
                  Changelog
                </a>
                <a
                  href="/utilties/changelog"
                  className="footer-link move-down"
                >
                  Changelog
                </a>
              </div>
            </div>
            <div className="footer-wrapper">
              <h5 className="text-site-white">Contact</h5>
              <div className="footer-link-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
                <a href="tel:+919886689001" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
                  <span>+91 98866 89001</span>
                </a>
                <a href="mailto:packages@toetripper.com" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none' }}>
                  <span>packages@toetripper.com</span>
                </a>
                <div className="footer-link" style={{ display: 'flex', gap: '0.5rem', textTransform: 'none', cursor: 'default' }}>
                  <span style={{ lineHeight: '1.4', color: '#94a3b8' }}>
                    Marine Drive, Mumbai,<br />
                    Maharashtra, India
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-w-id="fa36639f-bc34-8f1a-4024-d0889980784b"
          className="footer-line"
        ></div>
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem' }}>
          <p className="font-white" style={{ margin: 0, color: 'whitesmoke', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Toe Tripper. All Rights Reserved.
          </p>
          <div className="footer-flex-bottom" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
            <a href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} className="hover:text-white transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </section>
  );
}
