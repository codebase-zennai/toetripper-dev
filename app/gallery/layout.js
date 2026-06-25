export const metadata = {
  title: "Photo Booth",
  description:
    "A visual journey of corporate events, MICE groups, and experiential holiday tours organized by Toe Tripper.",
  keywords: [
    "travel gallery",
    "corporate events photos",
    "MICE travel gallery",
    "Toe Tripper photos",
    "travel photography",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/gallery",
  },
  openGraph: {
    title: "Photo Booth | Toe Tripper",
    description:
      "A visual journey of corporate events, MICE groups, and experiential holiday tours organized by Toe Tripper.",
    url: "https://www.toetripper.com/gallery",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Photo Booth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Booth | Toe Tripper",
    description:
      "A visual journey of corporate events, MICE groups, and experiential holiday tours organized by Toe Tripper.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GalleryLayout({ children }) {
  return children;
}
