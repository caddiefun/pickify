import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { findProductBySlug } from "@/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = findProductBySlug(slug);

  if (!product) {
    // Product not found - redirect to home
    redirect("/");
  }

  // Use affiliate URL if available, otherwise use website URL
  const destinationUrl = product.affiliate_url || product.website_url;

  // Log click for analytics (can be expanded later)
  // TODO: Add click tracking to database
  console.log(`[Affiliate Click] Product: ${product.name}, URL: ${destinationUrl}`);

  // Redirect to the destination
  redirect(destinationUrl);
}
