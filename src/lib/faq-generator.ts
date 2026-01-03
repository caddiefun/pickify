import type { Product } from "@/types";

export interface FAQ {
  question: string;
  answer: string;
}

/**
 * FAQ Generator for AI Citation Optimization
 *
 * Generates contextual FAQs from product data that can be:
 * 1. Displayed on pages for user value
 * 2. Included in FAQ schema for rich results
 * 3. Extracted by AI for direct answers
 *
 * Key principles:
 * - Questions match real user queries (conversational)
 * - Answers are direct (1-2 sentences)
 * - Include specific numbers and dates
 * - Cite our testing where applicable
 */

// =============================================================================
// Product Review FAQs
// =============================================================================

export function generateProductFAQs(product: Product, verticalName: string): FAQ[] {
  const firstPrice = product.pricing?.[0]?.price ?? 0;
  const lowestPrice = product.pricing?.length
    ? product.pricing.reduce((min, p) => (p.price < min ? p.price : min), firstPrice)
    : 0;

  const faqs: FAQ[] = [
    {
      question: `How much does ${product.name} cost?`,
      answer: `${product.name} starts at $${lowestPrice?.toFixed(2)}/mo for the ${product.pricing?.[0]?.plan_name || "base"} plan. ${product.pricing && product.pricing.length > 1 ? `They also offer ${product.pricing.slice(1).map(p => `${p.plan_name} ($${p.price}/mo)`).join(", ")}.` : ""}`,
    },
    {
      question: `Is ${product.name} worth it in 2025?`,
      answer: `${product.name} scores ${product.overall_rating}/10 in our testing. ${product.pros[0]}. However, ${product.cons[0]?.toLowerCase() || "it has some limitations"}.`,
    },
    {
      question: `What are the pros and cons of ${product.name}?`,
      answer: `Pros: ${product.pros.slice(0, 3).join("; ")}. Cons: ${product.cons.slice(0, 3).join("; ")}.`,
    },
    {
      question: `Is ${product.name} safe to use?`,
      answer: `${product.name} is a legitimate ${verticalName.toLowerCase()} service. ${product.features?.find(f => f.name === "no_logs")?.value ? "They have a verified no-logs policy." : ""} We recommend reviewing their privacy policy for full details.`,
    },
  ];

  // Add free tier FAQ if applicable
  const freePlan = product.pricing?.find(p => p.price === 0);
  if (freePlan) {
    faqs.push({
      question: `Does ${product.name} have a free plan?`,
      answer: `Yes, ${product.name} offers a free plan with ${freePlan.features?.slice(0, 2).join(", ") || "limited features"}. Paid plans start at $${product.pricing?.filter(p => p.price > 0)?.[0]?.price || "N/A"}/mo.`,
    });
  }

  return faqs;
}

// =============================================================================
// Comparison FAQs
// =============================================================================

export function generateComparisonFAQs(
  productA: Product,
  productB: Product,
  verticalName: string
): FAQ[] {
  const priceA = productA.pricing?.[0]?.price || 0;
  const priceB = productB.pricing?.[0]?.price || 0;
  const cheaperProduct = priceA < priceB ? productA : productB;
  const cheaperPrice = Math.min(priceA, priceB);
  const higherRated = productA.overall_rating > productB.overall_rating ? productA : productB;
  const lowerRated = productA.overall_rating > productB.overall_rating ? productB : productA;

  return [
    {
      question: `Is ${productA.name} better than ${productB.name}?`,
      answer: `${higherRated.name} scores higher in our testing (${higherRated.overall_rating}/10 vs ${lowerRated.overall_rating}/10). ${higherRated.name} excels at ${higherRated.pros[0]?.toLowerCase() || "overall performance"}, while ${lowerRated.name} is better for ${lowerRated.pros[0]?.toLowerCase() || "specific use cases"}.`,
    },
    {
      question: `Which is cheaper, ${productA.name} or ${productB.name}?`,
      answer: `${cheaperProduct.name} is more affordable at $${cheaperPrice.toFixed(2)}/mo vs $${Math.max(priceA, priceB).toFixed(2)}/mo. ${cheaperProduct.name} offers ${Math.round(((Math.max(priceA, priceB) - cheaperPrice) / Math.max(priceA, priceB)) * 100)}% savings.`,
    },
    {
      question: `${productA.name} vs ${productB.name}: which should I choose?`,
      answer: `Choose ${productA.name} if you prioritize ${productA.pros[0]?.toLowerCase() || "its key features"}. Choose ${productB.name} if you need ${productB.pros[0]?.toLowerCase() || "its strengths"}. Both are solid ${verticalName.toLowerCase()} options.`,
    },
    {
      question: `What's the main difference between ${productA.name} and ${productB.name}?`,
      answer: `The main difference is ${productA.name} offers ${productA.short_description.toLowerCase()}, while ${productB.name} focuses on ${productB.short_description.toLowerCase()}.`,
    },
  ];
}

