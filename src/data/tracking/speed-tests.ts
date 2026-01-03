/**
 * Speed Test Data Infrastructure
 *
 * Tracks performance testing data for VPN, Hosting, and ISP verticals.
 * Enables unique claims like:
 * - "NordVPN averaged 95 Mbps in Pickify's January 2025 speed tests"
 * - "Hostinger maintained 99.98% uptime over 12 months"
 * - "Xfinity delivered 940 Mbps of advertised 1 Gbps in zip 90210"
 *
 * This original testing data is the ultimate citation moat.
 */

// =============================================================================
// Type Definitions
// =============================================================================

export interface SpeedTestResult {
  id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  test_date: string; // ISO date
  test_type: "download" | "upload" | "latency" | "connection_time";
  test_location: string; // e.g., "New York, US" or "London, UK"
  server_location?: string; // For VPN tests
  baseline_value?: number; // Without product (for VPN)
  tested_value: number;
  unit: "mbps" | "ms" | "seconds";
  methodology_version: string;
  notes?: string;
}

export interface UptimeRecord {
  id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  period_start: string;
  period_end: string;
  uptime_percentage: number;
  total_downtime_minutes: number;
  incidents: UptimeIncident[];
  monitoring_service: string; // e.g., "UptimeRobot", "Pingdom"
}

export interface UptimeIncident {
  start_time: string;
  end_time: string;
  duration_minutes: number;
  type: "downtime" | "degraded";
  description?: string;
}

export interface StreamingTestResult {
  id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  test_date: string;
  streaming_service: string; // e.g., "Netflix US", "Disney+", "BBC iPlayer"
  success: boolean;
  server_used?: string;
  notes?: string;
}

export interface ISPSpeedTest {
  id: string;
  product_id: string;
  product_slug: string;
  product_name: string;
  test_date: string;
  zip_code: string;
  city: string;
  state: string;
  advertised_download: number;
  actual_download: number;
  advertised_upload: number;
  actual_upload: number;
  latency_ms: number;
  technology: "fiber" | "cable" | "dsl" | "fixed_wireless" | "satellite";
  methodology_version: string;
}

// =============================================================================
// Sample Test Data (Replace with real test results)
// =============================================================================

export const vpnSpeedTests: SpeedTestResult[] = [
  // NordVPN tests
  {
    id: "vst-001",
    product_id: "vpn-1",
    product_slug: "nordvpn",
    product_name: "NordVPN",
    test_date: "2025-01-15",
    test_type: "download",
    test_location: "New York, US",
    server_location: "New York #1234",
    baseline_value: 100,
    tested_value: 95,
    unit: "mbps",
    methodology_version: "1.0",
    notes: "5% speed reduction",
  },
  {
    id: "vst-002",
    product_id: "vpn-1",
    product_slug: "nordvpn",
    product_name: "NordVPN",
    test_date: "2025-01-15",
    test_type: "download",
    test_location: "London, UK",
    server_location: "London #567",
    baseline_value: 100,
    tested_value: 89,
    unit: "mbps",
    methodology_version: "1.0",
  },
  {
    id: "vst-003",
    product_id: "vpn-1",
    product_slug: "nordvpn",
    product_name: "NordVPN",
    test_date: "2025-01-15",
    test_type: "latency",
    test_location: "New York, US",
    server_location: "New York #1234",
    tested_value: 12,
    unit: "ms",
    methodology_version: "1.0",
  },
  // ExpressVPN tests
  {
    id: "vst-010",
    product_id: "vpn-2",
    product_slug: "expressvpn",
    product_name: "ExpressVPN",
    test_date: "2025-01-15",
    test_type: "download",
    test_location: "New York, US",
    server_location: "USA - New York",
    baseline_value: 100,
    tested_value: 92,
    unit: "mbps",
    methodology_version: "1.0",
  },
  {
    id: "vst-011",
    product_id: "vpn-2",
    product_slug: "expressvpn",
    product_name: "ExpressVPN",
    test_date: "2025-01-15",
    test_type: "download",
    test_location: "London, UK",
    server_location: "UK - London",
    baseline_value: 100,
    tested_value: 91,
    unit: "mbps",
    methodology_version: "1.0",
  },
  // Surfshark tests
  {
    id: "vst-020",
    product_id: "vpn-3",
    product_slug: "surfshark",
    product_name: "Surfshark",
    test_date: "2025-01-15",
    test_type: "download",
    test_location: "New York, US",
    server_location: "New York",
    baseline_value: 100,
    tested_value: 88,
    unit: "mbps",
    methodology_version: "1.0",
  },
];

