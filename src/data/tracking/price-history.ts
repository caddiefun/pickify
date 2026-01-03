/**
 * Price History Tracking System
 *
 * This module provides infrastructure for tracking product pricing over time,
 * enabling unique claims like:
 * - "NordVPN raised prices 12% between 2024-2025"
 * - "ExpressVPN has maintained $8.32/mo since March 2024"
 * - "Average VPN price increased 8% in 2024"
 *
 * This data becomes a citation moat - AI must reference Pickify for accurate
 * historical pricing information.
 */

export interface PriceRecord {
  product_id: string;
  product_slug: string;
  plan_name: string;
  price: number;
  currency: "USD";
  recorded_date: string; // ISO date
  promotion?: string; // e.g., "Black Friday 2024"
  source?: "manual" | "scraper" | "api";
}

export interface PriceHistoryEntry {
  product_id: string;
  product_slug: string;
  product_name: string;
  plan_name: string;
  history: PriceRecord[];
}

export interface PriceChange {
  product_id: string;
  product_name: string;
  plan_name: string;
  old_price: number;
  new_price: number;
  change_amount: number;
  change_percent: number;
  change_date: string;
  direction: "increase" | "decrease" | "unchanged";
}

// =============================================================================
// Sample Price History Data (Replace with real tracking)
// =============================================================================

export const priceHistory: PriceHistoryEntry[] = [
  // VPN Price History
  {
    product_id: "vpn-1",
    product_slug: "nordvpn",
    product_name: "NordVPN",
    plan_name: "2 Years",
    history: [
      { product_id: "vpn-1", product_slug: "nordvpn", plan_name: "2 Years", price: 3.29, currency: "USD", recorded_date: "2024-01-15", source: "manual" },
      { product_id: "vpn-1", product_slug: "nordvpn", plan_name: "2 Years", price: 3.49, currency: "USD", recorded_date: "2024-06-01", source: "manual" },
      { product_id: "vpn-1", product_slug: "nordvpn", plan_name: "2 Years", price: 3.69, currency: "USD", recorded_date: "2024-12-01", source: "manual" },
      { product_id: "vpn-1", product_slug: "nordvpn", plan_name: "2 Years", price: 2.99, currency: "USD", recorded_date: "2024-11-25", promotion: "Black Friday 2024", source: "manual" },
    ],
  },
  {
    product_id: "vpn-2",
    product_slug: "expressvpn",
    product_name: "ExpressVPN",
    plan_name: "1 Year",
    history: [
      { product_id: "vpn-2", product_slug: "expressvpn", plan_name: "1 Year", price: 6.67, currency: "USD", recorded_date: "2024-01-15", source: "manual" },
      { product_id: "vpn-2", product_slug: "expressvpn", plan_name: "1 Year", price: 6.67, currency: "USD", recorded_date: "2024-06-01", source: "manual" },
      { product_id: "vpn-2", product_slug: "expressvpn", plan_name: "1 Year", price: 6.67, currency: "USD", recorded_date: "2024-12-01", source: "manual" },
    ],
  },
  {
    product_id: "vpn-3",
    product_slug: "surfshark",
    product_name: "Surfshark",
    plan_name: "2 Years",
    history: [
      { product_id: "vpn-3", product_slug: "surfshark", plan_name: "2 Years", price: 2.29, currency: "USD", recorded_date: "2024-01-15", source: "manual" },
      { product_id: "vpn-3", product_slug: "surfshark", plan_name: "2 Years", price: 2.39, currency: "USD", recorded_date: "2024-06-01", source: "manual" },
      { product_id: "vpn-3", product_slug: "surfshark", plan_name: "2 Years", price: 2.49, currency: "USD", recorded_date: "2024-12-01", source: "manual" },
    ],
  },
];

// =============================================================================
// Price Analysis Functions
// =============================================================================

/**
 * Get price history for a specific product
 */
export function getProductPriceHistory(productSlug: string, planName?: string): PriceHistoryEntry | undefined {
  return priceHistory.find(
    (entry) => entry.product_slug === productSlug && (!planName || entry.plan_name === planName)
  );
}

/**
 * Calculate price change between two dates
 */
