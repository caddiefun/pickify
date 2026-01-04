import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { ProductCard, DisclosureBanner, ProductLogo, RatingCircle } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema, FAQSchema, ItemListSchema } from "@/components/seo";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { CURRENT_YEAR, VERTICAL_SINGULAR } from "@/lib/constants";
import {
  getVerticalBySlug,
  getProductsByVertical,
  getProductBySlug,
  getActiveVerticals,
} from "@/data";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";
import type { Product } from "@/types";

interface PageProps {
  params: Promise<{ vertical: string; product: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vertical: verticalSlug, product: productSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const product = getProductBySlug(verticalSlug, productSlug);

  if (!vertical || !product) {
    return { title: "Not Found" };
  }

  const verticalName = VERTICAL_SINGULAR[verticalSlug] || vertical.name;

  return {
    title: `Best ${product.name} Alternatives in ${CURRENT_YEAR} (${verticalName} Compared)`,
    description: `Looking for alternatives to ${product.name}? Compare the top ${vertical.name.toLowerCase()} with similar features, better pricing, or different strengths. Expert-tested in ${CURRENT_YEAR}.`,
    alternates: {
      canonical: `https://pickify.io/${verticalSlug}/${productSlug}/alternatives`,
    },
    openGraph: {
      title: `Best ${product.name} Alternatives in ${CURRENT_YEAR}`,
      description: `Compare top alternatives to ${product.name} with expert reviews and ratings.`,
    },
  };
}

function getAlternatives(products: Product[], currentProduct: Product): Product[] {
  return products
    .filter((p) => p.id !== currentProduct.id)
    .sort((a, b) => b.overall_rating - a.overall_rating)
    .slice(0, 7);
}

function generateAlternativesFAQs(
  product: Product,
  alternatives: Product[],
  verticalName: string
): { question: string; answer: string }[] {
  const topAlt = alternatives[0];
  const cheapestAlt = [...alternatives].sort(
    (a, b) => (a.pricing?.[0]?.price || 0) - (b.pricing?.[0]?.price || 0)
  )[0];

  return [
    {
      question: `What is the best alternative to ${product.name}?`,
      answer: `The best alternative to ${product.name} is ${topAlt?.name || "varies"}, which scores ${topAlt?.overall_rating?.toFixed(1) || "highly"}/10 in our testing. It offers ${topAlt?.pros?.[0]?.toLowerCase() || "similar features"} and is a strong choice for users looking to switch.`,
    },
    {
      question: `Why switch from ${product.name} to an alternative?`,
      answer: `Users often switch from ${product.name} due to ${product.cons?.[0]?.toLowerCase() || "specific needs"}. Alternatives may offer better pricing, different features, or improved performance in specific areas.`,
    },
    {
      question: `What is the cheapest alternative to ${product.name}?`,
      answer: `${cheapestAlt?.name || "Several options"} is one of the most affordable alternatives, starting at ${cheapestAlt?.pricing?.[0] ? `$${cheapestAlt.pricing[0].price}/month` : "competitive pricing"}. It provides good value while offering similar core functionality.`,
    },
    {
      question: `How many ${verticalName.toLowerCase()} alternatives to ${product.name} are there?`,
      answer: `We've tested and compared ${alternatives.length}+ quality alternatives to ${product.name}. Each offers different strengths - some focus on pricing, others on features, and some on specific use cases.`,
    },
    {
      question: `Is there a free alternative to ${product.name}?`,
      answer: alternatives.some((a) => a.pricing?.some((p) => p.price === 0))
        ? `Yes, several alternatives offer free tiers or free trials. Check the comparison above to see which ones fit your needs.`
        : `While most premium alternatives have paid plans, many offer free trials or money-back guarantees so you can test before committing.`,
    },
    {
      question: `Which ${product.name} alternative is best for business use?`,
      answer: `For business use, look for alternatives with team features, admin controls, and priority support. ${topAlt?.name || "Top-rated options"} and similar enterprise-ready solutions are worth considering based on your specific needs.`,
    },
  ];
}

export default async function AlternativesPage({ params }: PageProps) {
  const { vertical: verticalSlug, product: productSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const product = getProductBySlug(verticalSlug, productSlug);

  if (!vertical || !product) {
    notFound();
  }

  const products = getProductsByVertical(verticalSlug);
  const alternatives = getAlternatives(products, product);
  const verticalSingular = VERTICAL_SINGULAR[verticalSlug] || vertical.name;

  // Generate FAQs
  const faqs = generateAlternativesFAQs(product, alternatives, verticalSingular);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: vertical.name, url: `https://pickify.io/${verticalSlug}` },
    { name: product.name, url: `https://pickify.io/${verticalSlug}/${productSlug}` },
    {
      name: "Alternatives",
      url: `https://pickify.io/${verticalSlug}/${productSlug}/alternatives`,
    },
  ];

