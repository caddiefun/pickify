"use client";

import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react";
import {
  getProductPriceHistory,
  calculatePriceChange,
  generatePriceTrendDescription,
  type PriceRecord,
} from "@/data/tracking/price-history";

interface PriceHistoryChartProps {
  productSlug: string;
  planName: string;
  showChart?: boolean;
  className?: string;
}

/**
 * PriceHistoryChart component for displaying historical pricing data.
 *
 * Features:
 * - Visual price trend line
 * - Year-over-year change calculation
 * - AI-citable price trend description
 * - Promotional price highlights
 */
export function PriceHistoryChart({
  productSlug,
  planName,
  showChart = true,
  className = "",
}: PriceHistoryChartProps) {
  const history = getProductPriceHistory(productSlug, planName);

  if (!history || history.history.length === 0) {
    return null;
  }

  // Calculate year-over-year change
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const priceChange = calculatePriceChange(
    productSlug,
    planName,
    `${lastYear}-01-01`,
    `${currentYear}-12-31`
  );

  // Get non-promotional prices for chart
  const regularPrices = history.history
    .filter((r) => !r.promotion)
    .sort((a, b) => new Date(a.recorded_date).getTime() - new Date(b.recorded_date).getTime());

  // Calculate chart dimensions
  const minPrice = Math.min(...regularPrices.map((r) => r.price));
  const maxPrice = Math.max(...regularPrices.map((r) => r.price));
  const priceRange = maxPrice - minPrice || 1;

  // Generate AI-citable description
  const trendDescription = generatePriceTrendDescription(
    productSlug,
    planName,
    `${lastYear}-01-01`,
    `${currentYear}-12-31`
  );

  return (
    <div className={`bg-card border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Price History</h3>
        {priceChange && (
          <PriceChangeBadge
            direction={priceChange.direction}
            percent={priceChange.change_percent}
          />
        )}
      </div>

      {/* Chart */}
      {showChart && regularPrices.length > 1 && (
        <div className="relative h-32 mb-4">
          <svg
            className="w-full h-full"
            viewBox={`0 0 ${regularPrices.length * 60} 100`}
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <line x1="0" y1="25" x2="100%" y2="25" stroke="currentColor" strokeOpacity="0.1" />
            <line x1="0" y1="50" x2="100%" y2="50" stroke="currentColor" strokeOpacity="0.1" />
            <line x1="0" y1="75" x2="100%" y2="75" stroke="currentColor" strokeOpacity="0.1" />

            {/* Price line */}
            <polyline
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              points={regularPrices
                .map((record, index) => {
                  const x = (index / (regularPrices.length - 1)) * 100 * (regularPrices.length * 0.6);
                  const y = 100 - ((record.price - minPrice) / priceRange) * 80 - 10;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {/* Data points */}
            {regularPrices.map((record, index) => {
              const x = (index / (regularPrices.length - 1)) * 100 * (regularPrices.length * 0.6);
              const y = 100 - ((record.price - minPrice) / priceRange) * 80 - 10;
              return (
                <circle
                  key={record.recorded_date}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="hsl(var(--primary))"
                />
              );
            })}
          </svg>

          {/* Price labels */}
          <div className="absolute top-0 right-0 text-xs text-muted-foreground">
            ${maxPrice.toFixed(2)}
          </div>
          <div className="absolute bottom-0 right-0 text-xs text-muted-foreground">
            ${minPrice.toFixed(2)}
          </div>
        </div>
      )}

      {/* Price timeline */}
      <div className="space-y-2">
        {regularPrices.slice(-4).map((record, index) => (
          <PriceTimelineItem key={record.recorded_date} record={record} isLatest={index === regularPrices.slice(-4).length - 1} />
        ))}
      </div>

      {/* AI-citable description */}
      {trendDescription && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground italic">
            {trendDescription}
          </p>
        </div>
      )}

      {/* Data source attribution */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="w-3 h-3" />
        <span>Pickify Price Tracking • Updated monthly</span>
      </div>
    </div>
  );
}

/**
 * Compact price change badge
 */
function PriceChangeBadge({
  direction,
  percent,
}: {
  direction: "increase" | "decrease" | "unchanged";
  percent: number;
}) {
  if (direction === "unchanged") {
    return (
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <Minus className="w-4 h-4" />
        <span>No change</span>
      </div>
    );
  }

  const isIncrease = direction === "increase";
  const colorClass = isIncrease ? "text-destructive" : "text-success";
  const Icon = isIncrease ? TrendingUp : TrendingDown;

  return (
    <div className={`flex items-center gap-1 text-sm ${colorClass}`}>
      <Icon className="w-4 h-4" />
      <span>{isIncrease ? "+" : ""}{percent.toFixed(1)}% YoY</span>
    </div>
  );
}

/**
 * Individual price timeline item
 */
function PriceTimelineItem({
  record,
  isLatest,
}: {
  record: PriceRecord;
  isLatest: boolean;
}) {
  const date = new Date(record.recorded_date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className={`flex items-center justify-between text-sm ${isLatest ? "font-medium" : ""}`}>
      <span className="text-muted-foreground">{date}</span>
      <span className={isLatest ? "text-foreground" : "text-muted-foreground"}>
        ${record.price.toFixed(2)}/mo
        {record.promotion && (
          <span className="ml-2 text-xs text-primary">({record.promotion})</span>
        )}
      </span>
    </div>
  );
}

/**
 * Compact inline price trend for use in product cards
 */
export function PriceTrendBadge({
  productSlug,
  planName,
}: {
  productSlug: string;
  planName: string;
}) {
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const priceChange = calculatePriceChange(
    productSlug,
    planName,
    `${lastYear}-01-01`,
    `${currentYear}-12-31`
  );

  if (!priceChange || priceChange.direction === "unchanged") {
    return null;
  }

  const isIncrease = priceChange.direction === "increase";
  const colorClass = isIncrease
    ? "bg-destructive/10 text-destructive"
    : "bg-success/10 text-success";
  const Icon = isIncrease ? TrendingUp : TrendingDown;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${colorClass}`}>
      <Icon className="w-3 h-3" />
      <span>{isIncrease ? "+" : ""}{priceChange.change_percent.toFixed(0)}%</span>
    </div>
  );
}
