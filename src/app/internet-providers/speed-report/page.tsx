import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Zap, Calendar, CheckCircle, ExternalLink, Clock, Wifi, ArrowUpDown } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BreadcrumbSchema,
  FAQSchema,
  DatasetSchema,
  QuickAnswer,
} from "@/components/seo";
import {
  ispSpeedData,
  getTopISPsBySpeed,
  generateISPSpeedCitation,
  getFiberISPs,
  getCableISPs,
  DATA_SOURCES,
  type ISPSpeedData,
} from "@/lib/api";

export const metadata: Metadata = {
  title: "Internet Provider Speed Report 2025 - Real Speed Test Data | Pickify",
  description:
    "Independent ISP speed test results for 2025. Compare real download and upload speeds from Google Fiber, Verizon Fios, Xfinity, Spectrum, and more.",
  alternates: {
    canonical: "https://pickify.io/internet-providers/speed-report",
  },
  openGraph: {
    title: "Internet Provider Speed Report 2025 - Real Speed Test Data | Pickify",
    description:
      "Independent ISP speed test results for 2025. Real data from millions of speed tests across major internet providers.",
  },
};

export default function ISPSpeedReportPage() {
  // Use Reviews.org authoritative data
  const topISPs = getTopISPsBySpeed(11);
  const fastest = topISPs[0];
  const fiberISPs = getFiberISPs();
  const cableISPs = getCableISPs();

  // Generate summaries from ISP data
  const summaries = ispSpeedData.map((isp) => ({
    slug: isp.slug,
    name: isp.name,
    summary: generateISPSpeedCitation(isp),
  }));

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
    { name: "Speed Report", url: "https://pickify.io/internet-providers/speed-report" },
  ];

  const faqs = [
    {
      question: "Which internet provider has the fastest speeds?",
      answer: `${fastest?.name} is the fastest ISP with ${fastest?.avgDownloadMbps} Mbps average download and ${fastest?.avgUploadMbps} Mbps average upload speeds, based on independent speed testing by Reviews.org.`,
    },
    {
      question: "Is fiber internet faster than cable?",
      answer:
        "Yes, fiber internet is generally faster and more reliable than cable. Fiber providers like Google Fiber, Verizon Fios, and AT&T Fiber offer symmetrical upload/download speeds, while cable providers like Xfinity and Spectrum have much slower upload speeds.",
    },
    {
      question: "What is a good internet speed?",
      answer:
        "For most households, 100-200 Mbps is sufficient for streaming, gaming, and video calls. The FCC's current broadband standard is 100 Mbps download / 20 Mbps upload. Power users and large families may benefit from 300+ Mbps.",
    },
    {
      question: "Where does this speed data come from?",
      answer:
        "Speed data is sourced from Reviews.org, which conducts independent speed tests using proprietary methodology. Their data represents real-world speeds experienced by actual customers.",
    },
  ];

  const quickAnswerProps = {
    question: "Which internet provider is the fastest?",
    answer: `${fastest?.name} is the fastest ISP with ${fastest?.avgDownloadMbps} Mbps average download and ${fastest?.avgUploadMbps} Mbps average upload speeds. Data sourced from Reviews.org independent speed testing.`,
    supportingFacts: [
      { label: "Fastest ISP", value: fastest?.name || "N/A" },
      { label: "Download", value: `${fastest?.avgDownloadMbps} Mbps` },
      { label: "Upload", value: `${fastest?.avgUploadMbps} Mbps` },
      { label: "Max Speed", value: `${fastest?.maxAdvertisedMbps} Mbps` },
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
        name="Pickify Internet Provider Speed Report 2025"
        description="Independent speed test data for major US internet service providers, including download speeds, upload speeds, and performance rankings."
        url="https://pickify.io/internet-providers/speed-report"
        temporalCoverage="2024-01/2024-12"
        variableMeasured={[
          "Average Download Speed (Mbps)",
          "Average Upload Speed (Mbps)",
          "Maximum Advertised Speed (Mbps)",
          "National Speed Ranking",
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
                Speed Test Data
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Internet Provider Speed Report 2025
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Independent speed test results from millions of real-world tests.
                Compare actual download and upload speeds across major ISPs.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Data source: Reviews.org
                </span>
                <span className="flex items-center gap-1">
                  <Wifi className="w-4 h-4" />
                  {ispSpeedData.length} providers tracked
                </span>
                <a
                  href={DATA_SOURCES.reviewsOrg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View source
                </a>
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

        {/* Speed Ranking */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">2025 Speed Ranking</h2>
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {topISPs.map((isp, index) => (
                      <div
                        key={isp.slug}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-muted-foreground w-8">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{isp.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {isp.type}
                              </Badge>
                              <p className="text-sm text-muted-foreground">
                                Up to {isp.maxAdvertisedMbps.toLocaleString()} Mbps
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">
                            {isp.avgDownloadMbps} Mbps
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isp.avgUploadMbps} Mbps upload
                          </p>
                          {index === 0 && (
                            <Badge className="bg-success/10 text-success text-xs mt-1">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Fastest
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Data sourced from{" "}
                <a
                  href={DATA_SOURCES.reviewsOrg.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  Reviews.org
                </a>
                , {DATA_SOURCES.reviewsOrg.description}
              </p>
            </div>
          </div>
        </section>

        {/* Fiber vs Cable Comparison */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Fiber vs Cable: Speed Comparison</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Fiber Column */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">Fiber Providers</h3>
                  </div>
                  <div className="space-y-3">
                    {fiberISPs.slice(0, 5).map((isp) => (
                      <div key={isp.slug} className="flex justify-between items-center">
                        <span className="text-sm">{isp.name}</span>
                        <div className="text-right">
                          <span className="font-medium">{isp.avgDownloadMbps}</span>
                          <span className="text-muted-foreground text-sm"> / </span>
                          <span className="text-muted-foreground text-sm">{isp.avgUploadMbps} Mbps</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <ArrowUpDown className="w-4 h-4 inline mr-1" />
                      Fiber offers symmetrical upload/download speeds
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cable Column */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Wifi className="w-5 h-5 text-muted-foreground" />
                    <h3 className="font-semibold text-lg">Cable Providers</h3>
                  </div>
                  <div className="space-y-3">
                    {cableISPs.map((isp) => (
                      <div key={isp.slug} className="flex justify-between items-center">
                        <span className="text-sm">{isp.name}</span>
                        <div className="text-right">
                          <span className="font-medium">{isp.avgDownloadMbps}</span>
                          <span className="text-muted-foreground text-sm"> / </span>
                          <span className="text-muted-foreground text-sm">{isp.avgUploadMbps} Mbps</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      <ArrowUpDown className="w-4 h-4 inline mr-1" />
                      Cable has slower upload speeds vs download
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Individual ISP Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Detailed Reports by Provider</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ispSpeedData.map((isp) => (
                <ISPSpeedCard key={isp.slug} isp={isp} />
              ))}
            </div>
          </div>
        </section>

        {/* AI-Citable Summaries */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Key Findings</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {summaries.map(({ slug, name, summary }) => (
                <Card key={slug}>
                  <CardContent className="p-4">
                    <p className="font-medium mb-1">{name}</p>
                    <p className="text-muted-foreground">{summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
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
              <Link href="/internet-providers">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Internet Providers
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ISP Speed Card Component
function ISPSpeedCard({ isp }: { isp: ISPSpeedData }) {
  // Calculate upload/download ratio for visualization
  const uploadRatio = Math.round((isp.avgUploadMbps / isp.avgDownloadMbps) * 100);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Wifi className="w-5 h-5 text-primary" />
            {isp.name}
          </h3>
          <Badge variant="outline" className="text-xs capitalize">
            {isp.type}
          </Badge>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {isp.avgDownloadMbps}
            </div>
            <div className="text-xs text-muted-foreground">Download Mbps</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {isp.avgUploadMbps}
            </div>
            <div className="text-xs text-muted-foreground">Upload Mbps</div>
          </div>
        </div>

        {/* Additional info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Max Advertised</span>
            <span className="font-medium">{isp.maxAdvertisedMbps.toLocaleString()} Mbps</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">National Rank</span>
            <span className="font-medium">#{isp.rank}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Upload Ratio</span>
            <span className={`font-medium ${uploadRatio >= 50 ? "text-success" : "text-warning"}`}>
              {uploadRatio}% of download
            </span>
          </div>
        </div>

        {/* Source link */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Updated: {isp.lastUpdated}</span>
          </div>
          <a
            href={isp.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Source
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
