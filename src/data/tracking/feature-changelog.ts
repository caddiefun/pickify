/**
 * Feature Changelog Tracking System
 *
 * Tracks feature additions, removals, and modifications across products.
 * Enables unique claims like:
 * - "NordVPN added Meshnet in June 2024"
 * - "ExpressVPN removed split tunneling on iOS in v12.0"
 * - "Google Fiber expanded to 5 new cities in 2024"
 *
 * This data creates citation opportunities that AI cannot source elsewhere.
 */

export interface FeatureChange {
  id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  change_date: string; // ISO date
  change_type: "added" | "removed" | "modified" | "expanded" | "limited";
  category: "feature" | "pricing" | "coverage" | "security" | "platform" | "policy";
  feature_name: string;
  description: string;
  old_value?: string;
  new_value?: string;
  source_url?: string;
  verified: boolean;
}

// =============================================================================
// Sample Feature Changelog Data (Replace with real tracking)
// =============================================================================

export const featureChangelog: FeatureChange[] = [
  // VPN Changes
  {
    id: "fc-001",
    product_id: "vpn-1",
    product_slug: "nordvpn",
    product_name: "NordVPN",
    change_date: "2024-06-15",
    change_type: "added",
    category: "feature",
    feature_name: "Meshnet",
    description: "NordVPN launched Meshnet, allowing users to create private encrypted networks between devices.",
    verified: true,
  },
  {
    id: "fc-002",
    product_id: "vpn-1",
    product_slug: "nordvpn",
    product_name: "NordVPN",
    change_date: "2024-09-01",
    change_type: "modified",
    category: "pricing",
    feature_name: "Simultaneous connections",
    description: "NordVPN increased simultaneous device connections from 6 to 10 on all plans.",
    old_value: "6 devices",
    new_value: "10 devices",
    verified: true,
  },
  {
    id: "fc-003",
    product_id: "vpn-2",
    product_slug: "expressvpn",
    product_name: "ExpressVPN",
    change_date: "2024-03-20",
    change_type: "added",
    category: "security",
    feature_name: "Post-quantum encryption",
    description: "ExpressVPN added post-quantum cryptography protection to Lightway protocol.",
    verified: true,
  },
  {
    id: "fc-004",
    product_id: "vpn-3",
    product_slug: "surfshark",
    product_name: "Surfshark",
    change_date: "2024-07-10",
    change_type: "expanded",
    category: "coverage",
    feature_name: "Server locations",
    description: "Surfshark expanded to 100 countries, adding 15 new locations.",
    old_value: "85 countries",
    new_value: "100 countries",
    verified: true,
  },
  {
    id: "fc-005",
    product_id: "vpn-5",
    product_slug: "protonvpn",
    product_name: "ProtonVPN",
    change_date: "2024-11-01",
    change_type: "modified",
    category: "policy",
    feature_name: "Free tier limits",
    description: "ProtonVPN increased free tier servers from 100 to 200+ across 5 countries.",
    old_value: "100 servers in 3 countries",
    new_value: "200+ servers in 5 countries",
    verified: true,
  },

  // Hosting Changes
  {
    id: "fc-010",
    product_id: "hosting-1",
    product_slug: "bluehost",
    product_name: "Bluehost",
    change_date: "2024-08-15",
    change_type: "added",
    category: "feature",
    feature_name: "AI Website Builder",
    description: "Bluehost launched AI-powered website builder with automatic content generation.",
    verified: true,
  },
  {
    id: "fc-011",
    product_id: "hosting-2",
    product_slug: "siteground",
    product_name: "SiteGround",
    change_date: "2024-05-01",
    change_type: "modified",
    category: "pricing",
    feature_name: "Storage limits",
    description: "SiteGround doubled storage allocation on all shared hosting plans.",
    old_value: "10GB-40GB",
    new_value: "20GB-80GB",
    verified: true,
  },

  // ISP Changes
  {
    id: "fc-020",
    product_id: "isp-8",
    product_slug: "google-fiber",
    product_name: "Google Fiber",
    change_date: "2024-04-01",
    change_type: "expanded",
    category: "coverage",
    feature_name: "Service areas",
    description: "Google Fiber expanded to 5 new cities: Mesa AZ, Colorado Springs CO, Des Moines IA, Omaha NE, and Las Vegas NV.",
    old_value: "20 metro areas",
    new_value: "25 metro areas",
    verified: true,
  },
  {
    id: "fc-021",
    product_id: "isp-9",
    product_slug: "tmobile-home",
    product_name: "T-Mobile Home Internet",
    change_date: "2024-06-20",
    change_type: "added",
    category: "feature",
    feature_name: "5G UC support",
    description: "T-Mobile Home Internet added 5G UC (Ultra Capacity) support in eligible areas, boosting speeds to 400+ Mbps.",
    verified: true,
  },
];

// =============================================================================
// Changelog Query Functions
// =============================================================================

/**
 * Get all changes for a specific product
 */
