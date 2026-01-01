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
  const lowestPrice = product.pricing?.reduce(
    (min, p) => (p.price < min ? p.price : min),
    product.pricing[0]?.price || 0
  );

  const highestPrice = product.pricing?.reduce(
    (max, p) => (p.price > max ? p.price : max),
    product.pricing[0]?.price || 0
  );

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.overall_rating,
      bestRating: 10,
      worstRating: 0,
      ratingCount: 1, // Would come from real review count
    },
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
        },
      },
      {
        "@type": "SoftwareApplication",
        name: productB.name,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: productB.overall_rating,
          bestRating: 10,
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
