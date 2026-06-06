/* ============================================================
   SL MAGUBELA ESCORT SECURITY & TRANSPORT
   Phase 1 — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---------- ELEMENTS ---------- */
  const nav           = document.getElementById('nav');
  const hamburger     = document.getElementById('hamburger');
  const navLinks      = document.getElementById('navLinks');
  const quoteModal    = document.getElementById('quoteModal');
  const closeModal    = document.getElementById('closeModal');
  const quoteForm     = document.getElementById('quoteForm');
  const formSuccess   = document.getElementById('formSuccess');

  const openTriggers = [
    document.getElementById('openQuoteModal'),
    document.getElementById('openQuoteModalHero'),
    document.getElementById('openQuoteModalVisual'),
  ];

  /* ---------- STICKY NAV SHADOW ---------- */
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- HAMBURGER ---------- */
  hamburger && hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on link click
  navLinks && navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* ---------- MODAL: OPEN ---------- */
  const openModal = () => {
    quoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus first input
    setTimeout(() => {
      const first = quoteModal.querySelector('input');
      if (first) first.focus();
    }, 250);
  };

  openTriggers.forEach(btn => {
    btn && btn.addEventListener('click', openModal);
  });

  /* ---------- MODAL: CLOSE ---------- */
  const closeModalFn = () => {
    quoteModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeModal && closeModal.addEventListener('click', closeModalFn);

  // Close on overlay click
  quoteModal && quoteModal.addEventListener('click', (e) => {
    if (e.target === quoteModal) closeModalFn();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quoteModal.classList.contains('active')) {
      closeModalFn();
    }
  });

  /* ---------- FORM VALIDATION & SUBMIT ---------- */
  const validateField = (field) => {
    const val = field.value.trim();
    if (field.required && !val) {
      field.classList.add('error');
      return false;
    }
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      field.classList.add('error');
      return false;
    }
    if (field.type === 'tel' && val && !/^[0-9\s\+\-\(\)]{7,}$/.test(val)) {
      field.classList.add('error');
      return false;
    }
    field.classList.remove('error');
    return true;
  };

  // Live validation on blur
  quoteForm && quoteForm.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => field.classList.remove('error'));
  });

  quoteForm && quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = quoteForm.querySelectorAll('input[required], select[required]');
    let valid = true;
    fields.forEach(f => { if (!validateField(f)) valid = false; });
    if (!valid) return;

    const submitBtn = quoteForm.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    /* 
      TODO: Replace with your form endpoint (Formspree, Netlify, or backend API).
      Example with Formspree:
      
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(quoteForm)))
      })
      .then(r => r.ok ? showSuccess() : showError())
      .catch(() => showError());
    */

    // Simulate submission (remove when backend is connected)
    setTimeout(showSuccess, 1200);
  });

  const showSuccess = () => {
    quoteForm.hidden = true;
    formSuccess.hidden = false;
    formSuccess.removeAttribute('hidden');
  };

  /* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-height')) + 
        parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--ebar-height'));
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- INTERSECTION OBSERVER: FADE IN SECTIONS ---------- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

})();

/* ============================================================
   PHASE 2 — Additional triggers + Testimonials + Counter
   ============================================================ */

(function () {
  'use strict';

  /* ---------- EXTRA MODAL TRIGGERS ---------- */
  const extraTriggers = [
    document.getElementById('openQuoteServices'),
    document.getElementById('openQuoteWhyUs'),
    document.getElementById('openQuoteHiw'),
  ];
  extraTriggers.forEach(btn => {
    btn && btn.addEventListener('click', () => {
      const modal = document.getElementById('quoteModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          const first = modal.querySelector('input');
          if (first) first.focus();
        }, 250);
      }
    });
  });

  /* ---------- INLINE FORM ---------- */
  const inlineForm    = document.getElementById('inlineQuoteForm');
  const inlineSuccess = document.getElementById('inlineFormSuccess');

  const validateInlineField = (field) => {
    const val = field.value.trim();
    if (field.required && !val) { field.classList.add('error'); return false; }
    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { field.classList.add('error'); return false; }
    if (field.type === 'tel' && val && !/^[0-9\s\+\-\(\)]{7,}$/.test(val)) { field.classList.add('error'); return false; }
    field.classList.remove('error');
    return true;
  };

  inlineForm && inlineForm.querySelectorAll('input, select, textarea').forEach(f => {
    f.addEventListener('blur', () => validateInlineField(f));
    f.addEventListener('input', () => f.classList.remove('error'));
  });

  inlineForm && inlineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = inlineForm.querySelectorAll('input[required]');
    let valid = true;
    fields.forEach(f => { if (!validateInlineField(f)) valid = false; });
    if (!valid) return;

    const btn = inlineForm.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // TODO: wire to same endpoint as modal form
    setTimeout(() => {
      inlineForm.hidden = true;
      inlineSuccess.hidden = false;
      inlineSuccess.removeAttribute('hidden');
    }, 1200);
  });

  /* ---------- TESTIMONIALS SLIDER ---------- */
  const track  = document.getElementById('testimonialsTrack');
  const dots   = document.querySelectorAll('.testimonials__dot');
  const btnPrev = document.getElementById('testimonialPrev');
  const btnNext = document.getElementById('testimonialNext');

  if (track) {
    let current = 0;
    const total = track.children.length;
    let autoTimer;

    const goTo = (index) => {
      current = (index + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    const startAuto = () => {
      autoTimer = setInterval(() => goTo(current + 1), 5000);
    };
    const resetAuto = () => {
      clearInterval(autoTimer);
      startAuto();
    };

    btnPrev && btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    btnNext && btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

    // Touch swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetAuto(); }
    });

    startAuto();
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  const counters = document.querySelectorAll('.stats-bar__num[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const end   = parseInt(el.getAttribute('data-target'), 10);
        const dur   = 1500;
        const step  = Math.ceil(end / (dur / 16));
        let current = 0;
        const tick  = () => {
          current = Math.min(current + step, end);
          el.textContent = current;
          if (current < end) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

})();