import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

interface IpInfoResponse {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
}

interface GeoData {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  loc: string | null;
  org: string | null;
  isp: string | null;
  timezone: string | null;
}

export async function GET(request: NextRequest) {
  try {
    // Get client IP from headers (works with Vercel, Cloudflare, etc.)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip");

    // Get the client IP - prioritize different headers based on proxy setup
    let clientIp = cfConnectingIp || realIp || forwardedFor?.split(",")[0]?.trim() || "unknown";

    // For local development, use a test IP
    if (clientIp === "::1" || clientIp === "127.0.0.1" || clientIp === "unknown") {
      clientIp = "8.8.8.8"; // Use Google DNS as fallback for testing
    }

    // Fetch geo data from ipinfo.io (free tier: 50k requests/month)
    let geoData: GeoData = {
      ip: clientIp,
      city: null,
      region: null,
      country: null,
      loc: null,
      org: null,
      isp: null,
      timezone: null,
    };

    try {
      const ipInfoResponse = await fetch(`https://ipinfo.io/${clientIp}/json`, {
        headers: {
          Accept: "application/json",
        },
        // Cache for 5 minutes
        next: { revalidate: 300 },
      });

      if (ipInfoResponse.ok) {
        const data: IpInfoResponse = await ipInfoResponse.json();
        geoData = {
          ip: data.ip || clientIp,
          city: data.city || null,
          region: data.region || null,
          country: data.country || null,
          loc: data.loc || null,
          org: data.org || null,
          isp: data.org || null, // ipinfo includes ISP in org field
          timezone: data.timezone || null,
        };
      }
    } catch {
      // If geo lookup fails, we still return the IP
      console.error("Failed to fetch geo data");
    }

    return NextResponse.json(geoData, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error in ip-info API:", error);
    return NextResponse.json(
      { error: "Failed to get IP information" },
      { status: 500 }
    );
  }
}
