'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as HoverCard from '@radix-ui/react-hover-card';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'service', label: 'Services', href: '/services' },
  // { 
  //   id: 'services', 
  //   label: 'Services', 
  //   isDropdown: true,
  //   items: [
  //     { label: 'Tailored Journeys', href: '/services/tailored-journeys' },
  //     { label: 'MICE and Incentive', href: '/services/mice-incentive' },
  //     { label: 'Corporate Events', href: '/services/corporate-events' }
  //   ]
  // },
  { 
    id: 'destinations', 
    label: 'Destinations', 
    isDropdown: true,
    items: [
      { label: 'Indian', href: '/packages' },
      { label: 'International', href: '/packages/' }
    ]
  },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCloseAll = () => {
    setMobileMenuOpen(false);
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
                        className="tt-navbar-link"
                        aria-haspopup="true"
                      >
                        {item.label}
                      </button>
                    </HoverCard.Trigger>

                    <HoverCard.Portal>
                      <HoverCard.Content
                        align="start"
                        sideOffset={12}
                        className="tt-dropdown tt-dropdown--radix"
                      >
                        <span className="tt-dropdown-title">{item.label}</span>
                        {item.items.map((subItem, index) => {
                          if (subItem.groupLabel) {
                            return (
                              <div key={index} className="tt-dropdown-group">
                                <span className="tt-dropdown-heading">{subItem.groupLabel}</span>
                                {subItem.links.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    className="tt-dropdown-link"
                                    onClick={handleCloseAll}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
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
