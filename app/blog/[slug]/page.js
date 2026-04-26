'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import NewsletterCTA from '../../components/NewsletterCTA';
import WebflowClientOnly from '../../components/WebflowClientOnly';
import RichTextDisplay from '../../components/RichTextDisplay';
import CustomizeItineraryModal from '../../packages/components/CustomizeItineraryModal';

export default function BlogPostPage() {
  const params = useParams();
  const { slug } = params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let active = true;

    const loadPost = async () => {
      try {
        const response = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`);
        const payload = await response.json();
        if (!active) return;
        setPost(payload.success ? payload.data : null);
      } catch (error) {
        console.error('Failed to load blog post', error);
        if (active) {
          setPost(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadPost();

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <WebflowClientOnly>
        <>
          <Navbar />
          <div className="blog-post-not-found">
            <h2>Loading Post</h2>
            <p>Please wait while we fetch the article.</p>
          </div>
          <Footer />
        </>
      </WebflowClientOnly>
    );
  }

  if (!post || post.status !== 'published') {
    return (
      <WebflowClientOnly>
        <>
          <Navbar />
          <div className="blog-post-not-found">
            <h2>Post Not Found</h2>
            <p>Sorry, we couldn't find that article.</p>
            <Link href="/blog" className="button-with-circle-icon button-dark w-inline-block">
              <p className="button-text">Back to Blog</p>
              <p className="button-text-absolute">Back to Blog</p>
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
                <h5 className="no-wrap font-black">{post.category || 'Travel'}</h5>
              </div>
              <h4>{post.title}</h4>
              <p className="max-width-30rem">{post.excerpt}</p>
              <div className="blog-block">
                <div className="avatar-wrapper">
                  {post.authorAvatar ? (
                    <img width="Auto" height="Auto" alt={post.authorName} src={post.authorAvatar} loading="eager" />
                  ) : null}
                </div>
                <h5>{post.authorName || 'Toe Tripper'}</h5>
              </div>
            </div>

            {post.heroImage ? (
              <>
                <div className="space-2rem" />
                <div className="blog-image-wrapper slide-up-animation">
                  <img
                    src={post.heroImage}
                    loading="lazy"
                    alt={post.title}
                    className="image-absolute"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
              </>
            ) : null}

            <div className="space-4rem" />
            <RichTextDisplay
              content={post.contentHtml || '<p>No content available.</p>'}
              className="blog-post slide-up-animation w-richtext"
            />

            <div className="space-4rem" />
            <div className="destination-plan-cta">
              <div className="destination-plan-cta-inner">
                <div>
                  <h4>Ready to plan your next trip?</h4>
                  <p>Share your preferences and we will craft a personalized itinerary.</p>
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
          </div>
        </section>

        <CustomizeItineraryModal
          isOpen={isItineraryModalOpen}
          onClose={() => setIsItineraryModalOpen(false)}
          packageTitle={post.title}
          packageDestination=""
        />

        <NewsletterCTA />
        <Footer />
      </>
    </WebflowClientOnly>
  );
}