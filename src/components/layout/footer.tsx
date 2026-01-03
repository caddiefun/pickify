import Link from "next/link";
import { AFFILIATE_DISCLOSURE } from "@/lib/affiliate";

const footerLinks = {
  categoriesLeft: [
    { label: "All Categories", href: "/categories" },
    { label: "VPNs", href: "/vpn" },
    { label: "Antivirus", href: "/antivirus" },
    { label: "Password Managers", href: "/password-managers" },
    { label: "Home Security", href: "/home-security" },
    { label: "Internet Providers", href: "/internet-providers" },
  ],
  categoriesRight: [
    { label: "Web Hosting", href: "/hosting" },
    { label: "Website Builders", href: "/website-builders" },
    { label: "Cloud Storage", href: "/cloud-storage" },
    { label: "Email Marketing", href: "/email-marketing" },
    { label: "CRM Software", href: "/crm" },
    { label: "Project Management", href: "/project-management" },
    { label: "Online Learning", href: "/online-learning" },
  ],
  resources: [
    { label: "About Us", href: "/about" },
    { label: "Methodology", href: "/methodology" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Affiliate Disclosure", href: "/disclosure" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      {/* Affiliate Disclosure Banner */}
      <div className="bg-accent/50 border-b">
        <div className="container mx-auto px-4 py-3">
          <p className="text-xs text-muted-foreground text-center">
            {AFFILIATE_DISCLOSURE}{" "}
            <Link
              href="/disclosure"
              className="text-primary hover:underline font-medium"
            >
              Learn more
            </Link>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  P
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight">Pickify</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Pick Smart. Save Time.
            </p>
            <p className="text-sm text-muted-foreground">
              We help you find the best products and services through honest
              reviews and detailed comparisons.
            </p>
          </div>

          {/* Categories - Left Column */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categoriesLeft.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories - Right Column */}
          <div>
            <h3 className="font-semibold mb-4 invisible">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categoriesRight.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Pickify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
