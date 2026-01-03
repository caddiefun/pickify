export {
  JsonLd,
  OrganizationSchema,
  WebSiteSchema,
  ProductSchema,
  ReviewSchema,
  FAQSchema,
  BreadcrumbSchema,
  ComparisonSchema,
  ItemListSchema,
  // New AI-optimized schemas
  HowToSchema,
  DatasetSchema,
  LocalBusinessSchema,
  ArticleSchema,
  WebPageSchema,
} from "./json-ld";

export {
  RelatedProducts,
  RelatedComparisons,
  BestForLinks,
  CrossVerticalLinks,
  ContextualLink,
} from "./internal-links";

export {
  QuickAnswer,
  generateHubQuickAnswer,
  generateComparisonQuickAnswer,
  generateReviewQuickAnswer,
  generateBestForQuickAnswer,
  generateStateQuickAnswer,
  generateCityQuickAnswer,
} from "./QuickAnswer";