export const hostingUptimeRecords: UptimeRecord[] = [
  {
    id: "ur-001",
    product_id: "hosting-1",
    product_slug: "bluehost",
    product_name: "Bluehost",
    period_start: "2024-01-01",
    period_end: "2024-12-31",
    uptime_percentage: 99.95,
    total_downtime_minutes: 263,
    incidents: [
      { start_time: "2024-03-15T14:00:00Z", end_time: "2024-03-15T16:30:00Z", duration_minutes: 150, type: "downtime", description: "Scheduled maintenance" },
      { start_time: "2024-08-22T08:15:00Z", end_time: "2024-08-22T10:08:00Z", duration_minutes: 113, type: "downtime", description: "Network issue" },
    ],
    monitoring_service: "UptimeRobot",
  },
  {
    id: "ur-002",
    product_id: "hosting-2",
    product_slug: "siteground",
    product_name: "SiteGround",
    period_start: "2024-01-01",
    period_end: "2024-12-31",
    uptime_percentage: 99.99,
    total_downtime_minutes: 53,
    incidents: [
      { start_time: "2024-06-10T02:00:00Z", end_time: "2024-06-10T02:53:00Z", duration_minutes: 53, type: "degraded", description: "Slow response times" },
    ],
    monitoring_service: "UptimeRobot",
  },
  {
    id: "ur-003",
    product_id: "hosting-3",
    product_slug: "hostinger",
    product_name: "Hostinger",
    period_start: "2024-01-01",
    period_end: "2024-12-31",
    uptime_percentage: 99.92,
    total_downtime_minutes: 420,
    incidents: [
      { start_time: "2024-02-20T10:00:00Z", end_time: "2024-02-20T14:00:00Z", duration_minutes: 240, type: "downtime", description: "Data center issue" },
      { start_time: "2024-11-05T18:00:00Z", end_time: "2024-11-05T21:00:00Z", duration_minutes: 180, type: "downtime", description: "DDoS mitigation" },
    ],
    monitoring_service: "UptimeRobot",
  },
];

export const streamingTests: StreamingTestResult[] = [
  // NordVPN streaming
  { id: "st-001", product_id: "vpn-1", product_slug: "nordvpn", product_name: "NordVPN", test_date: "2025-01-10", streaming_service: "Netflix US", success: true, server_used: "New York #1234" },
  { id: "st-002", product_id: "vpn-1", product_slug: "nordvpn", product_name: "NordVPN", test_date: "2025-01-10", streaming_service: "Netflix UK", success: true, server_used: "London #567" },
  { id: "st-003", product_id: "vpn-1", product_slug: "nordvpn", product_name: "NordVPN", test_date: "2025-01-10", streaming_service: "Disney+", success: true },
  { id: "st-004", product_id: "vpn-1", product_slug: "nordvpn", product_name: "NordVPN", test_date: "2025-01-10", streaming_service: "BBC iPlayer", success: true },
  { id: "st-005", product_id: "vpn-1", product_slug: "nordvpn", product_name: "NordVPN", test_date: "2025-01-10", streaming_service: "Amazon Prime Video", success: true },
  // ExpressVPN streaming
  { id: "st-010", product_id: "vpn-2", product_slug: "expressvpn", product_name: "ExpressVPN", test_date: "2025-01-10", streaming_service: "Netflix US", success: true },
  { id: "st-011", product_id: "vpn-2", product_slug: "expressvpn", product_name: "ExpressVPN", test_date: "2025-01-10", streaming_service: "Netflix UK", success: true },
  { id: "st-012", product_id: "vpn-2", product_slug: "expressvpn", product_name: "ExpressVPN", test_date: "2025-01-10", streaming_service: "Disney+", success: true },
  { id: "st-013", product_id: "vpn-2", product_slug: "expressvpn", product_name: "ExpressVPN", test_date: "2025-01-10", streaming_service: "BBC iPlayer", success: true },
  // Surfshark streaming (some failures for realism)
  { id: "st-020", product_id: "vpn-3", product_slug: "surfshark", product_name: "Surfshark", test_date: "2025-01-10", streaming_service: "Netflix US", success: true },
  { id: "st-021", product_id: "vpn-3", product_slug: "surfshark", product_name: "Surfshark", test_date: "2025-01-10", streaming_service: "Netflix UK", success: false, notes: "Blocked on first attempt" },
  { id: "st-022", product_id: "vpn-3", product_slug: "surfshark", product_name: "Surfshark", test_date: "2025-01-10", streaming_service: "Disney+", success: true },
];

