export const metadata = {
  title: "MICE & Incentive Travel",
  description:
    "End-to-end MICE (Meetings, Incentives, Conferences, Exhibitions) travel management for corporate groups. Exceptional planning and execution across global destinations.",
  keywords: [
    "MICE travel",
    "incentive tours",
    "corporate conferences",
    "corporate events planner",
    "Toe Tripper MICE",
    "company incentive trips",
    "corporate exhibition management",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/services/mice-incentive",
  },
  openGraph: {
    title: "MICE & Incentive Travel | Toe Tripper",
    description:
      "End-to-end MICE (Meetings, Incentives, Conferences, Exhibitions) travel management for corporate groups across global destinations.",
    url: "https://www.toetripper.com/services/mice-incentive",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper MICE & Incentive Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MICE & Incentive Travel | Toe Tripper",
    description:
      "End-to-end MICE travel management for corporate groups — Meetings, Incentives, Conferences, Exhibitions.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MiceIncentiveLayout({ children }) {
  return children;
}
