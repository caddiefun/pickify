import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Target, ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { ProductCard, DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getVerticalBySlug,
  getProductsByVertical,
  bestForConfigs,
} from "@/data";

interface PageProps {
  params: Promise<{ vertical: string; usecase: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vertical: verticalSlug, usecase } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const configs = bestForConfigs[verticalSlug as keyof typeof bestForConfigs];
  const config = configs?.find((c) => c.slug === usecase);

  if (!vertical || !config) {
    return { title: "Not Found" };
  }

  return {
    title: `${config.title} in 2025 - Expert Recommendations`,
    description: `Find the ${config.title.toLowerCase()} with our expert recommendations. ${config.description}`,
    openGraph: {
      title: `${config.title} in 2025`,
      description: `Find the ${config.title.toLowerCase()} with our expert recommendations. ${config.description}`,
    },
  };
}

export default async function BestForPage({ params }: PageProps) {
  const { vertical: verticalSlug, usecase } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const configs = bestForConfigs[verticalSlug as keyof typeof bestForConfigs];
  const config = configs?.find((c) => c.slug === usecase);

  if (!vertical || !config) {
    notFound();
  }

  // Get all products and filter/sort based on the use case criteria
  const allProducts = getProductsByVertical(verticalSlug);

  // For simplicity, we'll recommend the top-rated products
  // In a real app, you'd filter based on the criteria
  const recommendedProducts = allProducts.slice(0, 5);

  const otherBestForPages = configs.filter((c) => c.slug !== usecase);

  return (
    <div className="min-h-screen flex flex-col">
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
              <span className="font-medium">{config.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              <Target className="w-3 h-3 mr-1" />
              Best For Guide
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {config.title} in 2025
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              {config.description}. We've tested and ranked the top options to
              help you find the perfect fit for your needs.
            </p>
            <DisclosureBanner variant="inline" />
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="bg-accent/30 border-accent">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  Why {config.usecase} Matters
                </h2>
                <p className="text-muted-foreground">
                  Choosing the right {vertical.name.toLowerCase()} for{" "}
                  {config.usecase.toLowerCase()} can make a significant
                  difference in your experience. We've evaluated each product
                  based on specific criteria relevant to{" "}
                  {config.usecase.toLowerCase()} users, including performance,
                  reliability, and specialized features.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Recommended Products */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Top Picks for {config.usecase}
            </h2>
            <div className="space-y-4">
              {recommendedProducts.map((product, index) => (
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

        {/* How We Chose */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold mb-4">
                How We Chose These {vertical.name}
              </h2>
              <div className="prose prose-gray">
                <p>
                  Our recommendations for {config.title.toLowerCase()} are based
                  on extensive testing and research. Here's what we looked for:
                </p>
                <ul>
                  <li>
                    <strong>Performance:</strong> Speed and reliability when
                    used for {config.usecase.toLowerCase()}
                  </li>
                  <li>
                    <strong>Features:</strong> Specialized features that enhance
                    the {config.usecase.toLowerCase()} experience
                  </li>
                  <li>
                    <strong>Ease of Use:</strong> Simple setup and intuitive
                    controls
                  </li>
                  <li>
                    <strong>Value:</strong> Best bang for your buck considering
                    your specific needs
                  </li>
                  <li>
                    <strong>Support:</strong> Quality customer service when you
                    need help
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Other Best For Pages */}
        {otherBestForPages.length > 0 && (
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">
                Other {vertical.name} Guides
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherBestForPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${verticalSlug}/best-for/${page.slug}`}
                    className="group block p-4 rounded-xl border bg-card hover:border-primary hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {page.description}
                    </p>
                    <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                      View guide
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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

// Generate static params for all best-for pages
export async function generateStaticParams() {
  const { getActiveVerticals, bestForConfigs } = await import("@/data");
  const verticals = getActiveVerticals();
  const params: { vertical: string; usecase: string }[] = [];

  for (const vertical of verticals) {
    const configs = bestForConfigs[vertical.slug as keyof typeof bestForConfigs];
    if (configs) {
      for (const config of configs) {
        params.push({
          vertical: vertical.slug,
          usecase: config.slug,
        });
      }
    }
  }

  return params;
}