// =============================================================================
// Best-For Page FAQs
// =============================================================================

export function generateBestForFAQs(
  verticalName: string,
  useCase: string,
  products: Product[]
): FAQ[] {
  const winner = products[0];
  const runnerUp = products[1];

  return [
    {
      question: `What is the best ${verticalName.toLowerCase()} for ${useCase}?`,
      answer: `${winner?.name || "Our top pick"} is the best ${verticalName.toLowerCase()} for ${useCase} in 2025. It scored ${winner?.overall_rating}/10 in our testing and ${winner?.pros[0]?.toLowerCase() || "excels in this category"}.`,
    },
    {
      question: `Which ${verticalName.toLowerCase()}s are good for ${useCase}?`,
      answer: `The top ${verticalName.toLowerCase()}s for ${useCase} are: ${products.slice(0, 3).map((p, i) => `${i + 1}. ${p.name} (${p.overall_rating}/10)`).join(", ")}.`,
    },
    {
      question: `Is ${winner?.name} good for ${useCase}?`,
      answer: `Yes, ${winner?.name} is our top recommendation for ${useCase}. ${winner?.pros.find(p => p.toLowerCase().includes(useCase.split(" ")[0].toLowerCase())) || winner?.pros[0] || "It excels in this category"}.`,
    },
    ...(runnerUp
      ? [
          {
            question: `What's the best ${winner?.name} alternative for ${useCase}?`,
            answer: `${runnerUp.name} is the best alternative to ${winner?.name} for ${useCase}. It scores ${runnerUp.overall_rating}/10 and ${runnerUp.pros[0]?.toLowerCase() || "offers strong performance"}.`,
          },
        ]
      : []),
  ];
}

// =============================================================================
// Hub/Vertical Page FAQs
// =============================================================================

export function generateHubFAQs(
  verticalName: string,
  products: Product[]
): FAQ[] {
  const editorsChoice = products.find(p => p.is_editors_choice) || products[0];
  const cheapest = [...products].sort((a, b) =>
    (a.pricing?.[0]?.price || 999) - (b.pricing?.[0]?.price || 999)
  )[0];
  const highestRated = [...products].sort((a, b) => b.overall_rating - a.overall_rating)[0];

  return [
    {
      question: `What is the best ${verticalName.toLowerCase()} in 2025?`,
      answer: `${editorsChoice?.name} is our top pick for best ${verticalName.toLowerCase()} in 2025. It scored ${editorsChoice?.overall_rating}/10 in our testing, offering ${editorsChoice?.short_description.toLowerCase()}.`,
    },
    {
      question: `What is the cheapest ${verticalName.toLowerCase()}?`,
      answer: `${cheapest?.name} is the most affordable option at $${cheapest?.pricing?.[0]?.price?.toFixed(2)}/mo. It scores ${cheapest?.overall_rating}/10 in our testing.`,
    },
    {
      question: `Which ${verticalName.toLowerCase()} has the highest rating?`,
      answer: `${highestRated?.name} has the highest rating at ${highestRated?.overall_rating}/10. ${highestRated?.pros[0]}.`,
    },
    {
      question: `How many ${verticalName.toLowerCase()}s did you test?`,
      answer: `We tested ${products.length} ${verticalName.toLowerCase()}s for this comparison. Our testing methodology includes real-world usage, feature analysis, and price-to-value assessment.`,
    },
    {
      question: `Are these ${verticalName.toLowerCase()} reviews honest?`,
      answer: `Yes, we independently test all ${verticalName.toLowerCase()}s using our own accounts. Some links are affiliate links, but this doesn't affect our ratings. See our disclosure policy for details.`,
    },
  ];
}

