import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Trophy,
  ArrowRight,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import {
  RatingCircle,
  DisclosureBanner,
} from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getVerticalBySlug,
  getProductsByVertical,
} from "@/data";
import { getEditorialContent } from "@/data/editorial";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";
import { BreadcrumbSchema, ItemListSchema } from "@/components/seo";

interface PageProps {
  params: Promise<{ vertical: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vertical: verticalSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const editorial = getEditorialContent(verticalSlug);

  if (!vertical) {
    return { title: "Not Found" };
  }

  const title = editorial?.masterComparison.title ||
    `Best ${vertical.name} Compared - Ultimate Guide 2025`;
  const description = editorial?.masterComparison.subtitle ||
    `Compare all ${vertical.name.toLowerCase()} side by side with honest reviews and recommendations.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function MasterComparisonPage({ params }: PageProps) {
  const { vertical: verticalSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);

  if (!vertical) {
    notFound();
  }

  const products = getProductsByVertical(verticalSlug);
  const editorial = getEditorialContent(verticalSlug);
  const editorsChoice = products.find((p) => p.is_editors_choice);
  const topThree = products.slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: vertical.name, url: `https://pickify.io/${verticalSlug}` },
    { name: "Compare All", url: `https://pickify.io/${verticalSlug}/compare` },
  ];

  // Generate product name string for title
  const productNames = products.slice(0, 4).map(p => p.name).join(" vs ");
  const titleWithProducts = `${productNames}${products.length > 4 ? ` + ${products.length - 4} More` : ""}`;

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <ItemListSchema
        name={`Best ${vertical.name} Compared`}
        description={`Complete comparison of all ${vertical.name.toLowerCase()}`}
        url={`https://pickify.io/${verticalSlug}/compare`}
        products={products}
        verticalSlug={verticalSlug}
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>Written by Editorial Team</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Updated December 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>15 min read</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {editorial?.masterComparison.title || `Best ${vertical.name} of 2025 - Complete Comparison`}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {editorial?.masterComparison.subtitle || titleWithProducts}
              </p>

              <DisclosureBanner variant="inline" />
            </div>
          </div>
        </section>

