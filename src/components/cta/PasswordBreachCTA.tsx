import { AlertTriangle, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PasswordBreachCTAProps {
  variant?: "card" | "inline";
}

/**
 * PasswordBreachCTA - Links users to Have I Been Pwned
 *
 * Provides user value by helping visitors check if their credentials
 * have been exposed in data breaches.
 *
 * SEO benefit: Outbound links to authoritative security tools signal
 * comprehensive, well-researched content.
 */
export function PasswordBreachCTA({ variant = "card" }: PasswordBreachCTAProps) {
  const content = (
    <>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">
            Have your passwords been exposed?
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Check if your email or passwords have been compromised in a data
            breach before securing them with a password manager.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://haveibeenpwned.com/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2"
            >
              Check on Have I Been Pwned
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
        Have I Been Pwned is maintained by security expert Troy Hunt and tracks
        billions of breached credentials.
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
