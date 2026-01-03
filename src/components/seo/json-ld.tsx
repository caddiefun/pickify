import type { Product } from "@/types";

// Base JSON-LD component that safely injects structured data
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization schema - for brand recognition in search
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pickify",
    url: "https://pickify.io",
    logo: "https://pickify.io/logo.png",
    sameAs: [
      "https://twitter.com/pickify",
      "https://linkedin.com/company/pickify",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://pickify.io/contact",
    },
  };

  return <JsonLd data={data} />;
}

// WebSite schema - enables sitelinks searchbox in Google
export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pickify",
    url: "https://pickify.io",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://pickify.io/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

// Product schema with AggregateRating - for star ratings in SERPs
interface ProductSchemaProps {
  product: Product;
  verticalSlug: string;
}

export function ProductSchema({ product, verticalSlug }: ProductSchemaProps) {
  const firstPrice = product.pricing?.[0]?.price ?? 0;
  const lowestPrice = product.pricing?.length
    ? product.pricing.reduce((min, p) => (p.price < min ? p.price : min), firstPrice)
    : 0;

  const highestPrice = product.pricing?.length
    ? product.pricing.reduce((max, p) => (p.price > max ? p.price : max), firstPrice)
    : 0;

  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.short_description,
    url: `https://pickify.io/${verticalSlug}/${product.slug}`,
    applicationCategory: getCategoryForVertical(verticalSlug),
    operatingSystem: "Web, Windows, macOS, iOS, Android",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      priceCurrency: "USD",
      offerCount: product.pricing?.length || 1,
    },
    // Note: aggregateRating removed as we don't have real user reviews
    // Using Review schema on product pages instead for editorial reviews
  };

  return <JsonLd data={data} />;
}

// Review schema - for review snippets
interface ReviewSchemaProps {
  product: Product;
  verticalSlug: string;
}

export function ReviewSchema({ product, verticalSlug }: ReviewSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${product.name} Review`,
    url: `https://pickify.io/${verticalSlug}/${product.slug}`,
    author: {
      "@type": "Organization",
      name: "Pickify",
    },
    publisher: {
      "@type": "Organization",
      name: "Pickify",
      url: "https://pickify.io",
    },
    datePublished: product.created_at,
    dateModified: product.updated_at,
    description: product.meta_description,
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: getCategoryForVertical(verticalSlug),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.overall_rating,
      bestRating: 10,
      worstRating: 0,
    },
    positiveNotes: {
      "@type": "ItemList",
      itemListElement: product.pros.map((pro, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: pro,
      })),
    },
    negativeNotes: {
      "@type": "ItemList",
      itemListElement: product.cons.map((con, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: con,
      })),
    },
  };

  return <JsonLd data={data} />;
}

// FAQ schema - for FAQ rich results
interface FAQSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

// Breadcrumb schema - for breadcrumb trail in SERPs
interface BreadcrumbSchemaProps {
  items: { name: string; url: string }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

// Comparison schema - for comparison pages
interface ComparisonSchemaProps {
  productA: Product;
  productB: Product;
  verticalSlug: string;
  winner: Product;
}

export function ComparisonSchema({
  productA,
  productB,
  verticalSlug,
  winner,
}: ComparisonSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${productA.name} vs ${productB.name} - Detailed Comparison`,
    description: `Compare ${productA.name} and ${productB.name} side by side. See features, pricing, pros & cons.`,
    url: `https://pickify.io/${verticalSlug}/compare/${productA.slug}-vs-${productB.slug}`,
    author: {
      "@type": "Organization",
      name: "Pickify",
    },
    publisher: {
      "@type": "Organization",
      name: "Pickify",
      logo: {
        "@type": "ImageObject",
        url: "https://pickify.io/logo.png",
      },
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    about: [
      {
        "@type": "SoftwareApplication",
        name: productA.name,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: productA.overall_rating,
          bestRating: 10,
          worstRating: 0,
        },
      },
      {
        "@type": "SoftwareApplication",
        name: productB.name,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: productB.overall_rating,
          bestRating: 10,
          worstRating: 0,
        },
      },
    ],
  };

  return <JsonLd data={data} />;
}

// ItemList schema - for listicle/ranking pages
interface ItemListSchemaProps {
  name: string;
  description: string;
  url: string;
  products: Product[];
  verticalSlug: string;
}

