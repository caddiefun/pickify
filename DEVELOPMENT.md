# Pickify Development Status

> Multi-Vertical Comparison Aggregator
> Last Updated: December 2025

---

## Project Overview

Pickify is a comparison aggregator designed to capture high-intent search traffic through programmatic SEO. The platform generates comparison and review pages across multiple software verticals with three revenue streams: affiliate commissions, sponsorships, and pay-per-lead.

**Repository:** https://github.com/caddiefun/pickify

---

## What's Done

### Core Application

| Component | Status | Notes |
|-----------|--------|-------|
| Next.js 14 Setup | ✅ Complete | App Router, TypeScript, Tailwind CSS |
| Brand Styling | ✅ Complete | Custom colors, Inter font, shadcn/ui |
| Homepage | ✅ Complete | Hero, category grid, featured products, CTA |
| Layout Components | ✅ Complete | Header with mega menu, Footer with disclosure |

### Page Templates

| Page Type | Status | Route Pattern |
|-----------|--------|---------------|
| Vertical Hub | ✅ Complete | `/{vertical}/` |
| Product Review | ✅ Complete | `/{vertical}/{product}/` |
| Comparison (A vs B) | ✅ Complete | `/{vertical}/compare/{a}-vs-{b}/` |
| Best-For Pages | ✅ Complete | `/{vertical}/best-for/{usecase}/` |

### Components Built

| Component | Location | Purpose |
|-----------|----------|---------|
| Header | `src/components/layout/header.tsx` | Navigation with mega menu |
| Footer | `src/components/layout/footer.tsx` | Links + FTC disclosure |
| ProductCard | `src/components/comparison/product-card.tsx` | Product display (3 variants) |
| ComparisonTable | `src/components/comparison/comparison-table.tsx` | Side-by-side features |
| RatingBar/Circle | `src/components/comparison/rating-bar.tsx` | Visual ratings |
| ProsConsList | `src/components/comparison/pros-cons-list.tsx` | Pros/cons display |
| DisclosureBanner | `src/components/comparison/disclosure-banner.tsx` | FTC compliance |

### Data & Types

| File | Purpose |
|------|---------|
| `src/types/index.ts` | TypeScript interfaces for all entities |
| `src/data/verticals.ts` | 8 vertical categories defined |
| `src/data/products/vpn.ts` | 6 sample VPN products with full data |
| `src/lib/supabase.ts` | Database client (needs credentials) |
| `src/lib/affiliate.ts` | Link tracking utilities |

### Static Generation

- **38 pages** generated at build time
- All VPN products, comparisons, and best-for pages
- Ready for ISR when database is connected

---

## What's Still Needed

### Priority 1: Infrastructure Setup

#### Supabase Database
- [ ] Create Supabase project
- [ ] Run database migrations (schema in `src/types/index.ts`)
- [ ] Add credentials to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
  ```

#### Railway Deployment
- [ ] Create Railway project
- [ ] Connect GitHub repo
- [ ] Add environment variables
- [ ] Deploy

### Priority 2: Database Schema

Create these tables in Supabase:

```sql
-- Verticals
CREATE TABLE verticals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  meta_title TEXT,
  meta_description TEXT,
  icon TEXT,
  color TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vertical_id UUID REFERENCES verticals(id),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  overall_rating DECIMAL(3,2),
  pros JSONB DEFAULT '[]',
  cons JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  pricing JSONB DEFAULT '[]',
  is_editors_choice BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  affiliate_url TEXT,
  affiliate_program TEXT,
  commission_rate TEXT,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(vertical_id, slug)
);

-- Sponsored Placements
CREATE TABLE sponsored_placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  page_url TEXT NOT NULL,
  placement_type TEXT CHECK (placement_type IN ('top_pick', 'featured', 'sidebar')),
  monthly_rate DECIMAL(10,2),
  start_date DATE NOT NULL,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  is_disclosed BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  email TEXT NOT NULL,
  company TEXT,
  name TEXT,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'sent', 'demo_booked', 'converted', 'lost')),
  payout_amount DECIMAL(10,2),
  source_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Affiliate Clicks (for tracking)
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  source_url TEXT,
  destination_url TEXT,
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Priority 3: Content & Data

- [ ] Seed database with VPN products (data exists in `src/data/products/vpn.ts`)
- [ ] Add Web Hosting products
- [ ] Add Email Marketing products
- [ ] Write long-form review content (3-4K words each)
- [ ] Add product logos/images

### Priority 4: Features

- [ ] Dynamic sitemap generation (`src/app/sitemap.ts`)
- [ ] Search functionality
- [ ] Filtering on vertical pages
- [ ] Lead capture forms
- [ ] API route for affiliate click tracking (`/go/[product]`)

### Priority 5: Analytics & Monetization

- [ ] Plausible Analytics setup
- [ ] PostHog for conversion funnels
- [ ] Apply to affiliate programs:
  - NordVPN (Impact)
  - ExpressVPN (In-house)
  - Surfshark (In-house)
  - Bluehost, WP Engine (hosting)
  - ConvertKit, Klaviyo (email)

### Priority 6: SEO & Launch

- [ ] Schema markup (Product, Review, FAQ)
- [ ] robots.txt configuration
- [ ] Google Search Console setup
- [ ] Submit sitemap
- [ ] About page
- [ ] Methodology page
- [ ] Privacy Policy
- [ ] Terms of Service

---

## Project Structure

```
pickify/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Homepage
│   │   ├── layout.tsx                  # Root layout
│   │   ├── globals.css                 # Brand colors & styles
│   │   └── [vertical]/
│   │       ├── page.tsx                # Vertical hub
│   │       ├── [product]/page.tsx      # Product review
│   │       ├── compare/[slug]/page.tsx # A vs B comparison
│   │       └── best-for/[usecase]/page.tsx
│   ├── components/
│   │   ├── ui/                         # shadcn components
│   │   ├── layout/                     # Header, Footer
│   │   ├── comparison/                 # ProductCard, Table, etc.
│   │   └── providers.tsx               # TanStack Query
│   ├── data/                           # Static data (temporary)
│   ├── lib/
│   │   ├── utils.ts                    # shadcn utilities
│   │   ├── supabase.ts                 # Database client
│   │   └── affiliate.ts                # Link tracking
│   └── types/
│       └── index.ts                    # TypeScript interfaces
├── .env.example                        # Environment template
├── .env.local                          # Local credentials (gitignored)
└── package.json
```

---

## Running Locally

```bash
cd ~/Desktop/pickify
npm install
npm run dev
```

Open http://localhost:3000

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | No | Production URL |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Plausible domain |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog API key |

---

## Revenue Model Reference

| Stream | Rate | When to Use |
|--------|------|-------------|
| Affiliate | $25-500/sale | Default for all products |
| Sponsorship | $500-2000/mo | Pages with 2K+ monthly visits |
| Pay-Per-Lead | $150-300/demo | Established sponsor relationships |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui |
| Data Fetching | TanStack Query |
| Database | Supabase (PostgreSQL) |
| Hosting | Railway |
| Analytics | Plausible + PostHog |

---

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```
