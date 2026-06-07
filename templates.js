/* ═══════════════════════════════════════════════════════════════
   iBux — templates.js | Template Marketplace
   ═══════════════════════════════════════════════════════════════ */

const TEMPLATES = [
  {
    id: 'tpl-001',
    name: 'FlashSale Fashion Drop',
    category: 'fashion',
    categoryLabel: 'Fashion',
    description: 'Urgency-driven sales page for fashion collections with countdown timer and gallery.',
    conversionRate: '4.8%',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
    accent: '#e94560',
    tags: ['Urgency', 'Gallery', 'Countdown'],
    uses: 2341
  },
  {
    id: 'tpl-002',
    name: 'Glow Beauty Product',
    category: 'beauty',
    categoryLabel: 'Beauty',
    description: 'Elegant beauty product page with before/after section and ingredient highlights.',
    conversionRate: '5.2%',
    gradient: 'linear-gradient(135deg, #2d1b4e 0%, #f48fb1 100%)',
    accent: '#f48fb1',
    tags: ['Before/After', 'Ingredients', 'Luxury'],
    uses: 3102
  },
  {
    id: 'tpl-003',
    name: 'TechLaunch Electronics',
    category: 'electronics',
    categoryLabel: 'Electronics',
    description: 'Feature-heavy product page for gadgets with specs comparison and video embed.',
    conversionRate: '3.9%',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #00d2ff 100%)',
    accent: '#00d2ff',
    tags: ['Specs', 'Video', 'Comparison'],
    uses: 1876
  },
  {
    id: 'tpl-004',
    name: 'FitLife Supplement',
    category: 'fitness',
    categoryLabel: 'Fitness',
    description: 'High-energy supplement sales page with results timeline and scientific backing.',
    conversionRate: '6.1%',
    gradient: 'linear-gradient(135deg, #1a2a00 0%, #76b900 100%)',
    accent: '#76b900',
    tags: ['Results', 'Science', 'Social Proof'],
    uses: 4210
  },
  {
    id: 'tpl-005',
    name: 'HomeDecor Collection',
    category: 'home',
    categoryLabel: 'Home & Garden',
    description: 'Lifestyle-focused home decor page with room inspiration gallery and bundles.',
    conversionRate: '3.4%',
    gradient: 'linear-gradient(135deg, #2a1a00 0%, #d4a853 100%)',
    accent: '#d4a853',
    tags: ['Lifestyle', 'Bundles', 'Gallery'],
    uses: 1543
  },
  {
    id: 'tpl-006',
    name: 'AutoParts Pro',
    category: 'automotive',
    categoryLabel: 'Automotive',
    description: 'Technical automotive product page with compatibility checker and installation guide.',
    conversionRate: '4.1%',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #e85d04 100%)',
    accent: '#e85d04',
    tags: ['Compatibility', 'Technical', 'Guide'],
    uses: 987
  },
  {
    id: 'tpl-007',
    name: 'MasterClass Course',
    category: 'education',
    categoryLabel: 'Education',
    description: 'Premium online course sales page with curriculum preview and instructor bio.',
    conversionRate: '7.3%',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #7c3aed 100%)',
    accent: '#7c3aed',
    tags: ['Curriculum', 'Instructor', 'Testimonials'],
    uses: 5621
  },
  {
    id: 'tpl-008',
    name: 'SaaS Growth Platform',
    category: 'saas',
    categoryLabel: 'SaaS',
    description: 'Modern SaaS landing page with feature comparison, pricing table and free trial CTA.',
    conversionRate: '8.9%',
    gradient: 'linear-gradient(135deg, #001a2e 0%, #06b6d4 100%)',
    accent: '#06b6d4',
    tags: ['Pricing', 'Features', 'Free Trial'],
    uses: 6832
  },
  {
    id: 'tpl-009',
    name: 'Crypto Invest Portal',
    category: 'finance',
    categoryLabel: 'Finance',
    description: 'Trust-focused financial product page with ROI calculator and compliance badges.',
    conversionRate: '3.7%',
    gradient: 'linear-gradient(135deg, #0a1a10 0%, #10b981 100%)',
    accent: '#10b981',
    tags: ['ROI Calc', 'Trust', 'Compliance'],
    uses: 2234
  },
  {
    id: 'tpl-010',
    name: 'Luxury Streetwear',
    category: 'fashion',
    categoryLabel: 'Fashion',
    description: 'Bold editorial fashion drop with lookbook-style layout and limited edition urgency.',
    conversionRate: '5.6%',
    gradient: 'linear-gradient(135deg, #000000 0%, #c9a84c 100%)',
    accent: '#c9a84c',
    tags: ['Editorial', 'Limited', 'Bold'],
    uses: 3401
  },
  {
    id: 'tpl-011',
    name: 'Skincare Ritual Set',
    category: 'beauty',
    categoryLabel: 'Beauty',
    description: 'Clean beauty product page focused on natural ingredients and routine building.',
    conversionRate: '4.9%',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #f59e0b 100%)',
    accent: '#f59e0b',
    tags: ['Clean Beauty', 'Routine', 'Natural'],
    uses: 2789
  },
  {
    id: 'tpl-012',
    name: 'Smart Home Bundle',
    category: 'electronics',
    categoryLabel: 'Electronics',
    description: 'Bundle-focused smart home page with ecosystem visual, app demo and setup ease.',
    conversionRate: '4.3%',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #818cf8 100%)',
    accent: '#818cf8',
    tags: ['Bundle', 'Ecosystem', 'Smart'],
    uses: 1654
  },
  {
    id: 'tpl-013',
    name: 'Gym Membership Drive',
    category: 'fitness',
    categoryLabel: 'Fitness',
    description: 'High-converting gym membership page with transformation gallery and trial offer.',
    conversionRate: '5.8%',
    gradient: 'linear-gradient(135deg, #1a0000 0%, #ef4444 100%)',
    accent: '#ef4444',
    tags: ['Membership', 'Transformation', 'Trial'],
    uses: 3891
  },
  {
    id: 'tpl-014',
    name: 'Plant Paradise Shop',
    category: 'home',
    categoryLabel: 'Home & Garden',
    description: 'Fresh, nature-inspired plant shop page with care guides and seasonal collections.',
    conversionRate: '3.8%',
    gradient: 'linear-gradient(135deg, #001a00 0%, #22c55e 100%)',
    accent: '#22c55e',
    tags: ['Nature', 'Guides', 'Seasonal'],
    uses: 1298
  },
  {
    id: 'tpl-015',
    name: 'Lead Magnet Funnel',
    category: 'saas',
    categoryLabel: 'SaaS',
    description: 'Minimalist lead capture page optimized for email list building with high opt-in rate.',
    conversionRate: '12.4%',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #f8fafc 100%)',
    accent: '#f8fafc',
    tags: ['Lead Gen', 'Email', 'Minimal'],
    uses: 7201
  },
  {
    id: 'tpl-016',
    name: 'Webinar Registration',
    category: 'education',
    categoryLabel: 'Education',
    description: 'Webinar sign-up page with speaker credibility, agenda preview and FOMO triggers.',
    conversionRate: '9.1%',
    gradient: 'linear-gradient(135deg, #0a0028 0%, #a855f7 100%)',
    accent: '#a855f7',
    tags: ['Webinar', 'FOMO', 'Speaker'],
    uses: 4532
  },
  {
    id: 'tpl-017',
    name: 'Dropship Bestseller',
    category: 'fitness',
    categoryLabel: 'Fitness',
    description: 'Proven dropshipping product page template with viral social proof and fast shipping USP.',
    conversionRate: '5.5%',
    gradient: 'linear-gradient(135deg, #001428 0%, #fbbf24 100%)',
    accent: '#fbbf24',
    tags: ['Dropship', 'Viral', 'Social Proof'],
    uses: 8901
  },
  {
    id: 'tpl-018',
    name: 'Affiliate Review Page',
    category: 'finance',
    categoryLabel: 'Finance',
    description: 'SEO-optimized affiliate review page with comparison table and transparent disclosure.',
    conversionRate: '6.7%',
    gradient: 'linear-gradient(135deg, #00100a 0%, #34d399 100%)',
    accent: '#34d399',
    tags: ['Affiliate', 'Review', 'SEO'],
    uses: 5012
  }
];

