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
// Using organization as author - add real Person authors when you have actual team members to credit
export const AUTHORS = {
  editorial: {
    name: "Pickify Editorial Team",
    type: "Organization" as const,
    url: "https://pickify.io/about",
    description: "Independent reviewers testing and comparing software since 2020",
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
