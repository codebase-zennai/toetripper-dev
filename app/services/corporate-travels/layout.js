export const metadata = {
  title: "Corporate Travel Desk",
  description:
    "Streamline your company's business travel with Toe Tripper's dedicated Corporate Travel Desk. Enjoy automated booking, 24/7 support, and optimized cost management.",
  keywords: [
    "corporate travel management",
    "business travel desk",
    "corporate booking tool",
    "travel policy compliance",
    "Toe Tripper corporate travels",
    "corporate hotel booking",
    "flight desk for companies",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/services/corporate-travels",
  },
  openGraph: {
    title: "Corporate Travel Desk | Toe Tripper",
    description:
      "Streamline your company's business travel with Toe Tripper's dedicated Corporate Travel Desk. Automated booking, 24/7 support, and optimized cost management.",
    url: "https://www.toetripper.com/services/corporate-travels",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Corporate Travel Desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Travel Desk | Toe Tripper",
    description:
      "Streamline your company's business travel with automated booking, 24/7 support, and optimized cost management.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CorporateTravelsLayout({ children }) {
  return children;
}
