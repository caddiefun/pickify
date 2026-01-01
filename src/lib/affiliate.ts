import type { Product } from "@/types";

// Affiliate link tracking and generation utilities

interface AffiliateConfig {
  baseTrackingUrl: string;
  defaultUtmSource: string;
  defaultUtmMedium: string;
}

const config: AffiliateConfig = {
  baseTrackingUrl: process.env.NEXT_PUBLIC_TRACKING_URL || "/go",
  defaultUtmSource: "pickify",
  defaultUtmMedium: "comparison",
};

// Generate a tracked affiliate link
export function generateAffiliateLink(
  product: Product,
  options: {
    campaign?: string;
    content?: string;
    placement?: string;
  } = {}
): string {
  const { campaign = "default", content, placement } = options;

  // If no affiliate URL, return the regular website
  if (!product.affiliate_url) {
    return product.website_url;
  }

  // Build the tracking URL that will redirect to the affiliate link
  const params = new URLSearchParams({
    product: product.slug,
    utm_source: config.defaultUtmSource,
    utm_medium: config.defaultUtmMedium,
    utm_campaign: campaign,
  });

  if (content) params.set("utm_content", content);
  if (placement) params.set("placement", placement);

  return `${config.baseTrackingUrl}/${product.slug}?${params.toString()}`;
}

// Generate CTA button text based on product and context
export function getCtaText(
  product: Product,
  variant: "primary" | "secondary" | "comparison" = "primary"
): string {
  const ctaOptions = {
    primary: `Visit ${product.name}`,
    secondary: "Learn More",
    comparison: "View Deal",
  };

  return ctaOptions[variant];
}

// Format commission rate for display
export function formatCommission(rate: string | null): string {
  if (!rate) return "Varies";
  return rate;
}

// Check if a product has an active affiliate program
export function hasAffiliateProgram(product: Product): boolean {
  return !!product.affiliate_url && !!product.affiliate_program;
}

// Get affiliate program badge text
export function getAffiliateBadge(
  product: Product
): { text: string; type: "success" | "warning" | "default" } | null {
  if (!product.affiliate_program) return null;

  // High-value programs
  const highValuePrograms = [
    "impact",
    "partnerstack",
    "commission junction",
    "shareasale",
  ];

  const programLower = product.affiliate_program.toLowerCase();

  if (highValuePrograms.some((p) => programLower.includes(p))) {
    return { text: "Partner Program", type: "success" };
  }

  return { text: "Affiliate", type: "default" };
}

// Pricing utilities
export function formatPrice(
  price: number,
  billingCycle: "monthly" | "yearly" | "one-time" | "custom"
): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  switch (billingCycle) {
    case "monthly":
      return `${formatted}/mo`;
    case "yearly":
      return `${formatted}/yr`;
    case "one-time":
      return formatted;
    case "custom":
      return `From ${formatted}`;
    default:
      return formatted;
  }
}

// Get the starting price for a product
export function getStartingPrice(product: Product): string {
  if (!product.pricing || product.pricing.length === 0) {
    return "Contact for pricing";
  }

  const lowestPrice = product.pricing.reduce((min, plan) =>
    plan.price < min.price ? plan : min
  );

  if (lowestPrice.price === 0) {
    return "Free";
  }

  return formatPrice(lowestPrice.price, lowestPrice.billing_cycle);
}

// Disclosure text for FTC compliance
export const AFFILIATE_DISCLOSURE =
  "Some products are sponsored. Rankings reflect our honest assessment.";

export const FULL_DISCLOSURE = `
Pickify earns a commission when you purchase through our links. This doesn't affect our rankings
or recommendations. We only recommend products we believe in. Our reviews are based on independent
research and testing.
`.trim();

// Check if disclosure is required for a page
export function requiresDisclosure(
  hasAffiliateLinks: boolean,
  hasSponsoredPlacements: boolean
): boolean {
  return hasAffiliateLinks || hasSponsoredPlacements;
}
