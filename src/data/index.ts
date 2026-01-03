export { verticals, getVerticalBySlug, getActiveVerticals } from "./verticals";

// VPN Products
export {
  vpnProducts,
  getVpnProducts,
  getVpnProductBySlug,
  getFeaturedVpnProducts,
  getEditorsChoiceVpn,
} from "./products/vpn";

// Hosting Products
export {
  hostingProducts,
  getHostingProducts,
  getHostingProductBySlug,
  getFeaturedHostingProducts,
  getEditorsChoiceHosting,
} from "./products/hosting";

// Email Marketing Products
export {
  emailMarketingProducts,
  getEmailMarketingProducts,
  getEmailMarketingProductBySlug,
  getFeaturedEmailMarketingProducts,
  getEditorsChoiceEmailMarketing,
} from "./products/email-marketing";

// Password Manager Products
export {
  passwordManagerProducts,
  getPasswordManagerProducts,
  getPasswordManagerProductBySlug,
  getFeaturedPasswordManagerProducts,
  getEditorsChoicePasswordManager,
} from "./products/password-managers";

// Project Management Products
export {
  projectManagementProducts,
  getProjectManagementProducts,
  getProjectManagementProductBySlug,
  getFeaturedProjectManagementProducts,
  getEditorsChoiceProjectManagement,
} from "./products/project-management";

// CRM Products
export {
  crmProducts,
  getCrmProducts,
  getCrmProductBySlug,
  getFeaturedCrmProducts,
  getEditorsChoiceCrm,
} from "./products/crm";

// Website Builder Products
export {
  websiteBuilderProducts,
  getWebsiteBuilderProducts,
  getWebsiteBuilderProductBySlug,
  getFeaturedWebsiteBuilderProducts,
  getEditorsChoiceWebsiteBuilder,
} from "./products/website-builders";

// Online Learning Products
export {
  onlineLearningProducts,
  getOnlineLearningProducts,
  getOnlineLearningProductBySlug,
  getFeaturedOnlineLearningProducts,
  getEditorsChoiceOnlineLearning,
} from "./products/online-learning";

// ISP Products
export {
  ispProducts,
  getIspProducts,
  getIspProductBySlug,
  getFeaturedIspProducts,
  getEditorsChoiceIsp,
  getIspByState,
  getIspByTechnology,
} from "./products/isp";
export type { ISPProduct } from "./products/isp";

// Antivirus Products
export {
  antivirusProducts,
  getAntivirusProducts,
  getAntivirusProductBySlug,
  getFeaturedAntivirusProducts,
  getEditorsChoiceAntivirus,
} from "./products/antivirus";

// Home Security Products
export {
  homeSecurityProducts,
  getHomeSecurityProducts,
  getHomeSecurityProductBySlug,
  getFeaturedHomeSecurityProducts,
  getEditorsChoiceHomeSecurity,
} from "./products/home-security";

// Cloud Storage Products
export {
  cloudStorageProducts,
  getCloudStorageProducts,
  getCloudStorageProductBySlug,
  getFeaturedCloudStorageProducts,
  getEditorsChoiceCloudStorage,
} from "./products/cloud-storage";

// Geo Data
export {
  usStates,
  usCities,
  zipCodeAvailability,
  getStateBySlug,
  getStateByCode,
  getCitiesByState,
  getCityBySlug,
  getZipCodeData,
  getProvidersByZipCode,
  isValidZipCode,
  getAllZipCodes,
  getStatesWithCities,
  getCityByZipCode,
  getSiblingZipCodes,
  getNearbyCities,
  getStateSlugFromCode,
} from "./geo";
export type { USState, USCity, ZipCodeData } from "./geo";

import type { Product } from "@/types";
import { CURRENT_YEAR } from "@/lib/constants";
import { vpnProducts, getVpnProductBySlug } from "./products/vpn";
import { hostingProducts, getHostingProductBySlug } from "./products/hosting";
import { emailMarketingProducts, getEmailMarketingProductBySlug } from "./products/email-marketing";
import { passwordManagerProducts, getPasswordManagerProductBySlug } from "./products/password-managers";
import { projectManagementProducts, getProjectManagementProductBySlug } from "./products/project-management";
import { crmProducts, getCrmProductBySlug } from "./products/crm";
import { websiteBuilderProducts, getWebsiteBuilderProductBySlug } from "./products/website-builders";
import { onlineLearningProducts, getOnlineLearningProductBySlug } from "./products/online-learning";
import { ispProducts, getIspProductBySlug } from "./products/isp";
import { antivirusProducts, getAntivirusProductBySlug } from "./products/antivirus";
import { homeSecurityProducts, getHomeSecurityProductBySlug } from "./products/home-security";
import { cloudStorageProducts, getCloudStorageProductBySlug } from "./products/cloud-storage";

