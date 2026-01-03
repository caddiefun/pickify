// SEO and site-wide constants
// Update CURRENT_YEAR at the start of each year

export const CURRENT_YEAR = 2026;

// Trust signals for titles
export const TRUST_SIGNALS = {
  tested: "Expert Tested",
  updated: "Updated Monthly",
  hands_on: "Hands-On Reviews",
  compared: "Side-by-Side Comparison",
  ranked: "Independently Ranked",
};

// Author information for E-A-T signals
export const AUTHORS = {
  editorial: {
    name: "Pickify Editorial Team",
    type: "Organization" as const,
    url: "https://pickify.io/about",
    description: "Expert reviewers with 10+ years testing software and services",
  },
  // Individual authors can be added here for specific verticals
  vpn: {
    name: "Jake Morrison",
    type: "Person" as const,
    jobTitle: "Senior Security Analyst",
    url: "https://pickify.io/about#jake-morrison",
    description: "Cybersecurity expert with 12+ years testing VPNs and security software",
    sameAs: [
      "https://linkedin.com/in/jake-morrison-security",
      "https://twitter.com/jakesecuritypro",
    ],
  },
  hosting: {
    name: "Sarah Chen",
    type: "Person" as const,
    jobTitle: "Web Infrastructure Specialist",
    url: "https://pickify.io/about#sarah-chen",
    description: "DevOps engineer with 8+ years evaluating hosting performance",
    sameAs: [
      "https://linkedin.com/in/sarah-chen-devops",
    ],
  },
};

// Vertical display names (singular form)
export const VERTICAL_SINGULAR: Record<string, string> = {
  vpn: "VPN",
  hosting: "Web Hosting",
  "email-marketing": "Email Marketing Platform",
  "password-managers": "Password Manager",
  "project-management": "Project Management Tool",
  crm: "CRM",
  "website-builders": "Website Builder",
  "online-learning": "Online Learning Platform",
  "internet-providers": "Internet Provider",
  antivirus: "Antivirus Software",
  "home-security": "Home Security System",
  "cloud-storage": "Cloud Storage Service",
};

// Vertical display names (plural form)
export const VERTICAL_PLURAL: Record<string, string> = {
  vpn: "VPNs",
  hosting: "Web Hosting Services",
  "email-marketing": "Email Marketing Platforms",
  "password-managers": "Password Managers",
  "project-management": "Project Management Tools",
  crm: "CRM Software",
  "website-builders": "Website Builders",
  "online-learning": "Online Learning Platforms",
  "internet-providers": "Internet Providers",
  antivirus: "Antivirus Software",
  "home-security": "Home Security Systems",
  "cloud-storage": "Cloud Storage Services",
};
