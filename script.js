/* ============================================
   SECUREME — script.js
   Preserves: scrollToSection(), contactForm submit
============================================ */

// ─── SCROLL TO SECTION ───────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = document.getElementById('mainNav')?.offsetHeight ?? 68;
  const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ─── NAV: sticky shadow + mobile toggle ──────
(function () {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  // Sticky shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger toggle
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Close mobile nav on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ─── SCROLL REVEAL ────────────────────────────
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
})();

// ─── CONTACT FORM ─────────────────────────────
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const nameInput  = document.getElementById('fullName');
  const phoneInput = document.getElementById('phone');
  const nameError  = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const btn        = document.getElementById('submitBtn');

  // Reset errors
  nameInput.classList.remove('error');
  phoneInput.classList.remove('error');
  nameError.textContent  = '';
  phoneError.textContent = '';

  let valid = true;

  // Name validation
  const name = nameInput.value.trim();
  if (!name || name.length < 2) {
    nameInput.classList.add('error');
    nameError.textContent = 'Please enter your full name.';
    valid = false;
  }

  // Phone validation — basic SA number check
  const phone = phoneInput.value.trim().replace(/\s+/g, '');
  const phonePattern = /^(\+27|0)[6-8][0-9]{8}$/;
  if (!phone) {
    phoneInput.classList.add('error');
    phoneError.textContent = 'Please enter your phone number.';
    valid = false;
  } else if (!phonePattern.test(phone)) {
    phoneInput.classList.add('error');
    phoneError.textContent = 'Enter a valid South African mobile number.';
    valid = false;
  }

  if (!valid) {
    // Focus first error
    const firstError = this.querySelector('input.error');
    firstError?.focus();
    return;
  }

  // Simulate submission
  btn.classList.add('loading');
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('contactForm').hidden = true;
    document.getElementById('formSuccess').hidden = false;
    document.getElementById('formSuccess').focus();
  }, 1200);
});

// ─── SMOOTH NAV LINK SCROLLING ────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const id = this.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    scrollToSection(id);
  });
});