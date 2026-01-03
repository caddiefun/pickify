/**
 * External Data Integrations
 *
 * Provides authoritative third-party data from public sources:
 * - HRANK.com: Web hosting uptime monitoring
 * - AV-TEST.org: Antivirus lab test results
 * - AV-Comparatives.org: Antivirus protection tests
 *
 * All data is from public sources with proper attribution.
 * No accounts or API keys required.
 */

// Public data sources (no accounts needed)
export {
  // HRANK Hosting Data
  hrankHostingData,
  getHRankData,
  getTopHostsByUptime,
  generateHRankCitation,
  type HRankHostingData,
  // AV-TEST Results
  avTestResults,
  getAVTestResult,
  getTopAVProducts,
  generateAVTestCitation,
  type AVTestResult,
  // AV-Comparatives Results
  avComparativesResults,
  getAVComparativesResult,
  generateAVComparativesCitation,
  type AVComparativesResult,
  // Combined
  getCombinedAVScores,
  DATA_SOURCES,
} from "./public-data";