// Unified product fetching by vertical
export function getProductsByVertical(verticalSlug: string): Product[] {
  switch (verticalSlug) {
    case "vpn":
      return vpnProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "hosting":
      return hostingProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "email-marketing":
      return emailMarketingProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "password-managers":
      return passwordManagerProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "project-management":
      return projectManagementProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "crm":
      return crmProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "website-builders":
      return websiteBuilderProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "online-learning":
      return onlineLearningProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "internet-providers":
      return ispProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "antivirus":
      return antivirusProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "home-security":
      return homeSecurityProducts.sort((a, b) => b.overall_rating - a.overall_rating);
    case "cloud-storage":
      return cloudStorageProducts.sort((a, b) => b.overall_rating - a.overall_rating);
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
    case "hosting":
      return getHostingProductBySlug(productSlug);
    case "email-marketing":
      return getEmailMarketingProductBySlug(productSlug);
    case "password-managers":
      return getPasswordManagerProductBySlug(productSlug);
    case "project-management":
      return getProjectManagementProductBySlug(productSlug);
    case "crm":
      return getCrmProductBySlug(productSlug);
    case "website-builders":
      return getWebsiteBuilderProductBySlug(productSlug);
    case "online-learning":
      return getOnlineLearningProductBySlug(productSlug);
    case "internet-providers":
      return getIspProductBySlug(productSlug);
    case "antivirus":
      return getAntivirusProductBySlug(productSlug);
    case "home-security":
      return getHomeSecurityProductBySlug(productSlug);
    case "cloud-storage":
      return getCloudStorageProductBySlug(productSlug);
    default:
      return undefined;
  }
}

// Find a product by slug across all verticals
export function findProductBySlug(productSlug: string): Product | undefined {
  // Search each vertical's products for the matching slug
  const allProducts = [
    ...vpnProducts,
    ...hostingProducts,
    ...emailMarketingProducts,
    ...passwordManagerProducts,
    ...projectManagementProducts,
    ...crmProducts,
    ...websiteBuilderProducts,
    ...onlineLearningProducts,
    ...ispProducts,
    ...antivirusProducts,
    ...homeSecurityProducts,
    ...cloudStorageProducts,
  ];

  return allProducts.find((p) => p.slug === productSlug);
}

