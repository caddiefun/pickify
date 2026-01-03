import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pickify.io"),
  title: {
    default: "Pickify - Pick Smart. Save Time.",
    template: "%s | Pickify",
  },
  description:
    "Compare and find the best software for your needs. Honest reviews, detailed comparisons, and expert recommendations for VPNs, web hosting, email marketing, and more.",
  keywords: [
    "software comparison",
    "VPN reviews",
    "web hosting comparison",
    "email marketing tools",
    "best software",
    "product reviews",
  ],
  authors: [{ name: "Pickify" }],
  creator: "Pickify",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pickify.io",
    siteName: "Pickify",
    title: "Pickify - Pick Smart. Save Time.",
    description:
      "Compare and find the best software for your needs. Honest reviews, detailed comparisons, and expert recommendations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickify - Pick Smart. Save Time.",
    description:
      "Compare and find the best software for your needs. Honest reviews, detailed comparisons, and expert recommendations.",
    creator: "@pickify",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen`}
      >
        <Providers>{children}</Providers>
        {/* CJ Affiliate Deep Link Automation */}
        <script
          src="https://www.anrdoezrs.net/am/101624161/impressions/page/am.js"
          async
        />
      </body>
    </html>
  );
}
