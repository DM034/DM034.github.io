# Michael Raharison — Portfolio

Personal portfolio website (FR/EN) with dynamic PDF CV generation from live page content.

## Overview

- Stack: HTML, SCSS/CSS, JavaScript, Bootstrap 4, jQuery
- i18n: French / English via `assets/js/translations.js`
- Templates: `index.template.html` + `_includes/*.html` components
- HTML build: `compile_templates.py` → generates `index.html`
- CV PDF: dynamic generation (jsPDF) from on-page sections

## Main structure

```text
.
├── index.template.html          # Main source file (with {% include ... %})
├── index.html                   # Generated file for publishing
├── _includes/                   # Reusable HTML blocks
│   ├── header.html
│   ├── navbar.html
│   ├── about.html
│   ├── resume.html
│   ├── portfolio.html
│   ├── contact.html
│   ├── footer.html
│   └── scripts.html             # i18n + PDF logic + interactions
├── assets/
│   ├── css/
│   ├── js/
│   │   └── translations.js      # FR/EN dictionary
│   ├── imgs/
│   └── scss/
├── compile_templates.py         # Compiles includes into index.html
└── resume.html                  # Standalone alternative page
```

## Local setup

### 1) Compile the page

```bash
python3 compile_templates.py
```

### 2) Start a local server

```bash
python3 -m http.server 8000
```

Then open:

- `http://localhost:8000/index.html`

## Recommended workflow

1. Edit source files (`index.template.html`, `_includes/*`, `assets/js/translations.js`, SCSS/CSS).
2. Rebuild:
   ```bash
   python3 compile_templates.py
   ```
3. Verify rendering (site + CV PDF download button).
4. Commit/push including **always** `index.html` when includes are changed.

## Internationalization (FR/EN)

- Text content is centralized in `assets/js/translations.js`.
- Runtime application is handled in `_includes/scripts.html` (`applyLanguage`).
- Active language is stored in `localStorage` (`siteLanguage`).

## CV PDF generation

- Triggered by the `#downloadCvBtn` button.
- Dynamically generated with `jsPDF` in `_includes/scripts.html`.
- Data is extracted from page content (experience, education, skills, contact).
- PDF contact links:
  - Phone clickable to WhatsApp
  - LinkedIn clickable to profile URL

## Deployment

Deploy with GitHub Pages from the `main` branch.

URL: `https://DM034.github.io`

## Useful notes

- Do not manually edit `index.html` for structural changes; edit `index.template.html` / `_includes` first.
- If rendering looks inconsistent, rebuild before debugging.
