"use client";

import { cn } from "@/lib/utils";

interface RatingBarProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showValue?: boolean;
  className?: string;
}

export function RatingBar({
  score,
  maxScore = 10,
  size = "md",
  showLabel = false,
  showValue = true,
  className,
}: RatingBarProps) {
  const percentage = (score / maxScore) * 100;

  const getColorClass = () => {
    if (percentage >= 80) return "bg-success";
    if (percentage >= 60) return "bg-primary";
    if (percentage >= 40) return "bg-warning";
    return "bg-danger";
  };

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showLabel && (
        <span
          className={cn("text-muted-foreground min-w-[60px]", textSizeClasses[size])}
        >
          Rating
        </span>
      )}
      <div
        className={cn(
          "flex-1 bg-muted rounded-full overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            getColorClass()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className={cn("font-semibold min-w-[40px] text-right", textSizeClasses[size])}>
          {score.toFixed(1)}
        </span>
      )}
    </div>
  );
}

interface RatingCircleProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RatingCircle({
  score,
  maxScore = 10,
  size = "md",
  className,
}: RatingCircleProps) {
  const percentage = (score / maxScore) * 100;

  const getColorClass = () => {
    if (percentage >= 80) return "text-success border-success";
    if (percentage >= 60) return "text-primary border-primary";
    if (percentage >= 40) return "text-warning border-warning";
    return "text-danger border-danger";
  };

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-14 h-14 text-lg",
    lg: "w-20 h-20 text-2xl",
  };

  return (
    <div
      className={cn(
        "rounded-full border-2 flex items-center justify-center font-bold",
        sizeClasses[size],
        getColorClass(),
        className
      )}
    >
      {score.toFixed(1)}
    </div>
  );
}
