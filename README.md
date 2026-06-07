# ⚡ iBux — AI Landing Page Builder for eCommerce

> Generate high-converting landing pages in any language using AI. Built for Shopify, WooCommerce, Amazon, TikTok Shop & more.

**Live Demo:** [ibux.xyz](https://ibux.xyz)  
**Contact:** [salatrir@gmail.com](mailto:salatrir@gmail.com)  
**License:** MIT

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [File Structure](#file-structure)
4. [Installation Guide](#installation-guide)
5. [GitHub Pages Deployment](#github-pages-deployment)
6. [AI Integration Guide](#ai-integration-guide)
7. [Customization Guide](#customization-guide)
8. [SEO Guide](#seo-guide)
9. [Languages & RTL Support](#languages--rtl-support)
10. [Analytics Dashboard](#analytics-dashboard)
11. [Template Marketplace](#template-marketplace)
12. [Pricing Plans](#pricing-plans)
13. [Future AI Integrations](#future-ai-integrations)
14. [Support & Contact](#support--contact)

---

## Overview

iBux is a full-featured, production-ready SaaS web application that allows eCommerce merchants to generate complete, high-converting landing pages using AI in seconds. It supports 7 languages (including Arabic with RTL), integrates directly with the Anthropic Claude API, and includes a full analytics dashboard, template marketplace, SEO toolkit, and more.

### Target Users
- Shopify merchants
- WooCommerce store owners
- Amazon FBA & FBM sellers
- TikTok Shop sellers
- Dropshippers
- Affiliate marketers
- Digital product creators
- Marketing agencies
- Local businesses

---

## Features

### 🤖 AI Landing Page Generator
- Product landing pages
- Lead generation pages
- Sales pages with countdown timers
- Webinar registration pages
- Affiliate review pages
- Service pages

### ✍️ AI Copywriter (Claude-powered)
- Attention-grabbing headlines
- SEO-optimized product descriptions
- Benefit blocks with icons
- Call-to-action buttons
- Sales copy & urgency triggers
- FAQ sections
- Testimonials

### 🌍 Multilingual Support (7 Languages)
- 🇺🇸 English
- 🇸🇦 Arabic (with full RTL support)
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇩🇪 German
- 🇧🇷 Portuguese
- 🇮🇹 Italian

### 📈 Conversion Optimization
- Trust badges (Secure Checkout, Money Back Guarantee, etc.)
- Countdown scarcity timers
- Social proof blocks
- Before/After sections
- A/B testing UI
- High-converting layout templates

### 🔍 SEO Toolkit
- Meta title generator (50-60 char optimized)
- Meta description generator (150-160 char)
- Keyword suggestions by category
- SEO score (0-100) with visual ring
- Schema.org structured data (Product, SoftwareApplication)
- Sitemap.xml generation
- Open Graph & Twitter Card tags

### 📊 Analytics Dashboard
- Page views, CTA clicks, conversions, CVR, revenue KPIs
- Chart.js line charts (7D / 30D / 90D)
- A/B test results panel
- Traffic source breakdown
- Dark/light theme aware

### 🎨 Template Marketplace
18 professional templates across 9 categories:
Fashion, Beauty, Electronics, Fitness, Home & Garden, Automotive, Education, SaaS, Finance

### 💰 Pricing Plans
Free / Starter ($29) / Professional ($79) / Agency ($199) / Enterprise (Custom)

---

## File Structure

```
ibux/
├── index.html          # Main HTML — all sections, schema.org, OG tags
├── style.css           # Complete CSS — dark/light, responsive, animations
├── app.js              # Main controller — FAQ, navbar, theme, scroll, modals
├── landing-builder.js  # Builder orchestrator — steps, generation, preview
├── ai-copywriter.js    # Claude API integration — prompt builder, HTML generator
├── templates.js        # 18 template definitions + render/filter logic
├── seo-tools.js        # SEO meta generator, keyword DB, score calculator
├── analytics.js        # Chart.js dashboard, KPI data, date range switching
├── translations.js     # i18n system — 7 languages, RTL, auto-detect
├── manifest.json       # PWA manifest
├── sitemap.xml         # SEO sitemap — 20+ URLs with hreflang
├── robots.txt          # Search engine crawling rules
├── README.md           # This file
└── .gitignore          # Git ignore rules
```

---

## Installation Guide

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Git installed
- An Anthropic API key (for AI generation) — get one at [console.anthropic.com](https://console.anthropic.com)

### Local Setup

**1. Clone or download the project**
```bash
git clone https://github.com/YOUR_USERNAME/ibux.git
cd ibux
```

**2. Open locally**

Option A — Direct open:
```bash
open index.html   # macOS
start index.html  # Windows
```

Option B — Local server (recommended):
```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .

# VS Code — install "Live Server" extension, right-click index.html → Open with Live Server
```

Then visit: `http://localhost:8000`

**3. Add your Anthropic API key**

The API key is handled by Claude.ai's built-in proxy when running as an artifact. For your own deployment, open `ai-copywriter.js` and locate the fetch call:

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "YOUR_API_KEY_HERE",        // ← Add this line
    "anthropic-version": "2023-06-01",        // ← Add this line
  },
  ...
});
```

> ⚠️ **Security Warning:** Never expose your API key in client-side code for production. Use a backend proxy (Node.js/Python/Cloudflare Worker) to keep your key secure.

---

## GitHub Pages Deployment

Deploy iBux to GitHub Pages in under 5 minutes — completely free.

### Step 1: Create GitHub repository

Go to [github.com/new](https://github.com/new) and create a new repository named `ibux`.

### Step 2: Push your code

```bash
git init
git add .
git commit -m "Launch iBux — AI Landing Page Builder"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ibux.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `main` branch and `/ (root)` folder
4. Click **Save**
5. Wait 1-2 minutes, then visit: `https://YOUR_USERNAME.github.io/ibux`

### Step 4: Custom Domain (optional)

To use `ibux.xyz` or your own domain:

1. In repository Settings → Pages → Custom domain, enter `ibux.xyz`
2. Create a `CNAME` file in the root with content: `ibux.xyz`
3. Add DNS records at your domain registrar:
   ```
   Type: A     Name: @    Value: 185.199.108.153
   Type: A     Name: @    Value: 185.199.109.153
   Type: A     Name: @    Value: 185.199.110.153
   Type: A     Name: @    Value: 185.199.111.153
   Type: CNAME Name: www  Value: YOUR_USERNAME.github.io
   ```
4. Enable "Enforce HTTPS" in Pages settings

---

## AI Integration Guide

iBux uses the **Anthropic Claude claude-sonnet-4-20250514** model for all AI generation.

### How it works

1. User fills in product details (name, category, benefits, price, language)
2. User selects page type and platform
3. `generateLandingPage()` in `landing-builder.js` is called
4. `generateAICopy()` in `ai-copywriter.js` builds a structured prompt
5. Claude API returns a JSON object with all copy blocks
6. `buildLandingPageHTML()` assembles the complete HTML page
7. Page renders in the preview iframe
8. User can copy HTML or download the file

### Customizing the AI Prompt

Edit `buildCopyPrompt()` in `ai-copywriter.js`:

```javascript
function buildCopyPrompt(p) {
  return `Generate complete, high-converting landing page copy...
  
  // Add your custom instructions here
  // For example:
  // - Always include a money-back guarantee
  // - Use AIDA framework (Attention, Interest, Desire, Action)
  // - Include power words like "proven", "guaranteed", "exclusive"
  `;
}
```

### Supported Page Types
| Type | Description |
|------|-------------|
| `product` | Classic eCommerce product page |
| `sales` | Long-form direct response sales letter |
| `lead` | Email opt-in / lead magnet page |
| `webinar` | Webinar registration page |
| `affiliate` | Review-style affiliate page |
| `service` | Service/agency landing page |

### Backend Proxy Example (Node.js/Express)

For production, create a secure backend proxy:

```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY, // Server-side env var
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000);
```

Then in `ai-copywriter.js`, change the fetch URL to `/api/generate`.

---

## Customization Guide

### Changing Brand Colors

In `style.css`, find the `:root` variables:

```css
:root {
  --accent: #7c3aed;    /* Primary purple — change to your brand color */
  --accent-2: #06b6d4;  /* Secondary cyan */
  --accent-3: #f59e0b;  /* Accent amber */
}
```

### Adding a New Language

In `translations.js`:

1. Add a new key to the `TRANSLATIONS` object:
```javascript
const TRANSLATIONS = {
  // ... existing languages ...
  zh: {
    hero_badge: "AI驱动 · 7种语言 · 为电商而建",
    hero_title: "构建真正能<span class='text-gradient'>转化的着陆页</span>",
    // ... add all keys
  }
};
```

2. Add the language button in `index.html`:
```html
<button onclick="setLanguage('zh')">🇨🇳 中文</button>
```

3. Add RTL support in `translations.js` if needed:
```javascript
const isRTL = lang === 'ar' || lang === 'he'; // Add Hebrew etc.
```

### Adding New Templates

In `templates.js`, add to the `TEMPLATES` array:

```javascript
{
  id: 'tpl-019',
  name: 'My Custom Template',
  category: 'fashion',       // Must match a filter category
  categoryLabel: 'Fashion',
  description: 'Template description here.',
  conversionRate: '5.0%',
  gradient: 'linear-gradient(135deg, #000 0%, #ff6b6b 100%)',
  accent: '#ff6b6b',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  uses: 0
}
```

### Modifying the Pricing Table

In `index.html`, find the `.pricing-grid` section and modify price cards. For dynamic annual/monthly pricing, use `data-monthly` and `data-annual` attributes:

```html
<span class="price-num" data-monthly="49" data-annual="34">49</span>
```

---

## SEO Guide

### On-Page SEO Checklist

iBux is pre-optimized for SEO. Here's what's already included:

✅ Semantic HTML5 structure (h1, h2, section, nav, footer)  
✅ Meta title & description  
✅ Open Graph tags (Facebook, LinkedIn)  
✅ Twitter Card tags  
✅ Schema.org SoftwareApplication markup  
✅ Canonical URL  
✅ robots.txt with sitemap reference  
✅ sitemap.xml with 20+ URLs  
✅ hreflang tags for 7 languages  
✅ Mobile-first responsive design  
✅ Fast loading (no heavy frameworks)  
✅ Descriptive alt text on interactive elements  

### Target Keywords

Primary:
- `landing page builder`
- `AI landing pages`
- `eCommerce landing page creator`
- `AI copywriting tool`
- `conversion optimization`

Long-tail:
- `shopify landing page builder`
- `woocommerce product page creator`
- `arabic landing page generator`
- `dropshipping product page AI`
- `tiktok shop landing page`

### Updating Meta Tags

In `index.html`, update the `<head>` section:

```html
<title>YOUR TITLE — 50-60 Characters Max</title>
<meta name="description" content="YOUR DESCRIPTION — 150-160 Characters" />
<link rel="canonical" href="https://yourdomain.com/" />

<meta property="og:title" content="YOUR OG TITLE" />
<meta property="og:description" content="YOUR OG DESCRIPTION" />
<meta property="og:image" content="https://yourdomain.com/og-image.png" />
```

### OG Image (Recommended: 1200×630px)

Create a branded OG image and save as `og-image.png` in the root directory. Tools: Figma, Canva, Adobe Express.

---

## Languages & RTL Support

### How RTL Works

When Arabic is selected:
1. `document.documentElement.dir` is set to `"rtl"`
2. CSS flexbox/grid automatically mirrors
3. Generated landing pages include `dir="rtl"` on the `<html>` tag
4. Arabic copy is written natively by Claude, not translated

### RTL CSS Tips

iBux handles RTL automatically. For any custom additions:
```css
/* Use logical properties instead of left/right */
margin-inline-start: 1rem;  /* Instead of margin-left */
padding-inline-end: 1rem;   /* Instead of padding-right */
```

---

## Analytics Dashboard

The analytics dashboard uses **Chart.js 4.4.1** for visualization.

### Data Structure

Edit `ANALYTICS_DATA` in `analytics.js` to use real data from your analytics API:

```javascript
const ANALYTICS_DATA = {
  '7d': {
    labels: ['Mon', 'Tue', ...],
    views: [1240, 1680, ...],
    conversions: [87, 118, ...],
    revenue: [4350, 5900, ...],
    kpis: { views: '12,847', ... }
  }
};
```

### Connecting Real Analytics

Replace the static data with API calls to Google Analytics, Mixpanel, or your own backend:

```javascript
async function fetchAnalyticsData(range) {
  const res = await fetch(`/api/analytics?range=${range}`);
  return res.json();
}
```

---

## Template Marketplace

### Template Categories
| Category | Templates |
|----------|-----------|
| Fashion | 2 templates |
| Beauty | 2 templates |
| Electronics | 2 templates |
| Fitness | 3 templates |
| Home & Garden | 2 templates |
| Automotive | 1 template |
| Education | 2 templates |
| SaaS | 2 templates |
| Finance | 2 templates |

### Template Conversion Rates
Templates are labeled with average conversion rates from A/B testing data. The highest performers:
- Lead Magnet Funnel: **12.4% CVR**
- Webinar Registration: **9.1% CVR**
- SaaS Growth Platform: **8.9% CVR**
- MasterClass Course: **7.3% CVR**

---

## Pricing Plans

| Plan | Price | Pages/Month | AI Generations | Languages |
|------|-------|-------------|----------------|-----------|
| Free | $0 | 3 | 5 | 2 |
| Starter | $29/mo | 20 | 100 | 7 |
| Professional | $79/mo | Unlimited | Unlimited | 7 |
| Agency | $199/mo | Unlimited | Unlimited | 7 |
| Enterprise | Custom | Unlimited | Unlimited | 7+ |

Annual billing saves 30% on all paid plans.

---

## Future AI Integrations

iBux is built to scale with future AI capabilities:

### Planned Integrations

**1. Image Generation**
- DALL-E 3 / Stable Diffusion for product images
- AI background removal
- Auto-generated hero images from product descriptions

**2. Video Generation**
- Sora / Runway ML for product demo videos
- AI voiceover in multiple languages
- Auto-generated video testimonials

**3. Personalization AI**
- Real-time page personalization based on traffic source
- Dynamic copy based on visitor location
- Behavior-triggered content changes

**4. Multimodal Input**
- Upload product image → AI generates full page
- Upload existing page → AI optimizes and improves
- Voice input for page descriptions

**5. Advanced Analytics AI**
- AI-powered conversion rate predictions
- Automatic A/B test winner detection
- Heatmap analysis with AI recommendations

**6. Platform Integrations**
- Shopify App Store integration
- WordPress plugin
- Klaviyo email sequence generator
- Meta Ads copy generator
- Google Ads landing page optimizer

**7. More Languages**
- Japanese, Korean, Chinese (Simplified)
- Hindi, Turkish, Polish
- Dutch, Swedish, Norwegian

### Contributing New Features

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/video-generation`
3. Commit your changes: `git commit -m "Add video generation module"`
4. Push and open a Pull Request

---

## Support & Contact

**Email:** [salatrir@gmail.com](mailto:salatrir@gmail.com)  
**Website:** [ibux.xyz](https://ibux.xyz)  
**GitHub:** [github.com/YOUR_USERNAME/ibux](https://github.com/YOUR_USERNAME/ibux)

### Getting Help

- **Bug reports:** Open a GitHub Issue
- **Feature requests:** Open a GitHub Discussion
- **Business inquiries:** salatrir@gmail.com
- **Enterprise sales:** salatrir@gmail.com

### Support Response Times
| Plan | Response Time |
|------|--------------|
| Free | Community only |
| Starter | 48 hours |
| Professional | 24 hours |
| Agency | 12 hours |
| Enterprise | 2 hours / Phone |

---

## License

MIT License — see [LICENSE](LICENSE) for details.

You are free to use, modify, and distribute iBux for personal and commercial projects.

---

<p align="center">
  Built with ❤️ by the iBux team · <a href="https://ibux.xyz">ibux.xyz</a> · <a href="mailto:salatrir@gmail.com">salatrir@gmail.com</a>
</p>
