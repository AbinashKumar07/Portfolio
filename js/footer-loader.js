/**
 * FOOTER LOADER — Injects a consistent footer (with social links from CMS)
 * on any page that includes <footer id="siteFooterInclude"></footer>
 */

const SOCIAL_ICONS = {
  'Instagram': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  'LinkedIn': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>',
  'Twitter / X': '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7.5 8.6L22 22h-6.9l-5.4-6.9L3.5 22H.5l8-9.2L2 2h7l4.9 6.3L18 2z"/></svg>',
  'YouTube': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
  'Threads': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
  'Linktree': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.51 5.92L17.7 1.73l2.83 2.83-4.19 4.19H22v4h-5.66l4.19 4.19-2.83 2.83-4.19-4.19V22h-4v-6.42l-4.19 4.19-2.83-2.83 4.19-4.19H2v-4h5.66L3.47 4.56l2.83-2.83 4.19 4.19V0h4v5.92h-.98z"/></svg>',
  'GitHub': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/></svg>',
  'Facebook': '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>'
};

async function loadFooter() {
  const footerEl = document.getElementById('siteFooterInclude');
  if (!footerEl) return;

  let data = {
    bio: "Content Strategist, Narrative Architect, and Author of Human Psychology & Behaviour.",
    availabilityText: "Available for select collaborations",
    socialLinks: [
      { platform: "Instagram", url: "https://www.instagram.com/abinashsays_/" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/abinashkumar07/" },
      { platform: "Linktree", url: "https://linktr.ee/ABINASHKUMAR1" }
    ],
    email: "abinash.kumar231113@gmail.com",
    phone: "+91 8882828854",
    copyrightText: "© 2026 Abinash Kumar. Handcrafted with precision. All rights reserved."
  };

  try {
    const res = await fetch('content/footer.json', { cache: 'no-store' });
    if (res.ok) data = await res.json();
  } catch (e) { console.warn('Using default footer content.', e); }

  const socialHtml = (data.socialLinks || []).map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="footer-social-icon" title="${s.platform}" aria-label="${s.platform}">
      ${SOCIAL_ICONS[s.platform] || ''}
    </a>
  `).join('');

  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="brand-logo"><img src="assets/profile.png" alt="Abinash Kumar" class="brand-avatar"><span>ABINASH KUMAR</span></a>
          <p class="footer-bio">${data.bio}</p>
          <div style="margin-top:1rem; display:inline-flex; align-items:center; gap:0.5rem; font-size:0.8125rem; color:#10b981;">
            <span class="status-dot"></span><span>${data.availabilityText}</span>
          </div>
          <div class="footer-social-row" style="display:flex; gap:0.75rem; margin-top:1.25rem;">
            ${socialHtml}
          </div>
        </div>
        <div>
          <h4 class="footer-col-title">Published Books</h4>
          <a href="index.html#book" class="footer-book-card">
            <img src="assets/book_cover.png" alt="Book Cover" class="footer-book-thumb">
            <div class="footer-book-info"><h5>Human Psychology & Behaviour</h5><p>Explore on Linktree</p></div>
          </a>
        </div>
        <div>
          <h4 class="footer-col-title">Navigation</h4>
          <div class="footer-links">
            <a href="index.html#hero" class="footer-link">Home</a>
            <a href="index.html#philosophy" class="footer-link">Philosophy</a>
            <a href="index.html#practice" class="footer-link">Practice</a>
            <a href="index.html#work" class="footer-link">Portfolio</a>
            <a href="index.html#certificates" class="footer-link">Honors & Certifications</a>
            <a href="beyond-work.html" class="footer-link">Beyond Work</a>
            <a href="index.html#book" class="footer-link">Published Books</a>
            <a href="resume.html" class="footer-link">Resume / CV</a>
          </div>
        </div>
        <div>
          <h4 class="footer-col-title">Connect</h4>
          <div class="footer-links">
            <a href="https://linktr.ee/ABINASHKUMAR1" target="_blank" rel="noopener noreferrer" class="footer-link" style="color:#a78bfa; font-weight:700;">Linktree — Book & Links</a>
            <a href="mailto:${data.email}" class="footer-link">Email Abinash</a>
            <a href="tel:${(data.phone || '').replace(/\s/g, '')}" class="footer-link">Phone: ${data.phone}</a>
            <a href="resume.html" class="footer-link">View Full Resume</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>${data.copyrightText}</div>
        <a href="#" class="back-to-top-btn" id="backToTopBtnDynamic"><span>Back to top</span><span>↑</span></a>
      </div>
    </div>
  `;

  const backBtn = document.getElementById('backToTopBtnDynamic');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

document.addEventListener('DOMContentLoaded', loadFooter);
