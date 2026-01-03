import { Metadata } from "next";
import Link from "next/link";
import { Wifi, MapPin, Zap, Shield, ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { LocationSearch, ProviderCard } from "@/components/isp";
import { DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo";
import {
  getIspProducts,
  getFeaturedIspProducts,
  usStates,
  getStatesWithCities,
} from "@/data";

export const metadata: Metadata = {
  title: "Best Internet Providers 2025 - Compare ISPs by Zip Code | Pickify",
  description:
    "Find the best internet service providers in your area. Compare speeds, prices, and availability for fiber, cable, DSL, 5G, and satellite internet by zip code.",
  openGraph: {
    title: "Best Internet Providers 2025 - Compare ISPs by Zip Code",
    description:
      "Find the best internet service providers in your area. Compare speeds, prices, and availability.",
  },
};

export default function InternetProvidersPage() {
  const allProviders = getIspProducts();
  const featuredProviders = getFeaturedIspProducts();
  const statesWithCities = getStatesWithCities();

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />

      <main className="flex-1">
        {/* Hero Section with Search */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                <Wifi className="w-3 h-3 mr-1" />
                Find Internet in Your Area
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Compare Internet Providers
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Enter your zip code to see which internet providers are available
                at your address. Compare speeds, prices, and features from fiber,
                cable, DSL, 5G, and satellite providers.
              </p>

              {/* Main Search */}
              <div className="max-w-xl mx-auto mb-6">
                <LocationSearch size="lg" placeholder="Enter your zip code (e.g., 90210)" />
              </div>

              <DisclosureBanner variant="inline" />
            </div>
          </div>
        </section>

        {/* Featured Providers */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Top-Rated Internet Providers</h2>
              <Link
                href="/internet-providers/compare"
                className="text-primary hover:underline text-sm"
              >
                Compare all providers →
              </Link>
            </div>

            <div className="space-y-4">
              {featuredProviders.slice(0, 5).map((provider, index) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  rank={index + 1}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/internet-providers/compare">
                  View All {allProviders.length} Providers
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Compare Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Compare Internet Providers?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 text-primary" />
                    Speed Matters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    From 25 Mbps basic plans to 8 Gbps fiber, speeds vary dramatically.
                    Find the right speed for streaming, gaming, and working from home.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    Availability Varies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Not all providers serve every address. Check availability by
                    zip code to see your real options before comparing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-primary" />
                    Hidden Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Data caps, equipment fees, and price increases matter. We
                    highlight the true cost of each provider beyond the advertised price.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Browse by State */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Browse Internet Providers by State
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {usStates.map((state) => (
                <Link
                  key={state.code}
                  href={`/internet-providers/${state.slug}`}
                  className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-center"
                >
                  <span className="font-medium">{state.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Cities */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Popular Cities</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {statesWithCities.slice(0, 8).flatMap(({ state, cities }) =>
                cities.slice(0, 2).map((city) => (
                  <Link
                    key={`${state.code}-${city.slug}`}
                    href={`/internet-providers/${state.slug}/${city.slug}`}
                    className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-muted-foreground">{state.name}</div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Editorial Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h2>How We Review Internet Providers</h2>
              <p>
                Choosing the right internet provider is one of the most important
                decisions for your home or business. We evaluate ISPs based on
                real-world performance, not just advertised speeds.
              </p>
              <p>
                Our team tests connection reliability, measures actual speeds during
                peak hours, reviews customer service experiences, and analyzes the
                true cost including hidden fees, data caps, and equipment charges.
              </p>
              <p>
                We update our reviews quarterly and incorporate feedback from
                thousands of users to ensure our recommendations reflect current
                service quality. Use our zip code search above to see which
                providers actually serve your address.
              </p>
              <div className="not-prose mt-6">
                <Button asChild>
                  <Link href="/methodology">
                    Learn About Our Methodology
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
