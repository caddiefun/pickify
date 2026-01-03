# Database Seeding

Seed the Pickify database with product data from the static data files.

## Prerequisites

- Database schema must be pushed (`npm run db:push`)
- `.env.local` must have valid `DATABASE_URL`

## Data Sources

Static data is located in `src/data/`:

```
src/data/
├── verticals.ts          # Product categories (VPN, Hosting, etc.)
├── products/
│   ├── vpn.ts            # VPN products
│   ├── hosting.ts        # Web hosting products
│   ├── email-marketing.ts
│   ├── password-managers.ts
│   ├── project-management.ts
│   ├── crm.ts
│   ├── website-builders.ts
│   ├── online-learning.ts
│   └── isp.ts            # Internet service providers
└── editorial/
    └── index.ts          # Reviews and editorial content
```

## Seed Script Location

Create seed script at: `src/db/seed.ts`

## Seed Script Structure

```typescript
import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import { verticals, products } from "./schema";
import { verticals as verticalData } from "../data/verticals";
import { vpnProducts } from "../data/products/vpn";
import { hostingProducts } from "../data/products/hosting";
// ... import other product data

async function seed() {
  console.log("Seeding database...");

  // Clear existing data (optional)
  await db.delete(products);
  await db.delete(verticals);

  // Insert verticals
  const insertedVerticals = await db.insert(verticals).values(
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
  ).returning();

  // Create slug -> id mapping
  const verticalMap = new Map(
    insertedVerticals.map((v) => [v.slug, v.id])
  );

  // Insert products for each vertical
  const allProducts = [
    ...vpnProducts.map((p) => ({ ...p, verticalSlug: "vpn" })),
    ...hostingProducts.map((p) => ({ ...p, verticalSlug: "hosting" })),
    // ... add other products
  ];

  for (const product of allProducts) {
    await db.insert(products).values({
      verticalId: verticalMap.get(product.verticalSlug)!,
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
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
```

## Running the Seed

Add to `package.json` scripts:

```json
"db:seed": "npx tsx src/db/seed.ts"
```

Then run:

```bash
npm run db:seed
```

## Field Mapping

Static data uses snake_case, Drizzle schema uses camelCase:

| Static Data Field | Drizzle Field |
|-------------------|---------------|
| `meta_title` | `metaTitle` |
| `meta_description` | `metaDescription` |
| `is_active` | `isActive` |
| `sort_order` | `sortOrder` |
| `vertical_id` | `verticalId` |
| `logo_url` | `logoUrl` |
| `website_url` | `websiteUrl` |
| `short_description` | `shortDescription` |
| `overall_rating` | `overallRating` |
| `is_editors_choice` | `isEditorsChoice` |
| `is_featured` | `isFeatured` |
| `affiliate_url` | `affiliateUrl` |
| `affiliate_program` | `affiliateProgram` |
| `commission_rate` | `commissionRate` |

## Notes

- The seed script generates new UUIDs for all records
- Old static IDs (like "vpn-1", "1") are replaced with proper UUIDs
- Run `npm run db:studio` to verify data was inserted correctly
