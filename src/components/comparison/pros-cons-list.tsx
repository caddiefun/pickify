"use client";

import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProsConsListProps {
  pros: string[];
  cons: string[];
  variant?: "inline" | "cards" | "side-by-side";
  className?: string;
}

export function ProsConsList({
  pros,
  cons,
  variant = "side-by-side",
  className,
}: ProsConsListProps) {
  if (variant === "inline") {
    return (
      <div className={cn("space-y-4", className)}>
        <div>
          <h4 className="text-sm font-semibold text-success mb-2 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Pros
          </h4>
          <ul className="space-y-1">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-danger mb-2 flex items-center gap-2">
            <X className="w-4 h-4" />
            Cons
          </h4>
          <ul className="space-y-1">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <X className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div className={cn("grid md:grid-cols-2 gap-4", className)}>
        <Card className="border-success/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-success flex items-center gap-2 text-lg">
              <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              Pros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-danger/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-danger flex items-center gap-2 text-lg">
              <div className="w-6 h-6 rounded-full bg-danger/10 flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
              Cons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{con}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // side-by-side variant (default)
  return (
    <div className={cn("grid md:grid-cols-2 gap-6", className)}>
      <div className="space-y-3">
        <h4 className="font-semibold text-success flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          What we like
        </h4>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/10"
            >
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-danger flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-danger/10 flex items-center justify-center">
            <X className="w-4 h-4" />
          </div>
          What could be better
        </h4>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-danger/5 border border-danger/10"
            >
              <X className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
