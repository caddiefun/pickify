import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardCheck,
  TestTube,
  BarChart3,
  Users,
  Shield,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { BreadcrumbSchema, ArticleSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Our Testing Methodology - How We Review Products | Pickify",
  description:
    "Learn about our testing process and methodology for reviewing software products. We use consistent criteria to evaluate features, performance, pricing, and user experience.",
  alternates: {
    canonical: "https://pickify.io/methodology",
  },
  openGraph: {
    title: "Our Testing Methodology - How We Review Products | Pickify",
    description:
      "Learn about our testing process and methodology for reviewing software products. We use consistent criteria to evaluate features, performance, pricing, and user experience.",
  },
};

const testingSteps = [
  {
    icon: ClipboardCheck,
    title: "Research & Selection",
    description:
      "We identify leading products in each category based on market share, user reviews, and feature sets. We prioritize products with strong reputations and active development.",
  },
  {
    icon: TestTube,
    title: "Hands-On Testing",
    description:
      "We sign up for and use each product ourselves when possible. This includes testing core features, user interface, performance, and customer support responsiveness.",
  },
  {
    icon: BarChart3,
    title: "Feature Analysis",
    description:
      "We evaluate products against standardized criteria including features, pricing, ease of use, performance, security, and customer support. Each category has specific benchmarks.",
  },
  {
    icon: Users,
    title: "User Feedback",
    description:
      "We analyze user reviews across multiple platforms to understand real-world experiences, common pain points, and satisfaction levels beyond our own testing.",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description:
      "For security products (VPNs, antivirus, password managers), we review third-party audits, security certifications, privacy policies, and independent lab test results.",
  },
  {
    icon: RefreshCw,
    title: "Regular Updates",
    description:
      "We monitor for product updates, pricing changes, and feature additions. Our reviews are updated regularly to reflect the current state of each product.",
  },
];

const ratingCriteria = [
  {
    category: "Features & Functionality",
    weight: "30%",
    description: "Breadth and depth of features, unique capabilities, and how well core functions work",
  },
  {
    category: "Ease of Use",
    weight: "20%",
    description: "User interface quality, learning curve, documentation, and overall user experience",
  },
  {
    category: "Performance",
    weight: "20%",
    description: "Speed, reliability, uptime, and technical performance metrics",
  },
  {
    category: "Value for Money",
    weight: "15%",
    description: "Pricing competitiveness, features per dollar, free tier quality, and refund policy",
  },
  {
    category: "Customer Support",
    weight: "10%",
    description: "Support channel availability, response times, and quality of assistance",
  },
  {
    category: "Security & Privacy",
    weight: "5%",
    description: "Data protection, encryption standards, privacy policy, and compliance certifications",
  },
];

export default function MethodologyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Methodology", url: "https://pickify.io/methodology" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        headline="Our Testing Methodology - How We Review Products"
        description="Learn about our testing process and methodology for reviewing software products."
        url="https://pickify.io/methodology"
        datePublished="2024-01-01"
        dateModified="2025-01-01"
        about={["Testing Methodology", "Product Reviews", "Software Evaluation"]}
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Our Process
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                How We Test & Review Products
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our transparent methodology for evaluating software products.
                We use consistent criteria to ensure fair, reliable comparisons.
              </p>
            </div>
          </div>
        </section>

        {/* Testing Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Testing Process</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Every product goes through a standardized evaluation process
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testingSteps.map((step, index) => (
                  <Card key={step.title}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <step.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-2">
                            Step {index + 1}
                          </Badge>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rating Criteria */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Rating Criteria</h2>
                <p className="text-lg text-muted-foreground">
                  How we calculate our overall ratings (0-10 scale)
                </p>
              </div>
              <div className="space-y-4">
                {ratingCriteria.map((criteria) => (
                  <Card key={criteria.category}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{criteria.category}</h3>
                            <Badge variant="secondary">{criteria.weight}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {criteria.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vertical-Specific Testing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Category-Specific Testing</h2>
              <div className="prose prose-lg text-muted-foreground max-w-none">
                <p className="mb-4">
                  Each product category has additional specialized testing criteria:
                </p>
                <ul className="space-y-3 mb-6">
                  <li>
                    <strong className="text-foreground">VPNs:</strong> Speed tests across multiple servers,
                    leak testing (DNS, WebRTC, IPv6), kill switch verification, streaming unblocking capability
                  </li>
                  <li>
                    <strong className="text-foreground">Antivirus:</strong> Independent lab test results (AV-TEST,
                    AV-Comparatives), real-time protection testing, system performance impact
                  </li>
                  <li>
                    <strong className="text-foreground">Web Hosting:</strong> Uptime monitoring, page load speeds,
                    server response times, scalability testing
                  </li>
                  <li>
                    <strong className="text-foreground">Password Managers:</strong> Encryption standards, breach monitoring,
                    autofill accuracy, cross-device sync reliability
                  </li>
                  <li>
                    <strong className="text-foreground">Email Marketing:</strong> Deliverability rates, automation workflows,
                    template quality, contact management
                  </li>
                  <li>
                    <strong className="text-foreground">Internet Providers:</strong> Speed consistency, data cap policies,
                    customer service responsiveness, contract terms
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Transparency</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We believe you deserve to know exactly how our reviews work:
                </p>
                <ul className="space-y-3 list-disc list-inside">
                  <li>
                    <strong className="text-foreground">Affiliate Relationships:</strong> We may earn commissions
                    from links, but this doesn't influence our ratings or recommendations
                  </li>
                  <li>
                    <strong className="text-foreground">Regular Updates:</strong> Reviews are updated when products
                    release major updates or change pricing
                  </li>
                  <li>
                    <strong className="text-foreground">Real Testing:</strong> We actually use the products we review
                    when possible, not just marketing materials
                  </li>
                  <li>
                    <strong className="text-foreground">Honest Opinions:</strong> We highlight both strengths and
                    weaknesses to help you make informed decisions
                  </li>
                  <li>
                    <strong className="text-foreground">Last Updated Dates:</strong> Every review shows when it was
                    last updated so you know the information is current
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/disclosure">
                    Read Our Full Disclosure Policy
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Questions About Our Process?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're committed to transparency. If you have questions about how
                we test products or want to suggest improvements to our methodology,
                we'd love to hear from you.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Browse Reviews</Link>
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
