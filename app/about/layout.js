export const metadata = {
  title: "About Us",
  description:
    "Discover Toe Tripper's journey, our commitment to seamless corporate travel management, and our vision for hand-crafted experiential travel.",
  keywords: [
    "about Toe Tripper",
    "travel team",
    "corporate travel agency",
    "experiential travel experts",
    "Toe Tripper story",
    "Nikita Rajpuut",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/about",
  },
  openGraph: {
    title: "About Us | Toe Tripper",
    description:
      "Discover Toe Tripper's journey, our commitment to seamless corporate travel management, and our vision for hand-crafted experiential travel.",
    url: "https://www.toetripper.com/about",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "About Toe Tripper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Toe Tripper",
    description:
      "Discover Toe Tripper's journey, our commitment to seamless corporate travel management, and our vision for hand-crafted experiential travel.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({ children }) {
  return children;
}
