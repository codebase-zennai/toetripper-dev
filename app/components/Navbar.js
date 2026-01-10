'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/', current: true },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleServices = () => setServicesOpen((prev) => !prev);
  const closeServices = () => setServicesOpen(false);

  return (
    <div>
      <div className="items-center justify-between flex mx-10 mb-10 mt-5">
        <Link href="/" aria-label="Toe Tripper" className="brand w-nav-brand" onClick={closeServices}>
          <Image src="/Brand Kit for Toe Tripper/Toe Tripper Logo.png" alt="Toe Tripper" width={350} height={56} priority />
        </Link>

        <nav role="navigation" className="nav-menu w-nav-menu">
          {navLinks.slice(0, 2).map((link) => (
            <div key={link.href} className="nav-link-wrapper">
              <Link href={link.href} aria-current={link.current ? 'page' : undefined} className={`nav-link w-nav-link${link.current ? ' w--current' : ''}`} onClick={closeServices}>
                {link.label}
              </Link>
              <Link href={link.href} aria-current={link.current ? 'page' : undefined} className={`nav-link move-down hide-on-tab w-nav-link${link.current ? ' w--current' : ''}`} onClick={closeServices}>
                {link.label}
              </Link>
            </div>
          ))}

          <div
            className={`nav-link-wrapper dropdown${servicesOpen ? ' dropdown-open' : ''}`}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="nav-link w-nav-link dropdown-trigger"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={toggleServices}
            >
              Services
            </button>
            <div className="dropdown-menu" role="menu">
              <div className="dropdown-group">
                <span className="dropdown-heading">Destinations</span>
                <Link href="/services/destinations/india" className="dropdown-link" role="menuitem" onClick={closeServices}>
                  Indian
                </Link>
                <Link href="/services/destinations/international" className="dropdown-link" role="menuitem" onClick={closeServices}>
                  International
                </Link>
              </div>
              <Link href="/services/corporate-events" className="dropdown-link" role="menuitem" onClick={closeServices}>
                Corporate Events
              </Link>
              <Link href="/services/mice-incentive" className="dropdown-link" role="menuitem" onClick={closeServices}>
                MICE &amp; Incentive Travel
              </Link>
            </div>
          </div>

          {navLinks.slice(2).map((link) => (
            <div key={link.href} className="nav-link-wrapper">
              <Link href={link.href} className="nav-link w-nav-link" onClick={closeServices}>
                {link.label}
              </Link>
              <Link href={link.href} className="nav-link move-down hide-on-tab w-nav-link" onClick={closeServices}>
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="menu-button w-nav-button">
          <div className="burger-icon w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
}