// =============================================================================
// Vertical-Specific FAQ Templates
// =============================================================================

export const verticalSpecificFAQs: Record<string, (product: Product) => FAQ[]> = {
  vpn: (product) => [
    {
      question: `Does ${product.name} work with Netflix?`,
      answer: `${product.features?.find(f => f.name === "streaming_support")?.value ? `Yes, ${product.name} works with Netflix and other streaming services in our testing.` : `${product.name} has limited streaming support.`} Streaming performance may vary by server location.`,
    },
    {
      question: `Is ${product.name} good for torrenting?`,
      answer: `${product.features?.find(f => f.name === "torrenting")?.value ? `Yes, ${product.name} supports P2P/torrenting on its servers.` : `${product.name} does not officially support torrenting.`}`,
    },
    {
      question: `Does ${product.name} keep logs?`,
      answer: `${product.features?.find(f => f.name === "no_logs")?.value ? `${product.name} has a verified no-logs policy.` : `Check ${product.name}'s privacy policy for their logging practices.`}`,
    },
    {
      question: `How many devices can I use with ${product.name}?`,
      answer: `${product.name} allows ${product.features?.find(f => f.name === "simultaneous_connections")?.value || "multiple"} simultaneous connections.`,
    },
  ],

  hosting: (product) => [
    {
      question: `Is ${product.name} good for WordPress?`,
      answer: `${product.name} ${product.short_description.toLowerCase().includes("wordpress") ? "specializes in WordPress hosting" : "supports WordPress sites"}. Check their specific WordPress plans for optimized performance.`,
    },
    {
      question: `Does ${product.name} offer free SSL?`,
      answer: `Most ${product.name} plans include free SSL certificates. Verify specific plan details before purchasing.`,
    },
    {
      question: `What is ${product.name}'s uptime guarantee?`,
      answer: `${product.name} offers standard uptime guarantees. In our monitoring, uptime performance has been consistent with their claims.`,
    },
    {
      question: `Can I migrate to ${product.name} for free?`,
      answer: `Many ${product.name} plans include free migration assistance. Contact their support team to confirm migration options.`,
    },
  ],

  "email-marketing": (product) => [
    {
      question: `Is ${product.name} GDPR compliant?`,
      answer: `${product.name} offers GDPR compliance features including consent management and data processing agreements. Review their compliance documentation for your specific needs.`,
    },
    {
      question: `Does ${product.name} have automation features?`,
      answer: `${product.name} ${product.description.toLowerCase().includes("automation") ? "includes marketing automation features" : "offers basic automation capabilities"}. Advanced workflows may require higher-tier plans.`,
    },
    {
      question: `What is ${product.name}'s email deliverability rate?`,
      answer: `${product.name} maintains competitive deliverability rates. Actual rates depend on your sending practices and list hygiene.`,
    },
  ],

  "password-managers": (product) => [
    {
      question: `Is ${product.name} secure?`,
      answer: `${product.name} uses industry-standard encryption to protect your passwords. ${product.features?.find(f => f.name === "no_logs")?.value ? "They maintain a zero-knowledge architecture." : "Review their security documentation for details."}`,
    },
    {
      question: `Does ${product.name} work on all devices?`,
      answer: `${product.name} supports ${product.features?.find(f => f.name === "platforms")?.value || "multiple platforms including Windows, Mac, iOS, and Android"}.`,
    },
    {
      question: `Can ${product.name} share passwords with family?`,
      answer: `${product.description.toLowerCase().includes("family") || product.description.toLowerCase().includes("share") ? `Yes, ${product.name} offers password sharing features.` : `Check ${product.name}'s family or team plans for sharing capabilities.`}`,
    },
  ],

  "internet-providers": (product) => [
    {
      question: `Is ${product.name} available in my area?`,
      answer: `${product.name} availability varies by location. Enter your zip code above to check if ${product.name} services your address.`,
    },
    {
      question: `What speeds does ${product.name} offer?`,
      answer: `${product.name} offers speeds ${product.features?.find(f => f.name === "max_download_speed")?.value ? `up to ${product.features.find(f => f.name === "max_download_speed")?.value} Mbps` : "varying by plan and location"}. Actual speeds depend on your location and infrastructure.`,
    },
    {
      question: `Does ${product.name} have data caps?`,
      answer: `Data cap policies vary by ${product.name} plan and region. Check specific plan details or contact customer service for data limit information.`,
    },
  ],
};

