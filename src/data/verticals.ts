import type { Vertical } from "@/types";
import { CURRENT_YEAR, TRUST_SIGNALS } from "@/lib/constants";

export const verticals: Vertical[] = [
  {
    id: "1",
    slug: "vpn",
    name: "VPNs",
    description:
      "Find the best VPN service to protect your online privacy, access geo-restricted content, and secure your internet connection with military-grade encryption.",
    meta_title: `Best VPNs of ${CURRENT_YEAR} (We Tested 15+ - ${TRUST_SIGNALS.updated})`,
    meta_description:
      `Compare the best VPN services of ${CURRENT_YEAR}. Expert reviews on speed, security, Netflix unblocking, and privacy. Find the fastest VPN for streaming, torrenting, and online protection.`,
    icon: "Shield",
    color: "#6366F1",
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "hosting",
    name: "Web Hosting",
    description:
      "Compare the best web hosting providers for WordPress, eCommerce, and business websites. Find reliable hosting with fast speeds and 99.9% uptime.",
    meta_title: `Best Web Hosting of ${CURRENT_YEAR} (${TRUST_SIGNALS.tested} & Uptime Verified)`,
    meta_description:
      `Find the best web hosting for your website in ${CURRENT_YEAR}. Compare top hosting providers for WordPress, shared hosting, VPS, and dedicated servers. Uptime tested, expert reviewed.`,
    icon: "Server",
    color: "#10B981",
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    slug: "email-marketing",
    name: "Email Marketing",
    description:
      "Discover the best email marketing software to grow your audience, automate campaigns, and increase conversions with high deliverability.",
    meta_title: `Best Email Marketing Software ${CURRENT_YEAR} (${TRUST_SIGNALS.hands_on})`,
    meta_description:
      `Compare the best email marketing platforms of ${CURRENT_YEAR}. Find top-rated software for newsletters, automation, drip campaigns, and eCommerce email marketing.`,
    icon: "Mail",
    color: "#F59E0B",
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    slug: "password-managers",
    name: "Password Managers",
    description:
      "Secure your digital life with the best password managers. Compare features, zero-knowledge encryption, and cross-platform sync.",
    meta_title: `Best Password Managers ${CURRENT_YEAR} (Security Tested & ${TRUST_SIGNALS.ranked})`,
    meta_description:
      `Find the best password manager for security and convenience in ${CURRENT_YEAR}. Compare top-rated password vaults with encryption, autofill, breach monitoring, and family sharing.`,
    icon: "Key",
    color: "#8B5CF6",
    is_active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    slug: "project-management",
    name: "Project Management",
    description:
      "Find the best project management software to organize tasks, collaborate with your team, and deliver projects on time.",
    meta_title: `Best Project Management Software ${CURRENT_YEAR} (${TRUST_SIGNALS.tested})`,
    meta_description:
      `Compare the best project management tools of ${CURRENT_YEAR}. Find top software for Agile, Kanban, Gantt charts, and team collaboration. Free and paid options reviewed.`,
    icon: "Briefcase",
    color: "#EC4899",
    is_active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    slug: "crm",
    name: "CRM Software",
    description:
      "Compare the best CRM software to manage customer relationships, automate sales pipelines, and grow your business.",
    meta_title: `Best CRM Software ${CURRENT_YEAR} (${TRUST_SIGNALS.hands_on} & Compared)`,
    meta_description:
      `Find the best CRM for your business in ${CURRENT_YEAR}. Compare Salesforce, HubSpot, and top CRM platforms for sales automation, lead management, and customer tracking.`,
    icon: "Users",
    color: "#14B8A6",
    is_active: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    slug: "website-builders",
    name: "Website Builders",
    description:
      "Build a professional website with the best website builders. No coding required. Drag-and-drop editors with SEO tools included.",
    meta_title: `Best Website Builders ${CURRENT_YEAR} (${TRUST_SIGNALS.tested} - No Code Required)`,
    meta_description:
      `Compare the best website builders of ${CURRENT_YEAR}. Find easy drag-and-drop builders for portfolios, small business, and eCommerce. Wix, Squarespace, and more reviewed.`,
    icon: "Globe",
    color: "#F97316",
    is_active: true,
    sort_order: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    slug: "online-learning",
    name: "Online Learning",
    description:
      "Discover the best online learning platforms to acquire new skills, earn certificates, and advance your career from anywhere.",
    meta_title: `Best Online Learning Platforms ${CURRENT_YEAR} (${TRUST_SIGNALS.ranked})`,
    meta_description:
      `Compare the best online course platforms of ${CURRENT_YEAR}. Find top-rated sites for coding, business, design, and professional certifications. Coursera, Udemy, and more.`,
    icon: "GraduationCap",
    color: "#06B6D4",
    is_active: true,
    sort_order: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    slug: "internet-providers",
    name: "Internet Providers",
    description:
      "Find the best high speed internet providers in your area. Compare fiber, cable, and 5G home internet plans with the fastest speeds and lowest prices.",
    meta_title: `Best Internet Providers ${CURRENT_YEAR} (Speed Tested - Fiber, Cable & 5G)`,
    meta_description:
      `Find high speed internet in your area in ${CURRENT_YEAR}. Compare the fastest internet providers, fiber optic plans, cable internet deals, and 5G home internet. Check availability by zip code.`,
    icon: "Wifi",
    color: "#3B82F6",
    is_active: true,
    sort_order: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    slug: "antivirus",
    name: "Antivirus Software",
    description:
      "Protect your devices with the best antivirus software. Compare real-time protection, malware detection, and internet security suites.",
    meta_title: `Best Antivirus Software ${CURRENT_YEAR} (Lab Tested - PC, Mac & Mobile)`,
    meta_description:
      `Compare the best antivirus software of ${CURRENT_YEAR}. Find top-rated virus protection with real-time scanning, ransomware defense, and internet security. Free and paid options tested.`,
    icon: "ShieldCheck",
    color: "#EF4444",
    is_active: true,
    sort_order: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "11",
    slug: "home-security",
    name: "Home Security",
    description:
      "Find the best home security systems to protect your family. Compare DIY and professional monitoring, smart cameras, and alarm systems.",
    meta_title: `Best Home Security Systems ${CURRENT_YEAR} (${TRUST_SIGNALS.tested} - DIY & Pro)`,
    meta_description:
      `Compare the best home security systems of ${CURRENT_YEAR}. Find top-rated DIY and professionally monitored alarms, smart cameras, and video doorbells. Ring, SimpliSafe, ADT reviewed.`,
    icon: "Home",
    color: "#7C3AED",
    is_active: true,
    sort_order: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "12",
    slug: "cloud-storage",
    name: "Cloud Storage",
    description:
      "Compare the best cloud storage services for personal backup, file sharing, and team collaboration. Secure your files with encrypted cloud backup.",
    meta_title: `Best Cloud Storage ${CURRENT_YEAR} (Security Tested - ${TRUST_SIGNALS.updated})`,
    meta_description:
      `Find the best cloud storage for backup and file sharing in ${CURRENT_YEAR}. Compare Google Drive, Dropbox, iCloud, and secure cloud storage with encryption. Free and paid plans reviewed.`,
    icon: "Cloud",
    color: "#0EA5E9",
    is_active: true,
    sort_order: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function getVerticalBySlug(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}

export function getActiveVerticals(): Vertical[] {
  return verticals.filter((v) => v.is_active).sort((a, b) => a.sort_order - b.sort_order);
}
