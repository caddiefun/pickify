import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Building, Clock } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Contact Us | Pickify",
  description:
    "Get in touch with the Pickify team. We'd love to hear from you - whether it's feedback, partnership inquiries, or just saying hello.",
  openGraph: {
    title: "Contact Us | Pickify",
    description:
      "Get in touch with the Pickify team. We'd love to hear from you.",
  },
};

const contactReasons = [
  {
    icon: MessageSquare,
    title: "General Inquiries",
    email: "contact@pickify.io",
    description: "Questions, feedback, or just want to say hi",
  },
  {
    icon: Building,
    title: "Business & Partnerships",
    email: "contact@pickify.io",
    description: "Advertising, sponsorships, and collaboration opportunities",
  },
  {
    icon: Mail,
    title: "Press & Media",
    email: "contact@pickify.io",
    description: "Media inquiries and press requests",
  },
];

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Contact", url: "https://pickify.io/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Get in Touch
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground">
                Have a question, feedback, or partnership inquiry? We'd love to
                hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {contactReasons.map((reason) => (
                <Card key={reason.title} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <reason.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {reason.description}
                    </p>
                    <a
                      href={`mailto:${reason.email}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {reason.email}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our{" "}
                      <a href="/privacy" className="underline">
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </form>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  We typically respond within 1-2 business days
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Looking for Quick Answers?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Check out our methodology page for common questions about how we
              test and review products.
            </p>
            <Button variant="outline" asChild>
              <a href="/methodology">View Methodology & FAQ</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
