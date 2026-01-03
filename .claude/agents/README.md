# Pickify Vertical Expert Agents

This directory contains 12 specialized agents, one for each product vertical in the Pickify application. These agents are domain experts designed to maintain, update, and improve vertical-specific content.

## Available Agents

| Agent | File | Vertical | Data File |
|-------|------|----------|-----------|
| VPN Expert | `vpn.md` | VPNs | `src/data/products/vpn.ts` |
| Hosting Expert | `hosting.md` | Web Hosting | `src/data/products/hosting.ts` |
| Email Marketing Expert | `email-marketing.md` | Email Marketing | `src/data/products/email-marketing.ts` |
| Password Manager Expert | `password-managers.md` | Password Managers | `src/data/products/password-managers.ts` |
| Project Management Expert | `project-management.md` | Project Management | `src/data/products/project-management.ts` |
| CRM Expert | `crm.md` | CRM Software | `src/data/products/crm.ts` |
| Website Builder Expert | `website-builders.md` | Website Builders | `src/data/products/website-builders.ts` |
| Online Learning Expert | `online-learning.md` | Online Learning | `src/data/products/online-learning.ts` |
| ISP Expert | `internet-providers.md` | Internet Providers | `src/data/products/isp.ts` |
| Antivirus Expert | `antivirus.md` | Antivirus Software | `src/data/products/antivirus.ts`* |
| Home Security Expert | `home-security.md` | Home Security | `src/data/products/home-security.ts`* |
| Cloud Storage Expert | `cloud-storage.md` | Cloud Storage | `src/data/products/cloud-storage.ts`* |

\* Product data file to be created

## Usage

### Content Refresh Skill

Each agent can invoke the `/content-refresh` skill to audit and update their vertical:

```
/content-refresh vpn
/content-refresh hosting
/content-refresh email-marketing
/content-refresh password-managers
/content-refresh project-management
/content-refresh crm
/content-refresh website-builders
/content-refresh online-learning
/content-refresh internet-providers
/content-refresh antivirus
/content-refresh home-security
/content-refresh cloud-storage
```

The skill will:
1. Load the agent's domain expertise
2. Audit all products in the vertical
3. Research current pricing/features
4. Generate an update report
5. Optionally apply changes

### Manual Agent Reference

Reference agents directly for vertical-specific tasks:

```
"Use the VPN expert agent context from .claude/agents/vpn.md to update VPN pricing"
```

## Agent Capabilities

Each agent is an expert in:

1. **Product Data Maintenance** - Keeping pricing, features, and specifications current
2. **Comparison Accuracy** - Ensuring fair and accurate product comparisons
3. **SEO Optimization** - Targeting relevant keywords and search intent
4. **Best-For Categories** - Maintaining use-case specific recommendations
5. **Industry Monitoring** - Tracking industry trends and changes

## Common Tasks

- Update product pricing and features
- Add new products to a vertical
- Improve SEO meta descriptions
- Update comparison data
- Research industry changes
- Verify affiliate links and programs

## Data Structure

All agents work with the same core data structures:

- **Verticals:** `src/data/verticals.ts`
- **Products:** `src/data/products/{vertical}.ts`
- **Types:** `src/types/index.ts`
- **Best-For Configs:** `src/data/index.ts`

## Quality Standards

All agents follow these principles:

- Accuracy over speed
- Verifiable claims only
- Balanced pros and cons
- Clear pricing with context
- User-focused recommendations
