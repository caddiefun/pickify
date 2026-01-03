import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VPNLeakTestCTAProps {
  variant?: "card" | "inline";
}

/**
 * VPNLeakTestCTA - Links users to our IP leak test tool
 *
 * Provides user value by helping visitors verify their VPN is working
 * properly and protecting their privacy.
 *
 * SEO benefit: Internal link to our leak test tool keeps users on site
 * and improves engagement metrics.
 */
export function VPNLeakTestCTA({ variant = "card" }: VPNLeakTestCTAProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">
            Is your VPN working properly?
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Test for IP leaks, DNS leaks, and WebRTC leaks to ensure your VPN
            is protecting your privacy.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link
              href="/vpn/ip-leak-test"
              className="inline-flex items-center gap-2"
            >
              Run Free IP Leak Test
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
        Instant results. No data stored. 100% free.
      </p>
    </>
  );

  if (variant === "inline") {
    return (
      <div className="bg-muted/50 rounded-lg p-4">
        {content}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        {content}
      </CardContent>
    </Card>
  );
}
