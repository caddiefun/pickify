import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Wifi, Zap, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RatingCircle } from "@/components/comparison";
import type { ISPProduct } from "@/data/products/isp";
import { generateAffiliateLink, getStartingPrice } from "@/lib/affiliate";

interface ProviderCardProps {
  provider: ISPProduct;
  rank?: number;
  showAvailability?: boolean;
  technologies?: string[];
  className?: string;
}

const technologyLabels: Record<string, { label: string; color: string }> = {
  fiber: { label: "Fiber", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  cable: { label: "Cable", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  dsl: { label: "DSL", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  fixed_wireless: { label: "5G/Fixed Wireless", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
  satellite: { label: "Satellite", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
};

export function ProviderCard({
  provider,
  rank,
  showAvailability = true,
  technologies,
  className = "",
}: ProviderCardProps) {
  const displayTechnologies = technologies || provider.technologies;

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {rank && rank <= 3 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
      )}
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Rank and Logo */}
          <div className="flex items-center gap-4">
            {rank && (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-lg">
                {rank}
              </div>
            )}
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
              {provider.logo_url ? (
                <Image
                  src={provider.logo_url}
                  alt={provider.name}
                  width={48}
                  height={48}
                  className="rounded"
                />
              ) : (
                <Wifi className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  <Link
                    href={`/internet-providers/provider/${provider.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {provider.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {provider.short_description}
                </p>
              </div>
              <RatingCircle score={provider.overall_rating} size="md" />
            </div>

            {/* Technologies */}
            {showAvailability && displayTechnologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {displayTechnologies.map((tech) => {
                  const techInfo = technologyLabels[tech];
                  return (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className={techInfo?.color || ""}
                    >
                      {techInfo?.label || tech}
                    </Badge>
                  );
                })}
              </div>
            )}

            {/* Speed and Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Download</p>
                <p className="font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-primary" />
                  {provider.max_download_speed >= 1000
                    ? `${(provider.max_download_speed / 1000).toFixed(1)} Gbps`
                    : `${provider.max_download_speed} Mbps`}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Upload</p>
                <p className="font-semibold">
                  {provider.max_upload_speed >= 1000
                    ? `${(provider.max_upload_speed / 1000).toFixed(1)} Gbps`
                    : `${provider.max_upload_speed} Mbps`}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Data Cap</p>
                <p className="font-semibold">
                  {provider.features.find((f) => f.name === "data_cap")?.value === "Unlimited"
                    ? <span className="text-green-600">Unlimited</span>
                    : provider.features.find((f) => f.name === "data_cap")?.value || "Varies"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contract</p>
                <p className="font-semibold flex items-center gap-1">
                  {provider.features.find((f) => f.name === "contract_required")?.value === false ? (
                    <>
                      <Check className="w-3 h-3 text-green-600" />
                      No contract
                    </>
                  ) : (
                    <>
                      <X className="w-3 h-3 text-red-500" />
                      Required
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col items-center md:items-end gap-2 md:min-w-[140px]">
            <div className="text-center md:text-right">
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-primary">
                {getStartingPrice(provider)}
              </p>
              <p className="text-xs text-muted-foreground">/mo</p>
            </div>
            <Button className="w-full md:w-auto" asChild>
              <a
                href={generateAffiliateLink(provider, { campaign: "isp-card" })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Availability
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Link
              href={`/internet-providers/provider/${provider.slug}`}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Read Review
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
