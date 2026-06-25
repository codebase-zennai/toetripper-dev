export const metadata = {
  title: "Travel Blog",
  description:
    "Stay updated with fresh travel stories, corporate travel tips, and destination guides from the Toe Tripper team.",
  keywords: [
    "travel blog",
    "corporate travel tips",
    "destination guides",
    "travel stories",
    "Toe Tripper blog",
    "leisure travel tips",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/blog",
  },
  openGraph: {
    title: "Travel Blog | Toe Tripper",
    description:
      "Stay updated with fresh travel stories, corporate travel tips, and destination guides from the Toe Tripper team.",
    url: "https://www.toetripper.com/blog",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Travel Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Blog | Toe Tripper",
    description:
      "Stay updated with fresh travel stories, corporate travel tips, and destination guides from the Toe Tripper team.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }) {
  return children;
}
