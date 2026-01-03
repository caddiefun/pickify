import { Zap, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PageSpeedTestCTAProps {
  variant?: "card" | "inline";
}

/**
 * PageSpeedTestCTA - Links users to Google PageSpeed Insights
 *
 * Provides user value by helping visitors test their current website
 * speed before comparing hosting providers.
 *
 * SEO benefit: Outbound links to authoritative Google tools signal
 * comprehensive, well-researched content.
 */
export function PageSpeedTestCTA({ variant = "card" }: PageSpeedTestCTAProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">
            How fast is your current site?
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Test your website speed and get optimization recommendations from
            Google PageSpeed Insights.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://pagespeed.web.dev/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2"
            >
              Test Your Site Speed
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
        PageSpeed Insights is powered by Google Lighthouse and provides real-world
        performance data.
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
