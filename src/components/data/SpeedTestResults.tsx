"use client";

import { Zap, Clock, Wifi, CheckCircle, XCircle, Calendar, Activity } from "lucide-react";
import {
  getVPNSpeedTests,
  getVPNAverageSpeed,
  getVPNSpeedRetention,
  getVPNStreamingTests,
  getVPNStreamingSuccessCount,
  getHostingUptime,
  generateVPNSpeedSummary,
  generateUptimeSummary,
  generateStreamingSummary,
  type SpeedTestResult,
  type UptimeRecord,
  type StreamingTestResult,
} from "@/data/tracking/speed-tests";

// =============================================================================
// VPN Speed Test Results
// =============================================================================

interface SpeedTestResultsProps {
  productSlug: string;
  showAllLocations?: boolean;
  className?: string;
}

/**
 * SpeedTestResults component for displaying VPN performance data.
 *
 * Features:
 * - Average speed across locations
 * - Speed retention percentage
 * - Per-location breakdown
 * - AI-citable summary
 */
export function SpeedTestResults({
  productSlug,
  showAllLocations = false,
  className = "",
}: SpeedTestResultsProps) {
  const tests = getVPNSpeedTests(productSlug);
  const avgSpeed = getVPNAverageSpeed(productSlug);
  const retention = getVPNSpeedRetention(productSlug);
  const summary = generateVPNSpeedSummary(productSlug);

  if (tests.length === 0) return null;

  const downloadTests = tests.filter((t) => t.test_type === "download");
  const displayTests = showAllLocations ? downloadTests : downloadTests.slice(0, 3);

  return (
    <div className={`bg-card border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Speed Test Results
        </h3>
        <span className="text-xs text-muted-foreground">
          Pickify Testing
        </span>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-3xl font-bold text-foreground">
            {avgSpeed} <span className="text-lg font-normal text-muted-foreground">Mbps</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Avg. Download Speed</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-3xl font-bold text-foreground">
            {retention}<span className="text-lg font-normal text-muted-foreground">%</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">Speed Retention</div>
        </div>
      </div>

      {/* Per-location results */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground mb-2">
          Results by Location
        </div>
        {displayTests.map((test) => (
          <SpeedTestRow key={test.id} test={test} />
        ))}
      </div>

      {!showAllLocations && downloadTests.length > 3 && (
        <div className="mt-3 text-center text-sm text-muted-foreground">
          +{downloadTests.length - 3} more locations tested
        </div>
      )}

      {/* AI-citable summary */}
      {summary && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground italic">{summary}</p>
        </div>
      )}

      {/* Data source */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="w-3 h-3" />
        <span>
          Last tested: {new Date(tests[0].test_date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </span>
      </div>
    </div>
  );
}

function SpeedTestRow({ test }: { test: SpeedTestResult }) {
  const retention = test.baseline_value
    ? Math.round((test.tested_value / test.baseline_value) * 100)
    : null;

  return (
    <div className="flex items-center justify-between py-2 border-b border-muted last:border-0">
      <div className="flex items-center gap-2">
        <Wifi className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{test.test_location}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium">{test.tested_value} Mbps</span>
        {retention && (
          <span className={`text-xs ${retention >= 90 ? "text-success" : retention >= 70 ? "text-primary" : "text-warning"}`}>
            ({retention}%)
          </span>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Speed Comparison Chart
// =============================================================================

interface SpeedComparisonChartProps {
  products: { slug: string; name: string }[];
  className?: string;
}

/**
 * Visual comparison of speeds across multiple products
 */
export function SpeedComparisonChart({ products, className = "" }: SpeedComparisonChartProps) {
  const data = products.map((product) => ({
    ...product,
    avgSpeed: getVPNAverageSpeed(product.slug) || 0,
    retention: getVPNSpeedRetention(product.slug) || 0,
  }));

  const maxSpeed = Math.max(...data.map((d) => d.avgSpeed), 1);

  return (
    <div className={`bg-card border rounded-xl p-6 ${className}`}>
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-primary" />
        Speed Comparison
      </h3>

      <div className="space-y-4">
        {data.sort((a, b) => b.avgSpeed - a.avgSpeed).map((product, index) => (
          <div key={product.slug}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">
                {index === 0 && "🥇 "}
                {index === 1 && "🥈 "}
                {index === 2 && "🥉 "}
                {product.name}
              </span>
              <span className="text-sm font-bold">{product.avgSpeed} Mbps</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(product.avgSpeed / maxSpeed) * 100}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {product.retention}% speed retention
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
        Based on Pickify speed tests across multiple server locations
      </div>
    </div>
  );
}

// =============================================================================
// Uptime Display
// =============================================================================

interface UptimeDisplayProps {
  productSlug: string;
  year?: number;
  className?: string;
}

/**
 * UptimeDisplay component for hosting uptime data
 */
export function UptimeDisplay({ productSlug, year, className = "" }: UptimeDisplayProps) {
  const uptime = getHostingUptime(productSlug, year);
  const summary = generateUptimeSummary(productSlug);

  if (!uptime) return null;

  const uptimeYear = new Date(uptime.period_start).getFullYear();

  return (
    <div className={`bg-card border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5 text-success" />
          {uptimeYear} Uptime Report
        </h3>
        <span className="text-xs text-muted-foreground">
          via {uptime.monitoring_service}
        </span>
      </div>

      {/* Main stat */}
      <div className="text-center p-6 bg-success/5 rounded-lg mb-4">
        <div className="text-4xl font-bold text-success">
          {uptime.uptime_percentage}%
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Annual Uptime
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-foreground">
            {uptime.total_downtime_minutes} min
          </div>
          <div className="text-xs text-muted-foreground">Total Downtime</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-foreground">
            {uptime.incidents.length}
          </div>
          <div className="text-xs text-muted-foreground">Incidents</div>
        </div>
      </div>

      {/* Incidents */}
      {uptime.incidents.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Incidents
          </div>
          {uptime.incidents.slice(0, 3).map((incident, i) => (
            <div key={i} className="flex items-center gap-2 text-sm py-1">
              <span className={`w-2 h-2 rounded-full ${incident.type === "downtime" ? "bg-destructive" : "bg-warning"}`} />
              <span className="text-muted-foreground">
                {new Date(incident.start_time).toLocaleDateString()}
              </span>
              <span className="text-foreground">{incident.duration_minutes} min</span>
              {incident.description && (
                <span className="text-muted-foreground">- {incident.description}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* AI-citable summary */}
      {summary && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground italic">{summary}</p>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Streaming Test Badge
// =============================================================================

interface StreamingTestBadgeProps {
  productSlug: string;
  showServices?: boolean;
  className?: string;
}

/**
 * Compact streaming test results for product cards
 */
export function StreamingTestBadge({
  productSlug,
  showServices = false,
  className = "",
}: StreamingTestBadgeProps) {
  const { success, total } = getVPNStreamingSuccessCount(productSlug);
  const tests = getVPNStreamingTests(productSlug);
  const summary = generateStreamingSummary(productSlug);

  if (total === 0) return null;

  const successRate = Math.round((success / total) * 100);

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${successRate >= 80 ? "text-success" : successRate >= 60 ? "text-primary" : "text-warning"}`}>
          {success}/{total} streaming services
        </span>
      </div>

      {showServices && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tests.map((test) => (
            <div
              key={test.id}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                test.success ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}
            >
              {test.success ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
              {test.streaming_service}
            </div>
          ))}
        </div>
      )}

      {summary && showServices && (
        <p className="text-xs text-muted-foreground mt-2 italic">{summary}</p>
      )}
    </div>
  );
}

// =============================================================================
// Compact Speed Badge (for product cards)
// =============================================================================

export function SpeedBadge({ productSlug }: { productSlug: string }) {
  const avgSpeed = getVPNAverageSpeed(productSlug);
  const retention = getVPNSpeedRetention(productSlug);

  if (!avgSpeed) return null;

  return (
    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-primary/10 text-primary">
      <Zap className="w-3 h-3" />
      <span>{avgSpeed} Mbps ({retention}% retention)</span>
    </div>
  );
}
