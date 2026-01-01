"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AFFILIATE_DISCLOSURE } from "@/lib/affiliate";

interface DisclosureBannerProps {
  variant?: "inline" | "banner" | "minimal";
  className?: string;
}

export function DisclosureBanner({
  variant = "inline",
  className,
}: DisclosureBannerProps) {
  if (variant === "minimal") {
    return (
      <p className={cn("text-xs text-muted-foreground", className)}>
        <Info className="w-3 h-3 inline mr-1" />
        {AFFILIATE_DISCLOSURE}{" "}
        <Link href="/disclosure" className="text-primary hover:underline">
          Learn more
        </Link>
      </p>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "bg-accent/50 border border-accent rounded-lg p-4",
          className
        )}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">Affiliate Disclosure</h4>
            <p className="text-sm text-muted-foreground">
              {AFFILIATE_DISCLOSURE} Our editorial content is independent and
              unbiased. We may earn a commission if you make a purchase through
              our links.{" "}
              <Link
                href="/disclosure"
                className="text-primary hover:underline font-medium"
              >
                Read our full disclosure
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // inline variant (default)
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-md px-3 py-2",
        className
      )}
    >
      <Info className="w-4 h-4 flex-shrink-0" />
      <p>
        {AFFILIATE_DISCLOSURE}{" "}
        <Link href="/disclosure" className="text-primary hover:underline">
          Learn more
        </Link>
      </p>
    </div>
  );
}
