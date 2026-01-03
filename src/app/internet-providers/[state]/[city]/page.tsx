import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { LocationSearch, ProviderCard, SpeedComparison, SpeedTestCTA } from "@/components/isp";
import { DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema, FAQSchema, QuickAnswer, generateCityQuickAnswer } from "@/components/seo";
import { generateCityFAQs } from "@/lib/faq-generator";
import {
  getStateBySlug,
  getCityBySlug,
  getIspByState,
  usCities,
  usStates,
  getNearbyCities,
} from "@/data";

interface PageProps {
  params: Promise<{ state: string; city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getStateBySlug(stateSlug);
  const city = state ? getCityBySlug(stateSlug, citySlug) : null;

  if (!state || !city) {
    return { title: "City Not Found" };
  }

  const providers = getIspByState(state.code);

  return {
    title: `Best Internet Providers in ${city.name}, ${state.code} 2025 | Pickify`,
    description: `Compare ${providers.length} internet providers in ${city.name}, ${state.name}. Find fiber, cable, and satellite ISPs available at your address.`,
  };
}

export default async function CityPage({ params }: PageProps) {
  const { state: stateSlug, city: citySlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const city = getCityBySlug(stateSlug, citySlug);

  if (!city) {
    notFound();
  }

  const providers = getIspByState(state.code);

  // Get nearby cities for geo-SEO internal linking
  const nearbyCities = getNearbyCities(state.code, citySlug, 5);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
    { name: state.name, url: `https://pickify.io/internet-providers/${stateSlug}` },
    {
      name: city.name,
      url: `https://pickify.io/internet-providers/${stateSlug}/${citySlug}`,
    },
  ];

  // Generate FAQs for AI citation
  const faqs = generateCityFAQs(city.name, state.name, providers, city.zipCodes.length);

  // Generate QuickAnswer for AI citation
  const topProvider = providers[0];
  const fiberAvailable = providers.some(p => p.technologies.includes("fiber"));
  const quickAnswerProps = topProvider ? generateCityQuickAnswer(
    city.name,
    state.name,
    {
      name: topProvider.name,
      rating: topProvider.overall_rating,
    },
    providers.length,
    fiberAvailable
  ) : null;

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
                href="/internet-providers"
                className="text-muted-foreground hover:text-foreground"
              >
                Internet Providers
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href={`/internet-providers/${stateSlug}`}
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
              {city.name}, {state.code}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Best Internet Providers in {city.name}, {state.code}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              Find the best internet service providers available in {city.name},{" "}
              {state.name}. Compare speeds, prices, and availability from{" "}
              {providers.length} providers.
            </p>

            <div className="max-w-md mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Enter your exact zip code for availability:
              </p>
              <LocationSearch placeholder={`e.g., ${city.zipCodes[0]}`} />
            </div>

            <DisclosureBanner variant="inline" />
          </div>
        </section>

        {/* AI-Optimized Quick Answer */}
        {quickAnswerProps && (
          <section className="py-8 border-b">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <QuickAnswer {...quickAnswerProps} />
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Provider List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">
                {providers.length} Providers Serving {city.name}
              </h2>
              <div className="space-y-4">
                {providers.map((provider, index) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    rank={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Speed Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Speed Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpeedComparison providers={providers.slice(0, 5)} />
                </CardContent>
              </Card>

              {/* Speed Test CTA */}
              <SpeedTestCTA location={`${city.name}, ${state.code}`} />

              {/* Zip Codes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Zip Codes in {city.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {city.zipCodes.map((zip) => (
                      <Link
                        key={zip}
                        href={`/internet-providers/zip/${zip}`}
                        className="px-3 py-1 rounded-full bg-muted text-sm hover:bg-accent transition-colors"
                      >
                        {zip}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technology Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Connection Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {["fiber", "cable", "dsl", "fixed_wireless", "satellite"].map(
                      (tech) => {
                        const count = providers.filter((p) =>
                          p.technologies.includes(tech as any)
                        ).length;
                        if (count === 0) return null;
                        return (
                          <div
                            key={tech}
                            className="flex justify-between items-center"
                          >
                            <span className="capitalize">
                              {tech === "fixed_wireless"
                                ? "5G/Fixed Wireless"
                                : tech}
                            </span>
                            <Badge variant="secondary">
                              {count} provider{count !== 1 ? "s" : ""}
                            </Badge>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Cities - Geo-SEO internal linking */}
              {nearbyCities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Nearby Areas in {state.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {nearbyCities.map((nearbyCity) => (
                        <Link
                          key={nearbyCity.slug}
                          href={`/internet-providers/${stateSlug}/${nearbyCity.slug}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group"
                        >
                          <span className="group-hover:text-primary transition-colors">
                            {nearbyCity.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {nearbyCity.zipCodes.length} zip codes
                          </span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Editorial Content */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h2>Internet Service in {city.name}</h2>
              <p>
                Residents of {city.name}, {state.name} have several options for
                high-speed internet service. The major providers serving this
                area include{" "}
                {providers
                  .slice(0, 3)
                  .map((p) => p.name)
                  .join(", ")}
                {providers.length > 3 && " and others"}.
              </p>
              <p>
                The fastest available speeds in {city.name} reach up to{" "}
                {Math.max(...providers.map((p) => p.max_download_speed)) >= 1000
                  ? `${(
                      Math.max(...providers.map((p) => p.max_download_speed)) /
                      1000
                    ).toFixed(1)} Gbps`
                  : `${Math.max(
                      ...providers.map((p) => p.max_download_speed)
                    )} Mbps`}{" "}
                from fiber providers. Cable internet is also widely available,
                offering speeds suitable for streaming, gaming, and working from
                home.
              </p>
              <p>
                For the most accurate availability information, enter your zip
                code ({city.zipCodes[0]}, etc.) in the search box above. Service
                availability can vary by street address even within{" "}
                {city.name}.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section - AI Citation Optimized */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions About Internet in {city.name}
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
              <Link href={`/internet-providers/${stateSlug}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {state.name}
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all state/city combinations
export async function generateStaticParams() {
  const params: { state: string; city: string }[] = [];

  for (const city of usCities) {
    const state = usStates.find((s) => s.code === city.stateCode);
    if (state) {
      params.push({
        state: state.slug,
        city: city.slug,
      });
    }
  }

  return params;
}