// Generate comparison data between two products
export function generateComparison(productA: Product, productB: Product) {
  return {
    slug: `${productA.slug}-vs-${productB.slug}`,
    title: `${productA.name} vs ${productB.name}`,
    meta_title: `${productA.name} vs ${productB.name}: Which Is Better? (${CURRENT_YEAR} Comparison)`,
    meta_description: `Compare ${productA.name} and ${productB.name} side by side in ${CURRENT_YEAR}. See features, pricing, pros & cons to find the best option for you.`,
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

// Best-for page configurations for all verticals
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
  hosting: [
    {
      slug: "wordpress",
      usecase: "WordPress",
      title: "Best Hosting for WordPress",
      description: "Optimized hosting for WordPress sites",
      criteria: ["wordpress_optimized"],
    },
    {
      slug: "beginners",
      usecase: "Beginners",
      title: "Best Hosting for Beginners",
      description: "Easy setup and management for new site owners",
      criteria: ["ease_of_use"],
    },
    {
      slug: "ecommerce",
      usecase: "E-commerce",
      title: "Best Hosting for E-commerce",
      description: "Fast, secure hosting for online stores",
      criteria: ["uptime_guarantee", "storage"],
    },
    {
      slug: "speed",
      usecase: "Speed",
      title: "Fastest Web Hosting",
      description: "Maximum performance for your website",
      criteria: ["cdn", "bandwidth"],
    },
    {
      slug: "budget",
      usecase: "Budget",
      title: "Best Cheap Web Hosting",
      description: "Quality hosting that won't break the bank",
      criteria: ["price"],
    },
  ],
  "email-marketing": [
    {
      slug: "small-business",
      usecase: "Small Business",
      title: "Best Email Marketing for Small Business",
      description: "Affordable solutions for growing businesses",
      criteria: ["contacts", "automation"],
    },
    {
      slug: "ecommerce",
      usecase: "E-commerce",
      title: "Best Email Marketing for E-commerce",
      description: "Shopify integration and cart recovery",
      criteria: ["integrations", "segmentation"],
    },
    {
      slug: "creators",
      usecase: "Creators",
      title: "Best Email Marketing for Creators",
      description: "Perfect for bloggers, YouTubers, and podcasters",
      criteria: ["automation", "landing_pages"],
    },
    {
      slug: "automation",
      usecase: "Automation",
      title: "Best Email Automation Software",
      description: "Advanced workflows and sequences",
      criteria: ["automation", "ab_testing"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free Email Marketing",
      description: "Start email marketing without spending a dime",
      criteria: ["free_tier"],
    },
  ],
  "password-managers": [
    {
      slug: "families",
      usecase: "Families",
      title: "Best Password Managers for Families",
      description: "Secure sharing for the whole family",
      criteria: ["password_sharing"],
    },
    {
      slug: "business",
      usecase: "Business",
      title: "Best Password Managers for Business",
      description: "Team security and admin controls",
      criteria: ["two_factor", "security_audit"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free Password Managers",
      description: "Secure your accounts without paying",
      criteria: ["free_tier"],
    },
    {
      slug: "security",
      usecase: "Security",
      title: "Most Secure Password Managers",
      description: "Maximum protection for your credentials",
      criteria: ["two_factor", "breach_monitoring"],
    },
    {
      slug: "cross-platform",
      usecase: "Cross-Platform",
      title: "Best Cross-Platform Password Managers",
      description: "Seamless sync across all devices",
      criteria: ["devices", "browser_extension"],
    },
  ],
  "project-management": [
    {
      slug: "small-teams",
      usecase: "Small Teams",
      title: "Best Project Management for Small Teams",
      description: "Affordable tools for teams under 20",
      criteria: ["users", "price"],
    },
    {
      slug: "remote-teams",
      usecase: "Remote Teams",
      title: "Best Project Management for Remote Teams",
      description: "Collaboration tools for distributed teams",
      criteria: ["integrations", "mobile_app"],
    },
    {
      slug: "agile",
      usecase: "Agile",
      title: "Best Project Management for Agile",
      description: "Kanban, sprints, and agile workflows",
      criteria: ["kanban_view", "automations"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free Project Management Tools",
      description: "Powerful tools that cost nothing",
      criteria: ["free_tier"],
    },
    {
      slug: "startups",
      usecase: "Startups",
      title: "Best Project Management for Startups",
      description: "Scale from founding to funding",
      criteria: ["users", "integrations"],
    },
  ],
  crm: [
    {
      slug: "small-business",
      usecase: "Small Business",
      title: "Best CRM for Small Business",
      description: "Grow your business with the right CRM",
      criteria: ["contacts", "deal_pipeline"],
    },
    {
      slug: "sales-teams",
      usecase: "Sales Teams",
      title: "Best CRM for Sales Teams",
      description: "Close more deals with better tools",
      criteria: ["deal_pipeline", "email_tracking"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free CRM Software",
      description: "Get started without any cost",
      criteria: ["free_tier"],
    },
    {
      slug: "enterprise",
      usecase: "Enterprise",
      title: "Best Enterprise CRM",
      description: "Scalable solutions for large organizations",
      criteria: ["integrations", "api_access"],
    },
    {
      slug: "startups",
      usecase: "Startups",
      title: "Best CRM for Startups",
      description: "Grow from zero to hero",
      criteria: ["users", "deal_pipeline"],
    },
  ],
  "website-builders": [
    {
      slug: "beginners",
      usecase: "Beginners",
      title: "Best Website Builders for Beginners",
      description: "Create your first website with ease",
      criteria: ["templates", "ease_of_use"],
    },
    {
      slug: "ecommerce",
      usecase: "E-commerce",
      title: "Best Website Builders for E-commerce",
      description: "Sell online with powerful store features",
      criteria: ["ecommerce", "analytics"],
    },
    {
      slug: "portfolios",
      usecase: "Portfolios",
      title: "Best Website Builders for Portfolios",
      description: "Showcase your work beautifully",
      criteria: ["templates", "custom_domain"],
    },
    {
      slug: "blogs",
      usecase: "Blogs",
      title: "Best Website Builders for Blogs",
      description: "Start blogging in minutes",
      criteria: ["seo_tools", "templates"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free Website Builders",
      description: "Build your website without spending",
      criteria: ["free_tier"],
    },
  ],
  "online-learning": [
    {
      slug: "tech-skills",
      usecase: "Tech Skills",
      title: "Best Online Learning for Tech Skills",
      description: "Learn coding, data science, and more",
      criteria: ["courses", "projects"],
    },
    {
      slug: "career-change",
      usecase: "Career Change",
      title: "Best Online Learning for Career Change",
      description: "Get certified in a new field",
      criteria: ["certificates", "courses"],
    },
    {
      slug: "creative-skills",
      usecase: "Creative Skills",
      title: "Best Online Learning for Creative Skills",
      description: "Design, video, photography, and more",
      criteria: ["projects", "courses"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free Online Learning Platforms",
      description: "Learn without spending a dime",
      criteria: ["free_content"],
    },
    {
      slug: "certificates",
      usecase: "Certificates",
      title: "Best Online Learning with Certificates",
      description: "Boost your resume with credentials",
      criteria: ["certificates", "courses"],
    },
  ],
  "internet-providers": [
    {
      slug: "streaming",
      usecase: "Streaming",
      title: "Best High Speed Internet for Streaming",
      description: "Fast, reliable internet for Netflix, gaming, and 4K video",
      criteria: ["max_download", "data_cap"],
    },
    {
      slug: "gaming",
      usecase: "Gaming",
      title: "Best High Speed Internet for Gaming",
      description: "Low latency and fast speeds for online gaming",
      criteria: ["max_download", "max_upload"],
    },
    {
      slug: "remote-work",
      usecase: "Remote Work",
      title: "Best Internet for Working from Home",
      description: "Reliable upload speeds for video calls and file sharing",
      criteria: ["max_upload", "data_cap"],
    },
    {
      slug: "rural",
      usecase: "Rural Areas",
      title: "Best Internet for Rural Areas",
      description: "Broadband options for areas with limited coverage",
      criteria: ["coverage"],
    },
    {
      slug: "budget",
      usecase: "Budget",
      title: "Best Cheap High Speed Internet",
      description: "Affordable broadband that doesn't break the bank",
      criteria: ["price"],
    },
  ],
  antivirus: [
    {
      slug: "windows",
      usecase: "Windows",
      title: "Best Antivirus for Windows PC",
      description: "Top-rated virus protection for Windows 10 & 11",
      criteria: ["malware_detection", "real_time_protection"],
    },
    {
      slug: "mac",
      usecase: "Mac",
      title: "Best Antivirus for Mac",
      description: "Security software designed for macOS",
      criteria: ["malware_detection", "macos_support"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free Antivirus Software",
      description: "Quality virus protection that costs nothing",
      criteria: ["free_tier", "malware_detection"],
    },
    {
      slug: "gaming",
      usecase: "Gaming",
      title: "Best Antivirus for Gaming",
      description: "Lightweight protection that won't slow down your games",
      criteria: ["performance_impact", "gaming_mode"],
    },
    {
      slug: "families",
      usecase: "Families",
      title: "Best Antivirus for Families",
      description: "Protect all your family's devices with parental controls",
      criteria: ["devices", "parental_controls"],
    },
  ],
  "home-security": [
    {
      slug: "diy",
      usecase: "DIY",
      title: "Best DIY Home Security Systems",
      description: "Self-install security systems with no contracts",
      criteria: ["self_install", "no_contract"],
    },
    {
      slug: "professional",
      usecase: "Professional Monitoring",
      title: "Best Professionally Monitored Security",
      description: "24/7 professional monitoring and fast response",
      criteria: ["professional_monitoring", "response_time"],
    },
    {
      slug: "apartments",
      usecase: "Apartments",
      title: "Best Home Security for Apartments",
      description: "Renter-friendly security with no drilling required",
      criteria: ["wireless", "portable"],
    },
    {
      slug: "cameras",
      usecase: "Cameras",
      title: "Best Home Security Cameras",
      description: "Smart cameras with video recording and alerts",
      criteria: ["video_quality", "cloud_storage"],
    },
    {
      slug: "budget",
      usecase: "Budget",
      title: "Best Cheap Home Security Systems",
      description: "Affordable protection without monthly fees",
      criteria: ["price", "no_monthly_fee"],
    },
  ],
  "cloud-storage": [
    {
      slug: "personal",
      usecase: "Personal Use",
      title: "Best Cloud Storage for Personal Use",
      description: "Backup photos, documents, and files securely",
      criteria: ["storage", "ease_of_use"],
    },
    {
      slug: "business",
      usecase: "Business",
      title: "Best Cloud Storage for Business",
      description: "Team collaboration and enterprise security",
      criteria: ["team_features", "admin_controls"],
    },
    {
      slug: "photos",
      usecase: "Photos",
      title: "Best Cloud Storage for Photos",
      description: "Backup and organize your photo library",
      criteria: ["photo_features", "storage"],
    },
    {
      slug: "free",
      usecase: "Free",
      title: "Best Free Cloud Storage",
      description: "Get free storage space for your files",
      criteria: ["free_tier", "storage"],
    },
    {
      slug: "security",
      usecase: "Security",
      title: "Most Secure Cloud Storage",
      description: "End-to-end encryption and zero-knowledge privacy",
      criteria: ["encryption", "zero_knowledge"],
    },
  ],
};
