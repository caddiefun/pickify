import { Zap, Upload, Download } from "lucide-react";
import type { ISPProduct } from "@/data/products/isp";

interface SpeedComparisonProps {
  providers: ISPProduct[];
  className?: string;
}

export function SpeedComparison({ providers, className = "" }: SpeedComparisonProps) {
  const maxDownload = Math.max(...providers.map((p) => p.max_download_speed));
  const maxUpload = Math.max(...providers.map((p) => p.max_upload_speed));

  const formatSpeed = (speed: number) => {
    if (speed >= 1000) {
      return `${(speed / 1000).toFixed(1)} Gbps`;
    }
    return `${speed} Mbps`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Download Speeds */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Max Download Speed
        </h4>
        <div className="space-y-3">
          {providers.map((provider) => {
            const percentage = (provider.max_download_speed / maxDownload) * 100;
            return (
              <div key={`download-${provider.id}`}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{provider.name}</span>
                  <span className="text-primary font-semibold">
                    {formatSpeed(provider.max_download_speed)}
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Speeds */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Max Upload Speed
        </h4>
        <div className="space-y-3">
          {providers.map((provider) => {
            const percentage = (provider.max_upload_speed / maxUpload) * 100;
            return (
              <div key={`upload-${provider.id}`}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{provider.name}</span>
                  <span className="text-primary font-semibold">
                    {formatSpeed(provider.max_upload_speed)}
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