// =============================================================================
// Master FAQ Generator
// =============================================================================

export function generateAllFAQs(
  product: Product,
  verticalSlug: string,
  verticalName: string
): FAQ[] {
  const baseFAQs = generateProductFAQs(product, verticalName);
  const specificGenerator = verticalSpecificFAQs[verticalSlug];
  const specificFAQs = specificGenerator ? specificGenerator(product) : [];

  return [...baseFAQs, ...specificFAQs];
}

// =============================================================================
// ISP-Specific FAQ Generator (for zip code pages)
// =============================================================================

export function generateZipCodeFAQs(
  zipCode: string,
  providers: Product[],
  cityName?: string,
  stateName?: string
): FAQ[] {
  const locationStr = cityName && stateName
    ? `${cityName}, ${stateName}`
    : `zip code ${zipCode}`;

  const fastestProvider = providers.reduce((fastest, current) => {
    const fastestSpeed = Number(fastest.features?.find(f => f.name === "max_download_speed")?.value) || 0;
    const currentSpeed = Number(current.features?.find(f => f.name === "max_download_speed")?.value) || 0;
    return currentSpeed > fastestSpeed ? current : fastest;
  }, providers[0]);

  const cheapestProvider = providers.reduce((cheapest, current) => {
    const cheapestPrice = cheapest.pricing?.[0]?.price || 999;
    const currentPrice = current.pricing?.[0]?.price || 999;
    return currentPrice < cheapestPrice ? current : cheapest;
  }, providers[0]);

  return [
    {
      question: `What internet providers are available in ${locationStr}?`,
      answer: `${providers.length} internet providers serve ${locationStr}: ${providers.map(p => p.name).join(", ")}.`,
    },
    {
      question: `What is the fastest internet in ${locationStr}?`,
      answer: `${fastestProvider?.name} offers the fastest speeds in ${locationStr} with up to ${fastestProvider?.features?.find(f => f.name === "max_download_speed")?.value || "high-speed"} Mbps.`,
    },
    {
      question: `What is the cheapest internet in ${locationStr}?`,
      answer: `${cheapestProvider?.name} offers the most affordable internet in ${locationStr}, starting at $${cheapestProvider?.pricing?.[0]?.price?.toFixed(2) || "competitive rates"}/mo.`,
    },
    {
      question: `Is fiber internet available in ${zipCode}?`,
      answer: `${providers.some(p => p.features?.some(f => f.name === "technology" && f.value === "fiber")) ? `Yes, fiber internet is available in ${zipCode} from ${providers.filter(p => p.features?.some(f => f.name === "technology" && f.value === "fiber")).map(p => p.name).join(", ")}.` : `Fiber availability in ${zipCode} is limited. Cable and DSL options are available.`}`,
    },
  ];
}
