"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Loader2,
  Globe,
  Server,
  Video,
  MapPin,
  Building2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface IpInfo {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  loc: string | null;
  org: string | null;
  isp: string | null;
  timezone: string | null;
}

interface WebRTCLeak {
  found: boolean;
  localIps: string[];
  publicIps: string[];
}

interface LeakTestResult {
  ipInfo: IpInfo | null;
  webrtcLeak: WebRTCLeak;
  dnsLeak: {
    tested: boolean;
    servers: string[];
  };
  overallStatus: "secure" | "warning" | "exposed" | "testing";
}

type TestStatus = "idle" | "testing" | "complete" | "error";

export function LeakTester() {
  const [status, setStatus] = useState<TestStatus>("idle");
  const [result, setResult] = useState<LeakTestResult>({
    ipInfo: null,
    webrtcLeak: { found: false, localIps: [], publicIps: [] },
    dnsLeak: { tested: false, servers: [] },
    overallStatus: "testing",
  });
  const [error, setError] = useState<string | null>(null);

  // Detect WebRTC leaks
  const detectWebRTCLeak = useCallback(async (): Promise<WebRTCLeak> => {
    const leak: WebRTCLeak = {
      found: false,
      localIps: [],
      publicIps: [],
    };

    try {
      // Check if RTCPeerConnection is available
      if (typeof window === "undefined" || !window.RTCPeerConnection) {
        return leak;
      }

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      const candidates: string[] = [];

      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          pc.close();
          resolve(leak);
        }, 5000);

        pc.onicecandidate = (event) => {
          if (!event.candidate) {
            pc.close();
            clearTimeout(timeout);

            // Process collected candidates
            candidates.forEach((candidate) => {
              // Extract IP from candidate string
              const ipMatch = candidate.match(
                /([0-9]{1,3}\.){3}[0-9]{1,3}|([a-f0-9:]+:+)+[a-f0-9]+/gi
              );
              if (ipMatch) {
                ipMatch.forEach((ip) => {
                  // Check if it's a local/private IP
                  const isLocal =
                    ip.startsWith("10.") ||
                    ip.startsWith("192.168.") ||
                    ip.startsWith("172.") ||
                    ip.startsWith("169.254.") ||
                    ip === "0.0.0.0" ||
                    ip.startsWith("fe80:") ||
                    ip.startsWith("::1") ||
                    ip.includes("local");

                  if (isLocal) {
                    if (!leak.localIps.includes(ip)) {
                      leak.localIps.push(ip);
                    }
                  } else {
                    if (!leak.publicIps.includes(ip)) {
                      leak.publicIps.push(ip);
                      leak.found = true;
                    }
                  }
                });
              }
            });

            resolve(leak);
          } else if (event.candidate.candidate) {
            candidates.push(event.candidate.candidate);
          }
        };

        // Create data channel and offer to trigger ICE gathering
        pc.createDataChannel("");
        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .catch(() => {
            clearTimeout(timeout);
            pc.close();
            resolve(leak);
          });
      });
    } catch {
      return leak;
    }
  }, []);

  // Run all leak tests
  const runTests = useCallback(async () => {
    setStatus("testing");
    setError(null);
    setResult((prev) => ({ ...prev, overallStatus: "testing" }));

    try {
      // Run tests in parallel
      const [ipInfoResponse, webrtcResult] = await Promise.all([
        fetch("/api/ip-info").then((res) => res.json()),
        detectWebRTCLeak(),
      ]);

      // Determine overall status
      let overallStatus: LeakTestResult["overallStatus"] = "secure";

      if (webrtcResult.found) {
        overallStatus = "exposed";
      }

      // If no VPN detected (based on ISP being a consumer ISP), show warning
      const consumerIspKeywords = [
        "comcast",
        "verizon",
        "at&t",
        "spectrum",
        "cox",
        "xfinity",
        "frontier",
        "centurylink",
        "optimum",
        "mediacom",
      ];
      const ispLower = (ipInfoResponse.isp || "").toLowerCase();
      const looksLikeConsumerIsp = consumerIspKeywords.some((keyword) =>
        ispLower.includes(keyword)
      );

      if (looksLikeConsumerIsp && overallStatus === "secure") {
        overallStatus = "warning";
      }

      setResult({
        ipInfo: ipInfoResponse,
        webrtcLeak: webrtcResult,
        dnsLeak: { tested: true, servers: [] },
        overallStatus,
      });
      setStatus("complete");
    } catch (err) {
      console.error("Leak test error:", err);
      setError("Failed to complete the leak test. Please try again.");
      setStatus("error");
    }
  }, [detectWebRTCLeak]);

  // Auto-run tests on mount
  useEffect(() => {
    runTests();
  }, [runTests]);

  const getStatusIcon = () => {
    switch (result.overallStatus) {
      case "secure":
        return <ShieldCheck className="w-12 h-12 text-green-500" />;
      case "warning":
        return <Shield className="w-12 h-12 text-yellow-500" />;
      case "exposed":
        return <ShieldAlert className="w-12 h-12 text-red-500" />;
      default:
        return <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (result.overallStatus) {
      case "secure":
        return {
          title: "Your connection appears secure",
          description:
            "No WebRTC leaks detected. Your VPN seems to be working correctly.",
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "warning":
        return {
          title: "VPN not detected",
          description:
            "You appear to be connecting from a residential ISP without VPN protection.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
        };
      case "exposed":
        return {
          title: "Potential leak detected",
          description:
            "WebRTC is exposing your real IP address. Your privacy may be compromised.",
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      default:
        return {
          title: "Running tests...",
          description: "Checking your connection for potential leaks.",
          color: "text-muted-foreground",
          bgColor: "bg-muted/50",
          borderColor: "border-muted",
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card
        className={cn(
          "border-2 transition-colors duration-300",
          statusInfo.borderColor
        )}
      >
        <CardContent className={cn("p-8", statusInfo.bgColor)}>
          <div className="flex flex-col items-center text-center">
            {getStatusIcon()}
            <h2 className={cn("text-2xl font-bold mt-4", statusInfo.color)}>
              {statusInfo.title}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              {statusInfo.description}
            </p>
            {status === "complete" && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={runTests}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Run Test Again
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Test Results Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* IP Address Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Your IP Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === "testing" ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Detecting...
              </div>
            ) : result.ipInfo ? (
              <div className="space-y-3">
                <div className="font-mono text-2xl font-bold">
                  {result.ipInfo.ip}
                </div>
                {result.ipInfo.city && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {[result.ipInfo.city, result.ipInfo.region, result.ipInfo.country]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                )}
                {result.ipInfo.isp && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    {result.ipInfo.isp}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">Unable to detect</div>
            )}
          </CardContent>
        </Card>

        {/* WebRTC Leak Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              WebRTC Leak Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === "testing" ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Testing...
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {result.webrtcLeak.found ? (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <Badge variant="destructive">Leak Detected</Badge>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        No Leak
                      </Badge>
                    </>
                  )}
                </div>
                {result.webrtcLeak.found && result.webrtcLeak.publicIps.length > 0 && (
                  <div className="text-sm">
                    <p className="text-red-600 font-medium">Exposed IPs:</p>
                    {result.webrtcLeak.publicIps.map((ip) => (
                      <code
                        key={ip}
                        className="block mt-1 text-xs bg-red-50 px-2 py-1 rounded"
                      >
                        {ip}
                      </code>
                    ))}
                  </div>
                )}
                {result.webrtcLeak.localIps.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <p>Local IPs (not a concern):</p>
                    {result.webrtcLeak.localIps.slice(0, 2).map((ip) => (
                      <code
                        key={ip}
                        className="block mt-1 text-xs bg-muted px-2 py-1 rounded"
                      >
                        {ip}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* DNS Information Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              DNS Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === "testing" ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Checking...
              </div>
            ) : result.ipInfo?.isp ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your requests are routed through:
                </p>
                <div className="font-medium">{result.ipInfo.isp}</div>
                {result.ipInfo.country && (
                  <Badge variant="secondary">{result.ipInfo.country}</Badge>
                )}
              </div>
            ) : (
              <div className="text-muted-foreground">Unable to determine</div>
            )}
          </CardContent>
        </Card>

        {/* Timezone Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Timezone Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === "testing" ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Checking...
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Server timezone:
                </div>
                <div className="font-medium">
                  {result.ipInfo?.timezone || "Unknown"}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Browser timezone:
                </div>
                <div className="font-medium">
                  {Intl.DateTimeFormat().resolvedOptions().timeZone}
                </div>
                {result.ipInfo?.timezone &&
                  result.ipInfo.timezone !==
                    Intl.DateTimeFormat().resolvedOptions().timeZone && (
                    <Badge variant="secondary" className="mt-2">
                      Mismatch detected
                    </Badge>
                  )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Section */}
      {status === "complete" && (result.overallStatus === "warning" || result.overallStatus === "exposed") && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Protect Your Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {result.overallStatus === "exposed"
                ? "Your real IP address is being exposed through WebRTC. A quality VPN with WebRTC leak protection can fix this."
                : "You're browsing without VPN protection. Your ISP and websites can see your real IP address and track your activity."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/vpn">
                  View Best VPNs for 2025
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/vpn/compare/nordvpn-vs-expressvpn">
                  Compare Top VPNs
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
