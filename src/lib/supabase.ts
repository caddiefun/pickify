import { createClient } from "@supabase/supabase-js";
import type {
  Vertical,
  Product,
  Comparison,
  BestForPage,
  Lead,
  SponsoredPlacement,
} from "@/types";

// Initialize Supabase client
// These will be replaced with actual values from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export async function getVerticals(): Promise<Vertical[]> {
  const { data, error } = await supabase
    .from("verticals")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getVerticalBySlug(
  slug: string
): Promise<Vertical | null> {
  const { data, error } = await supabase
    .from("verticals")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getProductsByVertical(
  verticalId: string
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("vertical_id", verticalId)
    .order("overall_rating", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getProductBySlug(
  verticalSlug: string,
  productSlug: string
): Promise<Product | null> {
  const vertical = await getVerticalBySlug(verticalSlug);
  if (!vertical) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("vertical_id", vertical.id)
    .eq("slug", productSlug)
    .single();

  if (error) return null;
  return data;
}

export async function getComparison(
  verticalSlug: string,
  comparisonSlug: string
): Promise<(Comparison & { product_a: Product; product_b: Product }) | null> {
  const vertical = await getVerticalBySlug(verticalSlug);
  if (!vertical) return null;

  const { data, error } = await supabase
    .from("comparisons")
    .select(
      `
      *,
      product_a:products!product_a_id(*),
      product_b:products!product_b_id(*)
    `
    )
    .eq("vertical_id", vertical.id)
    .eq("slug", comparisonSlug)
    .single();

  if (error) return null;
  return data;
}

export async function getBestForPage(
  verticalSlug: string,
  usecase: string
): Promise<(BestForPage & { products: Product[] }) | null> {
  const vertical = await getVerticalBySlug(verticalSlug);
  if (!vertical) return null;

  const { data, error } = await supabase
    .from("best_for_pages")
    .select("*")
    .eq("vertical_id", vertical.id)
    .eq("slug", usecase)
    .single();

  if (error) return null;

  // Fetch the products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in("id", data.product_ids);

  return { ...data, products: products || [] };
}

export async function getSponsoredPlacements(
  pageUrl: string
): Promise<SponsoredPlacement[]> {
  const { data, error } = await supabase
    .from("sponsored_placements")
    .select("*")
    .eq("page_url", pageUrl)
    .eq("is_active", true)
    .lte("start_date", new Date().toISOString())
    .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`);

  if (error) return [];
  return data || [];
}

export async function createLead(
  lead: Omit<Lead, "id" | "created_at" | "updated_at">
): Promise<Lead | null> {
  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select()
    .single();

  if (error) return null;
  return data;
}

export async function trackAffiliateClick(
  productId: string,
  sourceUrl: string,
  destinationUrl: string
): Promise<void> {
  await supabase.from("affiliate_clicks").insert({
    product_id: productId,
    source_url: sourceUrl,
    destination_url: destinationUrl,
  });
}

// Generate all comparison slugs for a vertical (for static generation)
export async function getComparisonSlugs(
  verticalSlug: string
): Promise<string[]> {
  const vertical = await getVerticalBySlug(verticalSlug);
  if (!vertical) return [];

  const { data } = await supabase
    .from("comparisons")
    .select("slug")
    .eq("vertical_id", vertical.id);

  return data?.map((c) => c.slug) || [];
}

// Generate all best-for slugs for a vertical (for static generation)
export async function getBestForSlugs(verticalSlug: string): Promise<string[]> {
  const vertical = await getVerticalBySlug(verticalSlug);
  if (!vertical) return [];

  const { data } = await supabase
    .from("best_for_pages")
    .select("slug")
    .eq("vertical_id", vertical.id);

  return data?.map((b) => b.slug) || [];
}
