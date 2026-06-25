export const metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions of Toe Tripper for bookings, cancellations, travel documents, and website usage.",
  keywords: [
    "terms and conditions",
    "booking policy",
    "cancellation policy",
    "Toe Tripper terms",
    "payment terms",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/terms-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | Toe Tripper",
    description:
      "Read the Terms & Conditions of Toe Tripper for bookings, cancellations, travel documents, and website usage.",
    url: "https://www.toetripper.com/terms-conditions",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Terms & Conditions",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | Toe Tripper",
    description:
      "Read the Terms & Conditions of Toe Tripper for bookings, cancellations, travel documents, and website usage.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsConditionsLayout({ children }) {
  return children;
}
