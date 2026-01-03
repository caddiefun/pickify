"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidZipCode } from "@/data";

interface LocationSearchProps {
  placeholder?: string;
  className?: string;
  size?: "default" | "lg";
  showIcon?: boolean;
}

export function LocationSearch({
  placeholder = "Enter your zip code",
  className = "",
  size = "default",
  showIcon = true,
}: LocationSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a zip code");
      return;
    }

    // Extract zip code from query (handles "90210" or "Los Angeles, CA 90210")
    const zipMatch = trimmedQuery.match(/\b(\d{5})\b/);
    const zipCode = zipMatch ? zipMatch[1] : trimmedQuery;

    if (!isValidZipCode(zipCode)) {
      setError("Please enter a valid 5-digit zip code");
      return;
    }

    setError(null);
    setIsLoading(true);

    // Navigate to zip code results page
    router.push(`/internet-providers/zip/${zipCode}`);
  }, [query, router]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const inputClasses = size === "lg"
    ? "h-14 text-lg pl-12 pr-4"
    : "h-10 pl-10 pr-4";

  const iconClasses = size === "lg"
    ? "h-6 w-6 left-4"
    : "h-4 w-4 left-3";

  return (
    <div className={`w-full ${className}`}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          {showIcon && (
            <MapPin
              className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${iconClasses}`}
            />
          )}
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            className={`${inputClasses} ${!showIcon ? "pl-4" : ""}`}
            aria-label="Enter zip code to find internet providers"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          size={size === "lg" ? "lg" : "default"}
          className={size === "lg" ? "h-14 px-8" : ""}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-2">{error}</p>
      )}
    </div>
  );
}