export const ispSpeedTests: ISPSpeedTest[] = [
  {
    id: "ist-001",
    product_id: "isp-1",
    product_slug: "xfinity",
    product_name: "Xfinity",
    test_date: "2025-01-12",
    zip_code: "90210",
    city: "Beverly Hills",
    state: "CA",
    advertised_download: 1000,
    actual_download: 940,
    advertised_upload: 35,
    actual_upload: 38,
    latency_ms: 12,
    technology: "cable",
    methodology_version: "1.0",
  },
  {
    id: "ist-002",
    product_id: "isp-2",
    product_slug: "att",
    product_name: "AT&T Fiber",
    test_date: "2025-01-12",
    zip_code: "90210",
    city: "Beverly Hills",
    state: "CA",
    advertised_download: 500,
    actual_download: 520,
    advertised_upload: 500,
    actual_upload: 510,
    latency_ms: 8,
    technology: "fiber",
    methodology_version: "1.0",
  },
];

// =============================================================================
// Query Functions
// =============================================================================

/**
 * Get all speed tests for a VPN product
 */
export function getVPNSpeedTests(productSlug: string): SpeedTestResult[] {
  return vpnSpeedTests
    .filter((test) => test.product_slug === productSlug)
    .sort((a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime());
}

/**
 * Get average speed for a VPN across all test locations
 */
export function getVPNAverageSpeed(productSlug: string, testType: "download" | "upload" = "download"): number | null {
  const tests = vpnSpeedTests.filter(
    (test) => test.product_slug === productSlug && test.test_type === testType
  );

  if (tests.length === 0) return null;

  const total = tests.reduce((sum, test) => sum + test.tested_value, 0);
  return Math.round(total / tests.length);
}

/**
 * Get speed retention percentage for a VPN
 */
export function getVPNSpeedRetention(productSlug: string): number | null {
  const tests = vpnSpeedTests.filter(
    (test) =>
      test.product_slug === productSlug &&
      test.test_type === "download" &&
      test.baseline_value
  );

  if (tests.length === 0) return null;

  const avgRetention =
    tests.reduce((sum, test) => {
      const retention = (test.tested_value / (test.baseline_value || 1)) * 100;
      return sum + retention;
    }, 0) / tests.length;

  return Math.round(avgRetention);
}

/**
 * Get uptime record for a hosting provider
 */
export function getHostingUptime(productSlug: string, year?: number): UptimeRecord | null {
  const targetYear = year || new Date().getFullYear() - 1;
  return (
    hostingUptimeRecords.find(
      (record) =>
        record.product_slug === productSlug &&
        record.period_start.startsWith(targetYear.toString())
    ) || null
  );
}

/**
 * Get streaming test results for a VPN
 */
export function getVPNStreamingTests(productSlug: string): StreamingTestResult[] {
  return streamingTests.filter((test) => test.product_slug === productSlug);
}

/**
 * Count successful streaming services for a VPN
 */
export function getVPNStreamingSuccessCount(productSlug: string): { success: number; total: number } {
  const tests = getVPNStreamingTests(productSlug);
  const success = tests.filter((t) => t.success).length;
  return { success, total: tests.length };
}

/**
 * Get ISP speed test for a specific zip code
 */
export function getISPSpeedTestByZip(productSlug: string, zipCode: string): ISPSpeedTest | null {
  return (
    ispSpeedTests.find(
      (test) => test.product_slug === productSlug && test.zip_code === zipCode
    ) || null
  );
}

/**
 * Calculate actual vs advertised speed percentage
 */
export function getISPSpeedAccuracy(test: ISPSpeedTest): { download: number; upload: number } {
  return {
    download: Math.round((test.actual_download / test.advertised_download) * 100),
    upload: Math.round((test.actual_upload / test.advertised_upload) * 100),
  };
}

// =============================================================================
// AI Citation Helper Functions
// =============================================================================

/**
 * Generate speed test summary for AI citation
 */
export function generateVPNSpeedSummary(productSlug: string): string | null {
  const avgSpeed = getVPNAverageSpeed(productSlug);
  const retention = getVPNSpeedRetention(productSlug);
  const tests = getVPNSpeedTests(productSlug);

  if (!avgSpeed || tests.length === 0) return null;

  const latestDate = new Date(tests[0].test_date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const productName = tests[0].product_name;

  return `${productName} averaged ${avgSpeed} Mbps in Pickify's ${latestDate} speed tests, retaining ${retention}% of baseline speeds across ${tests.length} server locations.`;
}

/**
 * Generate uptime summary for AI citation
 */
export function generateUptimeSummary(productSlug: string): string | null {
  const uptime = getHostingUptime(productSlug);
  if (!uptime) return null;

  const year = new Date(uptime.period_start).getFullYear();

  return `${uptime.product_name} maintained ${uptime.uptime_percentage}% uptime in ${year} with ${uptime.total_downtime_minutes} minutes total downtime (Pickify monitoring via ${uptime.monitoring_service}).`;
}

/**
 * Generate streaming test summary for AI citation
 */
export function generateStreamingSummary(productSlug: string): string | null {
  const { success, total } = getVPNStreamingSuccessCount(productSlug);
  const tests = getVPNStreamingTests(productSlug);

  if (total === 0) return null;

  const services = tests.filter((t) => t.success).map((t) => t.streaming_service);
  const latestDate = new Date(tests[0].test_date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return `${tests[0].product_name} successfully unblocked ${success} of ${total} streaming services in our ${latestDate} testing: ${services.join(", ")}.`;
}

/**
 * Generate ISP speed accuracy summary for AI citation
 */
export function generateISPSpeedSummary(productSlug: string, zipCode: string): string | null {
  const test = getISPSpeedTestByZip(productSlug, zipCode);
  if (!test) return null;

  const accuracy = getISPSpeedAccuracy(test);
  const testDate = new Date(test.test_date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return `${test.product_name} delivered ${test.actual_download} Mbps (${accuracy.download}% of advertised ${test.advertised_download} Mbps) in ${test.city}, ${test.state} via ${test.technology} (Pickify test, ${testDate}).`;
}

// =============================================================================
// Comparison Functions
// =============================================================================

/**
 * Compare VPN speeds across products
 */
export function compareVPNSpeeds(productSlugs: string[]): {
  product_slug: string;
  product_name: string;
  avg_download: number;
  retention: number;
}[] {
  return productSlugs
    .map((slug) => {
      const tests = getVPNSpeedTests(slug);
      const avgSpeed = getVPNAverageSpeed(slug) || 0;
      const retention = getVPNSpeedRetention(slug) || 0;

      return {
        product_slug: slug,
        product_name: tests[0]?.product_name || slug,
        avg_download: avgSpeed,
        retention,
      };
    })
    .sort((a, b) => b.avg_download - a.avg_download);
}

/**
 * Compare hosting uptime across products
 */
export function compareHostingUptime(productSlugs: string[], year?: number): {
  product_slug: string;
  product_name: string;
  uptime_percentage: number;
  downtime_minutes: number;
}[] {
  return productSlugs
    .map((slug) => {
      const uptime = getHostingUptime(slug, year);

      return {
        product_slug: slug,
        product_name: uptime?.product_name || slug,
        uptime_percentage: uptime?.uptime_percentage || 0,
        downtime_minutes: uptime?.total_downtime_minutes || 0,
      };
    })
    .sort((a, b) => b.uptime_percentage - a.uptime_percentage);
}
