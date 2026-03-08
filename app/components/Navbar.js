'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as HoverCard from '@radix-ui/react-hover-card';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { 
    id: 'service', 
    label: 'Services', 
    isDropdown: true,
    items: [
      { label: 'MICE and Events', href: '/services/mice-incentive' },
      { label: 'Corporate Travel Desk', href: '/services/corporate-travels' },
      { 
        label: 'Experiential Holidays', 
        isNested: true,
        items: [
          { label: 'Domestic', href: '/packages?travelType=domestic' },
          { label: 'International', href: '/packages?travelType=international' }
        ]
      },
  ]
  },
  { id: 'contact', label: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);

  const handleCloseAll = () => {
    setMobileMenuOpen(false);
    setMobileSubOpen(null);
  };

  const toggleMobileSub = (label) => {
    setMobileSubOpen((prev) => (prev === label ? null : label));
  };

  return (
    <header className="tt-navbar">
      <div className="tt-navbar-container">
        <Link href="/" className="tt-navbar-logo" onClick={handleCloseAll}>
          <Image 
            src="/Brand Kit for Toe Tripper/Toe Tripper Logo.png" 
            alt="Toe Tripper" 
            width={350} 
            height={56} 
            priority 
          />
        </Link>

        <nav className={`tt-navbar-nav${mobileMenuOpen ? ' tt-navbar-nav--open' : ''}`}>
          {NAV_ITEMS.map((item) => {
            if (item.isDropdown) {
              return (
                <HoverCard.Root key={item.id} openDelay={120} closeDelay={120}>
                  <div className="tt-navbar-item tt-navbar-item--dropdown">
                    <HoverCard.Trigger asChild>
                      <button
                        type="button"
                        className="tt-navbar-link tt-navbar-link--chevron"
                        aria-haspopup="true"
                      >
                        {item.label}
                        <svg className="tt-chevron-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
                      </button>
                    </HoverCard.Trigger>

                    <HoverCard.Portal>
                      <HoverCard.Content
                        align="start"
                        sideOffset={12}
                        className="tt-dropdown tt-dropdown--radix"
                      >
                        {item.items.map((subItem, index) => {
                          if (subItem.isNested) {
                            return (
                              <div key={index} className="tt-dropdown-nested">
                                <button
                                  type="button"
                                  className="tt-dropdown-link tt-dropdown-link--nested"
                                  onClick={() => toggleMobileSub(subItem.label)}
                                >
                                  {subItem.label}
                                  <svg className="tt-chevron-right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/></svg>
                                </button>
                                <div className={`tt-dropdown-sub${mobileSubOpen === subItem.label ? ' tt-dropdown-sub--open' : ''}`}>
                                  {subItem.items.map((nestedItem) => (
                                    <Link
                                      key={nestedItem.href}
                                      href={nestedItem.href}
                                      className="tt-dropdown-link"
                                      onClick={handleCloseAll}
                                    >
                                      {nestedItem.label}
                                    </Link>
                                  ))}
                                </div> 
                              </div>
                            );
                          }
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="tt-dropdown-link"
                              onClick={handleCloseAll}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </HoverCard.Content>
                    </HoverCard.Portal>
                  </div>
                </HoverCard.Root>
              );
            }

            return (
              <div key={item.id} className="tt-navbar-item">
                <Link 
                  href={item.href} 
                  className="tt-navbar-link"
                  onClick={handleCloseAll}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          className={`tt-navbar-toggle${mobileMenuOpen ? ' tt-navbar-toggle--open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="tt-navbar-toggle-icon"></span>
        </button>
      </div>
    </header>
  );
}
