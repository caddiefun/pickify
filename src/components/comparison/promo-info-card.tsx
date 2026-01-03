"use client";

import {
  Tag,
  Calendar,
  Clock,
  GraduationCap,
  Shield,
  Percent,
  Gift,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PromoInfo } from "@/types";

interface PromoInfoCardProps {
  promoInfo: PromoInfo;
  productName: string;
  className?: string;
  variant?: "full" | "compact" | "inline";
}

export function PromoInfoCard({
  promoInfo,
  productName,
  className = "",
  variant = "full",
}: PromoInfoCardProps) {
  const {
    typical_promos,
    has_seasonal_deals,
    money_back_days,
    free_trial_days,
    best_time_to_buy,
    has_student_discount,
    has_military_discount,
    annual_discount_percent,
  } = promoInfo;

  // Check if there's any meaningful promo info to display
  const hasPromoContent =
    typical_promos?.length ||
    money_back_days ||
    free_trial_days ||
    has_student_discount ||
    has_military_discount ||
    annual_discount_percent;

  if (!hasPromoContent) {
    return null;
  }

  if (variant === "inline") {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {money_back_days && (
          <Badge variant="secondary" className="gap-1">
            <Shield className="w-3 h-3" />
            {money_back_days}-day money-back
          </Badge>
        )}
        {free_trial_days && (
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" />
            {free_trial_days}-day free trial
          </Badge>
        )}
        {has_student_discount && (
          <Badge variant="secondary" className="gap-1">
            <GraduationCap className="w-3 h-3" />
            Student discount
          </Badge>
        )}
        {has_seasonal_deals && (
          <Badge variant="outline" className="gap-1">
            <Tag className="w-3 h-3" />
            Seasonal deals
          </Badge>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`p-4 rounded-lg bg-muted/50 border ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Deals & Offers</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {money_back_days && (
            <Badge variant="secondary" className="text-xs">
              {money_back_days}-day guarantee
            </Badge>
          )}
          {free_trial_days && (
            <Badge variant="secondary" className="text-xs">
              {free_trial_days}-day trial
            </Badge>
          )}
          {annual_discount_percent && (
            <Badge variant="secondary" className="text-xs">
              Save {annual_discount_percent}% annually
            </Badge>
          )}
          {has_student_discount && (
            <Badge variant="outline" className="text-xs">
              Student discount
            </Badge>
          )}
          {has_seasonal_deals && (
            <Badge variant="outline" className="text-xs">
              Seasonal deals
            </Badge>
          )}
        </div>
        {best_time_to_buy && (
          <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            {best_time_to_buy}
          </p>
        )}
      </div>
    );
  }

  // Full variant
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Deals & Promotions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Guarantees & Trials */}
        <div className="flex flex-wrap gap-2">
          {money_back_days && (
            <Badge variant="secondary" className="gap-1 py-1">
              <Shield className="w-3 h-3" />
              {money_back_days}-day money-back guarantee
            </Badge>
          )}
          {free_trial_days && (
            <Badge variant="secondary" className="gap-1 py-1">
              <Clock className="w-3 h-3" />
              {free_trial_days}-day free trial
            </Badge>
          )}
          {annual_discount_percent && (
            <Badge variant="secondary" className="gap-1 py-1">
              <Percent className="w-3 h-3" />
              Save {annual_discount_percent}% with annual billing
            </Badge>
          )}
        </div>

        {/* Special Discounts */}
        {(has_student_discount || has_military_discount) && (
          <div className="flex flex-wrap gap-2">
            {has_student_discount && (
              <Badge variant="outline" className="gap-1 py-1">
                <GraduationCap className="w-3 h-3" />
                Student discount available
              </Badge>
            )}
            {has_military_discount && (
              <Badge variant="outline" className="gap-1 py-1">
                <Shield className="w-3 h-3" />
                Military discount available
              </Badge>
            )}
          </div>
        )}

        {/* Typical Promotions */}
        {typical_promos && typical_promos.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Typical Promotions
            </p>
            <ul className="space-y-1">
              {typical_promos.map((promo, index) => (
                <li
                  key={index}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-1">•</span>
                  {promo}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Best Time to Buy */}
        {best_time_to_buy && (
          <div className="pt-2 border-t">
            <p className="text-sm flex items-start gap-2">
              <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>
                <span className="font-medium">Best time to buy:</span>{" "}
                <span className="text-muted-foreground">{best_time_to_buy}</span>
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
