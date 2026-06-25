export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy of Toe Tripper to understand how we collect, use, and protect your personal information.",
  keywords: [
    "privacy policy",
    "data protection",
    "Toe Tripper privacy",
    "personal information security",
  ],
  alternates: {
    canonical: "https://www.toetripper.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Toe Tripper",
    description:
      "Read the Privacy Policy of Toe Tripper to understand how we collect, use, and protect your personal information.",
    url: "https://www.toetripper.com/privacy-policy",
    siteName: "Toe Tripper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Toe Tripper",
    description:
      "Read the Privacy Policy of Toe Tripper to understand how we collect, use, and protect your personal information.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
