import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  Award,
  ArrowLeft,
  Check,
  X,
  Star,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import {
  RatingCircle,
  RatingBar,
  ProsConsList,
  DisclosureBanner,
  ProductLogo,
  LastUpdatedBadge,
  CredibilityWarning,
  PromoInfoCard,
} from "@/components/comparison";
import { ReviewBadges } from "@/components/comparison/review-badges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getVerticalBySlug,
  getProductBySlug,
  getProductsByVertical,
} from "@/data";
import {
  generateAffiliateLink,
  getStartingPrice,
  formatPrice,
} from "@/lib/affiliate";
import {
  ProductSchema,
  ReviewSchema,
  BreadcrumbSchema,
  FAQSchema,
  QuickAnswer,
  generateReviewQuickAnswer,
  HowToSchema,
} from "@/components/seo";
import { generateAllFAQs } from "@/lib/faq-generator";

interface PageProps {
  params: Promise<{ vertical: string; product: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { vertical: verticalSlug, product: productSlug } = await params;
  const product = getProductBySlug(verticalSlug, productSlug);

  if (!product) {
    return { title: "Not Found" };
  }

  return {
    title: product.meta_title,
    description: product.meta_description,
    alternates: {
      canonical: `https://pickify.io/${verticalSlug}/${productSlug}`,
    },
    openGraph: {
      title: product.meta_title,
      description: product.meta_description,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { vertical: verticalSlug, product: productSlug } = await params;
  const vertical = getVerticalBySlug(verticalSlug);
  const product = getProductBySlug(verticalSlug, productSlug);

  if (!vertical || !product) {
    notFound();
  }

  const affiliateLink = generateAffiliateLink(product, {
    campaign: "product-page",
  });

  const allProducts = getProductsByVertical(verticalSlug);
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: vertical.name, url: `https://pickify.io/${verticalSlug}` },
    { name: product.name, url: `https://pickify.io/${verticalSlug}/${product.slug}` },
  ];

  // Generate QuickAnswer for AI citation
  const bestForCases = product.is_editors_choice
    ? ["most users", "overall value"]
    : product.pros.slice(0, 2).map((p) => p.toLowerCase().split(" ").slice(0, 3).join(" "));
  const quickAnswerProps = generateReviewQuickAnswer(
    {
      name: product.name,
      rating: product.overall_rating,
      price: product.pricing?.[0]?.price || 0,
      pros: product.pros,
      cons: product.cons,
    },
    bestForCases
  );

  // Generate FAQs for AI citation
  const faqs = generateAllFAQs(product, verticalSlug, vertical.name);

  // Generate HowTo steps for setup
  const howToSteps = [
    { name: "Visit website", text: `Go to ${product.website_url} and click on the pricing or sign-up button.` },
    { name: "Choose a plan", text: `Select the plan that fits your needs. ${product.pricing?.[0]?.plan_name || "Basic"} plan starts at $${product.pricing?.[0]?.price || "varies"}/mo.` },
    { name: "Create account", text: `Enter your email and create a password to set up your account.` },
    { name: "Complete setup", text: `Follow the onboarding wizard to configure ${product.name} for your needs.` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema Markup for SEO */}
      <ProductSchema product={product} verticalSlug={verticalSlug} />
      <ReviewSchema product={product} verticalSlug={verticalSlug} />
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <HowToSchema
        name={`How to set up ${product.name}`}
        description={`Step-by-step guide to getting started with ${product.name}`}
        steps={howToSteps}
        totalTime="PT10M"
      />

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
              <span className="font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4 mb-6">
                  <ProductLogo name={product.name} logoUrl={product.logo_url} size="lg" className="w-16 h-16 md:w-20 md:h-20 rounded-xl" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold">
                        {product.name} Review
                      </h1>
                      {product.is_editors_choice && (
                        <Badge className="bg-success text-success-foreground">
                          <Award className="w-3 h-3 mr-1" />
                          Editor's Choice
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {product.short_description}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <LastUpdatedBadge date={product.updated_at} variant="inline" />
                    </div>
                  </div>
                </div>

                {/* Credibility Warning (if applicable) */}
                {product.credibility_warning && (
                  <div className="mb-6">
                    <CredibilityWarning
                      type={product.credibility_warning.type}
                      message={product.credibility_warning.message}
                      learnMoreUrl={product.credibility_warning.learnMoreUrl}
                      variant="banner"
                    />
                  </div>
                )}

                {/* Rating Overview */}
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex items-center gap-4">
                        <RatingCircle
                          score={product.overall_rating}
                          size="lg"
                        />
                        <div>
                          <p className="font-semibold">Overall Rating</p>
                          <p className="text-sm text-muted-foreground">
                            Based on our testing
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <RatingBar
                          score={product.overall_rating}
                          showLabel
                          size="lg"
                        />
                      </div>
                    </div>
                    {/* Third-party Reviews */}
                    {product.review_sources && product.review_sources.length > 0 && (
                      <div className="mt-6 pt-6 border-t">
                        <ReviewBadges sources={product.review_sources} />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Answer - AI Citation Optimized */}
                <div className="mb-8">
                  <QuickAnswer {...quickAnswerProps} />
                </div>

                {/* Quick Summary */}
                <div className="prose prose-gray max-w-none mb-8">
                  <h2>Quick Summary</h2>
                  <p>{product.description}</p>
                </div>

                {/* Pros & Cons */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Pros & Cons</h2>
                  <ProsConsList
                    pros={product.pros}
                    cons={product.cons}
                    variant="side-by-side"
                  />
                </div>

                {/* Deals & Promotions */}
                {product.promo_info && (
                  <div className="mb-8">
                    <PromoInfoCard
                      promoInfo={product.promo_info}
                      productName={product.name}
                      variant="full"
                    />
                  </div>
                )}

                {/* Pricing */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    {product.name} Pricing
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {product.pricing.map((plan, index) => (
                      <Card
                        key={index}
                        className={
                          plan.is_popular ? "border-primary shadow-glow" : ""
                        }
                      >
                        {plan.is_popular && (
                          <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium rounded-t-lg">
                            Most Popular
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {plan.plan_name}
                          </CardTitle>
                          <div className="mt-2">
                            <span className="text-3xl font-bold">
                              {plan.price === 0
                                ? "Free"
                                : formatPrice(plan.price, plan.billing_cycle)}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {plan.features.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm"
                              >
                                <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={`w-full mt-4 ${plan.is_popular ? "gradient-primary" : ""}`}
                            variant={plan.is_popular ? "default" : "outline"}
                            asChild
                          >
                            <a
                              href={affiliateLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Get {plan.plan_name}
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Key Features
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                      >
                        <span className="font-medium">{feature.name.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
                        <span className="text-muted-foreground">
                          {typeof feature.value === "boolean" ? (
                            feature.value ? (
                              <Check className="w-5 h-5 text-success" />
                            ) : (
                              <X className="w-5 h-5 text-danger" />
                            )
                          ) : (
                            feature.value
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclosure */}
                <DisclosureBanner variant="banner" className="mb-8" />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* CTA Card */}
                  <Card className="border-primary">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          Starting from
                        </p>
                        <p className="text-3xl font-bold text-primary">
                          {getStartingPrice(product)}
                        </p>
                      </div>
                      <Button className="w-full gradient-primary mb-3" asChild>
                        <a
                          href={affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit {product.name}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                      {product.promo_info ? (
                        <PromoInfoCard
                          promoInfo={product.promo_info}
                          productName={product.name}
                          variant="inline"
                          className="justify-center"
                        />
                      ) : (
                        <p className="text-xs text-center text-muted-foreground">
                          30-day money-back guarantee
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Promo Info Card */}
                  {product.promo_info && (
                    <PromoInfoCard
                      promoInfo={product.promo_info}
                      productName={product.name}
                      variant="compact"
                    />
                  )}

                  {/* Quick Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {product.features.slice(0, 5).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {feature.name.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span className="font-medium">
                            {typeof feature.value === "boolean"
                              ? feature.value
                                ? "Yes"
                                : "No"
                              : feature.value}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Related Products */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Alternatives</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {relatedProducts.map((relatedProduct) => (
                        <Link
                          key={relatedProduct.id}
                          href={`/${verticalSlug}/${relatedProduct.slug}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <span className="font-bold text-muted-foreground">
                              {relatedProduct.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {relatedProduct.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Rating: {relatedProduct.overall_rating.toFixed(1)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - AI Citation Optimized */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              {product.name} FAQ
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {faqs.slice(0, 6).map((faq, index) => (
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
        <section className="py-12 border-t">
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

// Generate static params for all products
export async function generateStaticParams() {
  const { getActiveVerticals, getProductsByVertical } = await import("@/data");
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
