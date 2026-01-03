import { Award, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AntivirusLabResultsCTAProps {
  variant?: "card" | "inline";
  productName?: string;
}

/**
 * AntivirusLabResultsCTA - Links users to AV-TEST.org lab results
 *
 * Provides user value by directing visitors to independent third-party
 * testing results from the industry-standard antivirus testing lab.
 *
 * SEO benefit: Outbound links to authoritative testing organizations
 * signal comprehensive, well-researched content.
 */
export function AntivirusLabResultsCTA({
  variant = "card",
  productName
}: AntivirusLabResultsCTAProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Award className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">
            Independent Lab Test Results
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            See how {productName || "antivirus products"} perform in independent tests
            for protection, performance, and usability from AV-TEST.org.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://www.av-test.org/en/antivirus/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2"
            >
              View AV-TEST Results
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
        AV-TEST is an independent research institute that has been testing
        antivirus software since 2004.
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
