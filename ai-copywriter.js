/* ═══════════════════════════════════════════════════════════════
   iBux — ai-copywriter.js | AI Copy Generation via Claude API
   ═══════════════════════════════════════════════════════════════ */

const LANG_NAMES = {
  en: 'English', ar: 'Arabic', fr: 'French',
  es: 'Spanish', de: 'German', pt: 'Portuguese', it: 'Italian'
};

const PAGE_TYPE_LABELS = {
  product: 'Product Landing Page',
  sales: 'Sales Page',
  lead: 'Lead Generation Page',
  webinar: 'Webinar Registration Page',
  affiliate: 'Affiliate Review Page',
  service: 'Service Page'
};

/**
 * Core AI copy generator — calls Claude claude-sonnet-4-20250514 API
 * Returns structured JSON with all copy blocks for the page.
 */
async function generateAICopy(params) {
  const {
    productName, productCategory, productBenefits, productPrice,
    targetLanguage, pageType, platform, additionalInstructions,
    includeSeo, includeTrust, includeScarcity, includeFaq, includeTestimonials
  } = params;

  const langName = LANG_NAMES[targetLanguage] || 'English';
  const pageTypeLabel = PAGE_TYPE_LABELS[pageType] || 'Landing Page';

  const prompt = buildCopyPrompt({
    productName, productCategory, productBenefits, productPrice,
    langName, pageTypeLabel, platform, additionalInstructions,
    includeSeo, includeTrust, includeScarcity, includeFaq, includeTestimonials,
    targetLanguage
  });

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are an expert eCommerce copywriter and landing page specialist.
You write high-converting copy that follows direct response marketing best practices.
Always respond ONLY with valid JSON — no preamble, no markdown, no backticks.
Write ALL copy in ${langName}. ${targetLanguage === 'ar' ? 'Use right-to-left Arabic script.' : ''}`,
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();

  const rawText = data.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('');

  const clean = rawText.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

function buildCopyPrompt(p) {
  return `Generate complete, high-converting landing page copy for a ${p.pageTypeLabel}.

PRODUCT DETAILS:
- Name: ${p.productName || 'Product'}
- Category: ${p.productCategory || 'General'}
- Benefits: ${p.productBenefits || 'Great quality, fast delivery'}
- Price: ${p.productPrice || ''}
- Platform: ${p.platform || 'General'}
- Language: ${p.langName}
- Additional instructions: ${p.additionalInstructions || 'None'}

OPTIONS:
- Include SEO content: ${p.includeSeo}
- Include trust badges: ${p.includeTrust}
- Include scarcity element: ${p.includeScarcity}
- Include FAQ: ${p.includeFaq}
- Include testimonials: ${p.includeTestimonials}

Generate ONLY a JSON object with this exact structure:
{
  "hero": {
    "headline": "Primary attention-grabbing headline (max 12 words)",
    "subheadline": "Supporting subheadline with key benefit (max 20 words)",
    "body": "2-3 sentence hero body copy",
    "cta_primary": "Primary CTA button text (2-4 words)",
    "cta_secondary": "Secondary CTA (optional)"
  },
  "benefits": [
    {"icon": "fa-check-circle", "title": "Benefit title", "desc": "1-2 sentence benefit description"},
    {"icon": "fa-bolt", "title": "Benefit title", "desc": "1-2 sentence benefit description"},
    {"icon": "fa-shield-alt", "title": "Benefit title", "desc": "1-2 sentence benefit description"},
    {"icon": "fa-star", "title": "Benefit title", "desc": "1-2 sentence benefit description"}
  ],
  "social_proof": {
    "count": "Number with + (e.g. 10,000+)",
    "label": "Customers/Users/Members etc."
  },
  "offer": {
    "headline": "Offer section headline",
    "original_price": "Crossed-out price (if applicable)",
    "sale_price": "Sale price",
    "savings": "Amount/% saved",
    "urgency": "Urgency line (e.g. Only 47 left in stock!)",
    "guarantee": "Guarantee text (e.g. 60-Day Money Back Guarantee)"
  },
  "testimonials": ${p.includeTestimonials ? `[
    {"name": "Name, Location", "stars": 5, "text": "Compelling testimonial", "avatar": "initials"},
    {"name": "Name, Location", "stars": 5, "text": "Compelling testimonial", "avatar": "initials"},
    {"name": "Name, Location", "stars": 5, "text": "Compelling testimonial", "avatar": "initials"}
  ]` : '[]'},
  "faq": ${p.includeFaq ? `[
    {"q": "Question 1?", "a": "Detailed answer 1"},
    {"q": "Question 2?", "a": "Detailed answer 2"},
    {"q": "Question 3?", "a": "Detailed answer 3"},
    {"q": "Question 4?", "a": "Detailed answer 4"}
  ]` : '[]'},
  "trust_badges": ${p.includeTrust ? `["Secure Checkout", "Money Back Guarantee", "Fast Shipping", "24/7 Support"]` : '[]'},
  "scarcity": ${p.includeScarcity ? `{"headline": "Scarcity headline", "subtext": "scarcity subtext"}` : 'null'},
  "seo": ${p.includeSeo ? `{
    "meta_title": "SEO meta title (50-60 chars)",
    "meta_description": "SEO meta description (150-160 chars)",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
  }` : 'null'},
  "upsell": {
    "headline": "Upsell section headline",
    "desc": "Upsell description"
  },
  "footer_cta": {
    "headline": "Final CTA headline",
    "subtext": "Final CTA subtext",
    "button": "Final CTA button text"
  }
}`;
}

/**
 * Generates the complete HTML landing page from AI copy data
 */
function buildLandingPageHTML(copyData, params) {
  const { targetLanguage, productName, productPrice } = params;
  const isRTL = targetLanguage === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  const h = copyData.hero || {};
  const offer = copyData.offer || {};
  const scarcity = copyData.scarcity;
  const social = copyData.social_proof || {};
  const seo = copyData.seo || {};

  const trustBadges = (copyData.trust_badges || []).map(badge => `
    <div class="lp-badge"><i class="fas fa-shield-check"></i> ${badge}</div>
  `).join('');

  const benefits = (copyData.benefits || []).map(b => `
    <div class="lp-benefit">
      <div class="lp-benefit-icon"><i class="fas ${b.icon}"></i></div>
      <div>
        <h4>${b.title}</h4>
        <p>${b.desc}</p>
      </div>
    </div>
  `).join('');

  const testimonials = (copyData.testimonials || []).map(t => `
    <div class="lp-testimonial">
      <div class="lp-stars">${'★'.repeat(t.stars)}</div>
      <p>"${t.text}"</p>
      <div class="lp-author">
        <div class="lp-avatar">${t.avatar || t.name.substring(0,2)}</div>
        <span>${t.name}</span>
      </div>
    </div>
  `).join('');

  const faqs = (copyData.faq || []).map((f, i) => `
    <div class="lp-faq-item">
      <button class="lp-faq-q" onclick="this.parentElement.classList.toggle('open')">
        ${f.q} <i class="fas fa-chevron-down"></i>
      </button>
      <div class="lp-faq-a">${f.a}</div>
    </div>
  `).join('');

  const scarcityBlock = scarcity ? `
    <div class="lp-scarcity">
      <div class="lp-scarcity-inner">
        <i class="fas fa-fire"></i>
        <div>
          <strong>${scarcity.headline}</strong>
          <span>${scarcity.subtext}</span>
        </div>
        <div class="lp-countdown" id="lpCountdown">23:47:12</div>
      </div>
    </div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="${targetLanguage}" dir="${dir}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${seo.meta_title || productName}</title>
${seo.meta_description ? `<meta name="description" content="${seo.meta_description}"/>` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#0a0a14;color:#f1f5f9;line-height:1.6}
.lp-nav{background:rgba(10,10,20,0.95);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(255,255,255,0.07)}
.lp-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem}
.lp-hero{padding:5rem 2rem;text-align:center;background:linear-gradient(135deg,#0a0a14,#1a0a2e);position:relative;overflow:hidden}
.lp-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.2),transparent 70%)}
.lp-hero h1{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:800;line-height:1.1;margin-bottom:1.5rem;position:relative;z-index:1}
.lp-hero h1 span{background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.lp-hero p{font-size:1.15rem;color:#94a3b8;max-width:600px;margin:0 auto 2rem;position:relative;z-index:1}
.lp-cta-btn{display:inline-flex;align-items:center;gap:0.6rem;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;padding:1.1rem 2.5rem;border-radius:12px;font-size:1.1rem;font-weight:700;cursor:pointer;border:none;box-shadow:0 8px 28px rgba(124,58,237,0.4);transition:all 0.2s;text-decoration:none;font-family:'DM Sans',sans-serif}
.lp-cta-btn:hover{transform:translateY(-3px);filter:brightness(1.1)}
.lp-cta-btn-secondary{display:inline-flex;align-items:center;gap:0.5rem;color:#94a3b8;font-size:0.9rem;margin-top:1rem;cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}
.lp-trust-badges{display:flex;flex-wrap:wrap;justify-content:center;gap:0.75rem;margin-top:2.5rem;position:relative;z-index:1}
.lp-badge{display:flex;align-items:center;gap:0.4rem;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:0.4rem 1rem;font-size:0.82rem;color:#94a3b8}
.lp-badge i{color:#10b981}
.lp-social-proof{background:#131826;padding:2rem;text-align:center;border-top:1px solid rgba(255,255,255,0.07)}
.lp-social-proof .num{font-family:'Syne',sans-serif;font-size:2.5rem;font-weight:800;background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.lp-social-proof .label{color:#64748b;font-size:0.9rem}
.lp-section{padding:4rem 2rem;max-width:960px;margin:0 auto}
.lp-section h2{font-family:'Syne',sans-serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;text-align:center;margin-bottom:2.5rem}
.lp-benefits-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem}
.lp-benefit{background:#131826;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:1.5rem;display:flex;gap:1rem;transition:transform 0.2s}
.lp-benefit:hover{transform:translateY(-3px)}
.lp-benefit-icon{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.2));display:flex;align-items:center;justify-content:center;color:#7c3aed;font-size:1.2rem;flex-shrink:0}
.lp-benefit h4{font-weight:700;margin-bottom:0.35rem;font-size:0.95rem}
.lp-benefit p{font-size:0.85rem;color:#64748b;line-height:1.6}
.lp-offer{background:linear-gradient(135deg,#1a0a2e,#0a1a2e);border:2px solid rgba(124,58,237,0.4);border-radius:20px;padding:3rem 2rem;text-align:center;max-width:600px;margin:0 auto}
.lp-offer h2{font-family:'Syne',sans-serif;font-size:2rem;margin-bottom:1.5rem}
.lp-price-wrap{margin-bottom:1.5rem}
.lp-original-price{text-decoration:line-through;color:#64748b;font-size:1.2rem;margin-bottom:0.25rem}
.lp-sale-price{font-family:'Syne',sans-serif;font-size:3.5rem;font-weight:800;color:#10b981}
.lp-savings{background:rgba(16,185,129,0.1);color:#10b981;display:inline-block;padding:0.25rem 0.75rem;border-radius:999px;font-size:0.85rem;font-weight:600;margin-top:0.5rem}
.lp-urgency{color:#f59e0b;font-size:0.9rem;margin:1rem 0;display:flex;align-items:center;justify-content:center;gap:0.4rem}
.lp-guarantee{color:#94a3b8;font-size:0.85rem;margin-top:1rem;display:flex;align-items:center;justify-content:center;gap:0.4rem}
.lp-scarcity{background:linear-gradient(135deg,#7c1a1a,#1a0000);padding:1rem 2rem;text-align:center}
.lp-scarcity-inner{display:flex;align-items:center;justify-content:center;gap:1.25rem;flex-wrap:wrap}
.lp-scarcity i{color:#ef4444;font-size:1.4rem}
.lp-scarcity strong{display:block;font-weight:700;font-size:0.95rem}
.lp-scarcity span{color:#fca5a5;font-size:0.82rem}
.lp-countdown{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:#ef4444;background:rgba(239,68,68,0.1);padding:0.35rem 0.85rem;border-radius:8px}
.lp-testimonials-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem}
.lp-testimonial{background:#131826;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:1.5rem}
.lp-stars{color:#f59e0b;font-size:0.95rem;margin-bottom:0.75rem}
.lp-testimonial p{font-size:0.88rem;color:#94a3b8;font-style:italic;margin-bottom:1rem;line-height:1.7}
.lp-author{display:flex;align-items:center;gap:0.6rem}
.lp-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#fff;flex-shrink:0}
.lp-author span{font-size:0.82rem;color:#64748b}
.lp-faq-list{display:flex;flex-direction:column;gap:0.75rem}
.lp-faq-item{background:#131826;border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden}
.lp-faq-item.open{border-color:rgba(124,58,237,0.4)}
.lp-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;text-align:left;font-weight:600;font-size:0.92rem;color:#f1f5f9;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background 0.2s}
.lp-faq-q:hover{background:rgba(255,255,255,0.03)}
.lp-faq-q i{transition:transform 0.2s;color:#64748b;flex-shrink:0}
.lp-faq-item.open .lp-faq-q i{transform:rotate(180deg);color:#7c3aed}
.lp-faq-a{max-height:0;overflow:hidden;padding:0 1.25rem;transition:max-height 0.3s ease,padding 0.3s;font-size:0.88rem;color:#94a3b8;line-height:1.7}
.lp-faq-item.open .lp-faq-a{max-height:200px;padding:0.5rem 1.25rem 1.25rem}
.lp-footer-cta{background:linear-gradient(135deg,#0a0a14,#1a0a2e);border-top:1px solid rgba(124,58,237,0.3);padding:4rem 2rem;text-align:center}
.lp-footer-cta h2{font-family:'Syne',sans-serif;font-size:2rem;margin-bottom:0.75rem}
.lp-footer-cta p{color:#94a3b8;margin-bottom:2rem}
.lp-footer{background:#080b12;padding:2rem;text-align:center;border-top:1px solid rgba(255,255,255,0.05);color:#475569;font-size:0.82rem}
.lp-upsell{background:#131826;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:2rem;text-align:center;max-width:600px;margin:0 auto}
.lp-upsell h3{font-family:'Syne',sans-serif;font-size:1.3rem;margin-bottom:0.75rem}
.lp-upsell p{font-size:0.9rem;color:#94a3b8;margin-bottom:1.5rem}
@media(max-width:600px){.lp-hero h1{font-size:1.9rem}.lp-sale-price{font-size:2.5rem}.lp-section{padding:3rem 1.25rem}}
</style>
</head>
<body>
<nav class="lp-nav">
  <div class="lp-logo">${productName || 'Product'}</div>
  <a href="#offer" class="lp-cta-btn" style="padding:0.6rem 1.5rem;font-size:0.9rem">${h.cta_primary || 'Order Now'}</a>
</nav>

${scarcityBlock}

<section class="lp-hero">
  <h1>${h.headline || productName}</h1>
  <p>${h.subheadline || h.body}</p>
  <div style="margin-top:2rem">
    <a href="#offer" class="lp-cta-btn">
      <i class="fas fa-shopping-cart"></i>
      ${h.cta_primary || 'Order Now'}
    </a>
    ${h.cta_secondary ? `<br/><button class="lp-cta-btn-secondary"><i class="fas fa-play-circle"></i> ${h.cta_secondary}</button>` : ''}
  </div>
  ${trustBadges ? `<div class="lp-trust-badges">${trustBadges}</div>` : ''}
</section>

${social.count ? `
<div class="lp-social-proof">
  <div class="num">${social.count}</div>
  <div class="label">${social.label}</div>
</div>` : ''}

${benefits ? `
<div class="lp-section">
  <h2>${h.subheadline || 'Why Choose ' + (productName || 'Us')}</h2>
  <div class="lp-benefits-grid">${benefits}</div>
</div>` : ''}

<div class="lp-section" id="offer">
  <div class="lp-offer">
    <h2>${offer.headline || 'Special Offer'}</h2>
    <div class="lp-price-wrap">
      ${offer.original_price ? `<div class="lp-original-price">${offer.original_price}</div>` : ''}
      <div class="lp-sale-price">${offer.sale_price || productPrice || ''}</div>
      ${offer.savings ? `<div class="lp-savings">You Save ${offer.savings}</div>` : ''}
    </div>
    ${offer.urgency ? `<div class="lp-urgency"><i class="fas fa-fire"></i> ${offer.urgency}</div>` : ''}
    <a href="#" class="lp-cta-btn" style="margin:1rem 0;font-size:1.15rem;padding:1.2rem 3rem">
      <i class="fas fa-lock"></i>
      ${h.cta_primary || 'Order Now'}
    </a>
    ${offer.guarantee ? `<div class="lp-guarantee"><i class="fas fa-shield-check"></i> ${offer.guarantee}</div>` : ''}
  </div>
</div>

${testimonials ? `
<div class="lp-section">
  <h2>What Our Customers Say</h2>
  <div class="lp-testimonials-grid">${testimonials}</div>
</div>` : ''}

${copyData.upsell ? `
<div class="lp-section">
  <div class="lp-upsell">
    <h3>${copyData.upsell.headline}</h3>
    <p>${copyData.upsell.desc}</p>
    <a href="#" class="lp-cta-btn" style="font-size:0.9rem;padding:0.75rem 2rem">Add to Order</a>
  </div>
</div>` : ''}

${faqs ? `
<div class="lp-section">
  <h2>Frequently Asked Questions</h2>
  <div class="lp-faq-list">${faqs}</div>
</div>` : ''}

<div class="lp-footer-cta">
  <h2>${copyData.footer_cta?.headline || 'Ready to Get Started?'}</h2>
  <p>${copyData.footer_cta?.subtext || ''}</p>
  <a href="#offer" class="lp-cta-btn">
    <i class="fas fa-shopping-cart"></i>
    ${copyData.footer_cta?.button || h.cta_primary || 'Order Now'}
  </a>
</div>

<footer class="lp-footer">
  <p>© 2025 ${productName || 'Product'} · All rights reserved · Built with <a href="https://ibux.xyz" style="color:#7c3aed;text-decoration:none">iBux</a></p>
  ${seo.keywords ? `<!-- SEO Keywords: ${seo.keywords.join(', ')} -->` : ''}
</footer>

<script>
// Countdown timer
(function(){
  const el = document.getElementById('lpCountdown');
  if(!el) return;
  let t = 23*3600 + 47*60 + 12;
  setInterval(()=>{
    t = Math.max(0,t-1);
    const h = String(Math.floor(t/3600)).padStart(2,'0');
    const m = String(Math.floor((t%3600)/60)).padStart(2,'0');
    const s = String(t%60).padStart(2,'0');
    el.textContent = h+':'+m+':'+s;
  },1000);
})();
</script>
</body>
</html>`;
}

/**
 * Generate SEO meta tags string from copy data
 */
function generateMetaTags(seoData, productName) {
  if (!seoData) return '';
  return `
<!-- SEO Meta Tags -->
<meta name="description" content="${seoData.meta_description || ''}">
<meta name="keywords" content="${(seoData.keywords || []).join(', ')}">
<meta property="og:title" content="${seoData.meta_title || productName}">
<meta property="og:description" content="${seoData.meta_description || ''}">
<title>${seoData.meta_title || productName}</title>`;
}
