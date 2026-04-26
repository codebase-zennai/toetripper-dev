'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WebflowClientOnly from '../components/WebflowClientOnly';

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?status=published');
        const payload = await response.json();
        if (!active) return;
        setBlogs(payload.success ? payload.data : []);
      } catch (error) {
        console.error('Failed to load blogs', error);
        if (active) {
          setBlogs([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadBlogs();

    return () => {
      active = false;
    };
  }, []);

  return (
    <WebflowClientOnly>
      <>
        <Navbar />
        <section className="section background-black min-h-screen">
          <div className="padding-9rem">
            <div className="posts-title-flex">
              <h3 className="text-site-white">
                All <span>Blogs</span>
              </h3>
              <div className="posts-text-block">
                <h5 className="text-site-white">Fresh stories from Toe Tripper</h5>
                <p>Travel notes, destination guides, and inspiration curated from the admin CMS.</p>
              </div>
            </div>
            <div className="space-1rem" />
            <div className="horizontal-line" />
            <div className="space-4rem" />

            {loading ? (
              <div className="text-white">Loading blog posts...</div>
            ) : blogs.length === 0 ? (
              <div className="text-white/70">No published blog posts yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <Link key={blog.slug} href={`/blog/${blog.slug}`} className="featured-card w-inline-block">
                    <div className="image-wrapper-small">
                      {blog.heroImage ? (
                        <img
                          width="Auto"
                          height="Auto"
                          alt={blog.title}
                          src={blog.heroImage}
                          loading="eager"
                          className="image-absolute"
                        />
                      ) : null}
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
                        {blog.authorAvatar ? (
                          <div className="avatar-wrapper">
                            <img width="Auto" height="Auto" alt={blog.authorName} src={blog.authorAvatar} loading="eager" />
                          </div>
                        ) : null}
                        <div className="avatar-text-block">
                          <h5 className="whitespace-nowrap">{blog.authorName || 'Toe Tripper'}</h5>
                          <div className="avatar-line"></div>
                        </div>
                      </div>
                      <div className="posts-block">
                        <div className="badge-post">
                          <h5 className="whitespace-nowrap text-site-black">{blog.category || 'Travel'}</h5>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-site-white">{blog.title}</h4>
                    <p className="text-white/70 mt-2">{blog.excerpt}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        <Footer />
      </>
    </WebflowClientOnly>
  );
}