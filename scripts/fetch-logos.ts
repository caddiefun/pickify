/**
 * Logo Fetcher Script
 *
 * Fetches logos for all products using Clearbit's Logo API
 * and updates the product data files with logo URLs.
 *
 * Usage: npx tsx scripts/fetch-logos.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import * as fs from "fs";
import * as path from "path";

// Product website URLs mapped to their data files
const productWebsites: Record<string, { file: string; products: { slug: string; website: string }[] }> = {
  vpn: {
    file: "src/data/products/vpn.ts",
    products: [
      { slug: "nordvpn", website: "nordvpn.com" },
      { slug: "expressvpn", website: "expressvpn.com" },
      { slug: "surfshark", website: "surfshark.com" },
      { slug: "cyberghost", website: "cyberghostvpn.com" },
      { slug: "private-internet-access", website: "privateinternetaccess.com" },
      { slug: "proton-vpn", website: "protonvpn.com" },
    ],
  },
  hosting: {
    file: "src/data/products/hosting.ts",
    products: [
      { slug: "bluehost", website: "bluehost.com" },
      { slug: "siteground", website: "siteground.com" },
      { slug: "hostinger", website: "hostinger.com" },
      { slug: "dreamhost", website: "dreamhost.com" },
      { slug: "cloudways", website: "cloudways.com" },
      { slug: "a2-hosting", website: "a2hosting.com" },
    ],
  },
  "email-marketing": {
    file: "src/data/products/email-marketing.ts",
    products: [
      { slug: "mailchimp", website: "mailchimp.com" },
      { slug: "convertkit", website: "convertkit.com" },
      { slug: "klaviyo", website: "klaviyo.com" },
      { slug: "activecampaign", website: "activecampaign.com" },
      { slug: "constant-contact", website: "constantcontact.com" },
      { slug: "brevo", website: "brevo.com" },
    ],
  },
  "password-managers": {
    file: "src/data/products/password-managers.ts",
    products: [
      { slug: "1password", website: "1password.com" },
      { slug: "bitwarden", website: "bitwarden.com" },
      { slug: "dashlane", website: "dashlane.com" },
      { slug: "lastpass", website: "lastpass.com" },
      { slug: "keeper", website: "keepersecurity.com" },
      { slug: "nordpass", website: "nordpass.com" },
    ],
  },
  "project-management": {
    file: "src/data/products/project-management.ts",
    products: [
      { slug: "monday", website: "monday.com" },
      { slug: "asana", website: "asana.com" },
      { slug: "clickup", website: "clickup.com" },
      { slug: "notion", website: "notion.so" },
      { slug: "trello", website: "trello.com" },
      { slug: "basecamp", website: "basecamp.com" },
    ],
  },
  crm: {
    file: "src/data/products/crm.ts",
    products: [
      { slug: "hubspot", website: "hubspot.com" },
      { slug: "salesforce", website: "salesforce.com" },
      { slug: "pipedrive", website: "pipedrive.com" },
      { slug: "zoho-crm", website: "zoho.com" },
      { slug: "freshsales", website: "freshworks.com" },
      { slug: "close", website: "close.com" },
    ],
  },
  "website-builders": {
    file: "src/data/products/website-builders.ts",
    products: [
      { slug: "wix", website: "wix.com" },
      { slug: "squarespace", website: "squarespace.com" },
      { slug: "shopify", website: "shopify.com" },
      { slug: "webflow", website: "webflow.com" },
      { slug: "wordpress", website: "wordpress.com" },
      { slug: "weebly", website: "weebly.com" },
    ],
  },
  "online-learning": {
    file: "src/data/products/online-learning.ts",
    products: [
      { slug: "coursera", website: "coursera.org" },
      { slug: "udemy", website: "udemy.com" },
      { slug: "linkedin-learning", website: "linkedin.com" },
      { slug: "skillshare", website: "skillshare.com" },
      { slug: "pluralsight", website: "pluralsight.com" },
      { slug: "masterclass", website: "masterclass.com" },
    ],
  },
  isp: {
    file: "src/data/products/isp.ts",
    products: [
      { slug: "xfinity", website: "xfinity.com" },
      { slug: "att-fiber", website: "att.com" },
      { slug: "verizon-fios", website: "verizon.com" },
      { slug: "spectrum", website: "spectrum.com" },
      { slug: "cox", website: "cox.com" },
      { slug: "centurylink", website: "centurylink.com" },
      { slug: "frontier", website: "frontier.com" },
      { slug: "google-fiber", website: "fiber.google.com" },
      { slug: "t-mobile-home-internet", website: "t-mobile.com" },
      { slug: "starlink", website: "starlink.com" },
      { slug: "hughesnet", website: "hughesnet.com" },
      { slug: "optimum", website: "optimum.com" },
    ],
  },
};

// Clearbit Logo API - free tier
function getClearbitLogoUrl(domain: string, size: number = 128): string {
  return `https://logo.clearbit.com/${domain}?size=${size}`;
}

// Generate logo URLs for all products
function generateLogoUrls(): Map<string, string> {
  const logoMap = new Map<string, string>();

  for (const [vertical, data] of Object.entries(productWebsites)) {
    for (const product of data.products) {
      const logoUrl = getClearbitLogoUrl(product.website);
      logoMap.set(`${vertical}:${product.slug}`, logoUrl);
      console.log(`${product.slug}: ${logoUrl}`);
    }
  }

  return logoMap;
}

// Output for manual update or generate SQL
function outputLogoUpdateInstructions(logoMap: Map<string, string>) {
  console.log("\n\n=== Logo URLs for Manual Update ===\n");

  for (const [vertical, data] of Object.entries(productWebsites)) {
    console.log(`\n--- ${vertical.toUpperCase()} ---`);
    console.log(`File: ${data.file}\n`);

    for (const product of data.products) {
      const key = `${vertical}:${product.slug}`;
      const logoUrl = logoMap.get(key);
      console.log(`  "${product.slug}": logo_url: "${logoUrl}",`);
    }
  }

  console.log("\n\n=== SQL Update Statements ===\n");

  for (const [vertical, data] of Object.entries(productWebsites)) {
    for (const product of data.products) {
      const key = `${vertical}:${product.slug}`;
      const logoUrl = logoMap.get(key);
      console.log(
        `UPDATE products SET logo_url = '${logoUrl}' WHERE slug = '${product.slug}';`
      );
    }
  }
}

// Generate a JSON file with all logo mappings
function generateLogoJson(logoMap: Map<string, string>) {
  const logoData: Record<string, Record<string, string>> = {};

  for (const [key, url] of logoMap) {
    const [vertical, slug] = key.split(":");
    if (!logoData[vertical]) {
      logoData[vertical] = {};
    }
    logoData[vertical][slug] = url;
  }

  const outputPath = path.join(process.cwd(), "scripts", "logos.json");
  fs.writeFileSync(outputPath, JSON.stringify(logoData, null, 2));
  console.log(`\nLogo JSON saved to: ${outputPath}`);
}

// Main execution
async function main() {
  console.log("🖼️  Fetching logo URLs for all products...\n");

  const logoMap = generateLogoUrls();

  generateLogoJson(logoMap);
  outputLogoUpdateInstructions(logoMap);

  console.log("\n✅ Done! You can now:");
  console.log("1. Manually update each product file with logo_url values");
  console.log("2. Run the SQL statements to update the database");
  console.log("3. Use the logos.json file for batch updates");
}

main();
