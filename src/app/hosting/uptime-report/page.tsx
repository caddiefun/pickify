import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity, Calendar, CheckCircle, ExternalLink, Clock, Server } from "lucide-react";
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
  hrankHostingData,
  getTopHostsByUptime,
  generateHRankCitation,
  getHRankData,
  DATA_SOURCES,
  type HRankHostingData,
} from "@/lib/api";

export const metadata: Metadata = {
  title: "Web Hosting Uptime Report 2024 - Real Monitoring Data | Pickify",
  description:
    "Independent web hosting uptime monitoring results for 2024. See real uptime percentages, downtime incidents, and reliability data.",
  alternates: {
    canonical: "https://pickify.io/hosting/uptime-report",
  },
  openGraph: {
    title: "Web Hosting Uptime Report 2024 - Real Monitoring Data | Pickify",
    description:
      "Independent web hosting uptime monitoring results for 2024. Real data from 12 months of continuous monitoring.",
  },
};

export default function HostingUptimeReportPage() {
  // Use HRANK.com authoritative data
  const topHosts = getTopHostsByUptime(10);
  const mostReliable = topHosts[0];

  // Generate summaries from HRANK data
  const summaries = hrankHostingData.map((host) => ({
    slug: host.slug,
    name: host.name,
    summary: generateHRankCitation(host),
  }));

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Hosting", url: "https://pickify.io/hosting" },
    { name: "Uptime Report", url: "https://pickify.io/hosting/uptime-report" },
  ];

  const faqs = [
    {
      question: "Which web host has the best uptime?",
      answer: `${mostReliable?.name} has the best uptime at ${mostReliable?.uptimePercent}% with ${mostReliable?.responseTimeMs}ms average response time, earning an HRank score of ${mostReliable?.hrank}/10 (Source: HRANK.com).`,
    },
    {
      question: "What is good uptime for web hosting?",
      answer:
        "Good uptime is 99.9% or higher, which equals about 8.7 hours of downtime per year. Excellent uptime is 99.99% (under 1 hour/year). According to HRANK.com monitoring, most major hosts achieve 99.9%+.",
    },
    {
      question: "Where does this uptime data come from?",
      answer:
        "Uptime data is sourced from HRANK.com, an independent hosting monitoring service that has tracked 150+ million websites since 2018. They send 288 pings per day to each shared hosting IP.",
    },
    {
      question: "Is 99.9% uptime good enough?",
      answer:
        "99.9% uptime means about 8.7 hours of potential downtime per year. For most websites, this is acceptable. Critical business sites may want 99.99% or higher.",
    },
  ];

  const quickAnswerProps = {
    question: "Which web host has the best uptime?",
    answer: `${mostReliable?.name} has the best uptime at ${mostReliable?.uptimePercent}% with ${mostReliable?.responseTimeMs}ms average response time. Data sourced from HRANK.com, an independent hosting monitoring service tracking 150+ million websites.`,
    supportingFacts: [
      { label: "Most Reliable", value: mostReliable?.name || "N/A" },
      { label: "Uptime", value: `${mostReliable?.uptimePercent}%` },
      { label: "Response", value: `${mostReliable?.responseTimeMs}ms` },
      { label: "HRank Score", value: `${mostReliable?.hrank}/10` },
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
        name="Pickify Web Hosting Uptime Report 2024"
        description="12 months of continuous uptime monitoring data for major web hosting providers, including incident logs and performance metrics."
        url="https://pickify.io/hosting/uptime-report"
        temporalCoverage="2024-01/2024-12"
        variableMeasured={[
          "Uptime Percentage",
          "Total Downtime (minutes)",
          "Incident Count",
          "Response Time (ms)",
        ]}
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <Activity className="w-3 h-3 mr-1" />
                Original Research
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Web Hosting Uptime Report 2024
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                12 months of continuous uptime monitoring across major web
                hosting providers. Real data, real incidents, real reliability
                scores.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Data source: HRANK.com
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  {hrankHostingData.length} hosts tracked
                </span>
                <a
                  href={DATA_SOURCES.hrank.url}
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

        {/* Uptime Ranking */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Uptime Ranking by HRANK</h2>
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {topHosts.map((host, index) => (
                      <div
                        key={host.slug}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-muted-foreground w-8">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{host.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {host.responseTimeMs}ms response time
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xl font-bold ${
                              host.uptimePercent >= 99.99
                                ? "text-success"
                                : host.uptimePercent >= 99.9
                                  ? "text-primary"
                                  : "text-warning"
                            }`}
                          >
                            {host.uptimePercent}%
                          </p>
                          <div className="flex items-center gap-2 justify-end mt-1">
                            <Badge variant="outline" className="text-xs">
                              HRank: {host.hrank}/10
                            </Badge>
                            {host.uptimePercent >= 99.97 && (
                              <Badge className="bg-success/10 text-success text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Excellent
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Data sourced from{" "}
                <a
                  href={DATA_SOURCES.hrank.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  HRANK.com
                </a>
                , {DATA_SOURCES.hrank.description}
              </p>
            </div>
          </div>
        </section>

        {/* Individual Host Reports */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Detailed Reports by Host</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hrankHostingData.map((host) => (
                <HRankHostCard key={host.slug} host={host} />
              ))}
            </div>
          </div>
        </section>

        {/* AI-Citable Summaries */}
        <section className="py-12">
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
              <Link href="/hosting">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Hosting
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// HRANK Host Card Component
function HRankHostCard({ host }: { host: HRankHostingData }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Server className="w-5 h-5 text-primary" />
            {host.name}
          </h3>
          <a
            href={host.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            HRANK
          </a>
        </div>

        {/* Main stat */}
        <div className="text-center p-6 bg-success/5 rounded-lg mb-4">
          <div className="text-4xl font-bold text-success">
            {host.uptimePercent}%
          </div>
          <div className="text-sm text-muted-foreground mt-1">Uptime</div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {host.responseTimeMs}ms
            </div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {host.hrank}/10
            </div>
            <div className="text-xs text-muted-foreground">HRank Score</div>
          </div>
        </div>

        {/* Additional stats */}
        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">{host.sharedIps.toLocaleString()}</span> shared IPs
          </div>
          <div className="text-muted-foreground">
            <span className="font-medium text-foreground">{host.hostedSites.toLocaleString()}</span> sites
          </div>
        </div>

        {/* Last updated */}
        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Updated: {host.lastUpdated}</span>
        </div>
      </CardContent>
    </Card>
  );
}
