import type { Vertical } from "@/types";

export const verticals: Vertical[] = [
  {
    id: "1",
    slug: "vpn",
    name: "VPNs",
    description:
      "Find the best VPN to protect your online privacy, access geo-restricted content, and secure your internet connection.",
    meta_title: "Best VPNs of 2025 - Expert Reviews & Comparisons",
    meta_description:
      "Compare the top VPN services with our expert reviews. Find the best VPN for streaming, privacy, speed, and value.",
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
      "Compare web hosting providers to find the perfect solution for your website, from shared hosting to dedicated servers.",
    meta_title: "Best Web Hosting of 2025 - Expert Reviews & Comparisons",
    meta_description:
      "Find the best web hosting provider for your needs. Compare prices, features, and performance across top hosts.",
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
      "Discover the best email marketing platforms to grow your audience, automate campaigns, and increase conversions.",
    meta_title: "Best Email Marketing Software of 2025 - Reviews & Comparisons",
    meta_description:
      "Compare top email marketing tools. Find the best platform for newsletters, automation, and email campaigns.",
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
      "Secure your digital life with the best password managers. Compare features, security, and ease of use.",
    meta_title: "Best Password Managers of 2025 - Secure Your Accounts",
    meta_description:
      "Find the best password manager for your needs. Compare security features, pricing, and cross-platform support.",
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
      "Find the best project management software to organize your team's work and boost productivity.",
    meta_title: "Best Project Management Software of 2025 - Reviews",
    meta_description:
      "Compare top project management tools. Find the best solution for your team's workflow and collaboration needs.",
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
      "Compare CRM solutions to manage customer relationships, track sales, and grow your business.",
    meta_title: "Best CRM Software of 2025 - Reviews & Comparisons",
    meta_description:
      "Find the best CRM for your business. Compare features, pricing, and integrations across top platforms.",
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
      "Build your website easily with the best website builders. No coding required.",
    meta_title: "Best Website Builders of 2025 - Create Your Site Today",
    meta_description:
      "Compare top website builders. Find the easiest way to create a professional website without coding.",
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
      "Discover the best online learning platforms to acquire new skills and advance your career.",
    meta_title: "Best Online Learning Platforms of 2025 - Reviews",
    meta_description:
      "Find the best online courses and learning platforms. Compare features, course quality, and pricing.",
    icon: "GraduationCap",
    color: "#06B6D4",
    is_active: true,
    sort_order: 8,
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
