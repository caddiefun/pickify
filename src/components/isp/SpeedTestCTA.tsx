import { Gauge, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SpeedTestCTAProps {
  location?: string;
  variant?: "card" | "inline";
}

/**
 * SpeedTestCTA - Links users to Ookla Speedtest.net
 *
 * Provides user value by helping visitors understand their current
 * internet speed before comparing provider offerings.
 *
 * SEO benefit: Outbound links to authoritative sources signal
 * comprehensive, well-researched content.
 */
export function SpeedTestCTA({ location, variant = "card" }: SpeedTestCTAProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Gauge className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">
            Not sure what speed you're getting?
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Test your current internet speed, then compare with providers
            {location ? ` available in ${location}` : " below"}.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://www.speedtest.net/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2"
            >
              Test Your Speed on Speedtest.net
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
        Speed data powered by Ookla. Results may vary based on network conditions.
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
