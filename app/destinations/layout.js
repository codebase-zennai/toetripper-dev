export const metadata = {
  title: "Explore Destinations",
  description:
    "Discover trending travel destinations curated by Toe Tripper. From snow-capped mountains to tropical beaches — find your next corporate or leisure getaway.",
  keywords: [
    "travel destinations",
    "trending destinations",
    "corporate trip locations",
    "leisure travel destinations",
    "Toe Tripper destinations",
    "India travel",
    "international destinations",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/destinations",
  },
  openGraph: {
    title: "Explore Destinations | Toe Tripper",
    description:
      "Discover trending travel destinations curated by Toe Tripper. From snow-capped mountains to tropical beaches — find your next corporate or leisure getaway.",
    url: "https://www.toetripper.com/destinations",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper — Explore Destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Destinations | Toe Tripper",
    description:
      "Discover trending travel destinations curated by Toe Tripper. From snow-capped mountains to tropical beaches.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DestinationsLayout({ children }) {
  return children;
}
