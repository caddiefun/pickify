import Link from "next/link";
import {
  Shield,
  Server,
  Mail,
  Key,
  Briefcase,
  Users,
  Globe,
  GraduationCap,
  Wifi,
  ArrowRight,
  CheckCircle,
  Zap,
  Award,
  TrendingUp,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { ProductCard, DisclosureBanner } from "@/components/comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActiveVerticals, getFeaturedVpnProducts } from "@/data";
import {
  OrganizationSchema,
  WebSiteSchema,
  ItemListSchema,
  QuickAnswer,
} from "@/components/seo";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Server,
  Mail,
  Key,
  Briefcase,
  Users,
  Globe,
  GraduationCap,
  Wifi,
};

const features = [
  {
    icon: CheckCircle,
    title: "Unbiased Reviews",
    description:
      "Our team tests every product thoroughly without influence from advertisers.",
  },
  {
    icon: Zap,
    title: "Up-to-Date",
    description:
      "We continuously update our reviews to reflect the latest features and pricing.",
  },
  {
    icon: Award,
    title: "Expert Analysis",
    description:
      "Our experts have years of experience in evaluating products and services.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven",
    description:
      "Our ratings are based on measurable metrics, not just opinions.",
  },
];

export default function HomePage() {
  const verticals = getActiveVerticals();
  const featuredVpns = getFeaturedVpnProducts();
  const topVpn = featuredVpns[0];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema Markup for SEO & AI */}
      <OrganizationSchema />
      <WebSiteSchema />
      <ItemListSchema
        name="Best Software Comparison Tools 2025"
        description="Compare the best VPNs, web hosting, email marketing, and more with expert reviews and detailed comparisons."
        url="https://pickify.io"
        products={featuredVpns}
        verticalSlug="vpn"
      />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-accent/30 to-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Trusted by 50,000+ readers monthly
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Pick Smart.{" "}
                <span className="text-primary">Save Time.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Compare the best products and services with honest reviews, detailed
                comparisons, and expert recommendations. Find the perfect
                solution for your needs in minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary" asChild>
                  <Link href="/categories">
                    Browse All Categories
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/methodology">How We Test</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer - AI Citation Optimized */}
        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <QuickAnswer
                question="What is the best software comparison site in 2025?"
                answer={`Pickify helps you find the best software across ${verticals.length} categories including VPNs, web hosting, email marketing, and more. Our top-rated VPN is ${topVpn?.name || "NordVPN"} with a ${topVpn?.overall_rating || 9.5}/10 rating. We test every product hands-on and update our reviews monthly.`}
                supportingFacts={[
                  { label: "Categories", value: `${verticals.length}` },
                  { label: "Top VPN", value: topVpn?.name || "NordVPN" },
                  { label: "VPN Rating", value: `${topVpn?.overall_rating || 9.5}/10` },
                  { label: "Updated", value: "Monthly" },
                ]}
                updatedDate={new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive guides across multiple software
                categories. Each category features in-depth reviews, head-to-head
                comparisons, and expert recommendations.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {verticals.map((vertical) => {
                const Icon = iconMap[vertical.icon] || Shield;
                return (
                  <Link
                    key={vertical.slug}
                    href={`/${vertical.slug}`}
                    className="group"
                  >
                    <Card className="h-full hover:border-primary hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors"
                          style={{ backgroundColor: `${vertical.color}15` }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: vertical.color }}
                          />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {vertical.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {vertical.description.slice(0, 100)}...
                        </p>
                        <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                          View comparisons
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured VPNs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Most Popular
                </Badge>
                <h2 className="text-3xl font-bold">Best VPNs of 2025</h2>
              </div>
              <Button variant="outline" asChild className="hidden md:flex">
                <Link href="/vpn">
                  View All VPNs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {featuredVpns.slice(0, 3).map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                  verticalSlug="vpn"
                  variant={index === 0 ? "featured" : "default"}
                />
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Button asChild>
                <Link href="/vpn">
                  View All VPNs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Trust Pickify?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing honest, accurate, and helpful
                information to help you make informed decisions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Comparisons */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Comparisons</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Can't decide between two products? Our head-to-head comparisons
                break down the differences so you can make the right choice.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  a: "NordVPN",
                  b: "ExpressVPN",
                  slug: "nordvpn-vs-expressvpn",
                  vertical: "vpn",
                },
                {
                  a: "NordVPN",
                  b: "Surfshark",
                  slug: "nordvpn-vs-surfshark",
                  vertical: "vpn",
                },
                {
                  a: "ExpressVPN",
                  b: "Surfshark",
                  slug: "expressvpn-vs-surfshark",
                  vertical: "vpn",
                },
              ].map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/${comparison.vertical}/compare/${comparison.slug}`}
                  className="group"
                >
                  <Card className="hover:border-primary hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-muted-foreground">
                            {comparison.a.charAt(0)}
                          </div>
                          <span className="text-muted-foreground font-medium">
                            vs
                          </span>
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold text-muted-foreground">
                            {comparison.b.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {comparison.a} vs {comparison.b}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        Compare features, pricing & performance
                      </p>
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                        View comparison
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Disclosure */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <DisclosureBanner variant="banner" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start comparing products now and make informed decisions with our
              comprehensive reviews and comparisons.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/categories">
                Browse All Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
