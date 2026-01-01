import { MetadataRoute } from "next";
import {
  getActiveVerticals,
  getProductsByVertical,
  getComparisonPairs,
  bestForConfigs,
} from "@/data";

const BASE_URL = "https://pickify.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const verticals = getActiveVerticals();
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/disclosure`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Vertical hub pages
  const verticalPages: MetadataRoute.Sitemap = verticals.map((vertical) => ({
    url: `${BASE_URL}/${vertical.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Product review pages
  const productPages: MetadataRoute.Sitemap = verticals.flatMap((vertical) => {
    const products = getProductsByVertical(vertical.slug);
    return products.map((product) => ({
      url: `${BASE_URL}/${vertical.slug}/${product.slug}`,
      lastModified: new Date(product.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  });

  // Comparison pages (A vs B)
  const comparisonPages: MetadataRoute.Sitemap = verticals.flatMap(
    (vertical) => {
      const products = getProductsByVertical(vertical.slug);
      const pairs = getComparisonPairs(products);
      return pairs.map(([productA, productB]) => ({
        url: `${BASE_URL}/${vertical.slug}/compare/${productA.slug}-vs-${productB.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  );

  // Best-for pages
  const bestForPages: MetadataRoute.Sitemap = verticals.flatMap((vertical) => {
    const configs =
      bestForConfigs[vertical.slug as keyof typeof bestForConfigs] || [];
    return configs.map((config) => ({
      url: `${BASE_URL}/${vertical.slug}/best-for/${config.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  });

  return [
    ...staticPages,
    ...verticalPages,
    ...productPages,
    ...comparisonPages,
    ...bestForPages,
  ];
}
