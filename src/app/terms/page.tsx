import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbSchema } from "@/components/seo";

export const metadata: Metadata = {
  title: "Terms of Service | Pickify",
  description:
    "Read the terms and conditions that govern your use of Pickify's website and services.",
  openGraph: {
    title: "Terms of Service | Pickify",
    description:
      "Read the terms and conditions that govern your use of Pickify's website and services.",
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://pickify.io" },
    { name: "Terms of Service", url: "https://pickify.io/terms" },
  ];

  const lastUpdated = "December 2025";

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbSchema items={breadcrumbs} />
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
                Terms of Service
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
                Please read these Terms of Service ("Terms") carefully before
                using Pickify's website. By accessing or using our website, you
                agree to be bound by these Terms.
              </p>

              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using Pickify ("the Website"), you accept and
                agree to be bound by these Terms of Service and our{" "}
                <Link href="/privacy">Privacy Policy</Link>. If you do not agree
                to these terms, please do not use our Website.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                Pickify provides software reviews, comparisons, and
                recommendations. Our content is intended to help consumers make
                informed decisions about software products. We strive to provide
                accurate and up-to-date information, but we make no guarantees
                about the completeness or accuracy of our content.
              </p>

              <h2>3. Use of the Website</h2>
              <p>You agree to use the Website only for lawful purposes. You may not:</p>
              <ul>
                <li>
                  Use the Website in any way that violates applicable laws or
                  regulations
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  Website
                </li>
                <li>
                  Use the Website to transmit malware, spam, or other harmful
                  content
                </li>
                <li>
                  Scrape, copy, or reproduce our content without written
                  permission
                </li>
                <li>
                  Interfere with the proper functioning of the Website
                </li>
                <li>
                  Impersonate any person or entity, or falsely state your
                  affiliation
                </li>
              </ul>

              <h2>4. Intellectual Property</h2>
              <p>
                All content on the Website, including text, graphics, logos,
                images, and software, is the property of Pickify or its content
                suppliers and is protected by copyright and other intellectual
                property laws. You may not reproduce, distribute, or create
                derivative works without our express written permission.
              </p>

              <h2>5. Affiliate Links and Advertising</h2>
              <p>
                The Website contains affiliate links to third-party products and
                services. When you click these links and make a purchase, we may
                earn a commission at no additional cost to you. Our use of
                affiliate links does not influence our editorial content or
                ratings.
              </p>
              <p>
                See our <Link href="/disclosure">Advertising Disclosure</Link>{" "}
                for more information about our affiliate relationships.
              </p>

              <h2>6. Third-Party Links</h2>
              <p>
                The Website may contain links to third-party websites. We are
                not responsible for the content, accuracy, or practices of these
                external sites. Clicking on third-party links is at your own
                risk.
              </p>

              <h2>7. Disclaimer of Warranties</h2>
              <p>
                THE WEBSITE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT
                WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR
                FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
              <p>
                Our reviews and recommendations are based on our testing and
                research, but individual experiences may vary. We do not
                guarantee that any product will meet your specific needs or
                expectations.
              </p>

              <h2>8. Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, PICKIFY SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE WEBSITE OR
                RELIANCE ON OUR CONTENT.
              </p>
              <p>
                Our total liability for any claims arising from your use of the
                Website shall not exceed the amount you paid to us, if any, in
                the twelve months preceding the claim.
              </p>

              <h2>9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Pickify and its
                officers, directors, employees, and agents from any claims,
                damages, losses, or expenses arising from your use of the
                Website or violation of these Terms.
              </p>

              <h2>10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes
                will be effective immediately upon posting. Your continued use
                of the Website after changes are posted constitutes acceptance
                of the modified Terms.
              </p>

              <h2>11. Termination</h2>
              <p>
                We may terminate or suspend your access to the Website at any
                time, without notice, for any reason, including violation of
                these Terms.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the United States, without regard to conflict
                of law principles.
              </p>

              <h2>13. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable,
                the remaining provisions shall continue in full force and
                effect.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us at:
              </p>
              <ul>
                <li>Email: contact@pickify.io</li>
                <li>Mail: Pickify, [Address to be added]</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
