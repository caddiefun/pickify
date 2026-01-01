import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="text-8xl font-bold text-primary mb-4">404</div>
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground mb-8">
              Sorry, we couldn't find the page you're looking for. It may have
              been moved or no longer exists.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/vpn">
                  <Search className="w-4 h-4 mr-2" />
                  Browse VPNs
                </Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific? Try one of these:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  href="/vpn"
                  className="text-sm text-primary hover:underline"
                >
                  Best VPNs
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/about"
                  className="text-sm text-primary hover:underline"
                >
                  About Us
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/methodology"
                  className="text-sm text-primary hover:underline"
                >
                  Methodology
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  href="/contact"
                  className="text-sm text-primary hover:underline"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
