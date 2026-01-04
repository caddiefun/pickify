import Link from "next/link";
import { ArrowRight, Award, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingCircle } from "./rating-bar";
import { ProductLogo } from "./product-logo";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";

interface TopPick {
  vertical: {
    slug: string;
    name: string;
    color: string;
  };
  product: Product;
}

interface TopPicksTableProps {
  picks: TopPick[];
  className?: string;
}

export function TopPicksTable({ picks, className }: TopPicksTableProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">
              <Award className="w-3 h-3 mr-1" />
              Editor's Choice
            </Badge>
            <CardTitle className="text-xl">Top Picks by Category</CardTitle>
          </div>
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <Link href="/categories">
              All Categories
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {picks.map(({ vertical, product }) => {
            const affiliateLink = generateAffiliateLink(product, {
              campaign: "top-picks-table",
              placement: "homepage",
            });

            return (
              <div
                key={vertical.slug}
                className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-muted/50 transition-colors"
              >
                {/* Category Label */}
                <div className="w-28 sm:w-36 flex-shrink-0">
                  <Link
                    href={`/${vertical.slug}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                    style={{ color: vertical.color }}
                  >
                    {vertical.name}
                  </Link>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <ProductLogo
                    name={product.name}
                    logoUrl={product.logo_url}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/${vertical.slug}/${product.slug}`}
                      className="font-semibold hover:text-primary transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground truncate hidden sm:block">
                      {product.short_description}
                    </p>
                  </div>
                </div>

                {/* Rating & Price - Hidden on small screens */}
                <div className="hidden md:flex items-center gap-4">
                  <RatingCircle score={product.overall_rating} size="sm" />
                  <div className="w-20 text-right">
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="font-semibold text-primary text-sm">
                      {getStartingPrice(product)}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <Button size="sm" asChild className="hidden sm:inline-flex">
                    <a
                      href={affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" asChild className="sm:hidden h-8 w-8">
                    <Link href={`/${vertical.slug}/${product.slug}`}>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t bg-muted/30 sm:hidden">
          <Button variant="outline" size="sm" asChild className="w-full">
            <Link href="/categories">
              View All Categories
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
