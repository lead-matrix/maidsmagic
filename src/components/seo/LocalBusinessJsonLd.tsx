import { RIVERSIDE_COMPANY_INFO, VERIFIED_GOOGLE_REVIEWS } from "@/lib/constants/riverside-data";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "additionalType": "https://schema.org/CleaningService",
    "name": "MaidsMagic - Riverside Cleaning Service",
    "image": [
      "https://maidsmagicriverside.com/images/maidsmagic-logo.jpg",
      "https://maidsmagicriverside.com/images/maidsmagic-gmb-card.png"
    ],
    "@id": "https://maidsmagicriverside.com",
    "url": "https://maidsmagicriverside.com",
    "telephone": RIVERSIDE_COMPANY_INFO.phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": RIVERSIDE_COMPANY_INFO.addressStreet,
      "addressLocality": RIVERSIDE_COMPANY_INFO.addressCity,
      "addressRegion": RIVERSIDE_COMPANY_INFO.addressState,
      "postalCode": RIVERSIDE_COMPANY_INFO.addressZip,
      "addressCountry": RIVERSIDE_COMPANY_INFO.addressCountry,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.9806,
      "longitude": -117.3755,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:30",
        "closes": "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "08:30",
        "closes": "17:00",
      },
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Riverside, CA" },
      { "@type": "Place", "name": "Canyon Crest, Riverside" },
      { "@type": "Place", "name": "Orangecrest, Riverside" },
      { "@type": "Place", "name": "Victoria, Riverside" },
      { "@type": "Place", "name": "Hawarden Hills, Riverside" },
      { "@type": "Place", "name": "The Wood Streets, Riverside" },
      { "@type": "Place", "name": "UCR Campus Area, Riverside" },
      { "@type": "Place", "name": "Mission Grove, Riverside" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": RIVERSIDE_COMPANY_INFO.aggregateRating.ratingValue.toString(),
      "reviewCount": RIVERSIDE_COMPANY_INFO.aggregateRating.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": VERIFIED_GOOGLE_REVIEWS.map((rev) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": rev.author,
      },
      "datePublished": "2026-09-01",
      "reviewBody": rev.text,
      "reviewRating": {
        "@type": "Rating",
        "bestRating": "5",
        "ratingValue": rev.rating.toString(),
        "worstRating": "1",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
