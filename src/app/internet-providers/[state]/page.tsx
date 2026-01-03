import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { LocationSearch, ProviderCard } from "@/components/isp";
import { DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema } from "@/components/seo";
import {
  getStateBySlug,
  getCitiesByState,
  getIspByState,
  usStates,
} from "@/data";

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    return { title: "State Not Found" };
  }

  const providers = getIspByState(state.code);

  return {
    title: `Best Internet Providers in ${state.name} 2025 | Pickify`,
    description: `Compare ${providers.length} internet providers in ${state.name}. Find the best fiber, cable, and satellite ISPs with our honest reviews and speed comparisons.`,
  };
}

export default async function StatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const providers = getIspByState(state.code);
  const cities = getCitiesByState(state.code);

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Internet Providers", url: "https://pickify.io/internet-providers" },
    { name: state.name, url: `https://pickify.io/internet-providers/${stateSlug}` },
  ];

  // Count providers by technology
  const fiberCount = providers.filter((p) => p.technologies.includes("fiber")).length;
  const cableCount = providers.filter((p) => p.technologies.includes("cable")).length;
  const satelliteCount = providers.filter((p) =>
    p.technologies.includes("satellite")
  ).length;

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
              <span className="font-medium">{state.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-accent/50 to-background">
          <div className="container mx-auto px-4">
            <Badge variant="secondary" className="mb-4">
              <MapPin className="w-3 h-3 mr-1" />
              {providers.length} Providers in {state.name}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Best Internet Providers in {state.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              Compare {providers.length} internet service providers available in{" "}
              {state.name}. Find the best fiber, cable, DSL, and satellite options
              for your home or business.
            </p>

            <div className="max-w-md mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                Enter your zip code for exact availability:
              </p>
              <LocationSearch placeholder={`Enter ${state.name} zip code`} />
            </div>

            <DisclosureBanner variant="inline" />
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {providers.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Providers</div>
                </CardContent>
              </Card>
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{fiberCount}</div>
                  <div className="text-sm text-muted-foreground">Fiber Providers</div>
                </CardContent>
              </Card>
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{cableCount}</div>
                  <div className="text-sm text-muted-foreground">Cable Providers</div>
                </CardContent>
              </Card>
              <Card className="flex-1 min-w-[140px] max-w-[200px]">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {satelliteCount}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Satellite Providers
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Provider List */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">
              Internet Providers in {state.name}
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
        </section>

        {/* Cities in State */}
        {cities.length > 0 && (
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">
                Popular Cities in {state.name}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/internet-providers/${stateSlug}/${city.slug}`}
                    className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {city.zipCodes.length} zip codes
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Editorial Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
              <h2>Internet Service in {state.name}</h2>
              <p>
                {state.name} residents have access to {providers.length} major
                internet service providers, including{" "}
                {providers
                  .slice(0, 3)
                  .map((p) => p.name)
                  .join(", ")}
                {providers.length > 3 && " and more"}.
              </p>
              <p>
                The most common connection types in {state.name} are{" "}
                {fiberCount > 0 && "fiber, "}
                {cableCount > 0 && "cable, "}
                and satellite internet. Fiber internet offers the fastest speeds
                with symmetrical upload and download, while cable provides a good
                balance of speed and availability. Satellite internet from
                providers like Starlink and HughesNet is available statewide,
                making it a reliable option for rural areas.
              </p>
              <p>
                To find the best internet provider for your specific address,
                enter your zip code in the search box above. Availability can
                vary significantly even within the same city.
              </p>
            </div>
          </div>
        </section>

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

// Generate static params for all states
export async function generateStaticParams() {
  return usStates.map((state) => ({ state: state.slug }));
}
