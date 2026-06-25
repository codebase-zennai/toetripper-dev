export const metadata = {
  title: "Experiential Holiday Packages",
  description:
    "Explore our curated domestic and international travel packages designed for groups, corporates, and discerning travelers.",
  keywords: [
    "holiday packages",
    "corporate tour packages",
    "experiential travel packages",
    "international tours",
    "domestic tours",
    "Toe Tripper packages",
    "custom itineraries",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/packages",
  },
  openGraph: {
    title: "Experiential Holiday Packages | Toe Tripper",
    description:
      "Explore our curated domestic and international travel packages designed for groups, corporates, and discerning travelers.",
    url: "https://www.toetripper.com/packages",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Holiday Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiential Holiday Packages | Toe Tripper",
    description:
      "Explore curated domestic and international travel packages for groups, corporates, and discerning travelers.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PackagesLayout({ children }) {
  return children;
}
