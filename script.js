/* ============================================
   SECUREME — script.js
   Preserves: scrollToSection(), contactForm submit
   Adds: Plan modal, Formspree integration
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
  const nav    = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

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

// ─── PLAN MODAL ───────────────────────────────
const planModal   = document.getElementById('planModal');
const modalClose  = document.getElementById('modalClose');
const planForm    = document.getElementById('planForm');
const modalSuccess = document.getElementById('modalSuccess');

function openPlanModal(deviceName, price, imgSrc) {
  document.getElementById('modalTitle').textContent   = deviceName;
  document.getElementById('modalPrice').textContent   = price;
  document.getElementById('modalDevice').value        = deviceName;
  document.getElementById('modalDeviceImg').src       = imgSrc;
  document.getElementById('modalDeviceImg').alt       = deviceName;
  document.getElementById('modalSuccessDevice').textContent = deviceName;

  // Reset form state
  planForm.hidden        = false;
  modalSuccess.hidden    = true;
  planForm.reset();
  clearPlanErrors();
  resetPlanBtn();

  planModal.hidden = false;
  // Trigger open animation on next frame
  requestAnimationFrame(() => planModal.classList.add('open'));

  // Trap focus — focus first input
  setTimeout(() => document.getElementById('planName')?.focus(), 80);
  document.body.style.overflow = 'hidden';
}

function closePlanModal() {
  planModal.classList.remove('open');
  setTimeout(() => {
    planModal.hidden = true;
    document.body.style.overflow = '';
  }, 250);
}

// Close via button or overlay click
modalClose?.addEventListener('click', closePlanModal);
planModal?.addEventListener('click', function (e) {
  if (e.target === planModal) closePlanModal();
});

// Close on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !planModal.hidden) closePlanModal();
});

// ─── PLAN FORM SUBMIT → FORMSPREE ────────────
planForm?.addEventListener('submit', async function (e) {
  e.preventDefault();
  clearPlanErrors();

  const name  = document.getElementById('planName');
  const phone = document.getElementById('planPhone');
  const email = document.getElementById('planEmail');
  let valid = true;

  if (!name.value.trim() || name.value.trim().length < 2) {
    showError('planNameError', name, 'Please enter your full name.');
    valid = false;
  }

  const phoneVal = phone.value.trim().replace(/\s+/g, '');
  if (!phoneVal) {
    showError('planPhoneError', phone, 'Please enter your phone number.');
    valid = false;
  } else if (!/^(\+27|0)[6-8][0-9]{8}$/.test(phoneVal)) {
    showError('planPhoneError', phone, 'Enter a valid South African mobile number.');
    valid = false;
  }

  const emailVal = email.value.trim();
  if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    showError('planEmailError', email, 'Enter a valid email address.');
    valid = false;
  }

  if (!valid) {
    planForm.querySelector('input.error')?.focus();
    return;
  }

  const btn = document.getElementById('planSubmitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  const formData = new FormData(this);

  try {
    const res = await fetch('https://formspree.io/f/xykapgar', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      planForm.hidden    = true;
      modalSuccess.hidden = false;
      document.getElementById('modalSuccess').focus();
    } else {
      const data = await res.json();
      const msg = data?.errors?.map(err => err.message).join(', ') || 'Something went wrong. Please try again.';
      alert(msg);
      resetPlanBtn();
    }
  } catch (err) {
    alert('Network error. Please check your connection and try again.');
    resetPlanBtn();
  }
});

function clearPlanErrors() {
  ['planName','planPhone','planEmail'].forEach(id => {
    document.getElementById(id)?.classList.remove('error');
  });
  ['planNameError','planPhoneError','planEmailError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

function resetPlanBtn() {
  const btn = document.getElementById('planSubmitBtn');
  if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
}

// ─── CONTACT FORM → FORMSPREE ─────────────────
document.getElementById('contactForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nameInput  = document.getElementById('fullName');
  const phoneInput = document.getElementById('phone');
  const nameError  = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const btn        = document.getElementById('submitBtn');

  // Reset
  nameInput.classList.remove('error');
  phoneInput.classList.remove('error');
  nameError.textContent  = '';
  phoneError.textContent = '';

  let valid = true;

  const name = nameInput.value.trim();
  if (!name || name.length < 2) {
    nameInput.classList.add('error');
    nameError.textContent = 'Please enter your full name.';
    valid = false;
  }

  const phone = phoneInput.value.trim().replace(/\s+/g, '');
  if (!phone) {
    phoneInput.classList.add('error');
    phoneError.textContent = 'Please enter your phone number.';
    valid = false;
  } else if (!/^(\+27|0)[6-8][0-9]{8}$/.test(phone)) {
    phoneInput.classList.add('error');
    phoneError.textContent = 'Enter a valid South African mobile number.';
    valid = false;
  }

  if (!valid) {
    this.querySelector('input.error')?.focus();
    return;
  }

  btn.classList.add('loading');
  btn.disabled = true;

  const formData = new FormData(this);

  try {
    const res = await fetch('https://formspree.io/f/xykapgar', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      this.hidden = true;
      const success = document.getElementById('formSuccess');
      success.hidden = false;
      success.focus();
    } else {
      const data = await res.json();
      const msg = data?.errors?.map(err => err.message).join(', ') || 'Something went wrong. Please try again.';
      alert(msg);
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  } catch (err) {
    alert('Network error. Please check your connection and try again.');
    btn.classList.remove('loading');
    btn.disabled = false;
  }
});

// ─── HELPER ───────────────────────────────────
function showError(errorId, inputEl, message) {
  inputEl.classList.add('error');
  const el = document.getElementById(errorId);
  if (el) el.textContent = message;
}