  // QuickAnswer for AI citation
  const topAlt = alternatives[0];
  const quickAnswerData = topAlt ? {
    question: `What is the best alternative to ${product.name}?`,
    answer: `The top alternative to ${product.name} is ${topAlt.name}, scoring ${topAlt.overall_rating.toFixed(1)}/10 in our testing. ${topAlt.pros[0] || "It offers strong overall performance"}. Other excellent alternatives include ${alternatives[1]?.name || "various options"} (${alternatives[1]?.overall_rating?.toFixed(1) || "N/A"}/10) and ${alternatives[2]?.name || "more"} (${alternatives[2]?.overall_rating?.toFixed(1) || "N/A"}/10).`,
    supportingFacts: [
      { label: "Top Alternative", value: topAlt.name },
      { label: "Top Rating", value: `${topAlt.overall_rating.toFixed(1)}/10` },
      { label: "Alternatives Tested", value: `${alternatives.length}+` },
      { label: "Last Updated", value: `January ${CURRENT_YEAR}` },
    ],
    updatedDate: new Date().toISOString(),
    variant: "default" as const,
  } : null;

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <ItemListSchema
        name={`${product.name} Alternatives`}
        description={`Top alternatives to ${product.name} - compare features, pricing, and ratings`}
        url={`https://pickify.io/${verticalSlug}/${productSlug}/alternatives`}
        products={alternatives}
        verticalSlug={verticalSlug}
      />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Link
              href={`/${verticalSlug}/${productSlug}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to {product.name} Review
            </Link>

            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <TrendingUp className="w-3 h-3 mr-1" />
                Alternatives Compared
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Best {product.name} Alternatives in {CURRENT_YEAR}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Looking for an alternative to {product.name}? We've tested and compared
                {" "}{alternatives.length}+ {vertical.name.toLowerCase()} that offer similar or better
                features. Find the perfect switch based on your specific needs.
              </p>
              <DisclosureBanner variant="inline" />
            </div>
          </div>
        </section>

        {/* Current Product Summary */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">You're comparing alternatives to:</h2>
              <div className="flex items-center gap-4">
                <ProductLogo
                  name={product.name}
                  logoUrl={product.logo_url}
                  size="md"
                  className="w-12 h-12 rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <RatingCircle score={product.overall_rating} size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground">{product.short_description}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                  <p className="font-semibold">{getStartingPrice(product)}</p>
                </div>
              </div>

              {/* Why switch section */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Common reasons to explore alternatives:</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {product.cons.slice(0, 4).map((con, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Optimized Quick Answer */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              {quickAnswerData && (
                <QuickAnswer {...quickAnswerData} />
              )}
            </div>
          </div>
        </section>

        {/* Alternatives List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Top {alternatives.length} Alternatives to {product.name}
            </h2>

            <div className="space-y-4">
              {alternatives.map((alt, index) => (
                <Card key={alt.id} className={index === 0 ? "border-primary shadow-glow" : ""}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Rank */}
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          #{index + 1}
                        </div>
                        <ProductLogo
                          name={alt.name}
                          logoUrl={alt.logo_url}
                          size="md"
                          className="w-12 h-12 rounded-lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            href={`/${verticalSlug}/${alt.slug}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {alt.name}
                          </Link>
                          {index === 0 && (
                            <Badge className="bg-success text-success-foreground text-xs">
                              Top Pick
                            </Badge>
                          )}
                          {alt.overall_rating > product.overall_rating && (
                            <Badge variant="outline" className="text-xs">
                              Higher Rated
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{alt.short_description}</p>
                        <div className="flex flex-wrap gap-2">
                          {alt.pros.slice(0, 2).map((pro, i) => (
                            <span key={i} className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                              <CheckCircle className="w-3 h-3 inline mr-1" />
                              {pro}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Rating & Price */}
                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                        <RatingCircle score={alt.overall_rating} size="md" />
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">From</p>
                          <p className="font-semibold">{getStartingPrice(alt)}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/${verticalSlug}/${alt.slug}`}>
                            Review
                          </Link>
                        </Button>
                        <Button size="sm" className="gradient-primary" asChild>
                          <a
                            href={generateAffiliateLink(alt, { campaign: "alternatives" })}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Comparison with original */}
                    <div className="mt-4 pt-4 border-t grid sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">vs {product.name} rating:</span>
                        <span className={`ml-2 font-medium ${
                          alt.overall_rating > product.overall_rating
                            ? "text-success"
                            : alt.overall_rating < product.overall_rating
                            ? "text-danger"
                            : ""
                        }`}>
                          {alt.overall_rating > product.overall_rating ? "+" : ""}
                          {(alt.overall_rating - product.overall_rating).toFixed(1)}
                        </span>
                      </div>
                      <Link
                        href={`/${verticalSlug}/compare/${product.slug}-vs-${alt.slug}`}
                        className="text-primary hover:underline flex items-center"
                      >
                        Full comparison
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              {product.name} Alternatives FAQ
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 bg-card"
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
                    <p className="text-muted-foreground text-sm leading-relaxed" itemProp="text">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4 flex flex-wrap gap-4">
            <Button variant="ghost" asChild>
              <Link href={`/${verticalSlug}/${productSlug}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {product.name} Review
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href={`/${verticalSlug}`}>
                View All {vertical.name}
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all alternatives pages
export async function generateStaticParams() {
  const verticals = getActiveVerticals();
  const params: { vertical: string; product: string }[] = [];

  for (const vertical of verticals) {
    const products = getProductsByVertical(vertical.slug);
    for (const product of products) {
      params.push({
        vertical: vertical.slug,
        product: product.slug,
      });
    }
  }

  return params;
}
