import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  TestTube,
  BarChart3,
  PenTool,
  RefreshCw,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Our Testing Methodology - How We Review Software | Pickify",
  description:
    "Learn how Pickify tests and reviews software products. Our rigorous methodology ensures accurate, unbiased recommendations you can trust.",
  openGraph: {
    title: "Our Testing Methodology - How We Review Software | Pickify",
    description:
      "Learn how Pickify tests and reviews software products. Our rigorous methodology ensures accurate, unbiased recommendations you can trust.",
  },
};

const reviewProcess = [
  {
    step: 1,
    icon: Search,
    title: "Research & Selection",
    description:
      "We identify the most popular and promising products in each category. We analyze market data, user feedback, and industry trends to ensure comprehensive coverage.",
    details: [
      "Market share analysis",
      "User review aggregation",
      "Feature comparison mapping",
      "Price point analysis",
    ],
  },
  {
    step: 2,
    icon: TestTube,
    title: "Hands-On Testing",
    description:
      "Every product is tested by our team using real-world scenarios. We don't rely on marketing materials – we verify claims through direct experience.",
    details: [
      "Account creation & onboarding",
      "Feature functionality testing",
      "Performance benchmarking",
      "Customer support evaluation",
    ],
  },
  {
    step: 3,
    icon: BarChart3,
    title: "Scoring & Analysis",
    description:
      "We apply consistent scoring criteria across all products. Each category has specific metrics tailored to what matters most for that type of software.",
    details: [
      "Weighted scoring system",
      "Category-specific criteria",
      "Value for money assessment",
      "Competitive positioning",
    ],
  },
  {
    step: 4,
    icon: PenTool,
    title: "Review Writing",
    description:
      "Our writers create comprehensive, accessible reviews. We focus on practical insights that help you make decisions, not just feature lists.",
    details: [
      "Pros and cons analysis",
      "Use case recommendations",
      "Comparison with alternatives",
      "Actionable conclusions",
    ],
  },
  {
    step: 5,
    icon: RefreshCw,
    title: "Ongoing Updates",
    description:
      "Software evolves, and so do our reviews. We regularly re-test products and update our content to reflect the current state of each product.",
    details: [
      "Quarterly review cycles",
      "Major update monitoring",
      "Price change tracking",
      "User feedback integration",
    ],
  },
];

const scoringCriteria = [
  {
    category: "Features",
    weight: "25%",
    description:
      "Breadth and depth of functionality, unique capabilities, and how well features work in practice.",
  },
  {
    category: "Performance",
    weight: "20%",
    description:
      "Speed, reliability, uptime, and technical performance under various conditions.",
  },
  {
    category: "Ease of Use",
    weight: "20%",
    description:
      "User interface design, learning curve, documentation, and overall user experience.",
  },
  {
    category: "Value",
    weight: "20%",
    description:
      "Pricing structure, what you get for your money, and comparison to alternatives.",
  },
  {
    category: "Support",
    weight: "15%",
    description:
      "Customer service quality, response times, available channels, and self-help resources.",
  },
];

const faqs = [
  {
    question: "How do you ensure reviews are unbiased?",
    answer:
      "Our editorial team operates independently from our business relationships. Affiliate partnerships and sponsorships never influence our ratings. We use consistent scoring criteria and document our testing process for transparency.",
  },
  {
    question: "How often do you update reviews?",
    answer:
      "We conduct comprehensive review updates quarterly. Additionally, we monitor for major product updates, pricing changes, and significant user feedback to make interim updates as needed.",
  },
  {
    question: "Do you test every product yourself?",
    answer:
      "Yes, every product featured on Pickify is tested by our team. We create real accounts, use the products in realistic scenarios, and verify the claims made by manufacturers.",
  },
  {
    question: "How do you choose which products to review?",
    answer:
      "We prioritize products based on market popularity, user demand, and category coverage. We aim to review all significant options in each category so you can make informed comparisons.",
  },
  {
    question: "Can companies pay for better reviews?",
    answer:
      "Absolutely not. Our ratings are based solely on our testing and evaluation process. Companies can purchase sponsored placements (clearly labeled) but cannot influence our review scores or conclusions.",
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
      <FAQSchema faqs={faqs} />
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
                How We Test & Review Software
              </h1>
              <p className="text-xl text-muted-foreground">
                Transparency is at the heart of what we do. Here's exactly how
                we evaluate every product on Pickify.
              </p>
            </div>
          </div>
        </section>

        {/* Review Process */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Our 5-Step Review Process
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Every product goes through the same rigorous evaluation process
                to ensure fair, consistent reviews.
              </p>

              <div className="space-y-8">
                {reviewProcess.map((step, index) => (
                  <div key={step.step} className="relative">
                    {index < reviewProcess.length - 1 && (
                      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border hidden md:block" />
                    )}
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                              {step.step}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <step.icon className="w-5 h-5 text-primary" />
                              <h3 className="text-xl font-semibold">
                                {step.title}
                              </h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                              {step.description}
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {step.details.map((detail) => (
                                <div
                                  key={detail}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scoring Criteria */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Scoring Criteria
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                We use a weighted scoring system to ensure our ratings reflect
                what matters most to users.
              </p>

              <div className="grid gap-4">
                {scoringCriteria.map((criteria) => (
                  <Card key={criteria.category}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex items-center gap-4 md:w-48">
                          <Badge
                            variant="secondary"
                            className="text-lg font-bold"
                          >
                            {criteria.weight}
                          </Badge>
                          <h3 className="font-semibold">{criteria.category}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground flex-1">
                          {criteria.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-sm text-muted-foreground text-center mt-8">
                Note: Weights may be adjusted for specific categories where
                certain criteria are more or less important.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-center">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Common questions about our review process
              </p>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.question}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
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
              Now that you know how we work, explore our reviews and find the
              tools that fit your needs.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">
                Browse Reviews
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
