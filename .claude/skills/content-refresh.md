# Content Refresh Skill

Refresh, update, and verify content accuracy for a Pickify vertical.

## Usage

```
/content-refresh <vertical-slug>
```

Example:
```
/content-refresh vpn
/content-refresh hosting
/content-refresh email-marketing
```

## Valid Verticals

- `vpn` - VPNs
- `hosting` - Web Hosting
- `email-marketing` - Email Marketing
- `password-managers` - Password Managers
- `project-management` - Project Management
- `crm` - CRM Software
- `website-builders` - Website Builders
- `online-learning` - Online Learning
- `internet-providers` - Internet Providers
- `antivirus` - Antivirus Software
- `home-security` - Home Security
- `cloud-storage` - Cloud Storage

## Process

### 1. Load Agent Context

Read the vertical-specific agent from `.claude/agents/{vertical}.md` to understand:
- Domain expertise and terminology
- Quality standards for this vertical
- Target keywords and SEO priorities
- Best-for categories to maintain

### 2. Read Current Data

Load the product data file:
```
src/data/products/{vertical}.ts
```

Note: `internet-providers` uses `src/data/products/isp.ts`

### 3. Audit Each Product

For each product in the vertical, verify:

#### Pricing Accuracy
- [ ] Current pricing matches official website
- [ ] Billing cycles are correctly stated (monthly/yearly)
- [ ] Promotional vs regular pricing is distinguished
- [ ] Free tier limits are accurate

#### Feature Verification
- [ ] Feature claims are current and accurate
- [ ] New features have been added
- [ ] Deprecated features are removed
- [ ] Specifications (counts, limits) are up-to-date

#### Content Quality
- [ ] Description accurately represents the product
- [ ] Pros are factually correct
- [ ] Cons are fair and current
- [ ] Rating reflects current service quality

#### SEO Health
- [ ] Meta title includes primary keywords
- [ ] Meta description is compelling and keyword-rich
- [ ] Content matches search intent

#### Links & Affiliate
- [ ] Website URL is valid and current
- [ ] Affiliate URL is working (if applicable)
- [ ] Logo URL returns valid image

### 4. Research Updates

Use web search to find:
- Official pricing pages for each product
- Recent product announcements or changes
- Industry news affecting the vertical
- Competitor updates

### 5. Generate Report

Output a structured report:

```markdown
## Content Refresh Report: {Vertical Name}
**Date:** {current date}
**Products Audited:** {count}

### Summary
- ✅ Products current: {count}
- ⚠️ Products needing updates: {count}
- ❌ Critical issues: {count}

### Product Updates Needed

#### {Product Name}
**Status:** Needs Update | Current | Critical

**Pricing Changes:**
- Old: $X/month
- New: $Y/month
- Source: {URL}

**Feature Updates:**
- Added: {feature}
- Removed: {feature}
- Changed: {feature}

**Content Issues:**
- {description of issue}

**Recommended Actions:**
1. {action item}
2. {action item}

---

### SEO Recommendations
- {keyword opportunities}
- {meta description improvements}

### Industry Updates
- {relevant news or changes}
```

### 6. Apply Updates (Optional)

If instructed to apply updates:

1. Edit the product data file with verified changes
2. Update the `updated_at` timestamp
3. Verify TypeScript compilation passes
4. Summarize changes made

## Quality Gates

Before marking content as "current", verify:

1. **Pricing** - Checked within last 30 days
2. **Features** - Verified against official source
3. **Links** - All URLs return 200 status
4. **Ratings** - Reflect current user sentiment
5. **Descriptions** - No outdated claims

## Output Artifacts

The skill produces:
1. **Audit Report** - Detailed findings for each product
2. **Update Log** - Changes made (if apply mode)
3. **Recommendations** - Future improvements to consider

## Error Handling

- If product website is unavailable, flag for manual review
- If pricing is unclear, note uncertainty in report
- If major changes detected, recommend human verification

## Notes

- Always cite sources for pricing/feature changes
- Preserve existing `created_at` timestamps
- Update `updated_at` to current ISO timestamp
- Maintain consistent data structure per `src/types/index.ts`
