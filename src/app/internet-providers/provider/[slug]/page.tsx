import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  ArrowLeft,
  Wifi,
  Check,
  X,
  Zap,
  Globe,
  Shield,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { LocationSearch, SpeedComparison } from "@/components/isp";
import { RatingCircle, ProsConsList, DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BreadcrumbSchema, ProductSchema, FAQSchema, QuickAnswer, generateReviewQuickAnswer } from "@/components/seo";
import { getIspProducts, getIspProductBySlug, usStates } from "@/data";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";
import { generateAllFAQs } from "@/lib/faq-generator";
import { getISPSpeedData, DATA_SOURCES } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const technologyLabels: Record<string, string> = {
  fiber: "Fiber",
  cable: "Cable",
  dsl: "DSL",
  fixed_wireless: "5G/Fixed Wireless",
  satellite: "Satellite",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getIspProductBySlug(slug);

  if (!provider) {
    return { title: "Provider Not Found" };
  }

  return {
    title: provider.meta_title,
    description: provider.meta_description,
    openGraph: {
      title: provider.meta_title,
      description: provider.meta_description,
    },
  };
}

export default async function ProviderReviewPage({ params }: PageProps) {
  const { slug } = await params;
  const provider = getIspProductBySlug(slug);

  if (!provider) {
    notFound();
  }

  const allProviders = getIspProducts();
  const competitors = allProviders
    .filter((p) => p.id !== provider.id)
    .slice(0, 3);

  // Get state names for coverage
  const coverageStateNames = provider.coverage_states
    .map((code) => usStates.find((s) => s.code === code)?.name)
    .filter(Boolean);

  // Get authoritative speed data from Reviews.org if available
  const speedData = getISPSpeedData(slug);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
    { name: provider.name, url: `https://pickify.io/internet-providers/provider/${slug}` },
  ];

  // Generate FAQs for AI citation
  const faqs = generateAllFAQs(provider, "internet-providers", "Internet Providers");

  // Generate QuickAnswer for AI citation
  const quickAnswerProps = generateReviewQuickAnswer(
    {
      name: provider.name,
      rating: provider.overall_rating,
      price: Number(getStartingPrice(provider).replace(/[^0-9.]/g, "")),
      pros: provider.pros,
      cons: provider.cons,
    },
    ["high-speed internet", "reliable service"]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <ProductSchema product={provider} verticalSlug="internet-providers" />
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
              <span className="font-medium">{provider.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    {provider.logo_url ? (
                      <Image
                        src={provider.logo_url}
                        alt={provider.name}
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    ) : (
                      <Wifi className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                      {provider.name} Review
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {provider.short_description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {technologyLabels[tech] || tech}
                    </Badge>
                  ))}
                  {provider.is_editors_choice && (
                    <Badge className="bg-warning text-warning-foreground">
                      Editor's Choice
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground mb-6">{provider.description}</p>

                <DisclosureBanner variant="inline" />
              </div>

              {/* Quick Stats Card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Our Rating</span>
                    <RatingCircle score={provider.overall_rating} size="lg" />
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Download</span>
                      <span className="font-semibold">
                        {provider.max_download_speed >= 1000
                          ? `${(provider.max_download_speed / 1000).toFixed(1)} Gbps`
                          : `${provider.max_download_speed} Mbps`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Upload</span>
                      <span className="font-semibold">
                        {provider.max_upload_speed >= 1000
                          ? `${(provider.max_upload_speed / 1000).toFixed(1)} Gbps`
                          : `${provider.max_upload_speed} Mbps`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Starting Price</span>
                      <span className="font-semibold text-primary">
                        {getStartingPrice(provider)}/mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-semibold">
                        {provider.coverage_states.length} states
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <Button className="w-full gradient-primary" asChild>
                    <a
                      href={generateAffiliateLink(provider, { campaign: "review-hero" })}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check Availability
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI-Optimized Quick Answer */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <QuickAnswer {...quickAnswerProps} />
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Pros & Cons</h2>
            <ProsConsList
              pros={provider.pros}
              cons={provider.cons}
              variant="cards"
            />
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">{provider.name} Plans & Pricing</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {provider.pricing.map((plan, index) => (
                <Card
                  key={index}
                  className={plan.is_popular ? "border-primary shadow-lg relative" : ""}
                >
                  {plan.is_popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.plan_name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.billing_cycle === "one-time" ? "once" : "mo"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full mt-4 ${plan.is_popular ? "gradient-primary" : ""}`}
                      variant={plan.is_popular ? "default" : "outline"}
                      asChild
                    >
                      <a
                        href={generateAffiliateLink(provider, { campaign: "pricing" })}
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
        </section>

        {/* Features */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Features & Specs</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {provider.features.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium capitalize">
                          {feature.name.replace(/_/g, " ")}
                        </TableCell>
                        <TableCell>
                          {typeof feature.value === "boolean" ? (
                            feature.value ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )
                          ) : (
                            feature.value
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Coverage */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              <Globe className="w-6 h-6 inline mr-2" />
              {provider.name} Coverage
            </h2>
            <p className="text-muted-foreground mb-4">
              {provider.name} is available in {provider.coverage_states.length} states:
            </p>
            <div className="flex flex-wrap gap-2">
              {coverageStateNames.map((state) => (
                <Badge key={state} variant="outline">
                  {state}
                </Badge>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-2">
                Check if {provider.name} is available at your address:
              </p>
              <div className="max-w-md">
                <LocationSearch placeholder="Enter your zip code" />
              </div>
            </div>
          </div>
        </section>

        {/* Speed Comparison with Competitors */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              How {provider.name} Compares
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Speed Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpeedComparison providers={[provider, ...competitors]} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compare With Others</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {competitors.map((comp) => (
                      <Link
                        key={comp.id}
                        href={`/internet-providers/compare/${provider.slug}-vs-${comp.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <span className="font-medium">
                          {provider.name} vs {comp.name}
                        </span>
                        <Badge variant="outline">Compare</Badge>
                      </Link>
                    ))}
                    <Link
                      href="/internet-providers/compare"
                      className="block text-center text-sm text-primary hover:underline mt-4"
                    >
                      See all comparisons →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Authoritative Speed Data */}
            {speedData && (
              <Card className="mt-6 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        <Zap className="w-3 h-3 mr-1" />
                        Independent Speed Test Data
                      </Badge>
                      <h3 className="font-semibold text-lg mb-1">
                        {provider.name} Real-World Speeds
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Based on independent testing by {DATA_SOURCES.reviewsOrg.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        #{speedData.rank}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Nationwide
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-primary/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{speedData.avgDownloadMbps}</div>
                      <div className="text-xs text-muted-foreground">Avg Download Mbps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{speedData.avgUploadMbps}</div>
                      <div className="text-xs text-muted-foreground">Avg Upload Mbps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold capitalize">{speedData.type}</div>
                      <div className="text-xs text-muted-foreground">Connection Type</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={speedData.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Source: {DATA_SOURCES.reviewsOrg.name} →
                    </a>
                    <Link
                      href="/internet-providers/speed-report"
                      className="text-sm text-primary hover:underline"
                    >
                      View Full Speed Report
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Get {provider.name}?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Check availability at your address and see current deals and promotions.
            </p>
            <Button size="lg" className="gradient-primary" asChild>
              <a
                href={generateAffiliateLink(provider, { campaign: "review-cta" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Availability & Pricing
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ Section - AI Citation Optimized */}
        <section className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions About {provider.name}
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
        </section>

        {/* Back Link */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/internet-providers">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Internet Providers
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all providers
export async function generateStaticParams() {
  const providers = getIspProducts();
  return providers.map((provider) => ({ slug: provider.slug }));
}
