import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, Shield, ExternalLink } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { DisclosureBanner, RatingCircle, ProductLogo } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema, FAQSchema, QuickAnswer } from "@/components/seo";
import { generateCityHomeSecurityFAQs } from "@/lib/faq-generator";
import { getStateBySlug, getCityBySlug, getCitiesByState, usStates } from "@/data/geo";
import {
  getHomeSecurityProducts,
  getDIYHomeSecurityProducts,
  getProfessionalHomeSecurityProducts,
  HomeSecurityProduct,
} from "@/data/products/home-security";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getStateBySlug(stateSlug);
  const city = getCityBySlug(stateSlug, citySlug);

  if (!state || !city) {
    return { title: "City Not Found" };
  }

  const products = getHomeSecurityProducts();

  return {
    title: `Best Home Security Systems in ${city.name}, ${state.name} 2026 | Compare Providers`,
    description: `Compare ${products.length} home security systems in ${city.name}, ${state.name}. Find DIY and professional options with honest reviews. No contracts available.`,
    alternates: {
      canonical: `https://pickify.io/home-security/${stateSlug}/${citySlug}`,
    },
  };
}

export default async function HomeSecurityCityPage({ params }: PageProps) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const city = getCityBySlug(stateSlug, citySlug);

  if (!city) {
    notFound();
  }

  const allProducts = getHomeSecurityProducts();
  const diyProducts = getDIYHomeSecurityProducts();
  const noContractProducts = allProducts.filter((p) => p.contract_length_months === 0);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Home Security", url: "https://pickify.io/home-security" },
    { name: state.name, url: `https://pickify.io/home-security/${stateSlug}` },
    { name: city.name, url: `https://pickify.io/home-security/${stateSlug}/${citySlug}` },
  ];

  // Generate FAQs for AI citation
  const faqs = generateCityHomeSecurityFAQs(city.name, state.name, allProducts);

  // Generate QuickAnswer for AI citation
  const topProvider = allProducts[0];
  const quickAnswerProps = {
    question: `What is the best home security system in ${city.name}, ${state.name}?`,
    answer: `${topProvider.name} is our top-rated home security system in ${city.name}, scoring ${topProvider.overall_rating}/10. All ${allProducts.length} major home security providers serve ${city.name}, including ${allProducts.slice(0, 3).map(p => p.name).join(", ")}. ${noContractProducts.length} options require no contract.`,
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  // Get other cities in the same state
  const otherCities = getCitiesByState(state.code).filter(c => c.slug !== citySlug);

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
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
              <Link
                href={`/home-security/${stateSlug}`}
                className="text-muted-foreground hover:text-foreground"
              >
                {state.name}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">{city.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              {city.name}, {state.name}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Best Home Security Systems in {city.name}, {state.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              All {allProducts.length} major home security providers serve {city.name}.
              Compare DIY and professional options to find the best system for your home and budget.
            </p>
            <DisclosureBanner variant="inline" />
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

        {/* Provider Cards */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Home Security Providers in {city.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProducts.map((product, index) => (
                <Card key={product.id} className={index === 0 ? "border-success" : ""}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
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
                              #1
                            </Badge>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {product.short_description}
                          </p>
                        </div>
                      </div>
                      <RatingCircle score={product.overall_rating} size="sm" />
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">From </span>
                        <span className="font-semibold text-primary">
                          {getStartingPrice(product)}/mo
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.installation_type === "diy_only"
                          ? "DIY"
                          : product.installation_type === "professional_only"
                          ? "Pro Install"
                          : "DIY or Pro"}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/home-security/${product.slug}`}>
                          Details
                        </Link>
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <a
                          href={generateAffiliateLink(product, {
                            campaign: `city-${citySlug}`,
                          })}
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
        </section>

        {/* Local Info */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h2>Home Security in {city.name}, {state.name}</h2>
              <p>
                {city.name} residents have access to all major home security providers.
                Whether you're looking for a DIY system like SimpliSafe or Ring, or prefer
                professional installation from ADT or Vivint, all options are available in your area.
              </p>
              <h3>Important Considerations for {city.name} Residents</h3>
              <ul>
                <li>
                  <strong>Alarm Permits:</strong> {city.name} may require an alarm permit for
                  monitored security systems. Contact the local police department to verify.
                </li>
                <li>
                  <strong>Response Times:</strong> All providers use nationwide monitoring centers
                  that dispatch to {city.name} emergency services.
                </li>
                <li>
                  <strong>Installation:</strong> {diyProducts.length} providers offer DIY installation,
                  perfect for renters or those who want flexibility.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Home Security FAQs for {city.name}
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

        {/* Other Cities in State */}
        {otherCities.length > 0 && (
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-xl font-bold mb-4">
                Other Cities in {state.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/home-security/${stateSlug}/${c.slug}`}
                    className="text-sm px-3 py-1 rounded-full border hover:bg-accent transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link href={`/home-security/${stateSlug}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {state.name}
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/home-security">
                  <Shield className="w-4 h-4 mr-2" />
                  All Home Security
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

// Generate static params for cities we have data for
export async function generateStaticParams() {
  const { getCitiesByState } = await import("@/data/geo");
  const params: { state: string; city: string }[] = [];

  for (const state of usStates) {
    const cities = getCitiesByState(state.code);
    for (const city of cities) {
      params.push({
        state: state.slug,
        city: city.slug,
      });
    }
  }

  return params;
}
