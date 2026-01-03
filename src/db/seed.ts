import { config } from "dotenv";
config({ path: ".env.local" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { verticals, products } from "./schema";
import { verticals as verticalData } from "../data/verticals";
import { vpnProducts } from "../data/products/vpn";
import { hostingProducts } from "../data/products/hosting";
import { emailMarketingProducts } from "../data/products/email-marketing";
import { passwordManagerProducts } from "../data/products/password-managers";
import { projectManagementProducts } from "../data/products/project-management";
import { crmProducts } from "../data/products/crm";
import { websiteBuilderProducts } from "../data/products/website-builders";
import { onlineLearningProducts } from "../data/products/online-learning";
import { ispProducts } from "../data/products/isp";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

async function seed() {
  console.log("🌱 Seeding database...\n");

  // Clear existing data
  console.log("Clearing existing data...");
  await db.delete(products);
  await db.delete(verticals);

  // Insert verticals
  console.log("Inserting verticals...");
  const insertedVerticals = await db
    .insert(verticals)
    .values(
      verticalData.map((v) => ({
        slug: v.slug,
        name: v.name,
        description: v.description,
        metaTitle: v.meta_title,
        metaDescription: v.meta_description,
        icon: v.icon,
        color: v.color,
        isActive: v.is_active,
        sortOrder: v.sort_order,
      }))
    )
    .returning();

  console.log(`  ✓ Inserted ${insertedVerticals.length} verticals`);

  // Create slug -> id mapping
  const verticalMap = new Map(insertedVerticals.map((v) => [v.slug, v.id]));

  // Combine all products with their vertical slugs
  const allProducts = [
    ...vpnProducts.map((p) => ({ ...p, verticalSlug: "vpn" })),
    ...hostingProducts.map((p) => ({ ...p, verticalSlug: "hosting" })),
    ...emailMarketingProducts.map((p) => ({
      ...p,
      verticalSlug: "email-marketing",
    })),
    ...passwordManagerProducts.map((p) => ({
      ...p,
      verticalSlug: "password-managers",
    })),
    ...projectManagementProducts.map((p) => ({
      ...p,
      verticalSlug: "project-management",
    })),
    ...crmProducts.map((p) => ({ ...p, verticalSlug: "crm" })),
    ...websiteBuilderProducts.map((p) => ({
      ...p,
      verticalSlug: "website-builders",
    })),
    ...onlineLearningProducts.map((p) => ({
      ...p,
      verticalSlug: "online-learning",
    })),
    ...ispProducts.map((p) => ({ ...p, verticalSlug: "internet-providers" })),
  ];

  // Insert products
  console.log("Inserting products...");
  let insertedCount = 0;

  for (const product of allProducts) {
    const verticalId = verticalMap.get(product.verticalSlug);
    if (!verticalId) {
      console.warn(`  ⚠ Skipping ${product.name}: vertical not found`);
      continue;
    }

    await db.insert(products).values({
      verticalId,
      slug: product.slug,
      name: product.name,
      logoUrl: product.logo_url,
      websiteUrl: product.website_url,
      description: product.description,
      shortDescription: product.short_description,
      overallRating: product.overall_rating,
      pros: product.pros,
      cons: product.cons,
      features: product.features,
      pricing: product.pricing,
      isEditorsChoice: product.is_editors_choice,
      isFeatured: product.is_featured,
      affiliateUrl: product.affiliate_url,
      affiliateProgram: product.affiliate_program,
      commissionRate: product.commission_rate,
      metaTitle: product.meta_title,
      metaDescription: product.meta_description,
    });
    insertedCount++;
  }

  console.log(`  ✓ Inserted ${insertedCount} products`);

  console.log("\n✅ Seeding complete!");

  await client.end();
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
