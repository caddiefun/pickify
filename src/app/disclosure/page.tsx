import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, DollarSign, Shield, ArrowRight } from "lucide-react";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Advertising Disclosure | Pickify",
  description:
    "Learn how Pickify makes money and maintains editorial independence. Full transparency about our affiliate relationships and advertising policies.",
  alternates: {
    canonical: "https://pickify.io/disclosure",
  },
  openGraph: {
    title: "Advertising Disclosure | Pickify",
    description:
      "Learn how Pickify makes money and maintains editorial independence.",
  },
};

export default function DisclosurePage() {
  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Disclosure", url: "https://pickify.io/disclosure" },
  ];

  const lastUpdated = "December 2025";

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <WebPageSchema
        name="Advertising Disclosure"
        description="Learn how Pickify makes money and maintains editorial independence."
        url="https://pickify.io/disclosure"
        lastReviewed="2025-01-01"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                Transparency
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Advertising Disclosure
              </h1>
              <p className="text-xl text-muted-foreground">
                We believe in complete transparency. Here's how we make money
                and how we maintain our editorial independence.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Key Points */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <DollarSign className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">We Earn Commissions</h3>
                  <p className="text-sm text-muted-foreground">
                    When you click our links and make a purchase, we may earn a
                    commission at no extra cost to you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Shield className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Independent Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Our ratings and recommendations are never influenced by
                    affiliate relationships or advertising.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <CheckCircle className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Always Disclosed</h3>
                  <p className="text-sm text-muted-foreground">
                    Sponsored content and affiliate links are clearly labeled
                    throughout our website.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Detailed Disclosure */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              <h2>How We Make Money</h2>
              <p>
                Pickify is a free resource for consumers. To keep our content
                free and support our operations, we generate revenue through the
                following methods:
              </p>

              <h3>1. Affiliate Commissions</h3>
              <p>
                When you click on a link to a product or service on our website
                and make a purchase, we may receive a commission from the
                company. This commission comes at no additional cost to you –
                the price you pay is the same whether you use our link or not.
              </p>
              <p>
                We have affiliate relationships with many of the companies whose
                products we review, including but not limited to VPN providers,
                web hosting companies, and email marketing platforms.
              </p>

              <h3>2. Sponsored Placements</h3>
              <p>
                Some companies pay for featured placement or "sponsored" badges
                on our website. These placements are always clearly labeled as
                "Sponsored" or "Ad."
              </p>
              <div className="bg-card border rounded-lg p-4 my-4 not-prose">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    <strong>Important:</strong> Sponsored placement does NOT
                    influence our ratings or review conclusions. A company
                    cannot pay for a higher score or more favorable review. Our
                    editorial process is completely separate from our business
                    relationships.
                  </p>
                </div>
              </div>

              <h3>3. Display Advertising</h3>
              <p>
                We may display advertisements from advertising networks on our
                website. These ads are served by third parties and are separate
                from our editorial content.
              </p>

              <h2>Our Editorial Independence</h2>
              <p>
                We take several steps to ensure our reviews remain unbiased and
                trustworthy:
              </p>
              <ul>
                <li>
                  <strong>Separate Teams:</strong> Our editorial team operates
                  independently from our business and advertising teams.
                </li>
                <li>
                  <strong>Consistent Methodology:</strong> We use the same
                  testing and scoring criteria for all products, regardless of
                  affiliate relationships.
                </li>
                <li>
                  <strong>Honest Criticism:</strong> We publish negative reviews
                  when warranted, even for products we have affiliate
                  relationships with.
                </li>
                <li>
                  <strong>Regular Updates:</strong> We continuously update our
                  reviews to reflect current product performance, not business
                  relationships.
                </li>
              </ul>

              <h2>How to Identify Affiliate Links</h2>
              <p>
                Links that may result in affiliate commissions are typically:
              </p>
              <ul>
                <li>
                  "Visit Site" or "Get Started" buttons on product review pages
                </li>
                <li>Links to product websites within review content</li>
                <li>Comparison table links to vendor websites</li>
              </ul>
              <p>
                When you see these links, you can assume they may be affiliate
                links unless otherwise stated.
              </p>

              <h2>Sponsored Content Labels</h2>
              <p>
                We clearly label sponsored content using the following
                indicators:
              </p>
              <ul>
                <li>
                  <Badge className="bg-warning text-warning-foreground">
                    Sponsored
                  </Badge>{" "}
                  badge on product cards
                </li>
                <li>"Sponsored" or "Ad" text near the content</li>
                <li>Disclosure statements in sponsored articles</li>
              </ul>

              <h2>FTC Compliance</h2>
              <p>
                This disclosure is provided in accordance with the Federal Trade
                Commission's guidelines on endorsements and testimonials. We are
                committed to honest and transparent practices.
              </p>

              <h2>Questions?</h2>
              <p>
                If you have questions about our advertising practices or this
                disclosure, please <Link href="/contact">contact us</Link>. We
                are happy to provide clarification.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Want to Learn More About Our Process?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              See exactly how we test and evaluate products in our detailed
              methodology guide.
            </p>
            <Button asChild>
              <Link href="/methodology">
                Read Our Methodology
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
