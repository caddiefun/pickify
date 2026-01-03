"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductLogoProps {
  name: string;
  logoUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-10 h-10 text-lg",
  md: "w-12 h-12 text-xl",
  lg: "w-14 h-14 text-2xl",
};

const imageSizes = {
  sm: 32,
  md: 40,
  lg: 48,
};

export function ProductLogo({
  name,
  logoUrl,
  size = "md",
  className,
}: ProductLogoProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const showFallback = !logoUrl || hasError;

  return (
    <div
      className={cn(
        "bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0",
        sizeClasses[size],
        className
      )}
    >
      {showFallback ? (
        <span className="font-bold text-muted-foreground">
          {name.charAt(0).toUpperCase()}
        </span>
      ) : (
        <>
          {isLoading && (
            <span className="font-bold text-muted-foreground animate-pulse">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
          <Image
            src={logoUrl}
            alt={`${name} logo`}
            width={imageSizes[size]}
            height={imageSizes[size]}
            className={cn("rounded", isLoading && "hidden")}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
          />
        </>
      )}
    </div>
  );
}
