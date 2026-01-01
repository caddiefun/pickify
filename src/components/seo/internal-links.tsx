import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
  verticalSlug: string;
  currentProductId?: string;
  title?: string;
  maxItems?: number;
}

export function RelatedProducts({
  products,
  verticalSlug,
  currentProductId,
  title = "Related Products",
  maxItems = 4,
}: RelatedProductsProps) {
  const filteredProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, maxItems);

  if (filteredProducts.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link
                href={`/${verticalSlug}/${product.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {product.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.overall_rating.toFixed(1)}/10
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface RelatedComparisonsProps {
  product: Product;
  allProducts: Product[];
  verticalSlug: string;
  maxItems?: number;
}

export function RelatedComparisons({
  product,
  allProducts,
  verticalSlug,
  maxItems = 4,
}: RelatedComparisonsProps) {
  const comparisons = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, maxItems)
    .map((otherProduct) => ({
      slug: `${product.slug}-vs-${otherProduct.slug}`,
      title: `${product.name} vs ${otherProduct.name}`,
      otherProduct,
    }));

  if (comparisons.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Compare {product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {comparisons.map((comparison) => (
            <li key={comparison.slug}>
              <Link
                href={`/${verticalSlug}/compare/${comparison.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
              >
                <span className="text-sm group-hover:text-primary transition-colors">
                  {comparison.title}
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface BestForLinksProps {
  verticalSlug: string;
  bestForConfigs: { slug: string; title: string; description: string }[];
  currentSlug?: string;
}

export function BestForLinks({
  verticalSlug,
  bestForConfigs,
  currentSlug,
}: BestForLinksProps) {
  const filteredConfigs = bestForConfigs.filter((c) => c.slug !== currentSlug);

  if (filteredConfigs.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Find the Best For Your Needs</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {filteredConfigs.map((config) => (
            <li key={config.slug}>
              <Link
                href={`/${verticalSlug}/best-for/${config.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
              >
                <div>
                  <span className="font-medium group-hover:text-primary transition-colors block">
                    {config.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {config.description}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface CrossVerticalLinksProps {
  currentVerticalSlug: string;
  verticals: { slug: string; name: string; description: string }[];
  maxItems?: number;
}

export function CrossVerticalLinks({
  currentVerticalSlug,
  verticals,
  maxItems = 4,
}: CrossVerticalLinksProps) {
  const otherVerticals = verticals
    .filter((v) => v.slug !== currentVerticalSlug)
    .slice(0, maxItems);

  if (otherVerticals.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Explore Other Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {otherVerticals.map((vertical) => (
            <li key={vertical.slug}>
              <Link
                href={`/${vertical.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors group"
              >
                <div>
                  <span className="font-medium group-hover:text-primary transition-colors block">
                    Best {vertical.name}
                  </span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {vertical.description}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Inline contextual links for content
interface ContextualLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ContextualLink({ href, children }: ContextualLinkProps) {
  return (
    <Link
      href={href}
      className="text-primary hover:underline font-medium"
    >
      {children}
    </Link>
  );
}
