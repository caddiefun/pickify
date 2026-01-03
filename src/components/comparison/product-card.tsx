"use client";

import Link from "next/link";
import { ExternalLink, Check, X, Award, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RatingCircle, RatingBar } from "./rating-bar";
import { ProductLogo } from "./product-logo";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";

interface ProductCardProps {
  product: Product;
  rank?: number;
  isSponsored?: boolean;
  verticalSlug: string;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function ProductCard({
  product,
  rank,
  isSponsored = false,
  verticalSlug,
  variant = "default",
  className,
}: ProductCardProps) {
  const affiliateLink = generateAffiliateLink(product, {
    campaign: "product-card",
    placement: variant,
  });

  if (variant === "compact") {
    return (
      <Card className={cn("hover:shadow-md transition-shadow", className)}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {rank && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">#{rank}</span>
                </div>
              )}
              <ProductLogo name={product.name} logoUrl={product.logo_url} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/${verticalSlug}/${product.slug}`}
                    className="font-semibold hover:text-primary truncate"
                  >
                    {product.name}
                  </Link>
                  {product.is_editors_choice && (
                    <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Top Pick
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {product.short_description}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0">
              <RatingCircle score={product.overall_rating} size="sm" />
              <Button asChild size="sm">
                <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                  Visit
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card
        className={cn(
          "relative overflow-hidden border-2 border-primary shadow-glow",
          className
        )}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-dark" />
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {rank && (
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-lg font-bold text-white">#{rank}</span>
                </div>
              )}
              <ProductLogo name={product.name} logoUrl={product.logo_url} size="lg" className="rounded-xl" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <Badge className="bg-success text-success-foreground">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Editor's Choice
                  </Badge>
                </div>
                <p className="text-muted-foreground">{product.short_description}</p>
              </div>
            </div>
            <RatingCircle score={product.overall_rating} size="lg" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSponsored && (
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
              Sponsored
            </Badge>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Pros</h4>
              <ul className="space-y-1">
                {product.pros.slice(0, 4).map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Cons</h4>
              <ul className="space-y-1">
                {product.cons.slice(0, 4).map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <X className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-primary">{getStartingPrice(product)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline" asChild className="w-full sm:w-auto">
                <Link href={`/${verticalSlug}/${product.slug}`}>Read Review</Link>
              </Button>
              <Button asChild className="gradient-primary w-full sm:w-auto">
                <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
                  Visit {product.name}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {rank && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">#{rank}</span>
              </div>
            )}
            <ProductLogo name={product.name} logoUrl={product.logo_url} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/${verticalSlug}/${product.slug}`}
                  className="font-semibold text-lg hover:text-primary"
                >
                  {product.name}
                </Link>
                {product.is_editors_choice && (
                  <Badge className="bg-success/10 text-success text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Top Pick
                  </Badge>
                )}
                {isSponsored && (
                  <Badge variant="outline" className="text-warning border-warning/30 text-xs">
                    Sponsored
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{product.short_description}</p>
            </div>
          </div>
          <RatingCircle score={product.overall_rating} size="md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <RatingBar score={product.overall_rating} showLabel />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <ul className="space-y-1">
              {product.pros.slice(0, 3).map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2 sm:line-clamp-1">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-1">
              {product.cons.slice(0, 3).map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2 sm:line-clamp-1">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="font-bold text-primary">{getStartingPrice(product)}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/${verticalSlug}/${product.slug}`}>Details</Link>
          </Button>
          <Button size="sm" asChild>
            <a href={affiliateLink} target="_blank" rel="noopener noreferrer">
              Visit Site
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
