/**
 * PORTFOLIO APPLICATION JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initCounters();
  initOrbitDiagram();
  initPracticeAccordion();
  initPortfolioFilters();
  initBookAccordion();
  initCertificatesLightbox();
  initEmailCopy();
  initBackToTop();
});

function initThemeToggle() {
  const themeSwitchBtn = document.querySelector('#themeSwitchBtn');
  const thumb = document.querySelector('#themeSwitchThumb');

  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('site-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeSwitchBtn) {
      themeSwitchBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
    if (thumb) {
      thumb.innerHTML = theme === 'dark' ? '🌙' : '☀️';
    }
  }
}

function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      if (sections.length > 0) {
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 140;
          const sectionHeight = section.clientHeight;
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            link.classList.remove('active');
            if (href === `#${current}`) {
              link.classList.add('active');
            }
          }
        });
      }
    });
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navMenu.style.position = 'absolute';
        navMenu.style.top = '4.5rem';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-card)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '1.5rem';
        navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.4)';
        navMenu.style.gap = '1rem';
      }
    });
  }
}

function initCounters() {
  const counterElements = document.querySelectorAll('.metric-number');
  if (counterElements.length === 0) return;
  let hasAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    const duration = 1800;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      const currentVal = Math.round(target * (1 - (1 - progress) * (1 - progress)));
      el.innerHTML = `${currentVal}${suffix}`;

      if (currentStep >= totalSteps) {
        el.innerHTML = `${target}${suffix}`;
        clearInterval(timer);
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(el => animateCounter(el));
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.querySelector('#impact');
  if (metricsSection) observer.observe(metricsSection);
}

function initOrbitDiagram() {
  const nodes = document.querySelectorAll('.orbit-node');
  const centerNode = document.querySelector('.orbit-center-node');
  const descCard = document.querySelector('.orbit-description-card');
  if (nodes.length === 0 && !centerNode) return;

  const nodeDescriptions = {
    'brand-voice': '**Brand Voice:** Codifying distinctive verbal personas and lexicon systems that stand out across crowded markets.',
    'narrative': '**Narrative Architecture:** Structuring core company myths, manifestos, and strategic narratives for category leadership.',
    'editorial': '**Editorial Systems:** Building authoritative thought leadership engines, publications, and multi-niche web assets.',
    'positioning': '**Positioning:** Identifying white spaces and engineering defensible category positioning statements.',
    'product-copy': '**Product Copy & SEO:** Crafting high-converting content architectures and high-ranking editorial frameworks.',
    'cultural': '**Human Psychology:** Aligning content narratives with human psychological drivers and audience behaviour.',
    'executive': '**Author & Comms:** High-visibility founder communications, strategic essays, and published books.',
    'center': '**Strategic Core:** The unified center where content strategy, human psychology, and digital growth converge.'
  };

  nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const key = node.getAttribute('data-node');
      if (descCard && nodeDescriptions[key]) {
        descCard.innerHTML = nodeDescriptions[key];
      }
    });
  });

  if (centerNode) {
    centerNode.addEventListener('mouseenter', () => {
      nodes.forEach(n => n.classList.remove('active'));
      if (descCard) {
        descCard.innerHTML = nodeDescriptions['center'];
      }
    });
  }
}

function initPracticeAccordion() {
  const accordionItems = document.querySelectorAll('.practice-accordion .accordion-item');
  if (accordionItems.length === 0) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(other => {
        other.classList.remove('active');
        const content = other.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  if (accordionItems.length > 0) {
    const first = accordionItems[0];
    first.classList.add('active');
    const firstContent = first.querySelector('.accordion-content');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }
}

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  if (filterBtns.length === 0 || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter').toLowerCase();

      cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

function initBookAccordion() {
  const bookBox = document.querySelector('#bookInteractiveBox');
  const toggleBtn = document.querySelector('#bookAccordionToggle');
  const body = document.querySelector('#bookAccordionBody');
  if (!bookBox || !toggleBtn || !body) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = bookBox.classList.contains('expanded');
    if (isExpanded) {
      bookBox.classList.remove('expanded');
      body.style.maxHeight = null;
    } else {
      bookBox.classList.add('expanded');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });

  bookBox.classList.add('expanded');
  body.style.maxHeight = body.scrollHeight + 'px';
}

const certificatesData = {
  'cert-unlock-dec': {
    title: 'Certificate of Appreciation — Best Performer of the Month',
    issuer: 'UnlockDiscounts',
    date: 'December 2024',
    badge: 'Consecutive Best Performer · Dec 2024',
    signatory: 'Nayanth Kumar Singh (Founder)',
    image: 'assets/certificates/cert_unlockdiscounts_dec.png',
    description: 'Awarded to Abinash Kumar in recognition of exceptional performance, leadership, teamwork, and outstanding creativity in December 2024.'
  },
  'cert-unlock-nov': {
    title: 'Certificate of Appreciation — Best Performer / Intern of the Month',
    issuer: 'UnlockDiscounts',
    date: 'November 2024',
    badge: 'Intern of the Month · Nov 2024',
    signatory: 'Nayanth Kumar Singh (Founder)',
    image: 'assets/certificates/cert_unlockdiscounts_nov.png',
    description: 'Presented to Abinash Kumar for exceptional performance, dedication, teamwork, and creative contribution throughout November 2024.'
  },
  'cert-fea-honors': {
    title: 'Certificate of Honors — 1-Year Professional Employability Program',
    issuer: 'Freedom Employability Academy',
    date: 'September 2022',
    badge: 'Graduate with Honors · Sep 2022',
    signatory: 'Deepak Chopra (Founder & CEO)',
    image: 'assets/certificates/cert_fea_honors.png',
    description: 'Completed FEA\\'s rigorous 1-year program of English, Computer & Internet Skills, Personality Development, Grit, Ethics, and Adaptability with Honors.'
  },
  'cert-fea-commendation': {
    title: 'Letter of Commendation — Volunteer & Service Leadership',
    issuer: 'Freedom Employability Academy',
    date: 'February 2023 – August 2023',
    badge: '5 Months Volunteer Service',
    signatory: 'Neha Masta (Alumni Coordinator)',
    image: 'assets/certificates/cert_fea_commendation.png',
    description: 'Awarded for 5 months of leadership and service in the FEA Volunteer Program, demonstrating community impact and dedication.'
  }
};

function initCertificatesLightbox() {
  const modal = document.querySelector('#certificateModal');
  const modalBody = document.querySelector('#certificateModalBody');
  const closeBtn = document.querySelector('#closeCertificateModal');
  const certCards = document.querySelectorAll('.cert-card');
  if (!modal || !modalBody) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-cert-id');
      const cert = certificatesData[id];
      if (!cert) return;
      modalBody.innerHTML = `
        <div style="text-align:center;">
          <img src="${cert.image}" alt="${cert.title}" style="width:100%; max-height:65vh; object-fit:contain; border-radius:12px; margin-bottom:1.25rem;">
          <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:0.4rem;">${cert.title}</h3>
          <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:0.75rem;">Issued by ${cert.issuer} · ${cert.date}</p>
          <p style="color:var(--text-secondary); font-size:0.9375rem; line-height:1.6;">${cert.description}</p>
        </div>
      `;
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 10);
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function initEmailCopy() {
  const copyBtn = document.querySelector('#copyEmailBtn');
  if (!copyBtn) return;
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('abinash.kumar231113@gmail.com').then(() => {
      const span = copyBtn.querySelector('span:last-child');
      if (span) {
        const orig = span.textContent;
        span.textContent = '✓ Copied to clipboard!';
        setTimeout(() => span.textContent = orig, 2500);
      }
    });
  });
}

function initBackToTop() {
  const backBtn = document.querySelector('#backToTopBtn');
  if (!backBtn) return;
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
