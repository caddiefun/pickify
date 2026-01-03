import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | Pickify",
  description:
    "Learn how Pickify collects, uses, and protects your personal information. Our commitment to your privacy.",
  alternates: {
    canonical: "https://pickify.io/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Pickify",
    description:
      "Learn how Pickify collects, uses, and protects your personal information.",
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Privacy Policy", url: "https://pickify.io/privacy" },
  ];

  const lastUpdated = "December 2025";

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
      <WebPageSchema
        name="Privacy Policy"
        description="Learn how Pickify collects, uses, and protects your personal information."
        url="https://pickify.io/privacy"
        lastReviewed="2025-01-01"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-accent/50 to-background border-b">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                Legal
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl prose prose-gray dark:prose-invert">
              <p className="lead text-lg text-muted-foreground">
                Your privacy is important to us. This Privacy Policy explains
                how Pickify ("we," "us," or "our") collects, uses, and protects
                your personal information when you use our website.
              </p>

              <h2>Information We Collect</h2>

              <h3>Information You Provide</h3>
              <p>We may collect information you voluntarily provide, such as:</p>
              <ul>
                <li>
                  Contact information (name, email address) when you submit a
                  contact form
                </li>
                <li>
                  Newsletter subscription email addresses when you opt-in
                </li>
                <li>Feedback and communications you send to us</li>
              </ul>

              <h3>Information Collected Automatically</h3>
              <p>
                When you visit our website, we automatically collect certain
                information:
              </p>
              <ul>
                <li>
                  <strong>Log Data:</strong> IP address, browser type, pages
                  visited, time spent on pages, and other diagnostic data
                </li>
                <li>
                  <strong>Cookies:</strong> Small data files stored on your
                  device to improve your browsing experience
                </li>
                <li>
                  <strong>Analytics:</strong> Information about how you interact
                  with our website through third-party analytics services
                </li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and maintain our website</li>
                <li>Improve and personalize your experience</li>
                <li>Respond to your inquiries and provide support</li>
                <li>
                  Send newsletters and marketing communications (with your
                  consent)
                </li>
                <li>Analyze website usage to improve our content</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>We use cookies and similar tracking technologies to:</p>
              <ul>
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Deliver relevant advertising</li>
                <li>Analyze and measure website performance</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Note that
                disabling cookies may affect your experience on our website.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                We use third-party services that may collect information about
                you:
              </p>
              <ul>
                <li>
                  <strong>Analytics Providers:</strong> To understand website
                  usage patterns
                </li>
                <li>
                  <strong>Affiliate Networks:</strong> To track referrals when
                  you click affiliate links
                </li>
                <li>
                  <strong>Advertising Partners:</strong> To deliver relevant
                  advertisements
                </li>
              </ul>
              <p>
                These third parties have their own privacy policies governing
                their use of your information.
              </p>

              <h2>Affiliate Links</h2>
              <p>
                Our website contains affiliate links to third-party products and
                services. When you click these links, the third-party may
                collect information about you, including through cookies. We
                receive a commission on qualifying purchases, but this does not
                affect your price or our editorial independence.
              </p>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information. However, no method of
                transmission over the internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>

              <h2>Your Rights</h2>
              <p>Depending on your location, you may have rights to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to certain processing activities</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the
                information below.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our website is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children.
                If you believe we have collected information from a child,
                please contact us immediately.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy
                practices, please contact us at:
              </p>
              <ul>
                <li>Email: contact@pickify.io</li>
                <li>
                  Mail: Pickify, [Address to be added]
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
