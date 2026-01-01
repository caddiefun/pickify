"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X, Minus, ExternalLink, Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product, ProductFeature } from "@/types";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";

interface ComparisonTableProps {
  products: Product[];
  verticalSlug: string;
  features?: {
    category: string;
    items: { name: string; key: string }[];
  }[];
  highlightWinner?: boolean;
  className?: string;
}

export function ComparisonTable({
  products,
  verticalSlug,
  features,
  highlightWinner = true,
  className,
}: ComparisonTableProps) {
  const winnerId = highlightWinner
    ? products.reduce((a, b) =>
        a.overall_rating > b.overall_rating ? a : b
      ).id
    : null;

  const renderFeatureValue = (value: string | boolean | number | undefined) => {
    if (value === true) {
      return <Check className="w-5 h-5 text-success mx-auto" />;
    }
    if (value === false) {
      return <X className="w-5 h-5 text-danger mx-auto" />;
    }
    if (value === undefined || value === null || value === "") {
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />;
    }
    return <span className="text-sm">{String(value)}</span>;
  };

  const getProductFeature = (product: Product, key: string) => {
    const feature = product.features?.find(
      (f) => f.name.toLowerCase().replace(/\s+/g, "_") === key.toLowerCase()
    );
    return feature?.value;
  };

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[200px] min-w-[200px]">Feature</TableHead>
            {products.map((product) => (
              <TableHead
                key={product.id}
                className={cn(
                  "text-center min-w-[180px]",
                  winnerId === product.id && "bg-success/5"
                )}
              >
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="relative">
                    {winnerId === product.id && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Trophy className="w-5 h-5 text-warning fill-warning" />
                      </div>
                    )}
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      {product.logo_url ? (
                        <Image
                          src={product.logo_url}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      ) : (
                        <span className="text-xl font-bold text-muted-foreground">
                          {product.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/${verticalSlug}/${product.slug}`}
                    className="font-semibold hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  {winnerId === product.id && (
                    <Badge className="bg-success text-success-foreground">
                      Winner
                    </Badge>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Overall Rating Row */}
          <TableRow className="bg-muted/50">
            <TableCell className="font-medium">Overall Rating</TableCell>
            {products.map((product) => (
              <TableCell
                key={product.id}
                className={cn(
                  "text-center",
                  winnerId === product.id && "bg-success/5"
                )}
              >
                <span className="text-2xl font-bold text-primary">
                  {product.overall_rating.toFixed(1)}
                </span>
                <span className="text-muted-foreground">/10</span>
              </TableCell>
            ))}
          </TableRow>

          {/* Pricing Row */}
          <TableRow>
            <TableCell className="font-medium">Starting Price</TableCell>
            {products.map((product) => (
              <TableCell
                key={product.id}
                className={cn(
                  "text-center",
                  winnerId === product.id && "bg-success/5"
                )}
              >
                <span className="font-semibold">{getStartingPrice(product)}</span>
              </TableCell>
            ))}
          </TableRow>

          {/* Feature Categories */}
          {features?.map((category) => (
            <>
              <TableRow key={category.category} className="bg-muted/30">
                <TableCell
                  colSpan={products.length + 1}
                  className="font-semibold text-sm uppercase tracking-wide text-muted-foreground"
                >
                  {category.category}
                </TableCell>
              </TableRow>
              {category.items.map((item) => (
                <TableRow key={item.key}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  {products.map((product) => (
                    <TableCell
                      key={product.id}
                      className={cn(
                        "text-center",
                        winnerId === product.id && "bg-success/5"
                      )}
                    >
                      {renderFeatureValue(getProductFeature(product, item.key))}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ))}

          {/* CTA Row */}
          <TableRow className="hover:bg-transparent border-t-2">
            <TableCell></TableCell>
            {products.map((product) => (
              <TableCell
                key={product.id}
                className={cn(
                  "text-center py-4",
                  winnerId === product.id && "bg-success/5"
                )}
              >
                <div className="flex flex-col gap-2">
                  <Button asChild className={winnerId === product.id ? "gradient-primary" : ""}>
                    <a
                      href={generateAffiliateLink(product, { campaign: "comparison-table" })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit {product.name}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/${verticalSlug}/${product.slug}`}>
                      Read Review
                    </Link>
                  </Button>
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
