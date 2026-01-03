import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Filter, SlidersHorizontal } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { ProductCard, DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getVerticalBySlug,
  getProductsByVertical,
  bestForConfigs,
} from "@/data";
import { getEditorialContent } from "@/data/editorial";
import {
  ItemListSchema,
  BreadcrumbSchema,
  FAQSchema,
  QuickAnswer,
  generateHubQuickAnswer,
} from "@/components/seo";
import { generateHubFAQs } from "@/lib/faq-generator";

interface PageProps {
  params: Promise<{ vertical: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vertical: verticalSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);

  if (!vertical) {
    return { title: "Not Found" };
  }

  return {
    title: vertical.meta_title,
    description: vertical.meta_description,
    openGraph: {
      title: vertical.meta_title,
      description: vertical.meta_description,
    },
  };
}

export default async function VerticalPage({ params }: PageProps) {
  const { vertical: verticalSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);

  if (!vertical) {
    notFound();
  }

  const products = getProductsByVertical(verticalSlug);
  const editorsChoice = products.find((p) => p.is_editors_choice);
  const otherProducts = products.filter((p) => !p.is_editors_choice);
  const bestForPages = bestForConfigs[verticalSlug as keyof typeof bestForConfigs] || [];
  const editorial = getEditorialContent(verticalSlug);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: vertical.name, url: `https://pickify.io/${verticalSlug}` },
  ];

  // Generate QuickAnswer for AI citation
  const runnerUp = products.find((p) => !p.is_editors_choice) || products[1];
  const quickAnswerProps = editorsChoice
    ? generateHubQuickAnswer(
        vertical.name,
        {
          name: editorsChoice.name,
          rating: editorsChoice.overall_rating,
          price: editorsChoice.pricing?.[0]?.price || 0,
          pros: editorsChoice.pros,
        },
        {
          name: runnerUp?.name || "alternatives",
          useCase: runnerUp?.pros[0]?.toLowerCase() || "specific needs",
        },
        products.length
      )
    : null;

  // Generate FAQs for AI citation
  const faqs = generateHubFAQs(vertical.name, products);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema Markup for SEO */}
      <ItemListSchema
        name={`Best ${vertical.name} of 2025`}
        description={vertical.description}
        url={`https://pickify.io/${verticalSlug}`}
        products={products}
        verticalSlug={verticalSlug}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                Updated January 2025
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Best {vertical.name} of 2025
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {vertical.description}
              </p>
              <DisclosureBanner variant="inline" />
            </div>
          </div>
        </section>

        {/* Quick Answer - AI Citation Optimized */}
        {quickAnswerProps && (
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <QuickAnswer {...quickAnswerProps} />
              </div>
            </div>
          </section>
        )}

        {/* Editorial Intro */}
        {editorial?.hubIntro && (
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {editorial.hubIntro.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/${verticalSlug}/compare`}
                    className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Read my complete comparison of all {products.length} {vertical.name.toLowerCase()}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quick Navigation */}
        <section className="border-b bg-background sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 py-3 overflow-x-auto">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Jump to:
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href="#top-picks">Top Picks</a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#all-products">All {vertical.name}</a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#best-for">Best For</a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="#comparisons">Comparisons</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Editor's Choice / Top Pick */}
        {editorsChoice && (
          <section id="top-picks" className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-2xl font-bold">Our Top Pick</h2>
                <Badge className="bg-success text-success-foreground">
                  Editor's Choice
                </Badge>
              </div>
              <ProductCard
                product={editorsChoice}
                rank={1}
                verticalSlug={verticalSlug}
                variant="featured"
              />
            </div>
          </section>
        )}

        {/* All Products */}
        <section id="all-products" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                All {vertical.name} Ranked
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                  verticalSlug={verticalSlug}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Best For Section */}
        {bestForPages.length > 0 && (
          <section id="best-for" className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-2">Best For Your Needs</h2>
              <p className="text-muted-foreground mb-6">
                Find the perfect {vertical.name.toLowerCase()} for your specific use case
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bestForPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${verticalSlug}/best-for/${page.slug}`}
                    className="group block p-6 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {page.description}
                    </p>
                    <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                      View recommendations
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Comparisons Section */}
        <section id="comparisons" className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Popular Comparisons</h2>
            <p className="text-muted-foreground mb-6">
              See how the top {vertical.name.toLowerCase()} stack up against each other
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 3).map((productA, i) =>
                products.slice(i + 1, i + 3).map((productB) => (
                  <Link
                    key={`${productA.slug}-${productB.slug}`}
                    href={`/${verticalSlug}/compare/${productA.slug}-vs-${productB.slug}`}
                    className="group block p-6 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-bold text-muted-foreground">
                          {productA.name.charAt(0)}
                        </div>
                        <span className="text-muted-foreground">vs</span>
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-bold text-muted-foreground">
                          {productB.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {productA.name} vs {productB.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compare features, pricing & performance
                    </p>
                  </Link>
                ))
              )}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href={`/${verticalSlug}/compare`}>
                  View All Comparisons
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section - AI Citation Optimized */}
        <section id="faq" className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4"
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
                        className="text-muted-foreground"
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

        {/* Methodology Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">How We Test</h2>
              <p className="text-muted-foreground mb-6">
                Our team tests every product thoroughly before making
                recommendations. We evaluate performance, features, ease of use,
                customer support, and value for money.
              </p>
              <Button variant="outline" asChild>
                <Link href="/methodology">Learn About Our Methodology</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all active verticals
export async function generateStaticParams() {
  const { getActiveVerticals } = await import("@/data");
  const verticals = getActiveVerticals();

  return verticals.map((vertical) => ({
    vertical: vertical.slug,
  }));
}
