import { MetadataRoute } from "next";
import {
  getActiveVerticals,
  getProductsByVertical,
  getComparisonPairs,
  bestForConfigs,
  usStates,
  usCities,
  getAllZipCodes,
  ispProducts,
} from "@/data";

const BASE_URL = "https://pickify.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const verticals = getActiveVerticals();
  // Use yesterday's date to avoid any timezone issues that might cause future dates
  const now = new Date();
  now.setDate(now.getDate() - 1);

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
    {
      url: `${BASE_URL}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/hosting/uptime-report`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/vpn/speed-tests`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/vpn/ip-leak-test`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/internet-providers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/internet-providers/compare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Vertical hub pages + compare hubs
  const verticalPages: MetadataRoute.Sitemap = verticals.flatMap((vertical) => [
    {
      url: `${BASE_URL}/${vertical.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${vertical.slug}/compare`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

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

  // ISP State pages
  const ispStatePages: MetadataRoute.Sitemap = usStates.map((state) => ({
    url: `${BASE_URL}/internet-providers/${state.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ISP City pages
  const ispCityPages: MetadataRoute.Sitemap = usCities.map((city) => {
    const state = usStates.find((s) => s.code === city.stateCode);
    return {
      url: `${BASE_URL}/internet-providers/${state?.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  // ISP Zip code pages
  const zipCodes = getAllZipCodes();
  const ispZipPages: MetadataRoute.Sitemap = zipCodes.map((zip) => ({
    url: `${BASE_URL}/internet-providers/zip/${zip}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // ISP Provider pages
  const ispProviderPages: MetadataRoute.Sitemap = ispProducts.map((provider) => ({
    url: `${BASE_URL}/internet-providers/provider/${provider.slug}`,
    lastModified: new Date(provider.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // ISP Comparison pages
  const ispComparisonPairs = getComparisonPairs(ispProducts);
  const ispComparisonPages: MetadataRoute.Sitemap = ispComparisonPairs.map(
    ([productA, productB]) => ({
      url: `${BASE_URL}/internet-providers/compare/${productA.slug}-vs-${productB.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  return [
    ...staticPages,
    ...verticalPages,
    ...productPages,
    ...comparisonPages,
    ...bestForPages,
    ...ispStatePages,
    ...ispCityPages,
    ...ispZipPages,
    ...ispProviderPages,
    ...ispComparisonPages,
  ];
}