export function ItemListSchema({
  name,
  description,
  url,
  products,
  verticalSlug,
}: ItemListSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://pickify.io/${verticalSlug}/${product.slug}`,
      name: product.name,
      item: {
        "@type": "SoftwareApplication",
        name: product.name,
        description: product.short_description,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.overall_rating,
          bestRating: 10,
          worstRating: 0,
        },
      },
    })),
  };

  return <JsonLd data={data} />;
}

// Helper function to map vertical to schema category
function getCategoryForVertical(vertical: string): string {
  const categoryMap: Record<string, string> = {
    vpn: "SecurityApplication",
    hosting: "DeveloperApplication",
    "email-marketing": "BusinessApplication",
    "password-managers": "SecurityApplication",
    "project-management": "BusinessApplication",
    crm: "BusinessApplication",
    "website-builders": "DeveloperApplication",
    "online-learning": "EducationalApplication",
  };

  return categoryMap[vertical] || "SoftwareApplication";
}

// =============================================================================
// New Schema Types for AI Optimization
// =============================================================================

// HowTo schema - for product setup/usage guides
interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { name: string; text: string; url?: string }[];
  totalTime?: string; // ISO 8601 duration, e.g., "PT15M" for 15 minutes
}

export function HowToSchema({ name, description, steps, totalTime }: HowToSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
    })),
  };

  return <JsonLd data={data} />;
}

// Dataset schema - for original research/testing data
interface DatasetSchemaProps {
  name: string;
  description: string;
  url: string;
  temporalCoverage: string; // e.g., "2024-01/2025-01"
  creator?: string;
  distribution?: {
    encodingFormat: string;
    contentUrl: string;
  };
  variableMeasured?: string[];
}

export function DatasetSchema({
  name,
  description,
  url,
  temporalCoverage,
  creator = "Pickify",
  distribution,
  variableMeasured,
}: DatasetSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url,
    temporalCoverage,
    creator: {
      "@type": "Organization",
      name: creator,
    },
    ...(distribution && {
      distribution: {
        "@type": "DataDownload",
        encodingFormat: distribution.encodingFormat,
        contentUrl: distribution.contentUrl,
      },
    }),
    ...(variableMeasured && {
      variableMeasured: variableMeasured.map((v) => ({
        "@type": "PropertyValue",
        name: v,
      })),
    }),
  };

  return <JsonLd data={data} />;
}

// LocalBusiness schema - for ISP/geo-based services
interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed: {
    postalCode?: string;
    addressRegion?: string;
    addressLocality?: string;
  };
  serviceType: string;
  priceRange?: string;
}

export function LocalBusinessSchema({
  name,
  description,
  url,
  areaServed,
  serviceType,
  priceRange,
}: LocalBusinessSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url,
    areaServed: {
      "@type": "GeoShape",
      ...(areaServed.postalCode && { postalCode: areaServed.postalCode }),
      ...(areaServed.addressRegion && { addressRegion: areaServed.addressRegion }),
      ...(areaServed.addressLocality && { addressLocality: areaServed.addressLocality }),
    },
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: serviceType,
      },
    },
    ...(priceRange && { priceRange }),
  };

  return <JsonLd data={data} />;
}

// Article schema with enhanced AI-friendly fields
interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  about?: string[];
  speakable?: string[]; // Selectors for content suitable for TTS/voice search
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author = "Pickify",
  about,
  speakable,
}: ArticleSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "Pickify",
      logo: {
        "@type": "ImageObject",
        url: "https://pickify.io/logo.png",
      },
    },
    ...(about && {
      about: about.map((topic) => ({
        "@type": "Thing",
        name: topic,
      })),
    }),
    ...(speakable && {
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: speakable,
      },
    }),
  };

  return <JsonLd data={data} />;
}

// WebPage schema with lastReviewed for freshness
interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
  lastReviewed: string; // ISO date
  reviewedBy?: string;
  mainContentOfPage?: string; // CSS selector
}

export function WebPageSchema({
  name,
  description,
  url,
  lastReviewed,
  reviewedBy = "Pickify Editorial Team",
  mainContentOfPage,
}: WebPageSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    lastReviewed,
    reviewedBy: {
      "@type": "Organization",
      name: reviewedBy,
    },
    ...(mainContentOfPage && {
      mainContentOfPage: {
        "@type": "WebPageElement",
        cssSelector: mainContentOfPage,
      },
    }),
  };

  return <JsonLd data={data} />;
}
