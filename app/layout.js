import { Poppins } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import LoadingSpinner from "./components/LoadingSpinner";
import FloatingCTA from "./components/FloatingCTA";
import JsonLd, { organizationSchema, websiteSchema } from "./components/JsonLd";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.toetripper.com"),
  title: {
    default: "Toe Tripper | Corporate Travel, MICE & Experiential Holidays",
    template: "%s | Toe Tripper",
  },
  description: "Toe Tripper is India's leading corporate travel management and MICE specialist, delivering curated experiential holidays and seamless corporate travel solutions.",
  keywords: [
    "corporate travel",
    "MICE travel",
    "experiential holidays",
    "business travel India",
    "team retreats",
    "custom travel itineraries",
    "Toe Tripper",
    "incentive travel"
  ],
  icons: {
    icon: "/Brand Kit for Toe Tripper/Toe Tripper Logo Icon.png",
    apple: "/Brand Kit for Toe Tripper/Toe Tripper Logo Icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.toetripper.com",
    siteName: "Toe Tripper",
    title: "Toe Tripper | Corporate Travel, MICE & Experiential Holidays",
    description: "India's leading corporate travel management and MICE specialist, delivering curated experiential holidays and seamless corporate travel solutions.",
    images: [
      {
        url: "/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
        width: 800,
        height: 600,
        alt: "Toe Tripper Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toe Tripper | Corporate Travel, MICE & Experiential Holidays",
    description: "India's leading corporate travel management and MICE specialist, delivering curated experiential holidays and seamless corporate travel solutions.",
    images: ["/Brand Kit for Toe Tripper/Toe Tripper Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.toetripper.com",
  },
  category: "travel",
  // Uncomment and add your Google Search Console verification code:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "revisit-after": "7 days",
    "rating": "general",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-mod-js w-mod-ix">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className={poppins.className}>
        <Suspense fallback={null}>
          <LoadingSpinner />
        </Suspense>
        {children}
        <FloatingCTA />
        
        <Script
          id="webfont-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function (o, c) {
                var n = c.documentElement,
                  t = " w-mod-";
                (n.className += t + "js"),
                  ("ontouchstart" in o ||
                    (o.DocumentTouch && c instanceof DocumentTouch)) &&
                    (n.className += t + "touch");
              })(window, document);
            `,
          }}
        />
      </body>
    </html>
  );
}
