export const metadata = {
  title: "Real Journeys, Real Stories",
  description:
    "Read testimonials and reviews from corporate managers and experiential travelers who experienced seamless journeys with Toe Tripper.",
  keywords: [
    "Toe Tripper reviews",
    "travel testimonials",
    "corporate travel reviews",
    "customer feedback Toe Tripper",
    "experiential holiday reviews",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/feedback",
  },
  openGraph: {
    title: "Real Journeys, Real Stories | Toe Tripper",
    description:
      "Read testimonials and reviews from corporate managers and experiential travelers who experienced seamless journeys with Toe Tripper.",
    url: "https://www.toetripper.com/feedback",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Testimonials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Journeys, Real Stories | Toe Tripper",
    description:
      "Read testimonials and reviews from corporate managers and experiential travelers with Toe Tripper.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FeedbackLayout({ children }) {
  return children;
}
