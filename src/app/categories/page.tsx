import { Metadata } from "next";
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
  ShieldCheck,
  Home,
  Cloud,
  Star,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getActiveVerticals, getProductsByVertical } from "@/data";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "All Categories - Browse Reviews & Comparisons",
  description:
    "Explore all categories on Pickify. Find honest reviews, detailed comparisons, and expert recommendations for VPNs, web hosting, internet providers, and more.",
  alternates: {
    canonical: "https://pickify.io/categories",
  },
  openGraph: {
    title: "All Categories - Browse Reviews & Comparisons",
    description:
      "Explore all categories on Pickify. Find honest reviews and expert recommendations.",
  },
};

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
  ShieldCheck,
  Home,
  Cloud,
};

// Organize verticals by theme
const categoryGroups = [
  {
    name: "Security & Privacy",
    description: "Protect your digital life and personal data",
    slugs: ["vpn", "antivirus", "password-managers", "home-security"],
  },
  {
    name: "Web & Hosting",
    description: "Build and host your online presence",
    slugs: ["hosting", "website-builders", "cloud-storage"],
  },
  {
    name: "Business Tools",
    description: "Software to grow and manage your business",
    slugs: ["email-marketing", "crm", "project-management"],
  },
  {
    name: "Consumer Services",
    description: "Essential services for everyday life",
    slugs: ["internet-providers", "online-learning"],
  },
];

export default function CategoriesPage() {
  const verticals = getActiveVerticals();

  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "All Categories", url: "https://pickify.io/categories" },
  ];

  // Get product counts and top picks for each vertical
  const verticalData = verticals.map((v) => {
    const products = getProductsByVertical(v.slug);
    const topPick = products.find((p) => p.is_editors_choice) || products[0];
    return {
      ...v,
      productCount: products.length,
      topPick: topPick?.name || null,
      topRating: topPick?.overall_rating || null,
    };
  });

  // Create a map for quick lookup
  const verticalMap = Object.fromEntries(
    verticalData.map((v) => [v.slug, v])
  );

  // Calculate totals
  const totalProducts = verticalData.reduce((sum, v) => sum + v.productCount, 0);
  const totalCategories = verticalData.length;

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 via-accent/30 to-background border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                {totalCategories} Categories · {totalProducts}+ Products Reviewed
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Browse All Categories
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Explore our comprehensive reviews organized by category.
                Each category features in-depth comparisons, expert recommendations,
                and honest ratings based on real-world testing.
              </p>
            </div>
          </div>
        </section>

        {/* Category Groups */}
        {categoryGroups.map((group) => (
          <section key={group.name} className="py-12 odd:bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{group.name}</h2>
                <p className="text-muted-foreground">{group.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.slugs.map((slug) => {
                  const vertical = verticalMap[slug];
                  if (!vertical) return null;

                  const Icon = iconMap[vertical.icon] || Shield;

                  return (
                    <Link key={slug} href={`/${slug}`} className="group">
                      <Card className="h-full hover:border-primary hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                              style={{ backgroundColor: `${vertical.color}15` }}
                            >
                              <Icon
                                className="w-6 h-6"
                                style={{ color: vertical.color }}
                              />
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {vertical.productCount} products
                            </Badge>
                          </div>

                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {vertical.name}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {vertical.description.slice(0, 100)}...
                          </p>

                          {vertical.topPick && (
                            <div className="flex items-center gap-2 mb-4 p-2 bg-muted/50 rounded-lg">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm">
                                <span className="text-muted-foreground">Top Pick:</span>{" "}
                                <span className="font-medium">{vertical.topPick}</span>
                              </span>
                              {vertical.topRating && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  {vertical.topRating.toFixed(1)}
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                              View reviews
                              <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Quick Links Section */}
        <section className="py-12 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Quick Links</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Popular Comparisons</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    See how top products stack up against each other
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/vpn/compare">
                      View Comparisons
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Our Methodology</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn how we test and rate products
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/methodology">
                      How We Test
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">About Pickify</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn about our mission and team
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/about">
                      About Us
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
