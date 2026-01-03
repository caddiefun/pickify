import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
  Globe,
  Video,
  Server,
  Lock,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BreadcrumbSchema, FAQSchema, QuickAnswer } from "@/components/seo";
import { LeakTester } from "@/components/tools";

export const metadata: Metadata = {
  title: "IP Leak Test - Check VPN for DNS & WebRTC Leaks | Pickify",
  description:
    "Free IP leak test tool. Check if your VPN is leaking your real IP address through DNS or WebRTC. Instant results with recommendations to fix any leaks.",
  keywords: [
    "ip leak test",
    "vpn leak test",
    "dns leak test",
    "webrtc leak test",
    "check vpn",
    "is my vpn working",
    "vpn security test",
  ],
  alternates: {
    canonical: "https://pickify.io/vpn/ip-leak-test",
  },
  openGraph: {
    title: "IP Leak Test - Check if Your VPN is Working | Pickify",
    description:
      "Free tool to check if your VPN is leaking your real IP address. Tests for DNS leaks, WebRTC leaks, and more.",
    url: "https://pickify.io/vpn/ip-leak-test",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Leak Test - Check if Your VPN is Working",
    description:
      "Free tool to check if your VPN is leaking your real IP address. Tests for DNS leaks, WebRTC leaks, and more.",
  },
};

export default function IPLeakTestPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "VPN", url: "https://pickify.io/vpn" },
    { name: "IP Leak Test", url: "https://pickify.io/vpn/ip-leak-test" },
  ];

  const faqs = [
    {
      question: "What is an IP leak?",
      answer:
        "An IP leak occurs when your real IP address is exposed despite using a VPN. This can happen through DNS requests, WebRTC connections, or IPv6 traffic that bypasses your VPN tunnel, compromising your privacy and anonymity online.",
    },
    {
      question: "What is a WebRTC leak?",
      answer:
        "WebRTC (Web Real-Time Communication) is a browser feature for video calls and file sharing. It can leak your real IP address even when using a VPN because it may bypass the VPN tunnel to establish peer-to-peer connections. Quality VPNs include WebRTC leak protection.",
    },
    {
      question: "What is a DNS leak?",
      answer:
        "A DNS leak happens when your DNS queries are sent to your ISP's servers instead of through your VPN's encrypted tunnel. This exposes the websites you visit to your ISP, even when connected to a VPN.",
    },
    {
      question: "How do I fix VPN leaks?",
      answer:
        "To fix VPN leaks: 1) Use a VPN with built-in leak protection, 2) Enable the VPN's kill switch feature, 3) Disable WebRTC in your browser or use a VPN browser extension, 4) Ensure IPv6 is disabled or routed through the VPN, 5) Use the VPN's own DNS servers.",
    },
    {
      question: "How often should I test for VPN leaks?",
      answer:
        "You should test for leaks when you first set up your VPN, after any VPN updates, when switching servers, and periodically (monthly) to ensure continued protection. Also test after browser updates as they may reset WebRTC settings.",
    },
    {
      question: "Can a free VPN protect against leaks?",
      answer:
        "Free VPNs often lack advanced leak protection features like kill switches, DNS leak protection, and WebRTC blocking. Premium VPNs typically offer comprehensive leak protection and regular security audits to ensure your privacy.",
    },
  ];

  const quickAnswerProps = {
    question: "How do I check if my VPN is leaking?",
    answer:
      "Use our free IP leak test tool above to instantly check for VPN leaks. The test detects your visible IP address, checks for WebRTC leaks that expose your real IP, and verifies your DNS configuration. If leaks are found, we recommend using a VPN with built-in leak protection.",
    supportingFacts: [
      { label: "Tests", value: "IP, WebRTC, DNS" },
      { label: "Time", value: "Instant" },
      { label: "Cost", value: "Free" },
      { label: "Privacy", value: "No data stored" },
    ],
    updatedDate: "January 2025",
    variant: "default" as const,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Schema Markup */}
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-3 h-3 mr-1" />
                Free Privacy Tool
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                IP Leak Test
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Check if your VPN is protecting your real IP address. Our free
                tool tests for IP leaks, DNS leaks, and WebRTC leaks instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Leak Tester Tool */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <LeakTester />
            </div>
          </div>
        </section>

        {/* Quick Answer */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <QuickAnswer {...quickAnswerProps} />
            </div>
          </div>
        </section>

        {/* What We Test Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">What This Tool Tests</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="w-5 h-5 text-primary" />
                      IP Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Detects your visible IP address and geolocation. If you're
                      using a VPN, this should show the VPN server's IP, not
                      your real one.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Video className="w-5 h-5 text-primary" />
                      WebRTC Leaks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Checks if your browser's WebRTC feature is exposing your
                      real IP address, a common vulnerability even when using a
                      VPN.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Server className="w-5 h-5 text-primary" />
                      DNS Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Identifies which DNS servers are handling your requests.
                      Secure VPNs route DNS through their own servers.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How to Fix Leaks Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                How to Fix VPN Leaks
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Use a Quality VPN</h3>
                      <p className="text-sm text-muted-foreground">
                        Premium VPNs include built-in leak protection for DNS,
                        WebRTC, and IPv6.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Enable Kill Switch</h3>
                      <p className="text-sm text-muted-foreground">
                        A kill switch blocks internet if VPN disconnects,
                        preventing accidental exposure.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Disable WebRTC</h3>
                      <p className="text-sm text-muted-foreground">
                        Use browser extensions or VPN apps that block WebRTC
                        leaks automatically.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Use VPN's DNS Servers</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure your device to use your VPN provider's DNS
                        servers for all requests.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Disable IPv6</h3>
                      <p className="text-sm text-muted-foreground">
                        If your VPN doesn't support IPv6, disable it to prevent
                        traffic from bypassing the tunnel.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Test Regularly</h3>
                      <p className="text-sm text-muted-foreground">
                        Check for leaks after updates, server changes, or when
                        connecting from new networks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VPNs with Leak Protection */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-2">
                VPNs with Built-in Leak Protection
              </h2>
              <p className="text-muted-foreground mb-6">
                These VPNs include comprehensive leak protection features out of
                the box.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/vpn/nordvpn">
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="font-semibold">NordVPN</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        DNS, WebRTC & IPv6 leak protection + kill switch
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/vpn/expressvpn">
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="font-semibold">ExpressVPN</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Private DNS on every server + Network Lock kill switch
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/vpn/surfshark">
                  <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Surfshark</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Private DNS, WebRTC blocker & IP rotator
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" asChild>
                  <Link href="/vpn">View All VPN Reviews</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-card"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <h3
                      className="font-semibold text-foreground mb-2"
                      itemProp="name"
                    >
                      {faq.question}
                    </h3>
                    <div
                      itemScope
                      itemType="https://schema.org/Answer"
                      itemProp="acceptedAnswer"
                    >
                      <p className="text-muted-foreground" itemProp="text">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Note */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Privacy Note</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This tool runs entirely in your browser. We do not store your IP
                address or any test results. All WebRTC tests are performed
                locally without sending data to our servers.
              </p>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild>
              <Link href="/vpn">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All VPNs
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
