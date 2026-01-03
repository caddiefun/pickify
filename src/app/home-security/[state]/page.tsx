import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, Shield, Wrench, Clock, Check, X, ExternalLink } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { DisclosureBanner, RatingCircle, ProductLogo } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema, FAQSchema, QuickAnswer } from "@/components/seo";
import { generateStateHomeSecurityFAQs } from "@/lib/faq-generator";
import { getStateBySlug, usStates } from "@/data/geo";
import {
  getHomeSecurityProducts,
  getDIYHomeSecurityProducts,
  getProfessionalHomeSecurityProducts,
  getFirstYearCost,
  HomeSecurityProduct,
} from "@/data/products/home-security";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return { title: "State Not Found" };
  }

  const products = getHomeSecurityProducts();

  return {
    title: `Best Home Security Systems in ${state.name} 2026 | Compare Top Providers`,
    description: `Compare ${products.length} home security providers in ${state.name}. Find the best DIY and professional systems with our honest reviews. No contracts, professional monitoring, and smart home options.`,
    alternates: {
      canonical: `https://pickify.io/home-security/${stateSlug}`,
    },
  };
}

function formatCurrency(amount: number | null): string {
  if (amount === null) return "Varies";
  return `$${amount.toLocaleString()}`;
}

export default async function HomeSecurityStatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const allProducts = getHomeSecurityProducts();
  const diyProducts = getDIYHomeSecurityProducts();
  const professionalProducts = getProfessionalHomeSecurityProducts();
  const noContractProducts = allProducts.filter((p) => p.contract_length_months === 0);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Home Security", url: "https://pickify.io/home-security" },
    { name: state.name, url: `https://pickify.io/home-security/${stateSlug}` },
  ];

  // Generate FAQs for AI citation
  const faqs = generateStateHomeSecurityFAQs(state.name, allProducts);

  // Generate QuickAnswer for AI citation
  const topProvider = allProducts[0];
  const quickAnswerProps = {
    question: `What is the best home security system in ${state.name}?`,
    answer: `${topProvider.name} is our top-rated home security system available in ${state.name}, scoring ${topProvider.overall_rating}/10. It offers ${topProvider.installation_type === "diy_only" ? "DIY installation" : topProvider.installation_type === "professional_only" ? "professional installation" : "both DIY and professional installation"} with ${topProvider.contract_length_months === 0 ? "no contract required" : `a ${topProvider.contract_length_months}-month contract`}. Starting at ${getStartingPrice(topProvider)}/month for monitoring, it's ideal for ${state.name} residents looking for ${topProvider.short_description.toLowerCase()}.`,
    lastUpdated: new Date().toISOString().split("T")[0],
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
                href="/home-security"
                className="text-muted-foreground hover:text-foreground"
              >
                Home Security
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{state.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              {allProducts.length} Providers Available in {state.name}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Best Home Security Systems in {state.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              Compare the top home security providers available to {state.name} residents.
              We've tested DIY and professionally installed systems to find the best
              options for your home and budget.
            </p>
            <DisclosureBanner variant="inline" />
          </div>
        </section>

        {/* AI-Optimized Quick Answer */}
        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <QuickAnswer {...quickAnswerProps} />
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {allProducts.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Providers</div>
                </CardContent>
              </Card>
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {diyProducts.length}
                  </div>
                  <div className="text-sm text-muted-foreground">DIY Options</div>
                </CardContent>
              </Card>
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {professionalProducts.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Professional Install</div>
                </CardContent>
              </Card>
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {noContractProducts.length}
                  </div>
                  <div className="text-sm text-muted-foreground">No Contract</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Provider Comparison Table */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              Home Security Providers in {state.name}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-semibold">Provider</th>
                    <th className="text-center p-4 font-semibold">Rating</th>
                    <th className="text-center p-4 font-semibold">Installation</th>
                    <th className="text-center p-4 font-semibold">Equipment</th>
                    <th className="text-center p-4 font-semibold">Monthly</th>
                    <th className="text-center p-4 font-semibold">Contract</th>
                    <th className="text-center p-4 font-semibold">1st Year</th>
                    <th className="text-right p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((product, index) => {
                    const firstYearCost = getFirstYearCost(product);
                    return (
                      <tr
                        key={product.id}
                        className={`border-b hover:bg-muted/30 ${index === 0 ? "bg-success/5" : ""}`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <ProductLogo
                              name={product.name}
                              logoUrl={product.logo_url}
                              size="sm"
                            />
                            <div>
                              <Link
                                href={`/home-security/${product.slug}`}
                                className="font-semibold hover:text-primary"
                              >
                                {product.name}
                              </Link>
                              {index === 0 && (
                                <Badge className="ml-2 bg-success text-success-foreground text-xs">
                                  Top Pick
                                </Badge>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {product.short_description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <RatingCircle score={product.overall_rating} size="sm" />
                        </td>
                        <td className="p-4 text-center">
                          <Badge
                            variant={
                              product.installation_type === "diy_only"
                                ? "secondary"
                                : product.installation_type === "professional_only"
                                ? "outline"
                                : "default"
                            }
                            className="text-xs"
                          >
                            {product.installation_type === "diy_only"
                              ? "DIY"
                              : product.installation_type === "professional_only"
                              ? "Pro"
                              : "Both"}
                          </Badge>
                        </td>
                        <td className="p-4 text-center text-sm">
                          {formatCurrency(product.equipment_cost)}
                        </td>
                        <td className="p-4 text-center">
                          <span className="font-semibold text-primary">
                            {getStartingPrice(product)}
                          </span>
                        </td>
                        <td className="p-4 text-center text-sm">
                          {product.contract_length_months === 0 ? (
                            <span className="text-green-600 font-medium">None</span>
                          ) : (
                            `${product.contract_length_months} mo`
                          )}
                        </td>
                        <td className="p-4 text-center text-sm font-medium">
                          {firstYearCost ? formatCurrency(firstYearCost) : "Varies"}
                        </td>
                        <td className="p-4 text-right">
                          <Button size="sm" asChild>
                            <a
                              href={generateAffiliateLink(product, {
                                campaign: `state-${stateSlug}`,
                              })}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Visit
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* DIY vs Professional Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              DIY vs Professional Installation in {state.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-green-600" />
                    DIY Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Perfect for {state.name} residents who want flexibility and lower costs.
                    Set up your system in under an hour with no professional fees.
                  </p>
                  <div className="space-y-2">
                    {diyProducts.slice(0, 3).map((product) => (
                      <Link
                        key={product.id}
                        href={`/home-security/${product.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ProductLogo
                            name={product.name}
                            logoUrl={product.logo_url}
                            size="sm"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {getStartingPrice(product)}/mo
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Professional Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Get expert installation from certified technicians in {state.name}.
                    Ideal for complex setups or those who prefer hands-off solutions.
                  </p>
                  <div className="space-y-2">
                    {professionalProducts.slice(0, 3).map((product) => (
                      <Link
                        key={product.id}
                        href={`/home-security/${product.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ProductLogo
                            name={product.name}
                            logoUrl={product.logo_url}
                            size="sm"
                          />
                          <span className="font-medium">{product.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {getStartingPrice(product)}/mo
                        </span>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Editorial Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h2>Home Security in {state.name}</h2>
              <p>
                {state.name} residents have access to all major home security providers,
                including {allProducts.slice(0, 3).map((p) => p.name).join(", ")}, and more.
                Whether you prefer a DIY system you can set up yourself or a professionally
                installed solution, there are options to fit every budget and security need.
              </p>
              <h3>Choosing Between DIY and Professional Installation</h3>
              <p>
                <strong>DIY systems</strong> like SimpliSafe and Ring Alarm are popular in
                {state.name} for their flexibility and lower upfront costs. You can install
                them in under an hour, move them when you relocate, and there are typically
                no long-term contracts. They're ideal for renters and homeowners who want
                control over their security setup.
              </p>
              <p>
                <strong>Professional systems</strong> from ADT and Vivint offer
                comprehensive installation by trained technicians. While they usually require
                longer contracts (36-60 months), they provide more complex setups, advanced
                smart home integration, and the peace of mind that comes with expert installation.
              </p>
              <h3>Local Considerations for {state.name}</h3>
              <p>
                When choosing a home security system in {state.name}, consider:
              </p>
              <ul>
                <li><strong>Weather conditions:</strong> Some systems may require weatherproofing for outdoor cameras</li>
                <li><strong>Permit requirements:</strong> Some cities in {state.name} require alarm permits for monitored systems</li>
                <li><strong>Response times:</strong> All major providers have monitoring centers that can dispatch local emergency services</li>
                <li><strong>Smart home compatibility:</strong> Consider existing smart home devices you may already own</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section - AI Citation Optimized */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              Home Security FAQs for {state.name} Residents
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

        {/* Other States */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-4">
              Home Security in Other States
            </h2>
            <div className="flex flex-wrap gap-2">
              {usStates
                .filter((s) => s.slug !== stateSlug)
                .slice(0, 20)
                .map((s) => (
                  <Link
                    key={s.code}
                    href={`/home-security/${s.slug}`}
                    className="text-sm px-3 py-1 rounded-full border hover:bg-accent transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
              {usStates.length > 21 && (
                <span className="text-sm text-muted-foreground px-3 py-1">
                  +{usStates.length - 21} more
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 md:py-12 border-t">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/home-security">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home Security
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all states
export async function generateStaticParams() {
  return usStates.map((state) => ({ state: state.slug }));
}
