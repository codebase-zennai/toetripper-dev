/**
 * JSON-LD Structured Data component for SEO rich snippets.
 * Renders a <script type="application/ld+json"> tag with the provided schema.
 *
 * Usage:
 *   <JsonLd data={schemaObject} />
 */
export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Pre-built Organization / TravelAgency schema for Toe Tripper.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://www.toetripper.com/#organization",
  name: "Toe Tripper",
  alternateName: "Toetripper",
  url: "https://www.toetripper.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.toetripper.com/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
    width: 800,
    height: 600,
  },
  image: "https://www.toetripper.com/Brand Kit for Toe Tripper/Toe Tripper Logo.png",
  description:
    "India's leading corporate travel management and MICE specialist, delivering curated experiential holidays and seamless corporate travel solutions.",
  email: "nikita@toetripper.com",
  telephone: "+919886689001",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/toetripper_travel_events/",
    "https://www.linkedin.com/company/toe-tripper/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+919886689001",
      contactType: "customer service",
      email: "nikita@toetripper.com",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
    {
      "@type": "ContactPoint",
      email: "packages@toetripper.com",
      contactType: "reservations",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      email: "traveldesk@toetripper.com",
      contactType: "corporate travel desk",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  foundingDate: "2020",
  priceRange: "$$",
};

/**
 * WebSite schema with SearchAction for Google Sitelinks search box.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.toetripper.com/#website",
  name: "Toe Tripper",
  alternateName: "Toetripper",
  url: "https://www.toetripper.com",
  publisher: {
    "@id": "https://www.toetripper.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.toetripper.com/packages?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * Helper to generate BreadcrumbList schema.
 * @param {Array<{name: string, url: string}>} items
 */
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
