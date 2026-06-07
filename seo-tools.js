/* ═══════════════════════════════════════════════════════════════
   iBux — seo-tools.js | SEO Toolkit
   ═══════════════════════════════════════════════════════════════ */

const SEO_KEYWORDS_DB = {
  health:    ['weight loss supplement', 'fat burner', 'natural weight loss', 'metabolism booster', 'keto supplement', 'diet pills', 'belly fat burner', 'weight management'],
  beauty:    ['anti-aging cream', 'skin whitening', 'moisturizer', 'collagen supplement', 'retinol cream', 'skincare routine', 'natural skincare', 'glow serum'],
  fashion:   ['trendy clothes', 'women fashion', 'streetwear', 'summer collection', 'fashion online', 'affordable fashion', 'luxury brand', 'limited edition'],
  electronics:['wireless earbuds', 'smart gadget', 'bluetooth speaker', 'portable charger', 'tech accessories', 'smart home device', 'gaming gear', 'phone accessories'],
  home:      ['home decor', 'interior design', 'furniture online', 'home accessories', 'bedroom decor', 'kitchen gadgets', 'garden tools', 'smart home'],
  automotive:['car accessories', 'auto parts', 'car gadgets', 'vehicle accessories', 'car care products', 'dashboard camera', 'car phone mount', 'auto upgrade'],
  education: ['online course', 'learn online', 'digital course', 'e-learning', 'certification course', 'skill development', 'professional training', 'masterclass'],
  saas:      ['software as a service', 'business software', 'productivity tool', 'project management', 'CRM software', 'marketing automation', 'SaaS platform', 'business app'],
  finance:   ['investment platform', 'passive income', 'crypto trading', 'financial freedom', 'stock trading', 'forex trading', 'wealth building', 'online investing'],
  general:   ['online shopping', 'best deals', 'buy online', 'discount offer', 'free shipping', 'quality products', 'trusted seller', 'fast delivery']
};

/**
 * Generate SEO meta title
 */
function generateMetaTitle(productName, category, language = 'en') {
  const templates = {
    en: [
      `${productName} — Official Site | Buy Now & Save`,
      `Best ${productName} | #1 Rated by Customers`,
      `${productName} — Limited Time Offer | Free Shipping`,
      `Buy ${productName} Online | Best Price Guaranteed`
    ],
    ar: [
      `${productName} — الموقع الرسمي | اشترِ الآن ووفّر`,
      `أفضل ${productName} | الأكثر تقييماً من العملاء`,
      `${productName} — عرض لفترة محدودة | شحن مجاني`
    ],
    fr: [
      `${productName} — Site Officiel | Achetez maintenant`,
      `Meilleur ${productName} | #1 Noté par les clients`,
      `${productName} — Offre limitée | Livraison gratuite`
    ],
    es: [
      `${productName} — Sitio Oficial | Compra ahora y ahorra`,
      `Mejor ${productName} | #1 Valorado por clientes`,
      `${productName} — Oferta limitada | Envío gratis`
    ],
    de: [
      `${productName} — Offizielle Website | Jetzt kaufen`,
      `Bestes ${productName} | Von Kunden empfohlen`,
      `${productName} — Zeitlich begrenztes Angebot`
    ],
    pt: [
      `${productName} — Site Oficial | Compre agora e economize`,
      `Melhor ${productName} | #1 Avaliado pelos clientes`,
      `${productName} — Oferta limitada | Frete grátis`
    ],
    it: [
      `${productName} — Sito Ufficiale | Acquista ora e risparmia`,
      `Miglior ${productName} | #1 Valutato dai clienti`,
      `${productName} — Offerta limitata | Spedizione gratuita`
    ]
  };

  const langTemplates = templates[language] || templates.en;
  const title = langTemplates[Math.floor(Math.random() * langTemplates.length)];
  return title.length > 60 ? title.substring(0, 57) + '...' : title;
}

/**
 * Generate SEO meta description
 */
