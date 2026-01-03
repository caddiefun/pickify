import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Trophy, ArrowLeft, Scale, Wifi, Check, X } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { SpeedComparison } from "@/components/isp";
import {
  RatingCircle,
  ProsConsList,
  DisclosureBanner,
} from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbSchema, ComparisonSchema } from "@/components/seo";
import { getIspProducts, getIspProductBySlug, generateComparison, getComparisonPairs } from "@/data";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";
import type { ISPProduct } from "@/data/products/isp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseComparisonSlug(slug: string): { productA: string; productB: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { productA: match[1], productB: match[2] };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);

  if (!parsed) {
    return { title: "Not Found" };
  }

  const providerA = getIspProductBySlug(parsed.productA);
  const providerB = getIspProductBySlug(parsed.productB);

  if (!providerA || !providerB) {
    return { title: "Not Found" };
  }

  return {
    title: `${providerA.name} vs ${providerB.name} - Which ISP Is Better in 2025? | Pickify`,
    description: `Compare ${providerA.name} and ${providerB.name} side by side. See speeds, pricing, pros & cons to find the best internet provider for you.`,
  };
}

export default async function ISPComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseComparisonSlug(slug);

  if (!parsed) {
    notFound();
  }

  const providerA = getIspProductBySlug(parsed.productA) as ISPProduct | undefined;
  const providerB = getIspProductBySlug(parsed.productB) as ISPProduct | undefined;

  if (!providerA || !providerB) {
    notFound();
  }

  const comparison = generateComparison(providerA, providerB);
  const winner = comparison.winner as ISPProduct;

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
    { name: "Compare", url: "https://pickify.io/internet-providers/compare" },
    { name: `${providerA.name} vs ${providerB.name}`, url: `https://pickify.io/internet-providers/compare/${slug}` },
  ];

  const technologyLabels: Record<string, string> = {
    fiber: "Fiber",
    cable: "Cable",
    dsl: "DSL",
    fixed_wireless: "5G/Fixed Wireless",
    satellite: "Satellite",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ComparisonSchema
        productA={providerA}
        productB={providerB}
        verticalSlug="internet-providers"
        winner={winner}
      />
      <BreadcrumbSchema items={breadcrumbs} />
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
              <Link
                href="/internet-providers/compare"
                className="text-muted-foreground hover:text-foreground"
              >
                Compare
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">
                {providerA.name} vs {providerB.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              <Scale className="w-3 h-3 mr-1" />
              Head-to-Head Comparison
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {providerA.name} vs {providerB.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-6">
              Comparing two of the most popular internet service providers.
              See how {providerA.name} and {providerB.name} stack up on speed,
              price, coverage, and overall value.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <DisclosureBanner variant="inline" />
              <Link
                href="/internet-providers/compare"
                className="text-sm text-primary hover:underline"
              >
                See all ISP comparisons →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Comparison Cards */}
        <section className="py-8 -mt-4">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[providerA, providerB].map((provider) => (
                <Card
                  key={provider.id}
                  className={
                    winner.id === provider.id
                      ? "border-success shadow-glow-success relative overflow-hidden"
                      : ""
                  }
                >
                  {winner.id === provider.id && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-success" />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {provider.logo_url ? (
                            <Image
                              src={provider.logo_url}
                              alt={provider.name}
                              width={40}
                              height={40}
                              className="rounded"
                            />
                          ) : (
                            <Wifi className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          {winner.id === provider.id && (
                            <Badge className="bg-success text-success-foreground mt-1">
                              <Trophy className="w-3 h-3 mr-1" />
                              Winner
                            </Badge>
                          )}
                        </div>
                      </div>
                      <RatingCircle score={provider.overall_rating} size="md" />
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {provider.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {technologyLabels[tech] || tech}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      {provider.short_description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Max Download</p>
                        <p className="font-semibold">
                          {provider.max_download_speed >= 1000
                            ? `${(provider.max_download_speed / 1000).toFixed(1)} Gbps`
                            : `${provider.max_download_speed} Mbps`}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Max Upload</p>
                        <p className="font-semibold">
                          {provider.max_upload_speed >= 1000
                            ? `${(provider.max_upload_speed / 1000).toFixed(1)} Gbps`
                            : `${provider.max_upload_speed} Mbps`}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Starting From</p>
                        <p className="font-semibold text-primary">
                          {getStartingPrice(provider)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Coverage</p>
                        <p className="font-semibold">
                          {provider.coverage_states.length} states
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className={`flex-1 ${winner.id === provider.id ? "gradient-primary" : ""}`}
                        asChild
                      >
                        <a
                          href={generateAffiliateLink(provider, { campaign: "comparison" })}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Check Availability
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/internet-providers/provider/${provider.slug}`}>
                          Review
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Speed Comparison */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Speed Comparison</h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-6">
                <SpeedComparison providers={[providerA, providerB]} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Feature Comparison</h2>
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Feature</th>
                        <th className="text-center py-3 px-4">{providerA.name}</th>
                        <th className="text-center py-3 px-4">{providerB.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Max Download Speed</td>
                        <td className="text-center py-3 px-4">
                          {providerA.max_download_speed >= 1000
                            ? `${(providerA.max_download_speed / 1000).toFixed(1)} Gbps`
                            : `${providerA.max_download_speed} Mbps`}
                        </td>
                        <td className="text-center py-3 px-4">
                          {providerB.max_download_speed >= 1000
                            ? `${(providerB.max_download_speed / 1000).toFixed(1)} Gbps`
                            : `${providerB.max_download_speed} Mbps`}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Max Upload Speed</td>
                        <td className="text-center py-3 px-4">
                          {providerA.max_upload_speed >= 1000
                            ? `${(providerA.max_upload_speed / 1000).toFixed(1)} Gbps`
                            : `${providerA.max_upload_speed} Mbps`}
                        </td>
                        <td className="text-center py-3 px-4">
                          {providerB.max_upload_speed >= 1000
                            ? `${(providerB.max_upload_speed / 1000).toFixed(1)} Gbps`
                            : `${providerB.max_upload_speed} Mbps`}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Starting Price</td>
                        <td className="text-center py-3 px-4">{getStartingPrice(providerA)}</td>
                        <td className="text-center py-3 px-4">{getStartingPrice(providerB)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Data Cap</td>
                        <td className="text-center py-3 px-4">
                          {providerA.features.find((f) => f.name === "data_cap")?.value || "Varies"}
                        </td>
                        <td className="text-center py-3 px-4">
                          {providerB.features.find((f) => f.name === "data_cap")?.value || "Varies"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Contract Required</td>
                        <td className="text-center py-3 px-4">
                          {providerA.features.find((f) => f.name === "contract_required")?.value === false ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                          <span className="text-xs text-muted-foreground block">
                            {providerA.features.find((f) => f.name === "contract_required")?.value === false
                              ? "No contract"
                              : "Contract"}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          {providerB.features.find((f) => f.name === "contract_required")?.value === false ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                          <span className="text-xs text-muted-foreground block">
                            {providerB.features.find((f) => f.name === "contract_required")?.value === false
                              ? "No contract"
                              : "Contract"}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-medium">Coverage</td>
                        <td className="text-center py-3 px-4">
                          {providerA.coverage_states.length} states
                        </td>
                        <td className="text-center py-3 px-4">
                          {providerB.coverage_states.length} states
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">Technologies</td>
                        <td className="text-center py-3 px-4">
                          {providerA.technologies.map((t) => technologyLabels[t] || t).join(", ")}
                        </td>
                        <td className="text-center py-3 px-4">
                          {providerB.technologies.map((t) => technologyLabels[t] || t).join(", ")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pros & Cons Side by Side */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Pros & Cons</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[providerA, providerB].map((provider) => (
                <div key={provider.id}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {provider.name}
                    {winner.id === provider.id && (
                      <Trophy className="w-5 h-5 text-warning" />
                    )}
                  </h3>
                  <ProsConsList
                    pros={provider.pros}
                    cons={provider.cons}
                    variant="cards"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-warning" />
                <span className="text-2xl font-bold">{winner.name} Wins!</span>
              </div>
              <p className="text-muted-foreground mb-6">
                With a rating of {winner.overall_rating.toFixed(1)}/10,{" "}
                {winner.name} takes the edge in this comparison with its{" "}
                {winner.pros[0].toLowerCase()} and {winner.pros[1].toLowerCase()}.
                However, if {winner.id === providerA.id
                  ? providerB.pros[0].toLowerCase()
                  : providerA.pros[0].toLowerCase()}{" "}
                is more important to you,{" "}
                {winner.id === providerA.id ? providerB.name : providerA.name} is
                an excellent alternative.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="gradient-primary" asChild>
                  <a
                    href={generateAffiliateLink(winner, { campaign: "verdict" })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get {winner.name}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/internet-providers/provider/${winner.slug}`}>
                    Read Full {winner.name} Review
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/internet-providers/compare">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Comparisons
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all comparison combinations
export async function generateStaticParams() {
  const providers = getIspProducts();
  const pairs = getComparisonPairs(providers);

  return pairs.map(([providerA, providerB]) => ({
    slug: `${providerA.slug}-vs-${providerB.slug}`,
  }));
}
