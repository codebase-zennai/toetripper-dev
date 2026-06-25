export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Toe Tripper. Reach out for corporate travel enquiries, MICE planning, or customized experiential holiday packages.",
  keywords: [
    "contact Toe Tripper",
    "corporate travel contact",
    "travel desk email",
    "MICE planner contact",
    "Toe Tripper phone number",
    "book appointment",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/contact",
  },
  openGraph: {
    title: "Contact Us | Toe Tripper",
    description:
      "Get in touch with Toe Tripper. Reach out for corporate travel enquiries, MICE planning, or customized experiential holiday packages.",
    url: "https://www.toetripper.com/contact",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Contact Toe Tripper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Toe Tripper",
    description:
      "Get in touch with Toe Tripper for corporate travel enquiries, MICE planning, or experiential holiday packages.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }) {
  return children;
}
