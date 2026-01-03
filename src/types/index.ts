// Database Schema Types for Pickify
// Based on Supabase PostgreSQL schema

export type VerticalSlug =
  | "vpn"
  | "hosting"
  | "email-marketing"
  | "password-managers"
  | "project-management"
  | "crm"
  | "website-builders"
  | "online-learning"
  | "internet-providers"
  | "antivirus"
  | "home-security"
  | "cloud-storage";

export interface Vertical {
  id: string;
  slug: VerticalSlug;
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
  icon: string;
  color: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type CredibilityWarningType =
  | "security-concern"
  | "rating-discrepancy"
  | "data-quality"
  | "discontinued";

export interface CredibilityWarning {
  type: CredibilityWarningType;
  message: string;
  learnMoreUrl?: string;
}

export interface Product {
  id: string;
  vertical_id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  website_url: string;
  description: string;
  short_description: string;
  overall_rating: number;
  pros: string[];
  cons: string[];
  features: ProductFeature[];
  pricing: ProductPricing[];
  review_sources?: ReviewSource[];
  promo_info?: PromoInfo;
  credibility_warning?: CredibilityWarning;
  is_editors_choice: boolean;
  is_featured: boolean;
  affiliate_url: string | null;
  affiliate_program: string | null;
  commission_rate: string | null;
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFeature {
  name: string;
  value: string | boolean | number;
  category?: string;
}

export interface ReviewSource {
  name: string;
  rating: number;
  maxRating: number;
  reviewCount?: number;
  url: string;
}

export interface ProductPricing {
  plan_name: string;
  price: number;
  billing_cycle: "monthly" | "yearly" | "one-time" | "custom";
  features: string[];
  is_popular?: boolean;
  cta_text?: string;
}

export interface PromoInfo {
  /** Typical promotions this product runs (e.g., "Black Friday - up to 70% off") */
  typical_promos?: string[];
  /** Whether the product runs seasonal/holiday deals */
  has_seasonal_deals?: boolean;
  /** Money-back guarantee period in days (null if no guarantee) */
  money_back_days?: number | null;
  /** Free trial period in days (null if no trial) */
  free_trial_days?: number | null;
  /** Best time to buy hint (e.g., "Best deals in November") */
  best_time_to_buy?: string;
  /** Student/education discount available */
  has_student_discount?: boolean;
  /** Military/veteran discount available */
  has_military_discount?: boolean;
  /** Annual billing savings percentage (e.g., "Save 50% with annual") */
  annual_discount_percent?: number | null;
}

export interface ProductRating {
  category: string;
  score: number;
  max_score: number;
}

export interface SponsoredPlacement {
  id: string;
  product_id: string;
  page_url: string;
  placement_type: "top_pick" | "featured" | "sidebar";
  monthly_rate: number;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  is_disclosed: boolean;
  created_at: string;
}

export interface Lead {
  id: string;
  product_id: string;
  email: string;
  company: string | null;
  name: string | null;
  phone: string | null;
  message: string | null;
  status: "new" | "sent" | "demo_booked" | "converted" | "lost";
  payout_amount: number | null;
  source_url: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  updated_at: string;
}

export interface Comparison {
  id: string;
  vertical_id: string;
  product_a_id: string;
  product_b_id: string;
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  introduction: string;
  conclusion: string;
  winner_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BestForPage {
  id: string;
  vertical_id: string;
  slug: string;
  usecase: string;
  title: string;
  meta_title: string;
  meta_description: string;
  introduction: string;
  product_ids: string[];
  created_at: string;
  updated_at: string;
}

// UI Component Types
export interface ComparisonTableRow {
  feature: string;
  category?: string;
  products: {
    productId: string;
    value: string | boolean | number;
    highlight?: boolean;
  }[];
}

export interface RatingBarProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export interface ProductCardProps {
  product: Product;
  rank?: number;
  isSponsored?: boolean;
  showRating?: boolean;
  showPricing?: boolean;
  variant?: "default" | "compact" | "detailed";
}

// Navigation & Layout Types
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: string;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Affiliate & Tracking Types
export interface AffiliateClick {
  id: string;
  product_id: string;
  source_url: string;
  destination_url: string;
  user_agent: string | null;
  ip_hash: string | null;
  created_at: string;
}

export interface AnalyticsEvent {
  event_type: "click" | "view" | "comparison" | "lead";
  product_id?: string;
  vertical_id?: string;
  page_url: string;
  metadata?: Record<string, unknown>;
}
