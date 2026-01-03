"use client";

import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReviewSource } from "@/types";

interface ReviewBadgesProps {
  sources: ReviewSource[];
  variant?: "default" | "compact" | "inline";
  className?: string;
}

const sourceLogos: Record<string, string> = {
  "G2": "https://www.g2.com/favicon.ico",
  "Capterra": "https://www.capterra.com/favicon.ico",
  "Trustpilot": "https://www.trustpilot.com/favicon.ico",
  "TrustRadius": "https://www.trustradius.com/favicon.ico",
  "Google": "https://www.google.com/favicon.ico",
  "AV-TEST": "https://www.av-test.org/favicon.ico",
  "AV-Comparatives": "https://www.av-comparatives.org/favicon.ico",
  "PCMag": "https://www.pcmag.com/favicon.ico",
  "TechRadar": "https://www.techradar.com/favicon.ico",
  "CNET": "https://www.cnet.com/favicon.ico",
};

const sourceColors: Record<string, string> = {
  "G2": "bg-[#FF492C]/10 text-[#FF492C] border-[#FF492C]/20",
  "Capterra": "bg-[#044D80]/10 text-[#044D80] border-[#044D80]/20",
  "Trustpilot": "bg-[#00B67A]/10 text-[#00B67A] border-[#00B67A]/20",
  "TrustRadius": "bg-[#00A3E0]/10 text-[#00A3E0] border-[#00A3E0]/20",
  "Google": "bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/20",
  "AV-TEST": "bg-[#003366]/10 text-[#003366] border-[#003366]/20",
  "AV-Comparatives": "bg-[#E31837]/10 text-[#E31837] border-[#E31837]/20",
  "PCMag": "bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/20",
  "TechRadar": "bg-[#FF0066]/10 text-[#FF0066] border-[#FF0066]/20",
  "CNET": "bg-[#E00707]/10 text-[#E00707] border-[#E00707]/20",
};

function formatRating(rating: number, maxRating: number): string {
  if (maxRating === 5) {
    return rating.toFixed(1);
  }
  if (maxRating === 10) {
    return rating.toFixed(1);
  }
  if (maxRating === 100) {
    return `${Math.round(rating)}%`;
  }
  return `${rating}/${maxRating}`;
}

function renderStars(rating: number, maxRating: number) {
  const normalizedRating = (rating / maxRating) * 5;
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3",
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalfStar
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export function ReviewBadges({ sources, variant = "default", className }: ReviewBadgesProps) {
  if (!sources || sources.length === 0) return null;

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-wrap items-center gap-2", className)}>
        {sources.map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border transition-colors hover:opacity-80",
              sourceColors[source.name] || "bg-muted text-muted-foreground border-border"
            )}
          >
            {sourceLogos[source.name] && (
              <img
                src={sourceLogos[source.name]}
                alt={source.name}
                className="w-3 h-3"
                loading="lazy"
              />
            )}
            <span>{source.name}</span>
            <span className="font-bold">{formatRating(source.rating, source.maxRating)}</span>
            {source.maxRating === 5 && <Star className="w-3 h-3 fill-current" />}
          </a>
        ))}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-1.5", className)}>
        {sources.map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title={`${source.rating}/${source.maxRating} on ${source.name}${source.reviewCount ? ` (${source.reviewCount.toLocaleString()} reviews)` : ""}`}
          >
            {sourceLogos[source.name] && (
              <img
                src={sourceLogos[source.name]}
                alt={source.name}
                className="w-3 h-3"
                loading="lazy"
              />
            )}
            <span className="font-medium">{formatRating(source.rating, source.maxRating)}</span>
          </a>
        ))}
      </div>
    );
  }

  // Default variant - full display
  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-medium text-muted-foreground">User Reviews</h4>
      <div className="grid gap-2">
        {sources.map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-sm",
              sourceColors[source.name] || "bg-muted/50 border-border"
            )}
          >
            <div className="flex items-center gap-3">
              {sourceLogos[source.name] && (
                <img
                  src={sourceLogos[source.name]}
                  alt={source.name}
                  className="w-5 h-5"
                  loading="lazy"
                />
              )}
              <div>
                <span className="font-medium text-sm">{source.name}</span>
                {source.reviewCount && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({source.reviewCount.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {renderStars(source.rating, source.maxRating)}
              <span className="font-bold text-sm">
                {formatRating(source.rating, source.maxRating)}
              </span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
