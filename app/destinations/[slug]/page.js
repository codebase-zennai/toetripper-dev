'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NewsletterCTA from '../../components/NewsletterCTA';
import WebflowClientOnly from '../../components/WebflowClientOnly';
import RichTextDisplay from '../../components/RichTextDisplay';
import CustomizeItineraryModal from '../../packages/components/CustomizeItineraryModal';

export default function DestinationPage() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [relatedDestinations, setRelatedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;

    document.body.classList.add('destination-page-active');
    let active = true;

    const loadDestination = async () => {
      try {
        const [detailResponse, relatedResponse] = await Promise.all([
          fetch(`/api/destinations?slug=${encodeURIComponent(slug)}`),
          fetch('/api/destinations?status=published&trending=true&limit=4'),
        ]);

        const detailPayload = await detailResponse.json();
        const relatedPayload = await relatedResponse.json();
        if (!active) return;

        const currentDestination = detailPayload.success ? detailPayload.data : null;

        if (currentDestination?.linkType === 'instagram' && currentDestination?.instagramUrl) {
          window.location.href = currentDestination.instagramUrl;
          return;
        }

        setDestination(currentDestination);
        setRelatedDestinations(
          (relatedPayload.success ? relatedPayload.data : [])
            .filter((item) => item.slug !== slug)
            .slice(0, 3)
        );
      } catch (error) {
        console.error('Failed to load destination', error);
        if (active) {
          setDestination(null);
          setRelatedDestinations([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadDestination();

    return () => {
      active = false;
      document.body.classList.remove('destination-page-active');
    };
  }, [slug]);

  if (loading) {
    return (
      <WebflowClientOnly>
        <>
          <Navbar />
          <div className="blog-post-not-found">
            <h2>Loading Destination</h2>
            <p>Please wait while we fetch the destination.</p>
          </div>
          <Footer />
        </>
      </WebflowClientOnly>
    );
  }

  if (!destination || destination.status !== 'published') {
    return (
      <WebflowClientOnly>
        <>
          <Navbar />
          <div className="blog-post-not-found">
            <h2>Destination Not Found</h2>
            <p>We could not find the destination you are looking for.</p>
            <Link href="/#trending-destinations" className="button-with-circle-icon button-dark w-inline-block">
              <p className="button-text">Back to Destinations</p>
              <p className="button-text-absolute">Back to Destinations</p>
              <div className="button-arrow-wrapper">
                <img
                  width="Auto"
                  height="Auto"
                  alt=""
                  src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e3f449091e597be1c4c815_arrow_outward.svg"
                  loading="eager"
                  className="arrow"
                />
              </div>
            </Link>
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
        <div className="space-page-top" />

        <section className="section">
          <div className="w-layout-blockcontainer container padding-13-5rem w-container">
            <div className="blog-wrapper flip-from-bottom-animation">
              <div className="badge-post">
                <h5 className="no-wrap font-black">{destination.badge || 'Destination'}</h5>
              </div>
              <h4>{destination.name}, {destination.country}</h4>
              <p className="max-width-30rem">{destination.tagline}</p>
              <div className="blog-block">
                <div className="destination-detail-meta-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h5>{destination.country}</h5>
              </div>
            </div>

            <div className="space-2rem" />
            <div className="blog-image-wrapper slide-up-animation">
              <img
                src={destination.heroImage}
                loading="lazy"
                alt={`${destination.name} — ${destination.tagline}`}
                className="image-absolute"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>

            <div className="space-4rem" />
            <RichTextDisplay
              content={destination.contentHtml || '<p>No content available.</p>'}
              className="blog-post slide-up-animation w-richtext"
            />

            <div className="space-4rem" />
            <div className="destination-plan-cta">
              <div className="destination-plan-cta-inner">
                <div>
                  <h4>Ready to explore {destination.name}?</h4>
                  <p>Let our specialists craft the perfect itinerary — just for you.</p>
                </div>
                <button
                  type="button"
                  className="button-subscribe cursor-pointer"
                  onClick={() => setIsItineraryModalOpen(true)}
                >
                  Plan My Trip
                </button>
              </div>
            </div>

            <div className="space-7rem" />
          </div>
        </section>

        {relatedDestinations.length > 0 && (
          <section className="section background-black pt-20">
            <div className="padding-9rem">
              <div className="posts-title-flex flip-from-left-animation">
                <h3 className="text-site-white">
                  More <span>Destinations</span>
                </h3>
                <div className="posts-text-block">
                  <h5 className="text-site-white">Keep exploring</h5>
                  <p>More places waiting to be discovered.</p>
                </div>
              </div>
              <div className="space-1rem" />
              <div className="horizontal-line" />
              <div className="space-4rem" />
              <div className="slide-up-animation">
                <div role="list" className="posts-flex">
                  {relatedDestinations.map((item) => (
                    <div role="listitem" key={item.slug} className="w-dyn-item">
                      {(item.linkType === 'instagram' && item.instagramUrl) ? (
                        <a
                          href={item.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="featured-card w-inline-block"
                        >
                          <div className="image-wrapper-small">
                            <img
                              width="Auto"
                              height="Auto"
                              alt={item.name}
                              src={item.cardImage || item.heroImage}
                              loading="eager"
                              className="image-absolute"
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                            <div className="plus-wrapper">
                              <img
                                width="24"
                                height="24"
                                alt=""
                                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e517d167d5eeb317efa720_add.svg"
                                loading="lazy"
                                className="plus"
                              />
                            </div>
                          </div>
                          <div className="featured-details-flex">
                            <div className="posts-avatar-flex">
                              <div className="avatar-text-block">
                                <h5 className="whitespace-nowrap text-site-white">{item.country}</h5>
                                <div className="avatar-line" />
                              </div>
                            </div>
                            <div className="posts-block">
                              <div className="badge-post">
                                <h5 className="whitespace-nowrap text-site-black">{item.badge || 'Destination'}</h5>
                              </div>
                            </div>
                          </div>
                          <h4 className="text-site-white">{item.name}</h4>
                        </a>
                      ) : (
                        <Link href={`/destinations/${item.slug}`} className="featured-card w-inline-block">
                          <div className="image-wrapper-small">
                            <img
                              width="Auto"
                              height="Auto"
                              alt={item.name}
                              src={item.cardImage || item.heroImage}
                              loading="eager"
                              className="image-absolute"
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                            <div className="plus-wrapper">
                              <img
                                width="24"
                                height="24"
                                alt=""
                                src="https://wubflow-shield.NOCODEXPORT.DEV/66e3df8d47eb3991ca9dbef7/66e517d167d5eeb317efa720_add.svg"
                                loading="lazy"
                                className="plus"
                              />
                            </div>
                          </div>
                          <div className="featured-details-flex">
                            <div className="posts-avatar-flex">
                              <div className="avatar-text-block">
                                <h5 className="whitespace-nowrap text-site-white">{item.country}</h5>
                                <div className="avatar-line" />
                              </div>
                            </div>
                            <div className="posts-block">
                              <div className="badge-post">
                                <h5 className="whitespace-nowrap text-site-black">{item.badge || 'Destination'}</h5>
                              </div>
                            </div>
                          </div>
                          <h4 className="text-site-white">{item.name}</h4>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-7rem" />
            </div>
          </section>
        )}

        <CustomizeItineraryModal
          isOpen={isItineraryModalOpen}
          onClose={() => setIsItineraryModalOpen(false)}
          packageTitle={destination?.name || ''}
          packageDestination={destination?.name || ''}
        />

        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}