function renderTemplates(filter = 'all') {
  const grid = document.getElementById('templatesGrid');
  if (!grid) return;

  const filtered = filter === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  grid.innerHTML = filtered.map(tpl => `
    <div class="template-card" data-category="${tpl.category}" onclick="previewTemplate('${tpl.id}')">
      <div class="template-thumb">
        <div class="template-thumb-inner" style="background:${tpl.gradient}">
          <div style="font-size:1.4rem;font-weight:800;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.5);margin-bottom:0.5rem">${tpl.name}</div>
          <div style="font-size:0.7rem;color:rgba(255,255,255,0.7);margin-bottom:1rem">${tpl.categoryLabel}</div>
          <div style="display:flex;gap:0.4rem;flex-wrap:wrap">
            ${tpl.tags.map(tag => `<span style="background:rgba(255,255,255,0.15);backdrop-filter:blur(4px);color:#fff;padding:0.15rem 0.5rem;border-radius:999px;font-size:0.62rem;">${tag}</span>`).join('')}
          </div>
          <div style="margin-top:auto;padding-top:1.5rem;display:flex;align-items:center;justify-content:space-between">
            <span style="color:rgba(255,255,255,0.6);font-size:0.65rem;">${tpl.uses.toLocaleString()} uses</span>
            <span style="color:#10b981;font-size:0.7rem;font-weight:700;">CVR ${tpl.conversionRate}</span>
          </div>
        </div>
        <div class="template-overlay">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();useTemplate('${tpl.id}')">
            <i class="fas fa-wand-magic-sparkles"></i> Use Template
          </button>
          <button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();previewTemplate('${tpl.id}')">
            <i class="fas fa-eye"></i> Preview
          </button>
        </div>
      </div>
      <div class="template-info">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem">
          <h4>${tpl.name}</h4>
          <span class="template-cat-badge">${tpl.categoryLabel}</span>
        </div>
        <p style="font-size:0.82rem;color:var(--text-3);line-height:1.5">${tpl.description}</p>
        <div class="template-meta" style="margin-top:0.75rem">
          <span><i class="fas fa-chart-line" style="color:#10b981"></i> ${tpl.conversionRate} CVR</span>
          <span><i class="fas fa-users" style="color:var(--text-3)"></i> ${tpl.uses.toLocaleString()} uses</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterTemplates(category) {
  document.querySelectorAll('.tcat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  renderTemplates(category);
}

function previewTemplate(id) {
  const tpl = TEMPLATES.find(t => t.id === id);
  if (!tpl) return;

  const modal = document.getElementById('templateModal');
  const title = document.getElementById('templateModalTitle');
  const content = document.getElementById('templateModalContent');

  title.textContent = `Preview: ${tpl.name}`;
  content.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:1rem">
      <div>
        <div style="aspect-ratio:9/16;background:${tpl.gradient};border-radius:12px;display:flex;flex-direction:column;padding:1.5rem;justify-content:space-between">
          <div>
            <div style="font-size:1.2rem;font-weight:800;color:#fff;margin-bottom:0.5rem">${tpl.name}</div>
            <div style="font-size:0.75rem;color:rgba(255,255,255,0.7);margin-bottom:1rem">Your Headline Here</div>
            <div style="background:rgba(255,255,255,0.1);height:60px;border-radius:8px;margin-bottom:0.75rem"></div>
            <div style="background:rgba(255,255,255,0.1);height:40px;border-radius:8px;margin-bottom:0.75rem"></div>
            <div style="background:rgba(255,255,255,0.1);height:40px;border-radius:8px"></div>
          </div>
          <div style="background:${tpl.accent};color:#000;text-align:center;padding:0.75rem;border-radius:8px;font-weight:700;font-size:0.85rem">
            BUY NOW — LIMITED OFFER
          </div>
        </div>
      </div>
      <div>
        <h4 style="margin-bottom:1rem">Template Details</h4>
        <div style="display:flex;flex-direction:column;gap:0.75rem">
          <div style="display:flex;justify-content:space-between;padding:0.75rem;background:var(--bg-3);border-radius:8px">
            <span style="color:var(--text-2);font-size:0.85rem">Category</span>
            <span style="font-weight:600;font-size:0.85rem">${tpl.categoryLabel}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:0.75rem;background:var(--bg-3);border-radius:8px">
            <span style="color:var(--text-2);font-size:0.85rem">Avg. Conversion Rate</span>
            <span style="font-weight:600;font-size:0.85rem;color:#10b981">${tpl.conversionRate}</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:0.75rem;background:var(--bg-3);border-radius:8px">
            <span style="color:var(--text-2);font-size:0.85rem">Times Used</span>
            <span style="font-weight:600;font-size:0.85rem">${tpl.uses.toLocaleString()}</span>
          </div>
          <div style="padding:0.75rem;background:var(--bg-3);border-radius:8px">
            <div style="color:var(--text-2);font-size:0.85rem;margin-bottom:0.5rem">Tags</div>
            <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
              ${tpl.tags.map(tag => `<span style="background:rgba(124,58,237,0.15);color:var(--accent);padding:0.2rem 0.6rem;border-radius:999px;font-size:0.75rem">${tag}</span>`).join('')}
            </div>
          </div>
          <p style="font-size:0.88rem;color:var(--text-2);line-height:1.6">${tpl.description}</p>
          <button class="btn btn-primary btn-full" onclick="useTemplate('${tpl.id}');closeModal('templateModal')">
            <i class="fas fa-wand-magic-sparkles"></i> Use This Template
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('templateModal');
}

function useTemplate(id) {
  const tpl = TEMPLATES.find(t => t.id === id);
  if (!tpl) return;

  // Scroll to builder and pre-fill category
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });

  setTimeout(() => {
    const catSelect = document.getElementById('productCategory');
    if (catSelect) catSelect.value = tpl.category === 'saas' ? 'saas' :
      tpl.category === 'finance' ? 'finance' :
      tpl.category === 'education' ? 'education' :
      tpl.category === 'electronics' ? 'electronics' :
      tpl.category === 'fitness' ? 'health' :
      tpl.category === 'beauty' ? 'beauty' :
      tpl.category === 'fashion' ? 'fashion' :
      tpl.category === 'automotive' ? 'automotive' :
      tpl.category === 'home' ? 'home' : '';

    showToast(`Template "${tpl.name}" loaded! Fill in your product details to customize.`);
  }, 800);
}

function showAllTemplates() {
  document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
  filterTemplates('all');
  document.querySelectorAll('.tcat-btn')[0].click();
}

// Initialize templates on DOM ready
document.addEventListener('DOMContentLoaded', () => renderTemplates('all'));