        {/* Quick Summary / TL;DR */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                Quick Take: Our Top 3 Picks
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {topThree.map((product, index) => (
                  <Card key={product.id} className={index === 0 ? "border-primary" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1} Pick
                        </Badge>
                        <RatingCircle score={product.overall_rating} size="sm" />
                      </div>
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {product.short_description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">
                          {getStartingPrice(product)}
                        </span>
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={generateAffiliateLink(product, { campaign: "comparison-quick" })}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Editorial Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">

              {/* Introduction */}
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                {editorial?.masterComparison.intro.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Table of Contents */}
              <Card className="mb-12">
                <CardHeader>
                  <CardTitle className="text-lg">What's In This Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    <a href="#methodology" className="block text-muted-foreground hover:text-foreground transition-colors">
                      → How I Tested These {vertical.name}
                    </a>
                    {products.map((product, index) => (
                      <a
                        key={product.id}
                        href={`#${product.slug}`}
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        → #{index + 1} {product.name} - {product.overall_rating.toFixed(1)}/10
                      </a>
                    ))}
                    <a href="#verdict" className="block text-muted-foreground hover:text-foreground transition-colors">
                      → Final Verdict: Which One Should You Choose?
                    </a>
                  </nav>
                </CardContent>
              </Card>

              {/* Methodology Section */}
              <section id="methodology" className="mb-16">
                <h2 className="text-2xl font-bold mb-6">How I Tested These {vertical.name}</h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {editorial?.masterComparison.methodology.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph.split('**').map((part, i) =>
                          i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>

              <Separator className="my-12" />

              {/* Individual Product Reviews */}
              {products.map((product, index) => (
                <section key={product.id} id={product.slug} className="mb-16">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                        {product.logo_url ? (
                          <Image
                            src={product.logo_url}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="rounded-lg"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-muted-foreground">
                            {product.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            #{index + 1}
                          </span>
                          {product.is_editors_choice && (
                            <Badge className="bg-success text-success-foreground">
                              Editor's Choice
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <p className="text-muted-foreground">{product.short_description}</p>
                      </div>
                    </div>
                    <RatingCircle score={product.overall_rating} size="lg" />
                  </div>

                  {/* Product Summary */}
                  <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pros and Cons */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base text-success flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          What I Liked
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {product.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base text-destructive flex items-center gap-2">
                          <XCircle className="w-5 h-5" />
                          What Could Be Better
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {product.cons.map((con, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Pricing */}
                  <div className="bg-muted/30 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold mb-3">Pricing</h3>
                    <div className="flex flex-wrap gap-4">
                      {product.pricing?.map((plan, i) => (
                        <div key={i} className={`px-4 py-3 rounded-lg ${plan.is_popular ? 'bg-primary/10 border border-primary' : 'bg-background'}`}>
                          <p className="text-sm font-medium">{plan.plan_name}</p>
                          <p className="text-lg font-bold">
                            ${plan.price}
                            <span className="text-sm font-normal text-muted-foreground">
                              /{plan.billing_cycle === 'one-time' ? 'once' : 'mo'}
                            </span>
                          </p>
                          {plan.is_popular && (
                            <Badge variant="secondary" className="mt-1 text-xs">Most Popular</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-4">
                    <Button className={index === 0 ? "gradient-primary" : ""} asChild>
                      <a
                        href={generateAffiliateLink(product, { campaign: "comparison-detailed" })}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Try {product.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/${verticalSlug}/${product.slug}`}>
                        Read Full Review
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  {index < products.length - 1 && <Separator className="mt-12" />}
                </section>
              ))}

              <Separator className="my-12" />

              {/* Final Verdict */}
              <section id="verdict" className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-warning" />
                  Final Verdict: Which One Should You Choose?
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {editorial?.masterComparison.verdict.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.includes('**')) {
                      const parts = paragraph.split('**');
                      return (
                        <p key={index} className="text-muted-foreground leading-relaxed">
                          {parts.map((part, i) =>
                            i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                          )}
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </section>

              {/* Winner Highlight */}
              {editorsChoice && (
                <Card className="border-primary bg-primary/5 mb-12">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Trophy className="w-8 h-8 text-warning" />
                      <div>
                        <p className="text-sm text-muted-foreground">Our Top Recommendation</p>
                        <h3 className="text-xl font-bold">{editorsChoice.name}</h3>
                      </div>
                      <RatingCircle score={editorsChoice.overall_rating} size="md" className="ml-auto" />
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {editorsChoice.short_description}. Starting at {getStartingPrice(editorsChoice)}.
                    </p>
                    <Button className="gradient-primary" asChild>
                      <a
                        href={generateAffiliateLink(editorsChoice, { campaign: "comparison-winner" })}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get {editorsChoice.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Author Note */}
              <Card className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold mb-2">A Note From the Author</p>
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {editorial?.masterComparison.authorNote.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="text-muted-foreground">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>

        {/* Other Comparisons */}
        <section className="py-12 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Head-to-Head Comparisons</h2>
            <p className="text-center text-muted-foreground mb-8">
              Want to compare specific {vertical.name.toLowerCase()}? Check out our detailed matchups.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {products.slice(0, 3).map((productA) =>
                products.slice(products.indexOf(productA) + 1, products.indexOf(productA) + 3).map((productB) => (
                  <Link
                    key={`${productA.slug}-${productB.slug}`}
                    href={`/${verticalSlug}/compare/${productA.slug}-vs-${productB.slug}`}
                    className="group block p-4 rounded-lg border bg-card hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{productA.name}</span>
                      <span className="text-muted-foreground">vs</span>
                      <span className="font-medium">{productB.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {productA.overall_rating.toFixed(1)} vs {productB.overall_rating.toFixed(1)}
                    </p>
                    <span className="text-sm text-primary group-hover:underline">
                      Compare →
                    </span>
                  </Link>
                ))
              )}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline" asChild>
                <Link href={`/${verticalSlug}`}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  View All {vertical.name}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all verticals
export async function generateStaticParams() {
  const { getActiveVerticals } = await import("@/data");
  const verticals = getActiveVerticals();

  return verticals.map((vertical) => ({
    vertical: vertical.slug,
  }));
}
