/* ═══════════════════════════════════════════════════════════════
   iBux — landing-builder.js | Builder Orchestrator
   ═══════════════════════════════════════════════════════════════ */

let builderState = {
  currentStep: 1,
  generatedHTML: null,
  copyData: null,
  seoScore: 0,
  previewMode: 'desktop',
  options: { seo: true, trust: true, scarcity: false, faq: true, testimonials: true }
};

/* ── Step Navigation ── */
function nextStep(step) {
  const current = builderState.currentStep;

  // Validate step 1
  if (step === 2 && current === 1) {
    const name = document.getElementById('productName')?.value.trim();
    if (!name) {
      highlightField('productName', 'Please enter your product name');
      return;
    }
  }

  // Validate step 2
  if (step === 3 && current === 2) {
    const selectedType = document.querySelector('input[name="pageType"]:checked');
    if (!selectedType) {
      showToast('Please select a page type', 'warning');
      return;
    }
  }

  builderState.currentStep = step;

  // Update UI
  document.querySelectorAll('.builder-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.step').forEach((s, i) => {
    s.classList.remove('active', 'completed');
    if (i + 1 < step) s.classList.add('completed');
    if (i + 1 === step) s.classList.add('active');
  });

  const stepEl = document.getElementById(`step${step}`);
  if (stepEl) stepEl.classList.add('active');
}

function highlightField(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = '#ef4444';
  el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.2)';
  el.focus();
  showToast(message, 'error');
  setTimeout(() => {
    el.style.borderColor = '';
    el.style.boxShadow = '';
  }, 3000);
}

/* ── Toggle Options ── */
function toggleOption(key) {
  builderState.options[key] = !builderState.options[key];
  const el = document.getElementById(`toggle${key.charAt(0).toUpperCase() + key.slice(1)}`);
  if (el) el.classList.toggle('active', builderState.options[key]);
}

/* ── Main Generate Function ── */
async function generateLandingPage() {
  const btn = document.getElementById('generateBtn');
  if (!btn) return;

  // Gather parameters
  const params = gatherParams();

  // UI: loading state
  setGeneratingState(true);
  updateGenerationProgress('Analyzing your product...', 10);

  try {
    // Step 1: Generate AI copy
    updateGenerationProgress('Writing AI copy...', 30);
    const copyData = await generateAICopy(params);
    builderState.copyData = copyData;

    // Step 2: Build HTML
    updateGenerationProgress('Building landing page...', 60);
    await sleep(400);
    const html = buildLandingPageHTML(copyData, params);
    builderState.generatedHTML = html;

    // Step 3: SEO Analysis
    updateGenerationProgress('Running SEO analysis...', 80);
    await sleep(300);
    const seoScore = calculateSEOScore(copyData, params);
    builderState.seoScore = seoScore;

    // Step 4: Render preview
    updateGenerationProgress('Rendering preview...', 95);
    await sleep(200);
    renderPreview(html);
    renderSEOPanel(copyData, seoScore);

    // Enable download/copy buttons
    document.getElementById('copyBtn')?.removeAttribute('disabled');
    document.getElementById('downloadBtn')?.removeAttribute('disabled');

    updateGenerationProgress('Done!', 100);
    showToast('🎉 Landing page generated successfully!');

  } catch (err) {
    console.error('Generation error:', err);

    // Fallback: generate demo page on API error
    const fallbackHTML = buildFallbackPage(params);
    builderState.generatedHTML = fallbackHTML;
    renderPreview(fallbackHTML);

    document.getElementById('copyBtn')?.removeAttribute('disabled');
    document.getElementById('downloadBtn')?.removeAttribute('disabled');

    showToast('Demo page generated! Connect your API key for full AI power.', 'info');
  } finally {
    setGeneratingState(false);
  }
}

