import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Activity, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
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
import { UptimeDisplay } from "@/components/data";
import { getProductsByVertical } from "@/data";
import {
  hostingUptimeRecords,
  compareHostingUptime,
  generateUptimeSummary,
} from "@/data/tracking/speed-tests";

export const metadata: Metadata = {
  title: "Web Hosting Uptime Report 2024 - Real Monitoring Data | Pickify",
  description:
    "Independent web hosting uptime monitoring results for 2024. See real uptime percentages, downtime incidents, and reliability data.",
  openGraph: {
    title: "Web Hosting Uptime Report 2024 - Real Monitoring Data | Pickify",
    description:
      "Independent web hosting uptime monitoring results for 2024. Real data from 12 months of continuous monitoring.",
  },
};

export default function HostingUptimeReportPage() {
  const products = getProductsByVertical("hosting");
  const productSlugs = products.map((p) => p.slug);
  const uptimeComparison = compareHostingUptime(productSlugs, 2024);

  // Find most reliable host
  const mostReliable = uptimeComparison[0];

  // Generate summaries
  const summaries = productSlugs
    .map((slug) => ({
      slug,
      name: products.find((p) => p.slug === slug)?.name || slug,
      summary: generateUptimeSummary(slug),
    }))
    .filter((s) => s.summary);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Hosting", url: "https://pickify.io/hosting" },
    { name: "Uptime Report", url: "https://pickify.io/hosting/uptime-report" },
  ];

  const faqs = [
    {
      question: "Which web host has the best uptime?",
      answer: `${mostReliable?.product_name} had the best uptime in 2024 at ${mostReliable?.uptime_percentage}% with only ${mostReliable?.downtime_minutes} minutes of total downtime (Pickify monitoring).`,
    },
    {
      question: "What is good uptime for web hosting?",
      answer:
        "Good uptime is 99.9% or higher, which equals about 8.7 hours of downtime per year. Excellent uptime is 99.99% (under 1 hour/year). Our monitoring shows most major hosts achieve 99.9%+.",
    },
    {
      question: "How do you monitor uptime?",
      answer:
        "We use UptimeRobot to monitor test sites on each hosting provider every 5 minutes, 24/7. We track both full outages and degraded performance periods.",
    },
    {
      question: "Is 99.9% uptime good enough?",
      answer:
        "99.9% uptime means about 8.7 hours of potential downtime per year. For most websites, this is acceptable. Critical business sites may want 99.99% or higher.",
    },
  ];

  const quickAnswerProps = {
    question: "Which web host has the best uptime?",
    answer: `${mostReliable?.product_name} had the best uptime in 2024 at ${mostReliable?.uptime_percentage}% with only ${mostReliable?.downtime_minutes} minutes of total downtime. Based on 12 months of continuous monitoring via UptimeRobot.`,
    supportingFacts: [
      { label: "Most Reliable", value: mostReliable?.product_name || "N/A" },
      { label: "Uptime", value: `${mostReliable?.uptime_percentage}%` },
      { label: "Downtime", value: `${mostReliable?.downtime_minutes} min` },
      { label: "Monitored", value: `${products.length} hosts` },
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
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Monitoring period: Jan-Dec 2024
                </span>
                <span className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  {products.length} hosts monitored
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

        {/* Uptime Ranking */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">2024 Uptime Ranking</h2>
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {uptimeComparison.map((host, index) => (
                      <div
                        key={host.product_slug}
                        className="flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-muted-foreground w-8">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{host.product_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {host.downtime_minutes} min downtime
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xl font-bold ${
                              host.uptime_percentage >= 99.99
                                ? "text-success"
                                : host.uptime_percentage >= 99.9
                                  ? "text-primary"
                                  : "text-warning"
                            }`}
                          >
                            {host.uptime_percentage}%
                          </p>
                          {host.uptime_percentage >= 99.99 && (
                            <Badge className="bg-success/10 text-success text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Excellent
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Individual Host Reports */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Detailed Reports by Host</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((product) => (
                <UptimeDisplay
                  key={product.slug}
                  productSlug={product.slug}
                  year={2024}
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