function generateMetaDescription(productName, benefits, language = 'en') {
  const benefitText = benefits ? benefits.split('\n').slice(0, 2).join('. ') : '';

  const templates = {
    en: `${productName} — ${benefitText || 'Premium quality product'}. Trusted by 10,000+ customers worldwide. Free shipping on orders $50+. 30-day money back guarantee. Order now!`,
    ar: `${productName} — ${benefitText || 'منتج عالي الجودة'}. موثوق به من أكثر من 10,000 عميل حول العالم. شحن مجاني للطلبات فوق 50 دولار. ضمان استرداد المال 30 يوماً.`,
    fr: `${productName} — ${benefitText || 'Produit de qualité premium'}. Approuvé par 10 000+ clients dans le monde. Livraison gratuite dès 50€. Garantie 30 jours satisfait ou remboursé.`,
    es: `${productName} — ${benefitText || 'Producto de calidad premium'}. Avalado por 10,000+ clientes en todo el mundo. Envío gratis en pedidos +$50. Garantía de devolución 30 días.`,
    de: `${productName} — ${benefitText || 'Premium-Qualitätsprodukt'}. Von 10.000+ Kunden weltweit vertraut. Kostenloser Versand ab 50€. 30-Tage-Geld-zurück-Garantie.`,
    pt: `${productName} — ${benefitText || 'Produto de qualidade premium'}. Confiado por 10.000+ clientes no mundo. Frete grátis em pedidos $50+. Garantia de 30 dias.`,
    it: `${productName} — ${benefitText || 'Prodotto di qualità premium'}. Affidato da 10.000+ clienti nel mondo. Spedizione gratuita per ordini $50+. Garanzia 30 giorni.`
  };

  const desc = templates[language] || templates.en;
  return desc.length > 160 ? desc.substring(0, 157) + '...' : desc;
}

/**
 * Get keyword suggestions for category
 */
function getKeywordSuggestions(category, productName) {
  const baseKeywords = SEO_KEYWORDS_DB[category] || SEO_KEYWORDS_DB.general;
  const productKeywords = [
    `${productName} buy online`,
    `${productName} review`,
    `${productName} price`,
    `best ${productName}`,
    `${productName} discount`
  ];
  return [...productKeywords.slice(0, 3), ...baseKeywords.slice(0, 5)];
}

/**
 * Calculate SEO score for a page
 */
function calculatePageSEOScore(data) {
  let score = 0;
  const checks = [];

  // Title
  if (data.metaTitle) {
    const len = data.metaTitle.length;
    if (len >= 40 && len <= 60) { score += 20; checks.push({ pass: true, label: 'Meta title length optimal' }); }
    else { score += 8; checks.push({ pass: false, label: `Meta title: ${len} chars (40-60 recommended)` }); }
  } else checks.push({ pass: false, label: 'Missing meta title' });

  // Description
  if (data.metaDescription) {
    const len = data.metaDescription.length;
    if (len >= 130 && len <= 160) { score += 20; checks.push({ pass: true, label: 'Meta description length optimal' }); }
    else { score += 8; checks.push({ pass: false, label: `Meta description: ${len} chars (130-160 recommended)` }); }
  } else checks.push({ pass: false, label: 'Missing meta description' });

  // Keywords
  if (data.keywords?.length >= 5) { score += 15; checks.push({ pass: true, label: 'Keywords defined' }); }
  else checks.push({ pass: false, label: 'Add more target keywords' });

  // Headline
  if (data.headline) { score += 10; checks.push({ pass: true, label: 'H1 headline present' }); }
  else checks.push({ pass: false, label: 'Missing H1 headline' });

  // Content
  if (data.benefits?.length >= 3) { score += 15; checks.push({ pass: true, label: 'Benefits content present' }); }
  else checks.push({ pass: false, label: 'Add more benefit content' });

  // Testimonials
  if (data.testimonials?.length >= 2) { score += 10; checks.push({ pass: true, label: 'Social proof present' }); }
  else checks.push({ pass: false, label: 'Add testimonials for trust' });

  // FAQ
  if (data.faq?.length >= 3) { score += 10; checks.push({ pass: true, label: 'FAQ section present' }); }
  else checks.push({ pass: false, label: 'Add FAQ for long-tail keywords' });

  return { score: Math.min(score, 100), checks };
}

/**
 * Generate structured data JSON-LD
 */
function generateStructuredData(productName, price, description, category) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": description || `${productName} — Premium quality product`,
    "category": category,
    "offers": {
      "@type": "Offer",
      "price": price ? price.replace(/[^0-9.]/g, '') : "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": productName }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1247",
      "bestRating": "5"
    }
  }, null, 2);
}

/**
 * Generate sitemap XML
 */
function generateSitemapXML(domain, pages = []) {
  const today = new Date().toISOString().split('T')[0];
  const defaultPages = [
    { url: '/', priority: '1.0', freq: 'weekly' },
    { url: '/features', priority: '0.8', freq: 'monthly' },
    { url: '/pricing', priority: '0.9', freq: 'weekly' },
    { url: '/templates', priority: '0.8', freq: 'weekly' },
    { url: '/blog', priority: '0.7', freq: 'daily' },
    ...pages
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${defaultPages.map(p => `  <url>
    <loc>https://${domain}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}
