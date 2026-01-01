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
  title: "About Pickify - Our Mission & Team",
  description:
    "Learn about Pickify's mission to help consumers make informed software decisions through unbiased, expert reviews and comparisons.",
  openGraph: {
    title: "About Pickify - Our Mission & Team",
    description:
      "Learn about Pickify's mission to help consumers make informed software decisions through unbiased, expert reviews and comparisons.",
  },
};

const values = [
  {
    icon: Shield,
    title: "Independence",
    description:
      "Our reviews are never influenced by advertisers. We maintain strict editorial independence to ensure our recommendations are always in your best interest.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description:
      "Every product is tested using consistent methodologies. We verify claims, measure performance, and update our reviews as products evolve.",
  },
  {
    icon: Users,
    title: "User-First",
    description:
      "We design our content around your needs, not search engines. Clear comparisons, honest pros and cons, and actionable recommendations.",
  },
  {
    icon: TrendingUp,
    title: "Transparency",
    description:
      "We're upfront about how we make money. Affiliate links and sponsorships are clearly disclosed, and they never affect our ratings.",
  },
];

const stats = [
  { value: "50+", label: "Products Reviewed" },
  { value: "1000+", label: "Hours of Testing" },
  { value: "6", label: "Software Categories" },
  { value: "100%", label: "Independent" },
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
                Pickify is your trusted source for unbiased software reviews and
                comparisons. We test every product ourselves so you don't have
                to.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  In a world of paid reviews and sponsored content, finding
                  trustworthy software recommendations is harder than ever. We
                  started Pickify to solve this problem.
                </p>
                <p className="mb-4">
                  Our mission is simple: provide honest, thoroughly-researched
                  reviews that help you make confident software decisions.
                  Whether you're looking for a VPN to protect your privacy, a
                  web host for your business, or an email marketing platform to
                  grow your audience – we've done the research so you don't have
                  to.
                </p>
                <p>
                  Every product on Pickify goes through our rigorous testing
                  process. We evaluate real-world performance, verify marketing
                  claims, and consider value for money. The result is reviews
                  you can trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do at Pickify
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                  Transparency is one of our core values, so let's be clear
                  about how Pickify generates revenue:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Affiliate Commissions:
                      </strong>{" "}
                      When you click a link and make a purchase, we may earn a
                      commission at no extra cost to you. This never influences
                      our ratings or recommendations.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">
                        Sponsored Placements:
                      </strong>{" "}
                      Some products may pay for featured placement. These are
                      always clearly labeled and sponsorship never affects our
                      review scores.
                    </span>
                  </li>
                </ul>
                <p>
                  Our editorial team operates independently from our business
                  team. Advertisers cannot pay for better ratings or influence
                  our conclusions.
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