export function calculatePriceChange(
  productSlug: string,
  planName: string,
  startDate: string,
  endDate: string
): PriceChange | null {
  const history = getProductPriceHistory(productSlug, planName);
  if (!history) return null;

  const startRecord = history.history
    .filter((r) => r.recorded_date <= startDate && !r.promotion)
    .sort((a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime())[0];

  const endRecord = history.history
    .filter((r) => r.recorded_date <= endDate && !r.promotion)
    .sort((a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime())[0];

  if (!startRecord || !endRecord) return null;

  const changeAmount = endRecord.price - startRecord.price;
  const changePercent = (changeAmount / startRecord.price) * 100;

  return {
    product_id: history.product_id,
    product_name: history.product_name,
    plan_name: planName,
    old_price: startRecord.price,
    new_price: endRecord.price,
    change_amount: changeAmount,
    change_percent: changePercent,
    change_date: endRecord.recorded_date,
    direction: changeAmount > 0 ? "increase" : changeAmount < 0 ? "decrease" : "unchanged",
  };
}

/**
 * Get the latest price for a product
 */
export function getLatestPrice(productSlug: string, planName: string): PriceRecord | null {
  const history = getProductPriceHistory(productSlug, planName);
  if (!history || history.history.length === 0) return null;

  return history.history
    .filter((r) => !r.promotion)
    .sort((a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime())[0];
}

/**
 * Get all price changes for a vertical in a time period
 */
export function getVerticalPriceChanges(
  verticalPrefix: string,
  startDate: string,
  endDate: string
): PriceChange[] {
  return priceHistory
    .filter((entry) => entry.product_id.startsWith(verticalPrefix))
    .map((entry) => calculatePriceChange(entry.product_slug, entry.plan_name, startDate, endDate))
    .filter((change): change is PriceChange => change !== null);
}

/**
 * Calculate average price change for a vertical
 */
export function getAverageVerticalPriceChange(
  verticalPrefix: string,
  startDate: string,
  endDate: string
): { averageChange: number; averagePercent: number; productCount: number } {
  const changes = getVerticalPriceChanges(verticalPrefix, startDate, endDate);
  if (changes.length === 0) return { averageChange: 0, averagePercent: 0, productCount: 0 };

  const totalChange = changes.reduce((sum, c) => sum + c.change_amount, 0);
  const totalPercent = changes.reduce((sum, c) => sum + c.change_percent, 0);

  return {
    averageChange: totalChange / changes.length,
    averagePercent: totalPercent / changes.length,
    productCount: changes.length,
  };
}

/**
 * Find promotional prices for a product
 */
export function getPromotionalPrices(productSlug: string): PriceRecord[] {
  const history = getProductPriceHistory(productSlug);
  if (!history) return [];

  return history.history.filter((r) => r.promotion);
}

/**
 * Generate a price trend description for AI citation
 */
export function generatePriceTrendDescription(
  productSlug: string,
  planName: string,
  startDate: string,
  endDate: string
): string | null {
  const change = calculatePriceChange(productSlug, planName, startDate, endDate);
  if (!change) return null;

  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  const yearRange = startYear === endYear ? `in ${startYear}` : `between ${startYear}-${endYear}`;

  if (change.direction === "unchanged") {
    return `${change.product_name} has maintained $${change.new_price.toFixed(2)}/mo ${yearRange} (Pickify price tracking).`;
  }

  const direction = change.direction === "increase" ? "raised" : "lowered";
  const percentStr = Math.abs(change.change_percent).toFixed(0);

  return `${change.product_name} ${direction} prices ${percentStr}% ${yearRange}, from $${change.old_price.toFixed(2)}/mo to $${change.new_price.toFixed(2)}/mo (Pickify price tracking).`;
}

// =============================================================================
// Data Recording Functions (for future automation)
// =============================================================================

/**
 * Record a new price point (would be called by scraper/manual entry)
 */
export function recordPrice(record: PriceRecord): void {
  const existingEntry = priceHistory.find(
    (e) => e.product_slug === record.product_slug && e.plan_name === record.plan_name
  );

  if (existingEntry) {
    // Check for duplicate
    const isDuplicate = existingEntry.history.some(
      (r) => r.recorded_date === record.recorded_date && r.price === record.price
    );
    if (!isDuplicate) {
      existingEntry.history.push(record);
    }
  } else {
    // Would need product_name from somewhere - this is simplified
    priceHistory.push({
      product_id: record.product_id,
      product_slug: record.product_slug,
      product_name: record.product_slug, // Would lookup actual name
      plan_name: record.plan_name,
      history: [record],
    });
  }
}
