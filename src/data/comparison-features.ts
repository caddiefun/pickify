/**
 * Vertical-specific comparison feature configurations
 *
 * Each vertical has its own set of features to display in comparison tables.
 * Features are organized by category and mapped to the feature keys in product data.
 */

export interface ComparisonFeatureItem {
  name: string; // Display name in the table
  key: string; // Key to match against product.features[].name
}

export interface ComparisonFeatureCategory {
  category: string;
  items: ComparisonFeatureItem[];
}

/**
 * Comparison features configuration for all verticals
 */
export const comparisonFeaturesConfig: Record<
  string,
  ComparisonFeatureCategory[]
> = {
  vpn: [
    {
      category: "Performance",
      items: [
        { name: "Servers", key: "servers" },
        { name: "Countries", key: "countries" },
        { name: "Simultaneous Connections", key: "simultaneous_connections" },
      ],
    },
    {
      category: "Security",
      items: [
        { name: "Kill Switch", key: "kill_switch" },
        { name: "No Logs Policy", key: "no_logs" },
        { name: "Double VPN", key: "double_vpn" },
        { name: "RAM-Only Servers", key: "ram_only_servers" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Split Tunneling", key: "split_tunneling" },
        { name: "Streaming Support", key: "streaming_support" },
        { name: "Torrenting", key: "torrenting" },
        { name: "Dedicated IP", key: "dedicated_ip" },
      ],
    },
  ],

  hosting: [
    {
      category: "Resources",
      items: [
        { name: "Storage", key: "storage" },
        { name: "Bandwidth", key: "bandwidth" },
        { name: "Websites", key: "websites" },
        { name: "Email Accounts", key: "email_accounts" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Free Domain", key: "free_domain" },
        { name: "WordPress Optimized", key: "wordpress_optimized" },
        { name: "CDN Included", key: "cdn" },
      ],
    },
    {
      category: "Security & Reliability",
      items: [
        { name: "Free SSL", key: "free_ssl" },
        { name: "Uptime Guarantee", key: "uptime_guarantee" },
        { name: "Backup", key: "backup" },
      ],
    },
  ],

  "email-marketing": [
    {
      category: "Capacity",
      items: [
        { name: "Contacts", key: "contacts" },
        { name: "Emails per Month", key: "emails_per_month" },
      ],
    },
    {
      category: "Automation & Testing",
      items: [
        { name: "Automation", key: "automation" },
        { name: "A/B Testing", key: "ab_testing" },
        { name: "Segmentation", key: "segmentation" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Landing Pages", key: "landing_pages" },
        { name: "Templates", key: "templates" },
        { name: "Analytics", key: "analytics" },
        { name: "Integrations", key: "integrations" },
        { name: "API Access", key: "api_access" },
      ],
    },
  ],

  "password-managers": [
    {
      category: "Capacity",
      items: [
        { name: "Password Limit", key: "password_limit" },
        { name: "Devices", key: "devices" },
      ],
    },
    {
      category: "Security",
      items: [
        { name: "Two-Factor Auth", key: "two_factor" },
        { name: "Security Audit", key: "security_audit" },
        { name: "Breach Monitoring", key: "breach_monitoring" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Password Sharing", key: "password_sharing" },
        { name: "Password Generator", key: "password_generator" },
        { name: "Autofill", key: "autofill" },
        { name: "Browser Extension", key: "browser_extension" },
        { name: "Mobile App", key: "mobile_app" },
      ],
    },
  ],

  "project-management": [
    {
      category: "Capacity",
      items: [
        { name: "Users", key: "users" },
        { name: "Boards", key: "boards" },
        { name: "File Storage", key: "file_storage" },
      ],
    },
    {
      category: "Views & Planning",
      items: [
        { name: "Kanban View", key: "kanban_view" },
        { name: "Gantt Chart", key: "gantt_chart" },
        { name: "Time Tracking", key: "time_tracking" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Automations", key: "automations" },
        { name: "Integrations", key: "integrations" },
        { name: "Mobile App", key: "mobile_app" },
        { name: "API Access", key: "api_access" },
      ],
    },
  ],

  crm: [
    {
      category: "Capacity",
      items: [
        { name: "Contacts", key: "contacts" },
        { name: "Users", key: "users" },
      ],
    },
    {
      category: "Sales Features",
      items: [
        { name: "Deal Pipeline", key: "deal_pipeline" },
        { name: "Email Tracking", key: "email_tracking" },
        { name: "Meeting Scheduler", key: "meeting_scheduler" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Live Chat", key: "live_chat" },
        { name: "Reporting", key: "reporting" },
        { name: "Mobile App", key: "mobile_app" },
        { name: "Integrations", key: "integrations" },
        { name: "API Access", key: "api_access" },
      ],
    },
  ],

  "website-builders": [
    {
      category: "Resources",
      items: [
        { name: "Templates", key: "templates" },
        { name: "Storage", key: "storage" },
        { name: "Bandwidth", key: "bandwidth" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Custom Domain", key: "custom_domain" },
        { name: "E-commerce", key: "ecommerce" },
        { name: "SEO Tools", key: "seo_tools" },
        { name: "Mobile Editor", key: "mobile_editor" },
        { name: "App Market", key: "app_market" },
      ],
    },
    {
      category: "Security & Analytics",
      items: [
        { name: "SSL Certificate", key: "ssl_certificate" },
        { name: "Analytics", key: "analytics" },
      ],
    },
  ],

  "online-learning": [
    {
      category: "Content",
      items: [
        { name: "Courses", key: "courses" },
        { name: "Certificates", key: "certificates" },
        { name: "Degrees", key: "degrees" },
        { name: "Free Content", key: "free_content" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Projects", key: "projects" },
        { name: "Subtitles", key: "subtitles" },
        { name: "Offline Access", key: "offline_access" },
        { name: "Mobile App", key: "mobile_app" },
      ],
    },
    {
      category: "Business",
      items: [
        { name: "Enterprise", key: "enterprise" },
        { name: "Financial Aid", key: "financial_aid" },
      ],
    },
  ],

  "internet-providers": [
    {
      category: "Speed",
      items: [
        { name: "Max Download", key: "max_download" },
        { name: "Max Upload", key: "max_upload" },
      ],
    },
    {
      category: "Plan Details",
      items: [
        { name: "Data Cap", key: "data_cap" },
        { name: "Contract Required", key: "contract_required" },
        { name: "Bundle Options", key: "bundle_options" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "WiFi Hotspots", key: "wifi_hotspots" },
        { name: "Self Install", key: "self_install" },
        { name: "Mobile App", key: "mobile_app" },
      ],
    },
  ],

  antivirus: [
    {
      category: "Protection",
      items: [
        { name: "Malware Detection", key: "malware_detection" },
        { name: "Real-Time Protection", key: "real_time_protection" },
        { name: "Ransomware Protection", key: "ransomware_protection" },
        { name: "Firewall", key: "firewall" },
      ],
    },
    {
      category: "Extras",
      items: [
        { name: "VPN Included", key: "vpn_included" },
        { name: "Password Manager", key: "password_manager" },
        { name: "Parental Controls", key: "parental_controls" },
      ],
    },
    {
      category: "Coverage",
      items: [
        { name: "Devices", key: "devices" },
        { name: "Gaming Mode", key: "gaming_mode" },
        { name: "Webcam Protection", key: "webcam_protection" },
      ],
    },
  ],

  "home-security": [
    {
      category: "Monitoring",
      items: [
        { name: "Professional Monitoring", key: "professional_monitoring" },
        { name: "Self Monitoring", key: "self_monitoring" },
        { name: "Cellular Backup", key: "cellular_backup" },
        { name: "Battery Backup", key: "battery_backup" },
      ],
    },
    {
      category: "Cameras",
      items: [
        { name: "Video Doorbell", key: "video_doorbell" },
        { name: "Indoor Cameras", key: "indoor_cameras" },
        { name: "Outdoor Cameras", key: "outdoor_cameras" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Smart Home", key: "smart_home" },
        { name: "DIY Install", key: "diy_install" },
        { name: "Contract Required", key: "contract_required" },
      ],
    },
  ],

  "cloud-storage": [
    {
      category: "Storage",
      items: [
        { name: "Free Storage", key: "free_storage" },
        { name: "Max Storage", key: "max_storage" },
        { name: "File Versioning", key: "file_versioning" },
      ],
    },
    {
      category: "Security",
      items: [
        { name: "Encryption", key: "encryption" },
        { name: "Zero Knowledge", key: "zero_knowledge" },
      ],
    },
    {
      category: "Features",
      items: [
        { name: "Collaboration", key: "collaboration" },
        { name: "Offline Access", key: "offline_access" },
        { name: "Desktop App", key: "desktop_app" },
        { name: "Mobile App", key: "mobile_app" },
        { name: "Unlimited Devices", key: "unlimited_devices" },
      ],
    },
  ],
};

/**
 * Get comparison features for a specific vertical
 * Returns empty array if vertical not found (graceful fallback)
 */
export function getComparisonFeatures(
  verticalSlug: string
): ComparisonFeatureCategory[] {
  return comparisonFeaturesConfig[verticalSlug] || [];
}
