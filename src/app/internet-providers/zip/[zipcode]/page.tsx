import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, AlertCircle, Wifi } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { LocationSearch, ProviderCard, SpeedComparison } from "@/components/isp";
import { DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BreadcrumbSchema } from "@/components/seo";
import {
  getZipCodeData,
  getIspProductBySlug,
  getAllZipCodes,
  isValidZipCode,
} from "@/data";
import type { ISPProduct } from "@/data/products/isp";

interface PageProps {
  params: Promise<{ zipcode: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { zipcode } = await params;
  const zipData = getZipCodeData(zipcode);

  if (!zipData) {
    return {
      title: `Internet Providers in ${zipcode} | Pickify`,
      description: `Find internet service providers available in zip code ${zipcode}. Compare speeds, prices, and reviews.`,
    };
  }

  return {
    title: `Internet Providers in ${zipData.city}, ${zipData.stateCode} ${zipcode} | Pickify`,
    description: `Compare ${zipData.providers.length} internet providers available in ${zipData.city}, ${zipData.stateCode} (${zipcode}). Find fiber, cable, DSL, and satellite options.`,
  };
}

export default async function ZipCodeResultsPage({ params }: PageProps) {
  const { zipcode } = await params;

  // Validate zip code format
  if (!isValidZipCode(zipcode)) {
    notFound();
  }

  const zipData = getZipCodeData(zipcode);

  // Get provider details for available providers
  const availableProviders: ISPProduct[] = zipData
    ? zipData.providers
        .map((slug) => getIspProductBySlug(slug))
        .filter((p): p is ISPProduct => p !== undefined)
        .sort((a, b) => b.overall_rating - a.overall_rating)
    : [];

  const location = zipData
    ? `${zipData.city}, ${zipData.stateCode} ${zipcode}`
    : zipcode;

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
    { name: location, url: `https://pickify.io/internet-providers/zip/${zipcode}` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
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
              <span className="font-medium">{location}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              {availableProviders.length} Providers Available
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Internet Providers in {location}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              {availableProviders.length > 0
                ? `We found ${availableProviders.length} internet service providers serving zip code ${zipcode}. Compare speeds, prices, and features below.`
                : `Search for internet providers in a different location.`}
            </p>

            {/* Search Another Location */}
            <div className="max-w-md mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Search a different zip code:
              </p>
              <LocationSearch placeholder="Enter another zip code" />
            </div>

            <DisclosureBanner variant="inline" />
          </div>
        </section>

        {availableProviders.length > 0 ? (
          <>
            {/* Provider Results */}
            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Results */}
                  <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Available Internet Providers
                    </h2>
                    {availableProviders.map((provider, index) => (
                      <ProviderCard
                        key={provider.id}
                        provider={provider}
                        rank={index + 1}
                      />
                    ))}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Speed Comparison */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Speed Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <SpeedComparison providers={availableProviders.slice(0, 5)} />
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Stats for {zipcode}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Providers</span>
                          <span className="font-semibold">{availableProviders.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fiber Available</span>
                          <span className="font-semibold">
                            {availableProviders.filter((p) => p.technologies.includes("fiber")).length > 0
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Speed</span>
                          <span className="font-semibold">
                            {Math.max(...availableProviders.map((p) => p.max_download_speed)) >= 1000
                              ? `${(Math.max(...availableProviders.map((p) => p.max_download_speed)) / 1000).toFixed(1)} Gbps`
                              : `${Math.max(...availableProviders.map((p) => p.max_download_speed))} Mbps`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lowest Price</span>
                          <span className="font-semibold">
                            ${Math.min(
                              ...availableProviders.flatMap((p) =>
                                p.pricing.map((plan) => plan.price)
                              )
                            )}/mo
                          </span>
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
                          {["fiber", "cable", "dsl", "fixed_wireless", "satellite"].map((tech) => {
                            const count = availableProviders.filter((p) =>
                              p.technologies.includes(tech as any)
                            ).length;
                            if (count === 0) return null;
                            return (
                              <div key={tech} className="flex justify-between items-center">
                                <span className="capitalize">
                                  {tech === "fixed_wireless" ? "5G/Fixed Wireless" : tech}
                                </span>
                                <Badge variant="secondary">{count} provider{count !== 1 ? "s" : ""}</Badge>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* No Results */
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Alert className="max-w-2xl mx-auto">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No Providers Found</AlertTitle>
                <AlertDescription>
                  We don't have detailed availability data for zip code {zipcode} yet.
                  This doesn't mean there are no providers in your area. Try searching
                  with a nearby zip code, or check our list of national providers below.
                </AlertDescription>
              </Alert>

              <div className="mt-8 text-center">
                <h3 className="text-xl font-semibold mb-4">
                  Providers Available Nationwide
                </h3>
                <p className="text-muted-foreground mb-6">
                  These providers offer service in most areas of the US:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/internet-providers/provider/starlink">
                    <Badge variant="outline" className="text-base py-2 px-4 cursor-pointer hover:bg-accent">
                      <Wifi className="w-4 h-4 mr-2" />
                      Starlink (Satellite)
                    </Badge>
                  </Link>
                  <Link href="/internet-providers/provider/hughesnet">
                    <Badge variant="outline" className="text-base py-2 px-4 cursor-pointer hover:bg-accent">
                      <Wifi className="w-4 h-4 mr-2" />
                      HughesNet (Satellite)
                    </Badge>
                  </Link>
                  <Link href="/internet-providers/provider/t-mobile-home-internet">
                    <Badge variant="outline" className="text-base py-2 px-4 cursor-pointer hover:bg-accent">
                      <Wifi className="w-4 h-4 mr-2" />
                      T-Mobile 5G Home
                    </Badge>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Back Link */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/internet-providers">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Internet Providers
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Generate static params for all zip codes
export async function generateStaticParams() {
  const zipCodes = getAllZipCodes();
  return zipCodes.map((zipcode) => ({ zipcode }));
}