function gatherParams() {
  return {
    productName: document.getElementById('productName')?.value.trim() || 'Your Product',
    productCategory: document.getElementById('productCategory')?.value || 'general',
    productBenefits: document.getElementById('productBenefits')?.value.trim() || '',
    productPrice: document.getElementById('productPrice')?.value.trim() || '',
    targetLanguage: document.getElementById('targetLanguage')?.value || 'en',
    pageType: document.querySelector('input[name="pageType"]:checked')?.value || 'product',
    platform: document.querySelector('input[name="platform"]:checked')?.value || 'shopify',
    additionalInstructions: document.getElementById('additionalInstructions')?.value.trim() || '',
    includeSeo: builderState.options.seo,
    includeTrust: builderState.options.trust,
    includeScarcity: builderState.options.scarcity,
    includeFaq: builderState.options.faq,
    includeTestimonials: builderState.options.testimonials
  };
}

function setGeneratingState(loading) {
  const btn = document.getElementById('generateBtn');
  if (!btn) return;
  if (loading) {
    btn.innerHTML = '<i class="fas fa-spinner"></i> <span>Generating...</span>';
    btn.disabled = true;
    btn.classList.add('loading');
  } else {
    btn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> <span>Generate with AI</span>';
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

function updateGenerationProgress(message, percent) {
  // Show progress in placeholder
  const placeholder = document.getElementById('previewPlaceholder');
  if (placeholder && placeholder.style.display !== 'none') {
    placeholder.innerHTML = `
      <div class="placeholder-icon">⚡</div>
      <p style="font-weight:600">${message}</p>
      <div style="width:200px;height:4px;background:var(--border);border-radius:2px;margin:1rem 0;overflow:hidden">
        <div style="height:100%;background:linear-gradient(90deg,#7c3aed,#06b6d4);border-radius:2px;width:${percent}%;transition:width 0.4s ease"></div>
      </div>
      <p class="placeholder-sub">${percent}% complete</p>
    `;
  }
}

function renderPreview(html) {
  const placeholder = document.getElementById('previewPlaceholder');
  const frameWrap = document.getElementById('previewFrameWrap');
  const frame = document.getElementById('previewFrame');

  if (placeholder) placeholder.style.display = 'none';
  if (frameWrap) frameWrap.style.display = 'block';

  if (frame) {
    const doc = frame.contentDocument || frame.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }
}

function renderSEOPanel(copyData, score) {
  const panel = document.getElementById('seoPanel');
  if (!panel) return;
  panel.style.display = 'block';

  // Animate score ring
  setTimeout(() => {
    const fill = document.getElementById('seoScoreFill');
    const text = document.getElementById('seoScoreText');
    if (fill) fill.setAttribute('stroke-dasharray', `${score}, 100`);
    if (text) text.textContent = score;

    // Color by score
    const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
    if (fill) fill.style.stroke = color;
  }, 100);

  const seoData = copyData.seo;
  const detailsEl = document.getElementById('seoDetails');
  if (!detailsEl) return;

  detailsEl.innerHTML = seoData ? `
    <div style="font-size:0.78rem;color:var(--text-2);display:flex;flex-direction:column;gap:0.4rem">
      <div><strong>Title:</strong> ${seoData.meta_title || 'Generated'}</div>
      <div><strong>Keywords:</strong> ${(seoData.keywords || []).slice(0,3).join(', ')}</div>
      <div style="color:${score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'};font-weight:600;margin-top:0.25rem">
        ${score >= 80 ? '✅ Excellent SEO' : score >= 60 ? '⚠️ Good SEO' : '❌ Needs improvement'}
      </div>
    </div>
  ` : '<p style="font-size:0.78rem;color:var(--text-3)">Enable SEO to see analysis</p>';
}

/* ── Preview Mode Switch ── */
function switchPreview(mode) {
  builderState.previewMode = mode;
  document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
  event.target.closest('.preview-tab').classList.add('active');

  const frame = document.getElementById('previewFrame');
  const wrap = document.getElementById('previewFrameWrap');
  if (!frame || !wrap) return;

  if (mode === 'mobile') {
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'center';
    wrap.style.background = 'var(--bg-3)';
    wrap.style.padding = '1rem';
    frame.style.width = '375px';
    frame.style.border = '8px solid var(--bg)';
    frame.style.borderRadius = '20px';
    frame.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
  } else {
    wrap.style = '';
    frame.style.width = '100%';
    frame.style.border = 'none';
    frame.style.borderRadius = '0';
    frame.style.boxShadow = 'none';
  }
}

/* ── Copy & Download ── */
function copyCode() {
  if (!builderState.generatedHTML) return;
  try {
    navigator.clipboard.writeText(builderState.generatedHTML);
    showToast('HTML copied to clipboard!');
  } catch (e) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = builderState.generatedHTML;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('HTML copied to clipboard!');
  }
}

function downloadPage() {
  if (!builderState.generatedHTML) return;
  const params = gatherParams();
  const filename = (params.productName || 'landing-page').toLowerCase().replace(/\s+/g, '-') + '.html';
  const blob = new Blob([builderState.generatedHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Downloaded: ${filename}`);
}

/* ── SEO Score Calculator ── */
function calculateSEOScore(copyData, params) {
  let score = 0;
  const seo = copyData.seo;

  if (seo) {
    if (seo.meta_title && seo.meta_title.length >= 40 && seo.meta_title.length <= 60) score += 20;
    else if (seo.meta_title) score += 10;

    if (seo.meta_description && seo.meta_description.length >= 130 && seo.meta_description.length <= 160) score += 20;
    else if (seo.meta_description) score += 10;

    if (seo.keywords && seo.keywords.length >= 4) score += 15;
  }

  if (copyData.hero?.headline) score += 10;
  if (copyData.benefits?.length >= 3) score += 10;
  if (copyData.testimonials?.length >= 2) score += 10;
  if (copyData.faq?.length >= 3) score += 10;
  if (params.productName) score += 5;

  return Math.min(score, 100);
}

/* ── Fallback Demo Page ── */
function buildFallbackPage(params) {
  const { productName, productPrice, targetLanguage } = params;
  const isRTL = targetLanguage === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  const demoTexts = {
    en: { h: `${productName} — Transform Your Life Today`, sub: 'Join 10,000+ satisfied customers who already made the switch', cta: 'Order Now — Limited Stock!', feat: 'Key Features', price: 'Special Offer' },
    ar: { h: `${productName} — غيّر حياتك اليوم`, sub: 'انضم إلى أكثر من 10,000 عميل راضٍ', cta: 'اطلب الآن — كميات محدودة!', feat: 'المميزات الرئيسية', price: 'عرض خاص' },
    fr: { h: `${productName} — Transformez votre vie aujourd'hui`, sub: 'Rejoignez 10 000+ clients satisfaits', cta: 'Commander maintenant!', feat: 'Caractéristiques clés', price: 'Offre spéciale' },
    es: { h: `${productName} — Transforma tu vida hoy`, sub: 'Únete a 10,000+ clientes satisfechos', cta: '¡Ordenar ahora!', feat: 'Características clave', price: 'Oferta especial' },
    de: { h: `${productName} — Verwandeln Sie Ihr Leben heute`, sub: 'Schließen Sie sich 10.000+ zufriedenen Kunden an', cta: 'Jetzt bestellen!', feat: 'Hauptmerkmale', price: 'Sonderangebot' },
    pt: { h: `${productName} — Transforme sua vida hoje`, sub: 'Junte-se a 10.000+ clientes satisfeitos', cta: 'Peça agora!', feat: 'Recursos principais', price: 'Oferta especial' },
    it: { h: `${productName} — Trasforma la tua vita oggi`, sub: 'Unisciti a 10.000+ clienti soddisfatti', cta: 'Ordina ora!', feat: 'Caratteristiche principali', price: 'Offerta speciale' }
  };

  const t = demoTexts[targetLanguage] || demoTexts.en;

  return `<!DOCTYPE html>
<html lang="${targetLanguage}" dir="${dir}">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${t.h}</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:#0a0a14;color:#f1f5f9}
.hero{min-height:100vh;background:linear-gradient(135deg,#0a0a14,#1a0a2e);display:flex;align-items:center;justify-content:center;text-align:center;padding:3rem 2rem;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.25),transparent 70%)}
.hero-content{position:relative;z-index:1;max-width:700px}
h1{font-family:'Syne',sans-serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:800;line-height:1.1;margin-bottom:1.5rem}
h1 span{background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sub{font-size:1.1rem;color:#94a3b8;margin-bottom:2.5rem}
.cta{display:inline-flex;align-items:center;gap:0.6rem;background:linear-gradient(135deg,#7c3aed,#5b21b6);color:#fff;padding:1.1rem 2.5rem;border-radius:12px;font-size:1.1rem;font-weight:700;cursor:pointer;border:none;box-shadow:0 8px 28px rgba(124,58,237,0.4);font-family:'DM Sans',sans-serif}
.badges{display:flex;flex-wrap:wrap;justify-content:center;gap:0.6rem;margin-top:2rem}
.badge{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:999px;padding:0.35rem 0.85rem;font-size:0.8rem;color:#94a3b8;display:flex;align-items:center;gap:0.35rem}
.badge i{color:#10b981}
.features{padding:4rem 2rem;background:#0e1220;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem;max-width:960px;margin:0 auto}
.feat{background:#131826;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:1.5rem;text-align:center}
.feat-icon{font-size:2rem;margin-bottom:0.75rem}
.feat h3{font-family:'Syne',sans-serif;font-size:1rem;margin-bottom:0.4rem}
.feat p{font-size:0.85rem;color:#64748b}
.offer{padding:4rem 2rem;text-align:center;background:linear-gradient(135deg,#1a0a2e,#0a1a2e)}
.offer h2{font-family:'Syne',sans-serif;font-size:2rem;margin-bottom:1rem}
.price{font-family:'Syne',sans-serif;font-size:3rem;font-weight:800;color:#10b981;margin:1rem 0}
footer{background:#080b12;padding:2rem;text-align:center;color:#475569;font-size:0.82rem;border-top:1px solid rgba(255,255,255,0.05)}
footer a{color:#7c3aed}
</style>
</head>
<body>
<div class="hero">
  <div class="hero-content">
    <h1>${t.h.replace(productName, `<span>${productName}</span>`)}</h1>
    <p class="sub">${t.sub}</p>
    <button class="cta"><i class="fas fa-shopping-cart"></i>${t.cta}</button>
    <div class="badges">
      <span class="badge"><i class="fas fa-shield-alt"></i> Secure Checkout</span>
      <span class="badge"><i class="fas fa-undo"></i> Money Back Guarantee</span>
      <span class="badge"><i class="fas fa-shipping-fast"></i> Fast Shipping</span>
    </div>
  </div>
</div>
<div style="background:#0e1220;padding:4rem 2rem">
  <div class="features">
    <div class="feat"><div class="feat-icon">⚡</div><h3>Instant Results</h3><p>See results from day one with our proven formula</p></div>
    <div class="feat"><div class="feat-icon">🛡️</div><h3>100% Safe</h3><p>Clinically tested and doctor approved ingredients</p></div>
    <div class="feat"><div class="feat-icon">⭐</div><h3>Premium Quality</h3><p>Made in FDA-approved facility with GMP certification</p></div>
    <div class="feat"><div class="feat-icon">💰</div><h3>Best Value</h3><p>Premium quality at an unbeatable price point</p></div>
  </div>
</div>
<div class="offer">
  <h2>${t.price}</h2>
  <div class="price">${productPrice || '$49.99'}</div>
  <button class="cta"><i class="fas fa-lock"></i> ${t.cta}</button>
</div>
<footer>
  <p>© 2025 ${productName} · Built with <a href="https://ibux.xyz">iBux AI</a> · Add your API key for full AI-generated copy</p>
</footer>
</body>
</html>`;
}

/* ── Utility ── */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
