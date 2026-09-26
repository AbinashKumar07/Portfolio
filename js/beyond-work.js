/**
 * BEYOND WORK — Article Listing & Dynamic SEO Renderer
 * Reads content/beyond-work/index.json directly.
 */

const BW_CONTENT_INDEX = 'content/beyond-work/index.json';

async function loadArticles() {
  try {
    let articles = [];
    const token = localStorage.getItem('gh_sync_token');
    
    if (token) {
      const repo = 'AbinashKumar07/Portfolio';
      const ghRes = await fetch(`https://api.github.com/repos/${repo}/contents/content/beyond-work/index.json`, {
        headers: { 'Authorization': `token ${token}` }
      });
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        articles = JSON.parse(decodeURIComponent(escape(atob(ghData.content))));
      } else {
        throw new Error('GitHub API Error');
      }
    } else {
      const res = await fetch(BW_CONTENT_INDEX, { cache: 'no-store' });
      if (!res.ok) throw new Error('No index file found');
      articles = await res.json();
    }

    const now = new Date();
    
    // Only display articles that are marked Published and whose scheduled date has arrived
    return articles
      .filter(a => a.status === 'Published' && new Date(a.date) <= now)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.warn('Beyond Work: no published articles yet.', err);
    return [];
  }
}

function renderCard(article) {
  const dateStr = new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const textOnly = (article.body || '').replace(/<[^>]*>?/gm, '');
  const readMins = Math.max(1, Math.round(textOnly.split(/\s+/).length / 200));

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
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  let currentRendered = 0;
  const PAGE_SIZE = 9;
  let currentFilteredList = articles;

  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.className = 'btn btn-secondary';
  loadMoreBtn.style.margin = '3rem auto 0';
  loadMoreBtn.style.display = 'flex';
  loadMoreBtn.innerHTML = '<span>Load More</span>';
  loadMoreBtn.onclick = () => render(currentFilteredList, true);

  const render = (list, append = false) => {
    if (!append) {
      grid.innerHTML = '';
      currentRendered = 0;
    }
    
    const nextBatch = list.slice(currentRendered, currentRendered + PAGE_SIZE);
    if (nextBatch.length > 0) {
      grid.insertAdjacentHTML('beforeend', nextBatch.map(renderCard).join(''));
      currentRendered += nextBatch.length;
    }

    if (currentRendered >= list.length) {
      if (loadMoreBtn.parentNode) loadMoreBtn.parentNode.removeChild(loadMoreBtn);
    } else {
      if (!loadMoreBtn.parentNode) grid.parentNode.appendChild(loadMoreBtn);
    }
  };

  render(currentFilteredList);

  const filterBtns = document.querySelectorAll('.bw-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      currentFilteredList = filter === 'all' ? articles : articles.filter(a => a.category === filter);
      
      if (currentFilteredList.length === 0) {
        grid.innerHTML = '';
        if (loadMoreBtn.parentNode) loadMoreBtn.parentNode.removeChild(loadMoreBtn);
        if (emptyState) emptyState.style.display = 'block';
      } else {
        if (emptyState) emptyState.style.display = 'none';
        render(currentFilteredList, false);
      }
    });
  });
}

async function initSingleArticle() {
  const container = document.getElementById('articleContainer');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  
  try {
    let articles = [];
    const token = localStorage.getItem('gh_sync_token');
    if (token) {
      const repo = 'AbinashKumar07/Portfolio';
      const ghRes = await fetch(`https://api.github.com/repos/${repo}/contents/content/beyond-work/index.json`, {
        headers: { 'Authorization': `token ${token}` }
      });
      if (ghRes.ok) {
        const ghData = await ghRes.json();
        articles = JSON.parse(decodeURIComponent(escape(atob(ghData.content))));
      } else {
        throw new Error('GitHub API Error');
      }
    } else {
      const res = await fetch(BW_CONTENT_INDEX, { cache: 'no-store' });
      articles = await res.json();
    }
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
    setOgMeta('og:image', seo.ogImage || article.coverImage || 'assets/profile.png');
    
    // Dynamic Canonical URL
    const canonicalUrl = window.location.origin + window.location.pathname + '?slug=' + slug;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) {
      canonicalTag.setAttribute('href', canonicalUrl);
    }

    // Google SEO Structured Data (JSON-LD)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": seo.seoTitle || article.title,
      "description": seo.metaDescription || article.excerpt,
      "image": seo.ogImage || article.coverImage || (window.location.origin + '/assets/profile.png'),
      "author": {
        "@type": "Person",
        "name": "Abinash Kumar",
        "url": window.location.origin
      },
      "datePublished": article.date,
      "dateModified": article.date
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    const dateStr = new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    container.innerHTML = `
      <span class="section-tag">${article.category}</span>
      <h1 class="bw-hero-title" style="margin-top:1rem;">${article.title}</h1>
      <p style="color:var(--text-muted); font-size:0.9375rem; margin-bottom:2rem;">${dateStr} · by Abinash Kumar</p>
      <img src="${article.coverImage || 'assets/profile.png'}" alt="${article.title}" style="width:100%; border-radius:var(--radius-lg); margin-bottom:2.5rem; max-height:480px; object-fit:cover;">
      <div class="bw-article-body">${article.body}</div>
    `;
  } catch (err) {
    container.innerHTML = '<div class="bw-empty-state"><h3>Unable to load article.</h3></div>';
  }
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

document.addEventListener('DOMContentLoaded', () => {
  initBeyondWorkGrid();
  initSingleArticle();
});
