import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "About Pickify - Software Comparison & Reviews",
  description:
    "Learn about Pickify and how we help you compare software products. We research options and provide helpful information to guide your decisions.",
  openGraph: {
    title: "About Pickify - Software Comparison & Reviews",
    description:
      "Learn about Pickify and how we help you compare software products. We research options and provide helpful information to guide your decisions.",
  },
};

const values = [
  {
    icon: Shield,
    title: "Honesty",
    description:
      "We aim to provide honest recommendations. While we earn affiliate commissions, we try not to let that influence our content.",
  },
  {
    icon: Users,
    title: "User-First",
    description:
      "We focus on what matters to real people: features, pricing, ease of use, and whether something actually works.",
  },
  {
    icon: TrendingUp,
    title: "Transparency",
    description:
      "We're upfront about how we make money. Affiliate links are clearly disclosed. We're not a formal testing lab – just trying to be helpful.",
  },
];

const stats = [
  { value: "50+", label: "Products Reviewed" },
  { value: "12", label: "Software Categories" },
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "About", url: "https://pickify.io/about" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                About Us
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Helping You Choose the Right Software
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Pickify helps you compare software products and make better
                decisions. We research options so you don't have to.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  Finding trustworthy software recommendations shouldn't be this hard.
                  We started Pickify to cut through the noise and help you make
                  better decisions.
                </p>
                <p className="mb-4">
                  Our goal is simple: save you time by researching software so you
                  don't have to. Whether you're looking for a VPN to protect your
                  privacy, a web host for your business, or an email marketing
                  platform to grow your audience – we aim to provide clear,
                  helpful comparisons.
                </p>
                <p>
                  We research products, consider user reviews, compare features and
                  pricing, and try products ourselves when possible. We can't
                  promise perfection, but we try to keep our content accurate and
                  up-to-date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                What guides our work
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How We Make Money */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">How We Make Money</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We believe in being upfront about how the site works:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Affiliate Commissions:
                      </strong>{" "}
                      When you click a link and sign up for a product, we may
                      earn a commission at no extra cost to you. This is how
                      we keep the site running.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Sponsored Placements:
                      </strong>{" "}
                      Some companies may pay for featured placement. When this
                      happens, it will be clearly labeled.
                    </span>
                  </li>
                </ul>
                <p>
                  We do our best to provide honest information regardless of
                  affiliate relationships, but you should know that we benefit
                  financially when you use our links.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/disclosure">
                    Read Our Full Disclosure
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Software?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Browse our comprehensive reviews and comparisons to find the tools
              that fit your needs.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">
                Explore Reviews
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
