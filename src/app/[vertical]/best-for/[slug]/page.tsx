import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award, CheckCircle } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { ProductCard, DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema, FAQSchema, ItemListSchema } from "@/components/seo";
import { QuickAnswer, generateBestForQuickAnswer } from "@/components/seo/QuickAnswer";
import { generateBestForFAQs } from "@/lib/faq-generator";
import { CURRENT_YEAR } from "@/lib/constants";
import {
  getVerticalBySlug,
  getProductsByVertical,
  getActiveVerticals,
  bestForConfigs,
} from "@/data";
import type { Product } from "@/types";

interface PageProps {
  params: Promise<{ vertical: string; slug: string }>;
}

interface BestForConfig {
  slug: string;
  usecase: string;
  title: string;
  description: string;
  criteria: string[];
}

function getBestForConfig(
  verticalSlug: string,
  bestForSlug: string
): BestForConfig | undefined {
  const configs = bestForConfigs[verticalSlug as keyof typeof bestForConfigs];
  if (!configs) return undefined;
  return configs.find((c) => c.slug === bestForSlug);
}

function rankProductsForUseCase(
  products: Product[],
  config: BestForConfig
): Product[] {
  // Simple ranking based on overall rating for now
  // Could be enhanced to use criteria-specific scoring
  return [...products]
    .sort((a, b) => b.overall_rating - a.overall_rating)
    .slice(0, 5);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vertical: verticalSlug, slug: bestForSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const config = getBestForConfig(verticalSlug, bestForSlug);

  if (!vertical || !config) {
    return { title: "Not Found" };
  }

  return {
    title: `${config.title} in ${CURRENT_YEAR} - Top ${vertical.name} Compared | Pickify`,
    description: `${config.description}. Compare the top ${vertical.name.toLowerCase()} for ${config.usecase.toLowerCase()} with expert reviews and ratings.`,
    alternates: {
      canonical: `https://pickify.io/${verticalSlug}/best-for/${bestForSlug}`,
    },
    openGraph: {
      title: `${config.title} in ${CURRENT_YEAR}`,
      description: config.description,
    },
  };
}

export default async function BestForPage({ params }: PageProps) {
  const { vertical: verticalSlug, slug: bestForSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const config = getBestForConfig(verticalSlug, bestForSlug);

  if (!vertical || !config) {
    notFound();
  }

  const products = getProductsByVertical(verticalSlug);
  const rankedProducts = rankProductsForUseCase(products, config);

  // Generate QuickAnswer props
  const winner = rankedProducts[0];
  const quickAnswerProps = winner ? generateBestForQuickAnswer(
    vertical.name,
    config.usecase,
    {
      name: winner.name,
      rating: winner.overall_rating,
      reason: winner.pros[0] || "It excels in this category",
    },
    rankedProducts.length
  ) : null;

  // Generate FAQs
  const faqs = generateBestForFAQs(vertical.name, config.usecase, rankedProducts);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: vertical.name, url: `https://pickify.io/${verticalSlug}` },
    {
      name: config.title,
      url: `https://pickify.io/${verticalSlug}/best-for/${bestForSlug}`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <ItemListSchema
        name={config.title}
        description={config.description}
        url={`https://pickify.io/${verticalSlug}/best-for/${bestForSlug}`}
        products={rankedProducts}
        verticalSlug={verticalSlug}
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Link
              href={`/${verticalSlug}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to {vertical.name}
            </Link>

            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <Award className="w-3 h-3 mr-1" />
                {config.usecase} Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {config.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {config.description}. We've tested and ranked the top{" "}
                {vertical.name.toLowerCase()} based on real-world performance
                for {config.usecase.toLowerCase()} use cases.
              </p>
              <DisclosureBanner variant="inline" />
            </div>
          </div>
        </section>

        {/* AI-Optimized Quick Answer */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              {quickAnswerProps && (
                <QuickAnswer {...quickAnswerProps} />
              )}
            </div>
          </div>
        </section>

        {/* Rankings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Top {rankedProducts.length} {vertical.name} for{" "}
              {config.usecase}
            </h2>

            <div className="space-y-4">
              {rankedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                  verticalSlug={verticalSlug}
                  variant={index === 0 ? "featured" : "default"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why These Rankings */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                How We Ranked These {vertical.name}
              </h2>
              <p className="text-muted-foreground mb-4">
                Our rankings for {config.usecase.toLowerCase()} are based on
                hands-on testing and evaluation of key factors that matter most
                for this use case:
              </p>
              <ul className="space-y-2">
                {config.criteria.map((criterion) => (
                  <li key={criterion} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      {criterion.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} performance
                    </span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Overall value for {config.usecase.toLowerCase()} users
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    User experience and ease of use
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other Best For Pages */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Other {vertical.name} Guides
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bestForConfigs[verticalSlug as keyof typeof bestForConfigs]
                ?.filter((c) => c.slug !== bestForSlug)
                .map((otherConfig) => (
                  <Link
                    key={otherConfig.slug}
                    href={`/${verticalSlug}/best-for/${otherConfig.slug}`}
                    className="p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all"
                  >
                    <h3 className="font-medium mb-1">{otherConfig.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {otherConfig.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all best-for pages
export async function generateStaticParams() {
  const verticals = getActiveVerticals();
  const params: { vertical: string; slug: string }[] = [];

  for (const vertical of verticals) {
    const configs =
      bestForConfigs[vertical.slug as keyof typeof bestForConfigs];
    if (configs) {
      for (const config of configs) {
        params.push({
          vertical: vertical.slug,
          slug: config.slug,
        });
      }
    }
  }

  return params;
}
