/* ═══════════════════════════════════════════════════════════════
   iBux — app.js | Main Application Controller
   ═══════════════════════════════════════════════════════════════ */

/* ── FAQ DATA ── */
const FAQ_DATA = [
  {
    q: "What is iBux and who is it for?",
    a: "iBux is an AI-powered landing page builder designed specifically for eCommerce merchants. It's perfect for Shopify store owners, WooCommerce sellers, Amazon FBA sellers, TikTok Shop merchants, dropshippers, affiliate marketers, digital product creators, agencies, and local businesses. Basically anyone who needs high-converting landing pages fast."
  },
  {
    q: "What languages does iBux support?",
    a: "iBux currently supports 7 languages: English, Arabic (with full RTL support), French, Spanish, German, Portuguese, and Italian. All copy is generated with native-quality writing in each language, not just translation. More languages are being added regularly."
  },
  {
    q: "How does the AI landing page generator work?",
    a: "Simply enter your product name, category, key benefits, and target language — then select your page type and click Generate. Our AI (powered by Claude) analyzes your inputs and generates a complete, conversion-optimized landing page including headlines, body copy, testimonials, FAQ, trust badges, SEO meta tags, and full HTML code — in under 60 seconds."
  },
  {
    q: "Can I edit the generated landing pages?",
    a: "Yes! Every generated page comes as clean, well-structured HTML that you can download and customize freely. You can edit it in any code editor, paste it into your Shopify theme, WordPress page builder, or any website platform. There are no proprietary formats or lock-in."
  },
  {
    q: "Does iBux work with Shopify, WooCommerce, and other platforms?",
    a: "Absolutely. iBux generates clean HTML/CSS code that works with any platform. For Shopify, you can paste the code into a custom page template. For WooCommerce, use it with Elementor or Divi. For Amazon, adapt the copy to your A+ Content. We also generate platform-specific optimizations based on your selected platform."
  },
  {
    q: "What is included in the free plan?",
    a: "The free plan includes 3 landing page generations per month, 5 AI copy generations, access to 2 languages (English + one more), and basic templates. It's designed to let you test the platform and see results before upgrading. No credit card required to start."
  },
  {
    q: "How does the SEO toolkit work?",
    a: "Our built-in SEO toolkit automatically generates optimized meta titles (50-60 characters), meta descriptions (150-160 characters), target keyword suggestions based on your category, an SEO score out of 100, structured data (schema.org) markup, and sitemap entries — all included in every generated page."
  },
  {
    q: "Can iBux help with A/B testing?",
    a: "Yes! The Professional plan and above includes an A/B testing UI where you can generate two variants of your landing page with different headlines, CTAs, or layouts. The analytics dashboard tracks performance of each variant so you can identify the winner and scale your winner."
  },
  {
    q: "Is there an agency option for client work?",
    a: "Yes! The Agency plan at $199/month includes 25 client workspaces, white-label option (remove iBux branding), priority AI processing, team collaboration features, and API access. It's designed for digital agencies that want to deliver fast, high-quality landing pages for multiple clients."
  },
  {
    q: "How do I contact support?",
    a: "You can reach our support team at salatrir@gmail.com. Professional plan users get priority email support with 24-hour response time. Agency plan users get priority support. Enterprise users get a dedicated account manager and 24/7 phone support."
  }
];

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initFAQ();
  initLangDropdown();
  initScrollAnimations();
  initPricingToggle();
  trackScrollProgress();
});

/* ── Theme ── */
function initTheme() {
  try {
    const saved = localStorage.getItem('ibux_theme') || 'dark';
    setTheme(saved, false);
  } catch(e) { setTheme('dark', false); }
}

function setTheme(theme, animate = true) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }
  try { localStorage.setItem('ibux_theme', theme); } catch(e) {}
  if (animate) document.dispatchEvent(new CustomEvent('themeChanged'));
}

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── Navbar ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks?.classList.contains('mobile-open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      const spans = hamburger?.querySelectorAll('span');
      spans?.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${section.id}`) a.classList.add('active');
        });
      }
    });
  }, { passive: true });
}

/* ── Language Dropdown ── */
function initLangDropdown() {
  const langBtn = document.getElementById('langBtn');
  const dropdown = document.getElementById('langDropdown');

  langBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    dropdown?.classList.remove('open');
  });
}

/* ── FAQ ── */
function initFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  list.innerHTML = FAQ_DATA.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" onclick="toggleFAQ(${i})">
        ${item.q}
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="faq-a">${item.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const item = document.getElementById(`faq-${index}`);
  if (!item) return;
  const wasOpen = item.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

  // Open clicked if it wasn't open
  if (!wasOpen) item.classList.add('open');
}

/* ── Pricing Toggle ── */
let isAnnual = false;

function toggleBilling() {
  isAnnual = !isAnnual;
  document.getElementById('billingToggle')?.classList.toggle('active', isAnnual);

  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  if (monthlyLabel) monthlyLabel.style.opacity = isAnnual ? '0.5' : '1';
  if (annualLabel) annualLabel.style.opacity = isAnnual ? '1' : '0.5';

  // Update prices
  document.querySelectorAll('.price-num[data-monthly]').forEach(el => {
    const monthly = el.getAttribute('data-monthly');
    const annual = el.getAttribute('data-annual');
    if (!monthly || !annual) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      el.textContent = isAnnual ? annual : monthly;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.3s ease';
    }, 150);
  });
}

/* ── Scroll Animations ── */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  // Observe cards and sections
  const targets = document.querySelectorAll(
    '.feature-card, .template-card, .testimonial-card, .price-card, .lang-card, .kpi-card, .faq-item'
  );

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${(i % 6) * 0.08}s, transform 0.5s ease ${(i % 6) * 0.08}s`;
    observer.observe(el);
  });

  // Add animate-in CSS
  const style = document.createElement('style');
  style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);
}

/* ── Scroll Progress ── */
function trackScrollProgress() {
  // Add progress bar
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
    background: linear-gradient(90deg, #7c3aed, #06b6d4);
    width: 0%; transition: width 0.1s linear; pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = Math.round((scrollTop / docHeight) * 100);
    bar.style.width = percent + '%';
  }, { passive: true });
}

/* ── Modal Helpers ── */
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m.id));
  }
});

/* ── Demo Modal ── */
function showDemo() {
  openModal('demoModal');
}

/* ── Toast Notifications ── */
let toastTimeout;
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;

  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#06b6d4' };

  toast.style.background = colors[type] || colors.success;
  const icon = toast.querySelector('i');
  if (icon) icon.className = `fas ${icons[type] || icons.success}`;
  msgEl.textContent = message;

  clearTimeout(toastTimeout);
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 3500);
}

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById('navbar')?.offsetHeight || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Lazy load analytics chart when section is visible ── */
const analyticsSection = document.getElementById('analytics');
if (analyticsSection && typeof IntersectionObserver !== 'undefined') {
  const chartObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initAnalyticsChart();
      chartObserver.disconnect();
    }
  }, { threshold: 0.1 });
  chartObserver.observe(analyticsSection);
}

/* ── Console easter egg ── */
console.log(
  '%c⚡ iBux%c — AI Landing Page Builder\n%chttps://ibux.xyz | salatrir@gmail.com',
  'color:#7c3aed;font-family:Syne,sans-serif;font-size:24px;font-weight:800',
  'color:#06b6d4;font-size:14px;font-weight:600',
  'color:#64748b;font-size:12px'
);
