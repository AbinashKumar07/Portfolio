/**
 * BEYOND WORK — Article Listing & Dynamic SEO Renderer
 * Reads content/beyond-work/index.json (auto-built by GitHub Action on publish)
 * and renders cards on the listing page, or a full article + SEO tags on the
 * single-article template.
 */

const BW_CONTENT_INDEX = 'content/beyond-work/index.json';

async function loadArticles() {
  try {
    const res = await fetch(BW_CONTENT_INDEX, { cache: 'no-store' });
    if (!res.ok) throw new Error('No articles index found yet');
    const articles = await res.json();
    return articles
      .filter(a => a.status === 'Published')
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.warn('Beyond Work: no published articles yet.', err);
    return [];
  }
}

function renderCard(article) {
  const dateStr = new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const readMins = Math.max(1, Math.round((article.body || '').split(' ').length / 200));
  return `
    <a href="beyond-work-article.html?slug=${encodeURIComponent(article.slug)}" class="bw-card" data-category="${article.category}">
      <div class="bw-card-img-wrap">
        <img src="${article.coverImage || 'assets/profile.png'}" alt="${article.title}" class="bw-card-img" loading="lazy">
      </div>
      <div class="bw-card-body">
        <div class="bw-card-category">${article.category}</div>
        <h3 class="bw-card-title">${article.title}</h3>
        <p class="bw-card-excerpt">${article.excerpt}</p>
        <div class="bw-card-meta">
          <span>${dateStr}</span>
          <span>${readMins} min read</span>
        </div>
      </div>
    </a>
  `;
}

async function initBeyondWorkGrid() {
  const grid = document.getElementById('bwGrid');
  const emptyState = document.getElementById('bwEmptyState');
  if (!grid) return;

  const articles = await loadArticles();
  if (articles.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  const render = (list) => { grid.innerHTML = list.map(renderCard).join(''); };
  render(articles);

  const filterBtns = document.querySelectorAll('.bw-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      const filtered = filter === 'all' ? articles : articles.filter(a => a.category === filter);
      if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
        render(filtered);
      }
    });
  });
}

async function initSingleArticle() {
  const container = document.getElementById('articleContainer');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const articles = await loadArticles();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    container.innerHTML = '<div class="bw-empty-state"><h3>Article not found.</h3><p>It may have been unpublished or the link is incorrect.</p></div>';
    return;
  }

  const seo = article.seo || {};
  document.title = seo.seoTitle || article.title;
  setMeta('description', seo.metaDescription || article.excerpt);
  setMeta('keywords', seo.keywords || '');
  setOgMeta('og:title', seo.seoTitle || article.title);
  setOgMeta('og:description', seo.metaDescription || article.excerpt);
  setOgMeta('og:image', seo.ogImage || article.coverImage || 'assets/profile.jpg');
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = `${window.location.origin}${window.location.pathname}?slug=${slug}`;

  const dateStr = new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  container.innerHTML = `
    <span class="section-tag">${article.category}</span>
    <h1 class="bw-hero-title" style="margin-top:1rem;">${article.title}</h1>
    <p style="color:var(--text-muted); font-size:0.9375rem; margin-bottom:2rem;">${dateStr} · by Abinash Kumar</p>
    <img src="${article.coverImage || 'assets/profile.png'}" alt="${article.title}" style="width:100%; border-radius:var(--radius-lg); margin-bottom:2rem;">
    <div class="bw-article-body">${markdownToHtml(article.body || '')}</div>
  `;
}

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
  el.setAttribute('content', content);
}
function setOgMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

function markdownToHtml(md) {
  return md
    .split('\n\n')
    .map(block => {
      if (block.startsWith('### ')) return `<h3>${block.slice(4)}</h3>`;
      if (block.startsWith('## ')) return `<h2>${block.slice(3)}</h2>`;
      if (block.startsWith('# ')) return `<h1>${block.slice(2)}</h1>`;
      let html = block
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      return `<p>${html}</p>`;
    })
    .join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  initBeyondWorkGrid();
  initSingleArticle();
});
