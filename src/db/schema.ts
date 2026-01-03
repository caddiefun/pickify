import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  real,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const billingCycleEnum = pgEnum("billing_cycle", [
  "monthly",
  "yearly",
  "one-time",
  "custom",
]);

export const placementTypeEnum = pgEnum("placement_type", [
  "top_pick",
  "featured",
  "sidebar",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "sent",
  "demo_booked",
  "converted",
  "lost",
]);

export const eventTypeEnum = pgEnum("event_type", [
  "click",
  "view",
  "comparison",
  "lead",
]);

// Verticals table
export const verticals = pgTable("verticals", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  metaTitle: varchar("meta_title", { length: 255 }).notNull(),
  metaDescription: text("meta_description").notNull(),
  icon: varchar("icon", { length: 100 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Products table
export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  verticalId: uuid("vertical_id")
    .references(() => verticals.id, { onDelete: "cascade" })
    .notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url").notNull(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  overallRating: real("overall_rating").notNull(),
  pros: jsonb("pros").$type<string[]>().default([]).notNull(),
  cons: jsonb("cons").$type<string[]>().default([]).notNull(),
  features: jsonb("features")
    .$type<{ name: string; value: string | boolean | number; category?: string }[]>()
    .default([])
    .notNull(),
  pricing: jsonb("pricing")
    .$type<
      {
        plan_name: string;
        price: number;
        billing_cycle: string;
        features: string[];
        is_popular?: boolean;
        cta_text?: string;
      }[]
    >()
    .default([])
    .notNull(),
  isEditorsChoice: boolean("is_editors_choice").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  affiliateUrl: text("affiliate_url"),
  affiliateProgram: varchar("affiliate_program", { length: 100 }),
  commissionRate: varchar("commission_rate", { length: 50 }),
  metaTitle: varchar("meta_title", { length: 255 }).notNull(),
  metaDescription: text("meta_description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Comparisons table
export const comparisons = pgTable("comparisons", {
  id: uuid("id").primaryKey().defaultRandom(),
  verticalId: uuid("vertical_id")
    .references(() => verticals.id, { onDelete: "cascade" })
    .notNull(),
  productAId: uuid("product_a_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  productBId: uuid("product_b_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  metaTitle: varchar("meta_title", { length: 255 }).notNull(),
  metaDescription: text("meta_description").notNull(),
  introduction: text("introduction").notNull(),
  conclusion: text("conclusion").notNull(),
  winnerId: uuid("winner_id").references(() => products.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Best For Pages table
export const bestForPages = pgTable("best_for_pages", {
  id: uuid("id").primaryKey().defaultRandom(),
  verticalId: uuid("vertical_id")
    .references(() => verticals.id, { onDelete: "cascade" })
    .notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  usecase: varchar("usecase", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  metaTitle: varchar("meta_title", { length: 255 }).notNull(),
  metaDescription: text("meta_description").notNull(),
  introduction: text("introduction").notNull(),
  productIds: jsonb("product_ids").$type<string[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Sponsored Placements table
export const sponsoredPlacements = pgTable("sponsored_placements", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  pageUrl: text("page_url").notNull(),
  placementType: placementTypeEnum("placement_type").notNull(),
  monthlyRate: real("monthly_rate").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").default(true).notNull(),
  isDisclosed: boolean("is_disclosed").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Leads table
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  status: leadStatusEnum("status").default("new").notNull(),
  payoutAmount: real("payout_amount"),
  sourceUrl: text("source_url").notNull(),
  utmSource: varchar("utm_source", { length: 100 }),
  utmMedium: varchar("utm_medium", { length: 100 }),
  utmCampaign: varchar("utm_campaign", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Affiliate Clicks table
export const affiliateClicks = pgTable("affiliate_clicks", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  sourceUrl: text("source_url").notNull(),
  destinationUrl: text("destination_url").notNull(),
  userAgent: text("user_agent"),
  ipHash: varchar("ip_hash", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Analytics Events table
export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventType: eventTypeEnum("event_type").notNull(),
  productId: uuid("product_id").references(() => products.id),
  verticalId: uuid("vertical_id").references(() => verticals.id),
  pageUrl: text("page_url").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Type exports for use in application
export type Vertical = typeof verticals.$inferSelect;
export type NewVertical = typeof verticals.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Comparison = typeof comparisons.$inferSelect;
export type NewComparison = typeof comparisons.$inferInsert;
export type BestForPage = typeof bestForPages.$inferSelect;
export type NewBestForPage = typeof bestForPages.$inferInsert;
export type SponsoredPlacement = typeof sponsoredPlacements.$inferSelect;
export type NewSponsoredPlacement = typeof sponsoredPlacements.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type AffiliateClick = typeof affiliateClicks.$inferSelect;
export type NewAffiliateClick = typeof affiliateClicks.$inferInsert;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvent = typeof analyticsEvents.$inferInsert;
