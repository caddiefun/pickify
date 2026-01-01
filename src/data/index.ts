export { verticals, getVerticalBySlug, getActiveVerticals } from "./verticals";
export {
  vpnProducts,
  getVpnProducts,
  getVpnProductBySlug,
  getFeaturedVpnProducts,
  getEditorsChoiceVpn,
} from "./products/vpn";

import type { Product } from "@/types";
import { vpnProducts, getVpnProductBySlug } from "./products/vpn";

// Unified product fetching by vertical
export function getProductsByVertical(verticalSlug: string): Product[] {
  switch (verticalSlug) {
    case "vpn":
      return vpnProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    // Add other verticals here as they're implemented
    default:
      return [];
  }
}

export function getProductBySlug(
  verticalSlug: string,
  productSlug: string
): Product | undefined {
  switch (verticalSlug) {
    case "vpn":
      return getVpnProductBySlug(productSlug);
    default:
      return undefined;
  }
}

// Generate comparison data between two products
export function generateComparison(productA: Product, productB: Product) {
  return {
    slug: `${productA.slug}-vs-${productB.slug}`,
    title: `${productA.name} vs ${productB.name}`,
    meta_title: `${productA.name} vs ${productB.name} - Which Is Better in 2025?`,
    meta_description: `Compare ${productA.name} and ${productB.name} side by side. See features, pricing, pros & cons to find the best option for you.`,
    products: [productA, productB],
    winner:
      productA.overall_rating > productB.overall_rating ? productA : productB,
  };
}

// Get all possible comparison combinations for a vertical
export function getComparisonPairs(products: Product[]): [Product, Product][] {
  const pairs: [Product, Product][] = [];
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      pairs.push([products[i], products[j]]);
    }
  }
  return pairs;
}

// Best-for page configurations
export const bestForConfigs = {
  vpn: [
    {
      slug: "streaming",
      usecase: "Streaming",
      title: "Best VPNs for Streaming",
      description: "Unblock Netflix, Hulu, BBC iPlayer and more",
      criteria: ["streaming_support"],
    },
    {
      slug: "gaming",
      usecase: "Gaming",
      title: "Best VPNs for Gaming",
      description: "Low latency and DDoS protection for gamers",
      criteria: ["speed", "servers"],
    },
    {
      slug: "privacy",
      usecase: "Privacy",
      title: "Best VPNs for Privacy",
      description: "Maximum anonymity and no-logs policies",
      criteria: ["no_logs", "double_vpn"],
    },
    {
      slug: "torrenting",
      usecase: "Torrenting",
      title: "Best VPNs for Torrenting",
      description: "P2P optimized servers and fast downloads",
      criteria: ["torrenting"],
    },
    {
      slug: "beginners",
      usecase: "Beginners",
      title: "Best VPNs for Beginners",
      description: "Easy-to-use VPNs for first-time users",
      criteria: ["ease_of_use"],
    },
  ],
};
