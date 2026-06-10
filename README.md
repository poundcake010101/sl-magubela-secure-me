# 🛡️ SecureMe — Personal Safety Devices Landing Page

> A production-ready landing page for **SecureMe by S.L Magubela Escort Security and Transport** — a GPS wearable panic device business offering 24/7 emergency monitoring across South Africa.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Deployment](#setup--deployment)
- [Configuration](#configuration)
- [WhatsApp Integration](#whatsapp-integration)
- [Formspree Integration](#formspree-integration)
- [Devices & Pricing](#devices--pricing)
- [Tech Stack](#tech-stack)
- [Credits](#credits)

---

## Overview

SecureMe is a high-conversion SaaS-style landing page for a wearable GPS safety device business. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, fully lightweight and fast.

The page is designed to:
- Showcase three GPS safety products
- Capture leads via a contact form (Formspree)
- Convert visitors directly via WhatsApp with pre-filled plan request messages
- Work seamlessly on mobile and desktop

---

## Features

| Feature | Description |
|---|---|
| 🎨 Premium UI | Dark navy + gold theme with glassmorphism nav and micro-animations |
| 📱 Fully Responsive | Mobile-first layout, hamburger nav, stacked grids on small screens |
| 💬 WhatsApp Flow | Choose Plan → fill details → opens WhatsApp with pre-built message |
| 📧 Contact Form | Connected to Formspree with inline validation and success state |
| 🔔 Scroll Reveal | IntersectionObserver fade-in animations on all sections |
| ♿ Accessible | ARIA labels, focus states, `prefers-reduced-motion` support |
| ⚡ Lightweight | No frameworks — pure HTML/CSS/JS, fast load time |
| 🌍 SA-Specific | Phone validation for South African mobile numbers |

---

## Project Structure

```
secureme/
│
├── index.html                   # Main HTML — all sections and modal
├── styles.css                   # All styling — tokens, layout, components
├── script.js                    # All interactivity — nav, modal, forms, WhatsApp
├── README.md                    # This file
│
└── assets/
    ├── logo.jpg                 # S.L Magubela company logo (nav + hero + footer)
    ├── Safety Watch Pro pic.jpg # Product image — Safety Watch Pro
    ├── Guardian Pendant pic.jpg # Product image — Guardian Pendant
    └── Safety Band Lite pic.jpg # Product image — Safety Band Lite
```

---

## Setup & Deployment

### Local

No build step required. Just open `index.html` in a browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (recommended to avoid CORS on assets)
npx serve .
# or
python3 -m http.server 8000
```

### Deploy to Netlify (recommended)

1. Drag and drop the entire project folder onto [netlify.com/drop](https://app.netlify.com/drop)
2. Your site is live instantly with a public URL
3. Optional: connect a custom domain in Netlify settings

### Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial SecureMe deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/secureme.git
git push -u origin main
```

Then go to **Settings → Pages → Source → main branch** in your GitHub repo.

---

## Configuration

Before going live, update these two values in `script.js`:

### 1. WhatsApp Number

```js
// Line 3 of script.js
const WHATSAPP_NUMBER = '27000000000'; // ← Replace with your number
```

Format: country code + number, no spaces or symbols.

| Your number | Correct format |
|---|---|
| 082 123 4567 | `27821234567` |
| 071 987 6543 | `27719876543` |
| +27 60 123 4567 | `27601234567` |

### 2. Formspree Endpoint

```js
// Line 4 of script.js
const FORMSPREE_URL = 'https://formspree.io/f/xykapgar'; // ← Already configured
```

This is already set up and active. To change it, replace the endpoint with a new one from your Formspree dashboard.

---

## WhatsApp Integration

WhatsApp is integrated at three levels:

### 1. Floating Button
A fixed green button in the bottom-right corner of every page. Clicking it opens WhatsApp with a generic greeting message.

### 2. Inline Buttons
"Chat on WhatsApp" buttons appear in the hero section, CTA section, and Get in Touch section.

### 3. Choose Plan → WhatsApp Flow

When a visitor clicks **Choose Plan** on any device:

1. A modal opens with the selected device pre-filled
2. Visitor enters: First Name, Surname, Phone, Email (optional), Address (optional)
3. On submit, a pre-formatted WhatsApp message is built:

```
🛡️ SecureMe Plan Request

Device: Safety Watch Pro
👤 Name: Thabo Nkosi
📞 Phone: 071 234 5678
📧 Email: thabo@email.com
🏠 Address: 12 Main Street, Pretoria

I would like to activate the Safety Watch Pro plan.
Please get in touch with me.
```

4. WhatsApp opens on the visitor's device with the message ready to send
5. Visitor taps **Send** — they are directly in contact

No backend required for this flow.

---

## Formspree Integration

The **Get in Touch** contact form submits to Formspree:

- **Endpoint:** `https://formspree.io/f/xykapgar`
- **Fields sent:** `name`, `phone`, `email`, `message`
- **Method:** `fetch` POST with `Accept: application/json`
- **On success:** form hides, success card appears
- **On failure:** error message shown, button re-enabled (no stuck spinner)

To view submissions, log into [formspree.io](https://formspree.io) and open the `xykapgar` form. Formspree also forwards submissions to your registered email.

---

## Devices & Pricing

| Device | Price | Key Features |
|---|---|---|
| Safety Watch Pro | From R299/month | GPS, SOS, Two-Way Calling, Fall Detection, Heart Rate Monitor, 7-day battery |
| Guardian Pendant | From R199/month | GPS, SOS, Geofencing, Waterproof, 30-day battery |
| Safety Band Lite | From R149/month | GPS, SOS, Geofencing, 14-day battery |

All plans include 24/7 monitoring, real-time GPS tracking, and emergency response coordination.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, ARIA-labelled) |
| Styling | CSS3 (custom properties, Grid, Flexbox, animations) |
| Scripting | Vanilla JavaScript (ES6+, async/await, IntersectionObserver) |
| Font | Inter — Google Fonts |
| Forms | Formspree (free tier) |
| Messaging | WhatsApp Business API (wa.me deep link) |
| Hosting | Netlify / GitHub Pages compatible |

---

## Credits

**Built by:** Siyabonga Mnguni  
**Brand:** S.L Magubela Escort Security and Transport  
**Project:** SecureMe GPS Safety Devices  
**Year:** 2026  

---

*© 2026 SecureMe by S L Magubela. All rights reserved.*
