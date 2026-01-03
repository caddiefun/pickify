"use client";

import { AlertTriangle, Shield, HelpCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type CredibilityWarningType =
  | "security-concern"
  | "rating-discrepancy"
  | "data-quality"
  | "discontinued";

interface CredibilityWarningProps {
  type: CredibilityWarningType;
  message: string;
  variant?: "banner" | "badge" | "inline";
  learnMoreUrl?: string;
  className?: string;
}

const warningConfig: Record<
  CredibilityWarningType,
  { icon: typeof AlertTriangle; color: string; bgColor: string; label: string }
> = {
  "security-concern": {
    icon: Shield,
    color: "text-destructive",
    bgColor: "bg-destructive/10 border-destructive/20",
    label: "Security Concern",
  },
  "rating-discrepancy": {
    icon: HelpCircle,
    color: "text-warning",
    bgColor: "bg-warning/10 border-warning/20",
    label: "Rating Note",
  },
  "data-quality": {
    icon: AlertTriangle,
    color: "text-muted-foreground",
    bgColor: "bg-muted border-muted-foreground/20",
    label: "Data Note",
  },
  discontinued: {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10 border-destructive/20",
    label: "Discontinued",
  },
};

export function CredibilityWarning({
  type,
  message,
  variant = "banner",
  learnMoreUrl,
  className,
}: CredibilityWarningProps) {
  const config = warningConfig[type];
  const Icon = config.icon;

  if (variant === "inline") {
    // Simple inline badge with hover title for the message
    return (
      <span
        title={message}
        className={cn(
          "inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5 cursor-help border",
          config.bgColor,
          config.color,
          className
        )}
      >
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </span>
    );
  }

  if (variant === "badge") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium rounded-md px-2 py-1 border",
          config.bgColor,
          config.color,
          className
        )}
        title={message}
      >
        <Icon className="w-3 h-3 flex-shrink-0" />
        <span>{config.label}</span>
      </div>
    );
  }

  // banner variant (default)
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-4",
        config.bgColor,
        className
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          config.color,
          "bg-background"
        )}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={cn("font-medium text-sm mb-1", config.color)}>
          {config.label}
        </h4>
        <p className="text-sm text-muted-foreground">{message}</p>
        {learnMoreUrl && (
          <a
            href={learnMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
          >
            Learn more
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
