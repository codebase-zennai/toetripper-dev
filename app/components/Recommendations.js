"use client";

import { useEffect, useState } from "react";
import "../feedback/feedback.css";
import TestimonialCard from "./TestimonialCard";

function getEmbedUrl(url) {
  if (!url) return null;

  // Instagram parsing
  const instaMatch = url.match(/instagram\.com\/(?:p|reel)\/([a-zA-Z0-9_-]+)/i);
  if (instaMatch) {
    return `https://www.instagram.com/p/${instaMatch[1]}/embed`;
  }

  // LinkedIn parsing
  const linkedinMatch =
    url.match(/linkedin\.com\/posts\/[a-zA-Z0-9_-]+(?:-|_)(\d+)/i) ||
    url.match(/linkedin\.com\/posts\/activity-(\d+)/i) ||
    url.match(/linkedin\.com\/feed\/update\/urn:li:activity:(\d+)/i) ||
    url.match(/linkedin\.com\/feed\/update\/urn:li:share:(\d+)/i);
  if (linkedinMatch) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:share/${linkedinMatch[1]}`;
  }

  if (
    url.includes("instagram.com/p/") ||
    url.includes("instagram.com/reel/") ||
    url.includes("linkedin.com/embed")
  ) {
    return url;
  }

  return null;
}

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) {
          // Filter for the specifically added Toe Tripper Recommendations and exclude social media recommendations
          const filtered = data.filter(
            (t) =>
              t.destination !== "Toe Tripper Recommendation" &&
              getEmbedUrl(t.destination) === null,
          );
          setRecommendations(filtered);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch recommendations:", err);
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading || recommendations.length === 0) {
    return null; // Do not render if empty or loading
  }

  return (
    <section
      className="section background-black rounded-corners"
      style={{ paddingBottom: "2rem", paddingTop: "2rem" }}
    >
      <div
        className="padding-4-5rem"
        style={{ maxWidth: "1600px", margin: "0 auto" }}
      >
        {/* Section Header */}
        <div
          className="section-header"
          style={{
            marginBottom: "2rem",
            textAlign: "center",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <h2
            className="w-full text-center text-3xl sm:text-4xl lg:text-[2.8vw] leading-tight mx-auto font-bold"
            style={{ color: "#ffffff" }}
          >
            Client Recommendations
          </h2>
          <p
            className="w-full text-center text-base sm:text-lg leading-relaxed mx-auto"
            style={{
              color: "#a0aec0",
              fontSize: "0.9rem",
              maxWidth: "650px",
              marginTop: "1rem",
            }}
          >
            Discover the experiences of our distinguished clients. From seamless
            visa processing to meticulously curated travel itineraries.
          </p>
        </div>

        {/* CSS Grid from feedback.css (2 rows horizontally scrolling) */}
        <div className="direct-reviews-grid">
          {recommendations.map((rec, index) => (
            <TestimonialCard key={rec.id || index} rec={rec} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
