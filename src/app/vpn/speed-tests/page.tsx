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
    "Independent VPN speed test results from January 2025. We tested download speeds, upload speeds, and latency across multiple server locations.",
  alternates: {
    canonical: "https://pickify.io/vpn/speed-tests",
  },
  openGraph: {
    title: "VPN Speed Tests 2025 - Real Performance Data | Pickify",
    description:
      "Independent VPN speed test results from January 2025. See how NordVPN, ExpressVPN, Surfshark and others perform.",
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
      answer: `${fastest?.product_name} is the fastest VPN in our January 2025 testing, averaging ${fastest?.avg_download} Mbps download speed with ${fastest?.retention}% speed retention.`,
    },
    {
      question: "How do you test VPN speeds?",
      answer:
        "We test VPN speeds using a 100 Mbps baseline connection from multiple locations (New York, London, etc.). We measure download speed, upload speed, and latency with and without the VPN connected.",
    },
    {
      question: "How often do you update speed tests?",
      answer:
        "We run VPN speed tests monthly to ensure our data reflects current performance. Server infrastructure changes can affect speeds, so regular testing is essential.",
    },
    {
      question: "What affects VPN speed?",
      answer:
        "VPN speed depends on server distance, server load, encryption protocol, your base internet speed, and the VPN provider's infrastructure quality.",
    },
  ];

  const quickAnswerProps = {
    question: "What is the fastest VPN?",
    answer: `${fastest?.product_name} is the fastest VPN in our January 2025 speed tests, averaging ${fastest?.avg_download} Mbps with ${fastest?.retention}% speed retention across multiple server locations. Testing methodology: 100 Mbps baseline, multiple global locations.`,
    supportingFacts: [
      { label: "Fastest", value: fastest?.product_name || "N/A" },
      { label: "Avg Speed", value: `${fastest?.avg_download} Mbps` },
      { label: "Retention", value: `${fastest?.retention}%` },
      { label: "Tested", value: `${products.length} VPNs` },
    ],
    updatedDate: "January 2025",
    variant: "default" as const,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema Markup */}
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <DatasetSchema
        name="Pickify VPN Speed Test Results 2025"
        description="Monthly speed tests across major VPN providers measuring download speed, upload speed, and latency from multiple global locations."
        url="https://pickify.io/vpn/speed-tests"
        temporalCoverage="2024-01/2025-01"
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
        <section className="py-12 bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Original Research
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                VPN Speed Tests 2025
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Independent speed test results from our monthly VPN testing.
                We measure real-world performance across multiple server
                locations.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Last updated: January 2025
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {products.length} VPNs tested
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <QuickAnswer {...quickAnswerProps} />
            </div>
          </div>
        </section>

        {/* Speed Comparison */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Speed Comparison</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <SpeedComparisonChart
                products={products.slice(0, 6).map((p) => ({
                  slug: p.slug,
                  name: p.name,
                }))}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Methodology</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Download className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Baseline Connection</p>
                      <p className="text-sm text-muted-foreground">
                        100 Mbps symmetrical fiber connection
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Upload className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Test Locations</p>
                      <p className="text-sm text-muted-foreground">
                        New York, London, Tokyo, Sydney
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Test Protocol</p>
                      <p className="text-sm text-muted-foreground">
                        5 tests per server, averaged results
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Individual VPN Results */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Detailed Results by VPN</h2>
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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Key Findings</h2>
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
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-card"
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
        <section className="py-8 border-t">
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
