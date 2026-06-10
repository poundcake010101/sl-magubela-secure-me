/* ============================================
   SECUREME — script.js
============================================ */

// ─── CONFIG ──────────────────────────────────
const WHATSAPP_NUMBER = '27660670102';
const FORMSPREE_URL   = 'https://formspree.io/f/xykapgar';

// ─── SCROLL TO SECTION ───────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = document.getElementById('mainNav')?.offsetHeight ?? 68;
  const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ─── NAV ──────────────────────────────────────
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

// ─── SMOOTH NAV LINKS ─────────────────────────
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

// ─── WHATSAPP HELPERS ─────────────────────────
function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}

function openWhatsAppDirect() {
  openWhatsApp('Hi SecureMe! I would like to find out more about your GPS safety devices.');
}

// ─── PLAN MODAL ───────────────────────────────
const planModal    = document.getElementById('planModal');
const planForm     = document.getElementById('planForm');
const modalSuccess = document.getElementById('modalSuccess');
let   currentDevice = '';

function openPlanModal(deviceName, price, imgSrc) {
  currentDevice = deviceName;
  document.getElementById('modalTitle').textContent     = deviceName;
  document.getElementById('modalPrice').textContent     = price;
  document.getElementById('modalDeviceImg').src         = imgSrc;
  document.getElementById('modalDeviceImg').alt         = deviceName;

  planForm.hidden      = false;
  modalSuccess.hidden  = true;
  planForm.reset();
  clearModalErrors();
  resetModalBtn();

  planModal.hidden = false;
  requestAnimationFrame(() => planModal.classList.add('open'));
  setTimeout(() => document.getElementById('planFirstName')?.focus(), 80);
  document.body.style.overflow = 'hidden';
}

function closePlanModal() {
  planModal.classList.remove('open');
  setTimeout(() => {
    planModal.hidden = true;
    document.body.style.overflow = '';
  }, 250);
}

document.getElementById('modalClose')?.addEventListener('click', closePlanModal);
planModal?.addEventListener('click', e => { if (e.target === planModal) closePlanModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !planModal?.hidden) closePlanModal(); });

// Plan form → build WhatsApp message and redirect
planForm?.addEventListener('submit', function (e) {
  e.preventDefault();
  clearModalErrors();

  const firstName = document.getElementById('planFirstName');
  const lastName  = document.getElementById('planLastName');
  const phone     = document.getElementById('planPhone');
  const email     = document.getElementById('planEmail');
  const address   = document.getElementById('planAddress');
  let valid = true;

  if (!firstName.value.trim()) {
    showFieldError('planFirstNameError', firstName, 'Please enter your first name.');
    valid = false;
  }
  if (!lastName.value.trim()) {
    showFieldError('planLastNameError', lastName, 'Please enter your surname.');
    valid = false;
  }

  const phoneVal = phone.value.trim().replace(/\s+/g, '');
  if (!phoneVal) {
    showFieldError('planPhoneError', phone, 'Please enter your phone number.');
    valid = false;
  } else if (!/^(\+27|0)[6-8][0-9]{8}$/.test(phoneVal)) {
    showFieldError('planPhoneError', phone, 'Enter a valid South African mobile number.');
    valid = false;
  }

  const emailVal = email.value.trim();
  if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    showFieldError('planEmailError', email, 'Enter a valid email address.');
    valid = false;
  }

  if (!valid) {
    planForm.querySelector('input.error, textarea.error')?.focus();
    return;
  }

  // Build WhatsApp pre-filled message
  const fullName    = `${firstName.value.trim()} ${lastName.value.trim()}`;
  const emailLine   = emailVal ? `Email: ${emailVal}` : '';
  const addressLine = address.value.trim() ? `Address: ${address.value.trim()}` : '';

  const message =
  `*SecureMe Plan Request*

  *Device:* ${currentDevice}
  *Name:* ${fullName}
  *Phone:* ${phone.value.trim()}
  ${emailLine}
  ${addressLine}

  I would like to activate the ${currentDevice} plan. Please get in touch with me.`;

  // Show success briefly then open WhatsApp
  planForm.hidden     = false;
  modalSuccess.hidden = false;
  planForm.style.display = 'none';

  setTimeout(() => {
    closePlanModal();
    openWhatsApp(message);
  }, 1200);
});

// ─── CONTACT FORM → FORMSPREE + WHATSAPP ─────
document.getElementById('contactForm')?.addEventListener('submit', async function (e) {
  e.preventDefault();

  const nameInput  = document.getElementById('fullName');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('contactEmail');
  const nameError  = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');
  const btn        = document.getElementById('submitBtn');

  // Reset
  [nameInput, phoneInput, emailInput].forEach(el => el?.classList.remove('error'));
  [nameError, phoneError, emailError].forEach(el => { if (el) el.textContent = ''; });

  let valid = true;

  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
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

  const emailVal = emailInput?.value.trim();
  if (emailVal && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    emailInput.classList.add('error');
    emailError.textContent = 'Enter a valid email address.';
    valid = false;
  }

  if (!valid) {
    this.querySelector('input.error')?.focus();
    return;
  }

  btn.classList.add('loading');
  btn.disabled = true;

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      this.hidden = true;
      const success = document.getElementById('formSuccess');
      success.hidden = false;
      success.focus();
    } else {
      const data = await res.json().catch(() => ({}));
      const msg = data?.errors?.map(err => err.message).join(', ') || 'Something went wrong. Please try again.';
      alert(msg);
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  } catch {
    alert('Network error. Please check your connection and try again.');
    btn.classList.remove('loading');
    btn.disabled = false;
  }
});

// ─── HELPERS ──────────────────────────────────
function clearModalErrors() {
  ['planFirstName','planLastName','planPhone','planEmail'].forEach(id => {
    document.getElementById(id)?.classList.remove('error');
  });
  ['planFirstNameError','planLastNameError','planPhoneError','planEmailError'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

function resetModalBtn() {
  const btn = document.getElementById('planSubmitBtn');
  if (btn) { btn.classList.remove('loading'); btn.disabled = false; }
}

function showFieldError(errorId, inputEl, message) {
  inputEl.classList.add('error');
  const el = document.getElementById(errorId);
  if (el) el.textContent = message;
}