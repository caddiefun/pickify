"use client";

import { Calendar, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatLastUpdated, isRecentlyUpdated } from "@/lib/utils";

interface LastUpdatedBadgeProps {
  date: string;
  variant?: "badge" | "inline";
  showIcon?: boolean;
  className?: string;
}

export function LastUpdatedBadge({
  date,
  variant = "badge",
  showIcon = true,
  className = "",
}: LastUpdatedBadgeProps) {
  const formattedDate = formatLastUpdated(date);
  const isRecent = isRecentlyUpdated(date, 30);

  if (variant === "inline") {
    return (
      <span
        className={`inline-flex items-center gap-1 text-sm text-muted-foreground ${className}`}
        title="Our reviews are regularly updated to ensure accuracy"
      >
        {showIcon && <Calendar className="w-4 h-4" />}
        Updated {formattedDate}
        {isRecent && (
          <RefreshCw className="w-3 h-3 text-success ml-1" />
        )}
      </span>
    );
  }

  return (
    <Badge
      variant="secondary"
      className={`inline-flex items-center gap-1.5 ${className}`}
      title="Our reviews are regularly updated to ensure accuracy"
    >
      {showIcon && <RefreshCw className="w-3 h-3" />}
      Updated {formattedDate}
      {isRecent && (
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
      )}
    </Badge>
  );
}
