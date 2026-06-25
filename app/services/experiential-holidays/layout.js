export const metadata = {
  title: "Experiential Holidays",
  description:
    "Explore our hand-crafted, experience-led leisure travel itineraries designed for families, corporate retreats, and groups.",
  keywords: [
    "experiential travel",
    "leisure holidays",
    "custom travel itineraries",
    "group tours",
    "experiential holidays Toe Tripper",
    "family retreats",
    "bespoke vacations",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/services/experiential-holidays",
  },
  openGraph: {
    title: "Experiential Holidays | Toe Tripper",
    description:
      "Explore our hand-crafted, experience-led leisure travel itineraries designed for families, corporate retreats, and groups.",
    url: "https://www.toetripper.com/services/experiential-holidays",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Experiential Holidays",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiential Holidays | Toe Tripper",
    description:
      "Hand-crafted, experience-led leisure travel itineraries for families, corporate retreats, and groups.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExperientialHolidaysLayout({ children }) {
  return children;
}
