import { Metadata } from "next";
import Link from "next/link";
import { Scale, ArrowLeft, Trophy, Wifi, Zap, DollarSign } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { ProviderCard, SpeedComparison } from "@/components/isp";
import { RatingCircle, DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema, FAQSchema, QuickAnswer } from "@/components/seo";
import { generateCompareHubFAQs } from "@/lib/faq-generator";
import { getIspProducts, getComparisonPairs } from "@/data";

export const metadata: Metadata = {
  title: "Compare Internet Providers 2025 - Side-by-Side ISP Comparison | Pickify",
  description:
    "Compare all major internet providers side by side. See speeds, prices, pros & cons, and find the best ISP for your needs.",
};

export default function ISPComparisonPage() {
  const providers = getIspProducts();
  const comparisonPairs = getComparisonPairs(providers);
  const topProvider = providers[0];

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
    { name: "Compare", url: "https://pickify.io/internet-providers/compare" },
  ];

  // Group providers by type
  const fiberProviders = providers.filter((p) => p.technologies.includes("fiber"));
  const cableProviders = providers.filter((p) => p.technologies.includes("cable"));
  const satelliteProviders = providers.filter((p) =>
    p.technologies.includes("satellite")
  );

  // Generate FAQs for AI citation
  const faqs = generateCompareHubFAQs(providers, "internet providers");

  // Generate QuickAnswer for AI citation
  const quickAnswerProps = {
    question: "How do I compare internet providers?",
    answer: `We've tested and ranked ${providers.length} internet providers across speed, price, reliability, and features. ${topProvider.name} is our top pick with a ${topProvider.overall_rating}/10 rating. Compare fiber, cable, and satellite options to find the best ISP for your needs.`,
    supportingFacts: [
      { label: "Top Rated", value: topProvider.name },
      { label: "Providers Tested", value: `${providers.length}` },
      { label: "Fiber Options", value: `${fiberProviders.length}` },
      { label: "Cable Options", value: `${cableProviders.length}` },
    ],
    updatedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    variant: "default" as const,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href="/internet-providers"
                className="text-muted-foreground hover:text-foreground"
              >
                Internet Providers
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Compare</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Scale className="w-3 h-3 mr-1" />
                Comprehensive Comparison
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Compare All Internet Providers
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We've tested and compared {providers.length} major internet service
                providers to help you find the best one for your needs. See how they
                stack up on speed, price, reliability, and features.
              </p>
              <DisclosureBanner variant="inline" />
            </div>
          </div>
        </section>

        {/* AI-Optimized Quick Answer */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <QuickAnswer {...quickAnswerProps} />
            </div>
          </div>
        </section>

        {/* Top Rated Provider */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-warning" />
              <h2 className="text-xl font-bold">Our Top Pick</h2>
            </div>
            <Card className="border-primary shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <Badge className="bg-warning text-warning-foreground mb-2">
                      Editor's Choice
                    </Badge>
                    <h3 className="text-2xl font-bold">{topProvider.name}</h3>
                    <p className="text-muted-foreground mt-1">
                      {topProvider.short_description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Max Speed
                        </span>
                        <p className="font-semibold">
                          {topProvider.max_download_speed >= 1000
                            ? `${(topProvider.max_download_speed / 1000).toFixed(1)} Gbps`
                            : `${topProvider.max_download_speed} Mbps`}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Starting Price
                        </span>
                        <p className="font-semibold text-primary">
                          ${Math.min(...topProvider.pricing.map((p) => p.price))}/mo
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <RatingCircle score={topProvider.overall_rating} size="lg" />
                    <Button asChild>
                      <Link href={`/internet-providers/provider/${topProvider.slug}`}>
                        Read Review
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Speed Comparison */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Speed Comparison
            </h2>
            <Card>
              <CardContent className="p-6">
                <SpeedComparison providers={providers} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* All Providers Ranked */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              All {providers.length} Providers Ranked
            </h2>
            <div className="space-y-4">
              {providers.map((provider, index) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* By Technology Type */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Providers by Connection Type</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Fiber */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Badge className="bg-green-100 text-green-800">Fiber</Badge>
                    Best for Speed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {fiberProviders.slice(0, 5).map((provider) => (
                      <li key={provider.id}>
                        <Link
                          href={`/internet-providers/provider/${provider.slug}`}
                          className="flex items-center justify-between hover:text-primary transition-colors"
                        >
                          <span>{provider.name}</span>
                          <Badge variant="outline">
                            {provider.overall_rating.toFixed(1)}
                          </Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Cable */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Badge className="bg-blue-100 text-blue-800">Cable</Badge>
                    Most Available
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cableProviders.slice(0, 5).map((provider) => (
                      <li key={provider.id}>
                        <Link
                          href={`/internet-providers/provider/${provider.slug}`}
                          className="flex items-center justify-between hover:text-primary transition-colors"
                        >
                          <span>{provider.name}</span>
                          <Badge variant="outline">
                            {provider.overall_rating.toFixed(1)}
                          </Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Satellite */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Badge className="bg-orange-100 text-orange-800">Satellite</Badge>
                    Available Everywhere
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {satelliteProviders.map((provider) => (
                      <li key={provider.id}>
                        <Link
                          href={`/internet-providers/provider/${provider.slug}`}
                          className="flex items-center justify-between hover:text-primary transition-colors"
                        >
                          <span>{provider.name}</span>
                          <Badge variant="outline">
                            {provider.overall_rating.toFixed(1)}
                          </Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Head-to-Head Comparisons */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Head-to-Head Comparisons</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparisonPairs.slice(0, 12).map(([providerA, providerB]) => (
                <Link
                  key={`${providerA.slug}-vs-${providerB.slug}`}
                  href={`/internet-providers/compare/${providerA.slug}-vs-${providerB.slug}`}
                  className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{providerA.name}</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium">{providerB.name}</span>
                    </div>
                    <Scale className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>

            {comparisonPairs.length > 12 && (
              <p className="text-center text-muted-foreground mt-4">
                + {comparisonPairs.length - 12} more comparisons available
              </p>
            )}
          </div>
        </section>

        {/* Editorial Content */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h2>How We Compare Internet Providers</h2>
              <p>
                Choosing an internet service provider is a significant decision
                that affects your daily life. We evaluate each ISP based on
                several key factors to give you an objective comparison.
              </p>

              <h3>Speed Performance</h3>
              <p>
                We look at both advertised and real-world speeds, including
                download speed, upload speed, and latency. Fiber providers
                typically offer the fastest and most consistent speeds, while
                cable can vary during peak hours.
              </p>

              <h3>Pricing & Value</h3>
              <p>
                We consider the full cost of service including equipment rental,
                installation fees, and price increases after promotional periods.
                Data caps can also impact value if you're a heavy user.
              </p>

              <h3>Reliability & Coverage</h3>
              <p>
                Uptime and service reliability are crucial. We also factor in
                geographic availability—some excellent providers only serve
                limited areas.
              </p>

              <h3>Customer Experience</h3>
              <p>
                Installation process, customer service quality, contract terms,
                and billing transparency all contribute to the overall customer
                experience and our ratings.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section - AI Citation Optimized */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Frequently Asked Questions About Comparing ISPs
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-5 bg-card"
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
                      <p
                        className="text-muted-foreground text-sm leading-relaxed"
                        itemProp="text"
                      >
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
                Back to Internet Providers
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
