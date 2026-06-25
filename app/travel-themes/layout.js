export const metadata = {
  title: "Travel Themes",
  description:
    "Explore curated travel themes by Toe Tripper — adventure, wellness, culture, wildlife, beach getaways, and more. Find the perfect theme for your next trip.",
  keywords: [
    "travel themes",
    "adventure travel",
    "wellness travel",
    "cultural tours",
    "wildlife safari India",
    "beach holidays",
    "Toe Tripper themes",
    "themed travel packages",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/travel-themes",
  },
  openGraph: {
    title: "Travel Themes | Toe Tripper",
    description:
      "Explore curated travel themes by Toe Tripper — adventure, wellness, culture, wildlife, beach getaways, and more.",
    url: "https://www.toetripper.com/travel-themes",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper — Travel Themes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Themes | Toe Tripper",
    description:
      "Explore curated travel themes — adventure, wellness, culture, wildlife, beach getaways, and more.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TravelThemesLayout({ children }) {
  return children;
}
