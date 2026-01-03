"use client";

import { Plus, Minus, RefreshCw, Expand, Shrink, Calendar, ExternalLink } from "lucide-react";
import {
  getProductChangelog,
  getRecentChanges,
  type FeatureChange,
} from "@/data/tracking/feature-changelog";

interface FeatureChangelogProps {
  productSlug?: string;
  limit?: number;
  showAll?: boolean;
  className?: string;
}

/**
 * FeatureChangelog component for displaying product updates.
 *
 * Features:
 * - Timeline of feature additions, removals, modifications
 * - Category grouping (feature, pricing, coverage, etc.)
 * - AI-citable change descriptions
 * - Source verification links
 */
export function FeatureChangelog({
  productSlug,
  limit = 5,
  showAll = false,
  className = "",
}: FeatureChangelogProps) {
  const changes = productSlug
    ? getProductChangelog(productSlug)
    : getRecentChanges(180);

  const displayChanges = showAll ? changes : changes.slice(0, limit);

  if (displayChanges.length === 0) {
    return null;
  }

  const productName = displayChanges[0]?.product_name;

  return (
    <div className={`bg-card border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">
          {productSlug ? `${productName} Updates` : "Recent Product Updates"}
        </h3>
        <span className="text-xs text-muted-foreground">
          {displayChanges.length} change{displayChanges.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-4">
        {displayChanges.map((change) => (
          <ChangelogItem key={change.id} change={change} showProductName={!productSlug} />
        ))}
      </div>

      {!showAll && changes.length > limit && (
        <div className="mt-4 pt-4 border-t text-center">
          <span className="text-sm text-muted-foreground">
            +{changes.length - limit} more updates
          </span>
        </div>
      )}

      {/* Data source attribution */}
      <div className="mt-4 pt-4 border-t flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="w-3 h-3" />
        <span>Pickify Feature Tracking • Updates verified manually</span>
      </div>
    </div>
  );
}

/**
 * Individual changelog item
 */
function ChangelogItem({
  change,
  showProductName = false,
}: {
  change: FeatureChange;
  showProductName?: boolean;
}) {
  const date = new Date(change.change_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex gap-3">
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <ChangeTypeIcon type={change.change_type} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {showProductName && (
            <span className="font-medium text-foreground">{change.product_name}</span>
          )}
          <ChangeTypeBadge type={change.change_type} />
          <CategoryBadge category={change.category} />
        </div>

        <p className="text-sm text-foreground mt-1">{change.description}</p>

        {/* Old/New values */}
        {change.old_value && change.new_value && (
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="text-muted-foreground line-through">{change.old_value}</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-success font-medium">{change.new_value}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span>{date}</span>
          {change.verified && (
            <span className="text-success">✓ Verified</span>
          )}
          {change.source_url && (
            <a
              href={change.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-primary"
            >
              Source <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Icon for change type
 */
function ChangeTypeIcon({ type }: { type: FeatureChange["change_type"] }) {
  const iconClass = "w-5 h-5";

  switch (type) {
    case "added":
      return (
        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
          <Plus className={`${iconClass} text-success`} />
        </div>
      );
    case "removed":
      return (
        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
          <Minus className={`${iconClass} text-destructive`} />
        </div>
      );
    case "modified":
      return (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <RefreshCw className={`${iconClass} text-primary`} />
        </div>
      );
    case "expanded":
      return (
        <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
          <Expand className={`${iconClass} text-success`} />
        </div>
      );
    case "limited":
      return (
        <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
          <Shrink className={`${iconClass} text-warning`} />
        </div>
      );
  }
}

/**
 * Badge for change type
 */
function ChangeTypeBadge({ type }: { type: FeatureChange["change_type"] }) {
  const baseClass = "px-2 py-0.5 rounded text-xs font-medium";

  switch (type) {
    case "added":
      return <span className={`${baseClass} bg-success/10 text-success`}>Added</span>;
    case "removed":
      return <span className={`${baseClass} bg-destructive/10 text-destructive`}>Removed</span>;
    case "modified":
      return <span className={`${baseClass} bg-primary/10 text-primary`}>Updated</span>;
    case "expanded":
      return <span className={`${baseClass} bg-success/10 text-success`}>Expanded</span>;
    case "limited":
      return <span className={`${baseClass} bg-warning/10 text-warning`}>Limited</span>;
  }
}

/**
 * Badge for category
 */
function CategoryBadge({ category }: { category: FeatureChange["category"] }) {
  return (
    <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground capitalize">
      {category}
    </span>
  );
}

/**
 * Compact changelog for product cards
 */
export function RecentChangeBadge({ productSlug }: { productSlug: string }) {
  const changes = getProductChangelog(productSlug);
  const recentChange = changes[0];

  if (!recentChange) return null;

  // Only show if within last 90 days
  const daysSinceChange = Math.floor(
    (Date.now() - new Date(recentChange.change_date).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceChange > 90) return null;

  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">
      <RefreshCw className="w-3 h-3" />
      <span>Updated {daysSinceChange}d ago</span>
    </div>
  );
}
