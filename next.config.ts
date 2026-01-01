import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Trailing slashes for consistent URLs (pick one and stick with it)
  trailingSlash: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Security headers
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
  ],

  // Redirects for canonical URLs
  redirects: async () => [
    // Redirect www to non-www (or vice versa - pick one)
    {
      source: "/:path*",
      has: [
        {
          type: "host",
          value: "www.pickify.io",
        },
      ],
      destination: "https://pickify.io/:path*",
      permanent: true,
    },
  ],

  // Enable production source maps for error tracking (optional)
  productionBrowserSourceMaps: false,

  // Compress responses
  compress: true,

  // Power header removal for security
  poweredByHeader: false,

  // Strict mode for React
  reactStrictMode: true,
};

export default nextConfig;
