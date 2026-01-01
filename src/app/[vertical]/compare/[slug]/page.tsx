import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Trophy,
  ArrowLeft,
  Check,
  X,
  Scale,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import {
  RatingCircle,
  ComparisonTable,
  ProsConsList,
  DisclosureBanner,
} from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getVerticalBySlug,
  getProductsByVertical,
  generateComparison,
} from "@/data";
import { getEditorialContent } from "@/data/editorial";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";
import { ComparisonSchema, BreadcrumbSchema } from "@/components/seo";

interface PageProps {
  params: Promise<{ vertical: string; slug: string }>;
}

function parseComparisonSlug(slug: string): { productA: string; productB: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  return { productA: match[1], productB: match[2] };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vertical: verticalSlug, slug } = await params;
  const parsed = parseComparisonSlug(slug);

  if (!parsed) {
    return { title: "Not Found" };
  }

  const products = getProductsByVertical(verticalSlug);
  const productA = products.find((p) => p.slug === parsed.productA);
  const productB = products.find((p) => p.slug === parsed.productB);

  if (!productA || !productB) {
    return { title: "Not Found" };
  }

  const comparison = generateComparison(productA, productB);

  return {
    title: comparison.meta_title,
    description: comparison.meta_description,
    openGraph: {
      title: comparison.meta_title,
      description: comparison.meta_description,
    },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { vertical: verticalSlug, slug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const parsed = parseComparisonSlug(slug);

  if (!vertical || !parsed) {
    notFound();
  }

  const products = getProductsByVertical(verticalSlug);
  const productA = products.find((p) => p.slug === parsed.productA);
  const productB = products.find((p) => p.slug === parsed.productB);

  if (!productA || !productB) {
    notFound();
  }

  const comparison = generateComparison(productA, productB);
  const winner = comparison.winner;
  const editorial = getEditorialContent(verticalSlug);
  const editorialIntro = editorial?.comparisonIntro(productA.name, productB.name);

  // Define comparison features based on vertical
  const comparisonFeatures = [
    {
      category: "Performance",
      items: [
        { name: "Servers", key: "servers" },
        { name: "Countries", key: "countries" },
        { name: "Simultaneous Connections", key: "simultaneous_connections" },
      ],
    },
    {
      category: "Security",
      items: [
        { name: "Kill Switch", key: "kill_switch" },
        { name: "No Logs Policy", key: "no_logs" },
        { name: "Double VPN", key: "double_vpn" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Split Tunneling", key: "split_tunneling" },
        { name: "Streaming Support", key: "streaming_support" },
        { name: "Torrenting", key: "torrenting" },
        { name: "Dedicated IP", key: "dedicated_ip" },
      ],
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: vertical.name, url: `https://pickify.io/${verticalSlug}` },
    { name: `${productA.name} vs ${productB.name}`, url: `https://pickify.io/${verticalSlug}/compare/${slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema Markup for SEO */}
      <ComparisonSchema
        productA={productA}
        productB={productB}
        verticalSlug={verticalSlug}
        winner={winner}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href={`/${verticalSlug}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {vertical.name}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">
                {productA.name} vs {productB.name}
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
              {productA.name} vs {productB.name}
            </h1>
            {editorialIntro && (
              <p className="text-lg text-muted-foreground max-w-3xl mb-6 leading-relaxed">
                {editorialIntro}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <DisclosureBanner variant="inline" />
              <Link
                href={`/${verticalSlug}/compare`}
                className="text-sm text-primary hover:underline"
              >
                See all {vertical.name.toLowerCase()} compared →
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Comparison Cards */}
        <section className="py-8 -mt-4">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[productA, productB].map((product) => (
                <Card
                  key={product.id}
                  className={
                    winner.id === product.id
                      ? "border-success shadow-glow-success relative overflow-hidden"
                      : ""
                  }
                >
                  {winner.id === product.id && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-success" />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          {product.logo_url ? (
                            <Image
                              src={product.logo_url}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="rounded"
                            />
                          ) : (
                            <span className="text-xl font-bold text-muted-foreground">
                              {product.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          {winner.id === product.id && (
                            <Badge className="bg-success text-success-foreground mt-1">
                              <Trophy className="w-3 h-3 mr-1" />
                              Winner
                            </Badge>
                          )}
                        </div>
                      </div>
                      <RatingCircle score={product.overall_rating} size="md" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {product.short_description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Starting from
                        </p>
                        <p className="text-xl font-bold text-primary">
                          {getStartingPrice(product)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className={`flex-1 ${winner.id === product.id ? "gradient-primary" : ""}`}
                        asChild
                      >
                        <a
                          href={generateAffiliateLink(product, {
                            campaign: "comparison",
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Site
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/${verticalSlug}/${product.slug}`}>
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

        {/* Detailed Comparison Table */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Feature Comparison
            </h2>
            <Card>
              <CardContent className="p-0 md:p-6">
                <ComparisonTable
                  products={[productA, productB]}
                  verticalSlug={verticalSlug}
                  features={comparisonFeatures}
                  highlightWinner={true}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pros & Cons Side by Side */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Pros & Cons Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[productA, productB].map((product) => (
                <div key={product.id}>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {product.name}
                    {winner.id === product.id && (
                      <Trophy className="w-5 h-5 text-warning" />
                    )}
                  </h3>
                  <ProsConsList
                    pros={product.pros}
                    cons={product.cons}
                    variant="cards"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Our Verdict</h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-warning" />
                <span className="text-2xl font-bold">{winner.name} Wins!</span>
              </div>
              <p className="text-muted-foreground mb-6">
                With a rating of {winner.overall_rating.toFixed(1)}/10,{" "}
                {winner.name} edges out the competition with its{" "}
                {winner.pros[0].toLowerCase()} and{" "}
                {winner.pros[1].toLowerCase()}. However, if{" "}
                {winner.id === productA.id
                  ? productB.pros[0].toLowerCase()
                  : productA.pros[0].toLowerCase()}{" "}
                is more important to you,{" "}
                {winner.id === productA.id ? productB.name : productA.name} is
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
                  <Link href={`/${verticalSlug}/${winner.slug}`}>
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
              <Link href={`/${verticalSlug}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All {vertical.name}
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
  const { getActiveVerticals, getProductsByVertical, getComparisonPairs } =
    await import("@/data");
  const verticals = getActiveVerticals();
  const params: { vertical: string; slug: string }[] = [];

  for (const vertical of verticals) {
    const products = getProductsByVertical(vertical.slug);
    const pairs = getComparisonPairs(products);

    for (const [productA, productB] of pairs) {
      params.push({
        vertical: vertical.slug,
        slug: `${productA.slug}-vs-${productB.slug}`,
      });
    }
  }

  return params;
}
