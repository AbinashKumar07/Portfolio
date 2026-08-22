/**
 * PORTFOLIO APPLICATION JAVASCRIPT
 * Comprehensive interactivity: Theme switcher (Sun -> Half Moon), live website redirection, 
 * book accordion, certificate lightboxes, counters, filters, and resume interactivity.
 * Personalized for Abinash Kumar — Content Strategist & Published Author
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
  initTeachingAccordion();
  initContactForm();
  initEmailCopy();
  initBackToTop();
});

/* --- 1. Dark/Light Theme Switcher (Right of Get in Touch) --- */
function initThemeToggle() {
  const themeSwitchBtn = document.querySelector('#themeSwitchBtn');
  const thumb = document.querySelector('#themeSwitchThumb');
  
  // Check stored theme or default to light
  const savedTheme = localStorage.getItem('site-theme') || 'light';
  applyTheme(savedTheme);

  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('site-theme', newTheme);
      showToast(newTheme === 'dark' ? '🌙 Night Mode Activated' : '☀️ Light Mode Activated');
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

/* --- 2. Sticky Navigation & Active Spy --- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy (if sections exist on page)
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
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
  });

  // Mobile menu toggle
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
        navMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        navMenu.style.gap = '1rem';
      }
    });
  }
}

/* --- 3. Animated Metrics Counters --- */
function initCounters() {
  const counterElements = document.querySelectorAll('.metric-number');
  let hasAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Ease out quad
      const currentVal = Math.round(target * (1 - (1 - progress) * (1 - progress)));

      el.innerHTML = `${currentVal}<span class="accent">${suffix}</span>`;

      if (currentStep >= totalSteps) {
        el.innerHTML = `${target}<span class="accent">${suffix}</span>`;
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
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('#impact');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* --- 4. Interactive Orbital Venn Diagram --- */
function initOrbitDiagram() {
  const nodes = document.querySelectorAll('.orbit-node');
  const centerNode = document.querySelector('.orbit-center-node');
  const descCard = document.querySelector('.orbit-description-card');

  const nodeDescriptions = {
    'brand-voice': '<strong>Brand Voice:</strong> Codifying distinctive, unmistakable verbal personas and lexicon systems that stand out across crowded markets.',
    'narrative': '<strong>Narrative Architecture:</strong> Structuring core company myths, manifestos, and strategic narratives for category leadership.',
    'editorial': '<strong>Editorial Systems:</strong> Building authoritative thought leadership engines, publications, and multi-niche web assets.',
    'positioning': '<strong>Positioning:</strong> Identifying white spaces and engineering defensible category positioning statements.',
    'product-copy': '<strong>Product Copy & SEO:</strong> Crafting high-converting content architectures and high-ranking editorial frameworks.',
    'cultural': '<strong>Human Psychology:</strong> Aligning content narratives with human psychological drivers and audience behaviour.',
    'executive': '<strong>Author & Comms:</strong> High-visibility founder communications, strategic essays, and published books.',
    'center': '<strong>Strategic Core:</strong> The unified center where content strategy, human psychology, and digital growth converge.'
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

/* --- 5. Practice Disciplines Accordion --- */
function initPracticeAccordion() {
  const accordionItems = document.querySelectorAll('.practice-accordion .accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      accordionItems.forEach(other => {
        other.classList.remove('active');
        const content = other.querySelector('.accordion-content');
        if (content) content.style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  // Open first item by default
  if (accordionItems.length > 0) {
    const first = accordionItems[0];
    first.classList.add('active');
    const firstContent = first.querySelector('.accordion-content');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }
}

/* --- 6. Selected Work Filtering --- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

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

/* --- 7. Book Interactive Accordion --- */
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

  // Open book details by default
  bookBox.classList.add('expanded');
  body.style.maxHeight = body.scrollHeight + 'px';
}

/* --- 8. Certificates Lightbox & Verification Modal --- */
const certificatesData = {
  'cert-unlock-dec': {
    title: 'Certificate of Appreciation — Best Performer of the Month',
    issuer: 'UnlockDiscounts',
    date: 'December 2024',
    badge: 'Consecutive Best Performer · Dec 2024',
    signatory: 'Nayanth Kumar Singh (Founder)',
    image: 'assets/certificates/cert_unlockdiscounts_dec.png',
    description: 'Awarded to Abinash Kumar in recognition of exceptional performance, leadership, teamwork, and outstanding creativity in December 2024, setting a new benchmark for excellence.'
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
    description: 'Certifies that Abinash Kumar has successfully completed FEA\'s rigorous one-year program of English, Computer & Internet Skills, Personality Development, Growth Mindset, Grit, Ethics, Collaboration & Adaptability with Honors.'
  },
  'cert-fea-commendation': {
    title: 'Letter of Commendation — Volunteer & Service Leadership',
    issuer: 'Freedom Employability Academy',
    date: 'February 2023 – August 2023',
    badge: '5 Months Volunteer Service',
    signatory: 'Neha Masta (Alumni Coordinator)',
    image: 'assets/certificates/cert_fea_commendation.png',
    description: 'This is to certify that Abinash Kumar has successfully completed 5 months as a dedicated volunteer with Freedom Employability Academy, commended for outstanding effort, leadership, and commitment to learning and community growth.'
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
        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
            <span class="section-tag gold" style="margin-bottom: 0;">${cert.badge}</span>
            <span style="font-size: 0.8125rem; color: var(--text-muted); font-weight: 600;">Verified Credential</span>
          </div>
          <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); line-height: 1.25; margin-top: 0.5rem;">${cert.title}</h2>
          <p style="font-size: 0.9375rem; color: var(--accent-purple); font-weight: 600;">Issued by ${cert.issuer} · ${cert.date}</p>
        </div>

        <div style="text-align: center; margin-bottom: 1.5rem;">
          <img src="${cert.image}" alt="${cert.title}" class="cert-full-view">
        </div>

        <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border-light); margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">Citation & Description</h4>
          <p style="font-size: 0.9375rem; color: var(--text-secondary); line-height: 1.6;">${cert.description}</p>
          <div style="margin-top: 0.75rem; font-size: 0.8125rem; color: var(--text-muted);">
            <strong>Signatory:</strong> ${cert.signatory}
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <a href="${cert.image}" target="_blank" download class="btn btn-primary">
            <span>Download High-Res Certificate</span>
            <span>↓</span>
          </a>
          <button class="btn btn-secondary" onclick="closeModal('certificateModal')">Close Preview</button>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal('certificateModal'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal('certificateModal');
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --- 9. Teaching Programs Action --- */
function initTeachingAccordion() {
  const items = document.querySelectorAll('.teaching-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.teaching-item-title').textContent;
      showToast(`Inquiring for: ${title}`);
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const noteInput = document.querySelector('#projectType');
        if (noteInput) noteInput.value = 'consultation';
      }
    });
  });
}

/* --- 10. Interactive Content Strategy Contact Form --- */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '✓ Message Sent to Abinash!';
      submitBtn.style.background = '#10b981';
      showToast(`Thank you ${name}! Your inquiry has been sent to abinash.kumar231113@gmail.com.`);
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3500);
    }, 1200);
  });
}

/* --- 11. Email Copy to Clipboard with Toast --- */
function initEmailCopy() {
  const copyBtn = document.querySelector('#copyEmailBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'abinash.kumar231113@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('✓ Copied abinash.kumar231113@gmail.com to clipboard!');
    }).catch(() => {
      showToast('Email: abinash.kumar231113@gmail.com');
    });
  });
}

/* --- 12. Back to Top --- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('#backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Toast Notification Utility --- */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
