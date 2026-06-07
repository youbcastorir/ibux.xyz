/* ═══════════════════════════════════════════════════════════════
   iBux — analytics.js | Analytics Dashboard
   ═══════════════════════════════════════════════════════════════ */

let analyticsChart = null;
let currentDateRange = '7d';

/* ── Dataset definitions ── */
const ANALYTICS_DATA = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    views:       [1240, 1680, 1420, 1890, 2140, 2430, 2047],
    conversions: [87,   118,  99,   134,  151,  172,  130],
    revenue:     [4350, 5900, 4950, 6700, 7550, 8600, 6500],
    kpis: { views: '12,847', clicks: '3,421', conversions: '891', cvr: '6.93%', revenue: '$44,550' }
  },
  '30d': {
    labels: ['W1', 'W2', 'W3', 'W4'],
    views:       [18400, 22100, 26800, 31200],
    conversions: [1280,  1540,  1890,  2210],
    revenue:     [64000, 77000, 94500, 110500],
    kpis: { views: '98,500', clicks: '18,240', conversions: '6,920', cvr: '7.02%', revenue: '$346,000' }
  },
  '90d': {
    labels: ['Jan', 'Feb', 'Mar'],
    views:       [88000, 104000, 122000],
    conversions: [6160,  7280,   8540],
    revenue:     [308000, 364000, 427000],
    kpis: { views: '314,000', clicks: '58,300', conversions: '21,980', cvr: '6.99%', revenue: '$1,099,000' }
  }
};

/* ── Initialize Chart ── */
function initAnalyticsChart() {
  const canvas = document.getElementById('analyticsChart');
  if (!canvas || typeof Chart === 'undefined') return;

  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = isDark ? '#64748b' : '#94a3b8';

  const data = ANALYTICS_DATA[currentDateRange];

  if (analyticsChart) analyticsChart.destroy();

  analyticsChart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Page Views',
          data: data.views,
          borderColor: '#7c3aed',
          backgroundColor: 'rgba(124,58,237,0.08)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#7c3aed',
          pointBorderColor: isDark ? '#0e1220' : '#fff',
          pointBorderWidth: 2
        },
        {
          label: 'Revenue ($)',
          data: data.revenue.map(r => Math.round(r / 50)),
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6,182,212,0.06)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#06b6d4',
          pointBorderColor: isDark ? '#0e1220' : '#fff',
          pointBorderWidth: 2
        },
        {
          label: 'Conversions',
          data: data.conversions,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.06)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#10b981',
          pointBorderColor: isDark ? '#0e1220' : '#fff',
          pointBorderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: textColor,
            font: { family: "'DM Sans', sans-serif", size: 12 },
            usePointStyle: true,
            pointStyleWidth: 10,
            boxHeight: 8,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: isDark ? '#131826' : '#fff',
          titleColor: isDark ? '#f1f5f9' : '#0f172a',
          bodyColor: textColor,
          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: "'Syne', sans-serif", weight: '700' },
          bodyFont: { family: "'DM Sans', sans-serif" }
        }
      },
      scales: {
        x: {
          grid: { color: gridColor, drawBorder: false },
          ticks: { color: textColor, font: { family: "'DM Sans', sans-serif", size: 11 } },
          border: { display: false }
        },
        y: {
          grid: { color: gridColor, drawBorder: false },
          ticks: { color: textColor, font: { family: "'DM Sans', sans-serif", size: 11 } },
          border: { display: false }
        }
      }
    }
  });
}

/* ── Update KPIs ── */
function updateKPIs(range) {
  const data = ANALYTICS_DATA[range];
  if (!data) return;

  const kpis = data.kpis;
  animateCounter('kpiViews', kpis.views);
  animateCounter('kpiClicks', kpis.clicks);
  animateCounter('kpiConversions', kpis.conversions);
  animateCounter('kpiCvr', kpis.cvr);
  animateCounter('kpiRevenue', kpis.revenue);
}

function animateCounter(id, value) {
  const el = document.getElementById(id);
  if (!el) return;

  // Simple swap animation
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  el.style.transition = 'all 0.3s ease';
  setTimeout(() => {
    el.textContent = value;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 150);
}

/* ── Date Range Switch ── */
function setDateRange(range, btn) {
  currentDateRange = range;

  document.querySelectorAll('.drb').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  updateKPIs(range);

  if (analyticsChart) {
    const data = ANALYTICS_DATA[range];
    analyticsChart.data.labels = data.labels;
    analyticsChart.data.datasets[0].data = data.views;
    analyticsChart.data.datasets[1].data = data.revenue.map(r => Math.round(r / 50));
    analyticsChart.data.datasets[2].data = data.conversions;
    analyticsChart.update('active');
  }
}

/* ── Initialize on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  // Delay chart init to ensure Chart.js is loaded
  setTimeout(initAnalyticsChart, 300);
});

// Re-init on theme change
document.addEventListener('themeChanged', () => {
  if (analyticsChart) {
    analyticsChart.destroy();
    analyticsChart = null;
  }
  setTimeout(initAnalyticsChart, 100);
});
