import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Zap, Calendar, Download, Upload, Clock } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BreadcrumbSchema,
  FAQSchema,
  DatasetSchema,
  QuickAnswer,
} from "@/components/seo";
import { SpeedTestResults, SpeedComparisonChart } from "@/components/data";
import { getProductsByVertical } from "@/data";
import {
  vpnSpeedTests,
  compareVPNSpeeds,
  generateVPNSpeedSummary,
} from "@/data/tracking/speed-tests";

export const metadata: Metadata = {
  title: "VPN Speed Tests 2025 - Real Performance Data | Pickify",
  description:
    "VPN speed test results based on Security.org benchmark data. Compare download speeds, upload speeds, and latency for NordVPN, ExpressVPN, Surfshark and more.",
  alternates: {
    canonical: "https://pickify.io/vpn/speed-tests",
  },
  openGraph: {
    title: "VPN Speed Tests 2025 - Real Performance Data | Pickify",
    description:
      "VPN speed test results based on Security.org benchmark data. See how NordVPN, ExpressVPN, Surfshark and others perform.",
  },
};

export default function VPNSpeedTestsPage() {
  const products = getProductsByVertical("vpn");
  const productSlugs = products.map((p) => p.slug);
  const speedComparison = compareVPNSpeeds(productSlugs);

  // Find fastest VPN
  const fastest = speedComparison[0];

  // Generate summaries for each VPN
  const summaries = productSlugs
    .map((slug) => ({
      slug,
      summary: generateVPNSpeedSummary(slug),
    }))
    .filter((s) => s.summary);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "VPN", url: "https://pickify.io/vpn" },
    { name: "Speed Tests", url: "https://pickify.io/vpn/speed-tests" },
  ];

  const faqs = [
    {
      question: "What is the fastest VPN in 2025?",
      answer: `Based on Security.org's benchmark testing, ${fastest?.product_name} achieved ${fastest?.avg_download} Mbps download speed with ${fastest?.retention}% speed retention on a ~95 Mbps baseline connection.`,
    },
    {
      question: "How are VPN speeds tested?",
      answer:
        "Speed tests measure download speed, upload speed, and latency (ping) with and without the VPN connected. Security.org runs 10 tests per VPN and averages the results, then calculates the percentage difference from baseline speeds.",
    },
    {
      question: "Where does this speed data come from?",
      answer:
        "This data is sourced from Security.org's independent VPN speed testing. They test each VPN multiple times and average the results against a ~95 Mbps baseline connection. We update this data periodically to reflect their latest benchmarks.",
    },
    {
      question: "What affects VPN speed?",
      answer:
        "VPN speed depends on server distance, server load, encryption protocol, your base internet speed, and the VPN provider's infrastructure quality. WireGuard-based protocols like NordLynx typically offer the best performance.",
    },
  ];

  const quickAnswerProps = {
    question: "What is the fastest VPN?",
    answer: `Based on Security.org's speed testing, ${fastest?.product_name} is the fastest VPN, averaging ${fastest?.avg_download} Mbps download speed with ${fastest?.retention}% speed retention on a ~95 Mbps baseline connection.`,
    supportingFacts: [
      { label: "Fastest", value: fastest?.product_name || "N/A" },
      { label: "Avg Speed", value: `${fastest?.avg_download} Mbps` },
      { label: "Retention", value: `${fastest?.retention}%` },
      { label: "Source", value: "Security.org" },
    ],
    updatedDate: "December 2024",
    variant: "default" as const,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema Markup */}
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <DatasetSchema
        name="VPN Speed Test Comparison - Data from Security.org"
        description="VPN speed test results sourced from Security.org's independent benchmark testing. Includes download speed, upload speed, and latency measurements for major VPN providers."
        url="https://pickify.io/vpn/speed-tests"
        temporalCoverage="2024-12"
        variableMeasured={[
          "Download Speed (Mbps)",
          "Upload Speed (Mbps)",
          "Latency (ms)",
          "Speed Retention (%)",
        ]}
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Speed Benchmarks
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                VPN Speed Test Results
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Real VPN speed data from independent testing by{" "}
                <a
                  href="https://www.security.org/vpn/speed-test/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Security.org
                </a>
                . Compare download speeds, upload speeds, and latency across
                top VPN providers.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Data from: December 2024
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {products.length} VPNs compared
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <QuickAnswer {...quickAnswerProps} />
            </div>
          </div>
        </section>

        {/* Speed Comparison */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Speed Comparison</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <SpeedComparisonChart
                products={products.slice(0, 6).map((p) => ({
                  slug: p.slug,
                  name: p.name,
                }))}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Data Source & Methodology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Download className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Baseline Connection</p>
                      <p className="text-sm text-muted-foreground">
                        ~95 Mbps download / ~94 Mbps upload
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Testing Method</p>
                      <p className="text-sm text-muted-foreground">
                        10 tests per VPN, averaged results
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Source</p>
                      <p className="text-sm text-muted-foreground">
                        <a
                          href="https://www.security.org/vpn/speed-test/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Security.org VPN Speed Tests
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Individual VPN Results */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Detailed Results by VPN</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => (
                <SpeedTestResults
                  key={product.slug}
                  productSlug={product.slug}
                  showAllLocations={false}
                />
              ))}
            </div>
          </div>
        </section>

        {/* AI-Citable Summaries */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Key Findings</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {summaries.map(({ slug, summary }) => (
                <Card key={slug}>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground">{summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-6 bg-card"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <h3
                      className="font-semibold text-foreground mb-2"
                      itemProp="name"
                    >
                      {faq.question}
                    </h3>
                    <div
                      itemScope
                      itemType="https://schema.org/Answer"
                      itemProp="acceptedAnswer"
                    >
                      <p className="text-muted-foreground" itemProp="text">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 md:py-12 border-t">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/vpn">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All VPNs
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
