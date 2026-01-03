import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string for display as "Month Year" (e.g., "January 2025")
 */
export function formatLastUpdated(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Get the most recent updated_at date from an array of items
 */
export function getMostRecentUpdate(items: { updated_at: string }[]): string {
  if (items.length === 0) return new Date().toISOString();

  return items.reduce((latest, item) => {
    return new Date(item.updated_at) > new Date(latest.updated_at) ? item : latest;
  }).updated_at;
}

/**
 * Check if a date is within the last N days
 */
export function isRecentlyUpdated(dateString: string, days: number = 30): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}