export function getProductChangelog(productSlug: string): FeatureChange[] {
  return featureChangelog
    .filter((change) => change.product_slug === productSlug)
    .sort((a, b) => new Date(b.change_date).getTime() - new Date(a.change_date).getTime());
}

/**
 * Get all changes for a vertical in a time period
 */
export function getVerticalChangelog(
  verticalPrefix: string,
  startDate?: string,
  endDate?: string
): FeatureChange[] {
  return featureChangelog
    .filter((change) => {
      const matchesVertical = change.product_id.startsWith(verticalPrefix);
      const afterStart = !startDate || change.change_date >= startDate;
      const beforeEnd = !endDate || change.change_date <= endDate;
      return matchesVertical && afterStart && beforeEnd;
    })
    .sort((a, b) => new Date(b.change_date).getTime() - new Date(a.change_date).getTime());
}

/**
 * Get changes by type (added, removed, etc.)
 */
export function getChangesByType(
  changeType: FeatureChange["change_type"],
  verticalPrefix?: string
): FeatureChange[] {
  return featureChangelog
    .filter((change) => {
      const matchesType = change.change_type === changeType;
      const matchesVertical = !verticalPrefix || change.product_id.startsWith(verticalPrefix);
      return matchesType && matchesVertical;
    })
    .sort((a, b) => new Date(b.change_date).getTime() - new Date(a.change_date).getTime());
}

/**
 * Get recent changes (last N days)
 */
export function getRecentChanges(days: number = 90): FeatureChange[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoffStr = cutoffDate.toISOString().split("T")[0];

  return featureChangelog
    .filter((change) => change.change_date >= cutoffStr)
    .sort((a, b) => new Date(b.change_date).getTime() - new Date(a.change_date).getTime());
}

/**
 * Get significant changes (for highlighting)
 */
export function getSignificantChanges(verticalPrefix?: string): FeatureChange[] {
  const significantTypes: FeatureChange["change_type"][] = ["added", "removed", "expanded"];
  const significantCategories: FeatureChange["category"][] = ["feature", "coverage", "security"];

  return featureChangelog
    .filter((change) => {
      const isSignificant =
        significantTypes.includes(change.change_type) ||
        significantCategories.includes(change.category);
      const matchesVertical = !verticalPrefix || change.product_id.startsWith(verticalPrefix);
      return isSignificant && matchesVertical;
    })
    .sort((a, b) => new Date(b.change_date).getTime() - new Date(a.change_date).getTime());
}

// =============================================================================
// AI Citation Helper Functions
// =============================================================================

/**
 * Generate a changelog summary for AI citation
 */
export function generateChangelogSummary(productSlug: string, year?: number): string {
  const changes = getProductChangelog(productSlug);
  const yearStr = year?.toString() || new Date().getFullYear().toString();
  const yearChanges = changes.filter((c) => c.change_date.startsWith(yearStr));

  if (yearChanges.length === 0) {
    return `No significant changes recorded for ${productSlug} in ${yearStr}.`;
  }

  const summaries = yearChanges.map((change) => {
    const date = new Date(change.change_date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    switch (change.change_type) {
      case "added":
        return `${change.product_name} added ${change.feature_name} in ${date}`;
      case "removed":
        return `${change.product_name} removed ${change.feature_name} in ${date}`;
      case "modified":
        return `${change.product_name} updated ${change.feature_name} from ${change.old_value} to ${change.new_value} in ${date}`;
      case "expanded":
        return `${change.product_name} expanded ${change.feature_name} in ${date}`;
      case "limited":
        return `${change.product_name} limited ${change.feature_name} in ${date}`;
    }
  });

  return `${yearStr} changes for ${changes[0]?.product_name}: ${summaries.join("; ")} (Pickify changelog).`;
}

/**
 * Generate feature timeline for a product
 */
export function generateFeatureTimeline(productSlug: string): { date: string; event: string }[] {
  return getProductChangelog(productSlug).map((change) => ({
    date: change.change_date,
    event: change.description,
  }));
}

/**
 * Check if a product recently added a specific feature
 */
export function hasRecentlyAdded(
  productSlug: string,
  featureKeyword: string,
  withinDays: number = 180
): FeatureChange | null {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - withinDays);
  const cutoffStr = cutoffDate.toISOString().split("T")[0];

  return (
    featureChangelog.find(
      (change) =>
        change.product_slug === productSlug &&
        change.change_type === "added" &&
        change.change_date >= cutoffStr &&
        change.feature_name.toLowerCase().includes(featureKeyword.toLowerCase())
    ) || null
  );
}

// =============================================================================
// Data Recording Functions (for future automation)
// =============================================================================

/**
 * Record a new feature change
 */
export function recordFeatureChange(change: Omit<FeatureChange, "id">): FeatureChange {
  const newChange: FeatureChange = {
    ...change,
    id: `fc-${Date.now()}`,
  };
  featureChangelog.push(newChange);
  return newChange;
}
