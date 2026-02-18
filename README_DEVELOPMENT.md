# Michael Raharison - Portfolio

A professional portfolio website built with Bootstrap and custom JavaScript for multi-language support and PDF generation.

## Features

- **Multi-language support**: French (FR) and English (EN) with browser localStorage
- **PDF CV Download**: Generate and download CV in the active language
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Stack**: Bootstrap 4, jQuery, custom CSS/SCSS

## File Structure

```
.
├── index.html                 # Main compiled HTML (served by GitHub Pages)
├── _includes/                 # HTML template components
│   ├── header.html
│   ├── navbar.html           # Navigation with CV download button
│   ├── about.html
│   ├── resume.html           # Experience, education, skills
│   ├── portfolio-blog-commented.html
│   ├── contact.html
│   ├── footer.html
│   └── scripts.html          # All JavaScript (i18n, PDF gen, etc)
├── assets/
│   ├── css/                  # Compiled CSS from SCSS
│   ├── js/                   # Main application JS
│   ├── imgs/                 # Images and avatar
│   └── vendors/              # Third-party libraries
```

## Development Workflow

### Making Changes

1. **Modify template files** in `_includes/` directory:
   - `navbar.html` - navigation and buttons
   - `resume.html` - experience, education, skills
   - `about.html` - personal information
   - `scripts.html` - JavaScript, translations, PDF generation

2. **Compile the HTML locally**:
   ```bash
   python3 compile_templates.py
   ```
   This reads all `_includes/*.html` files and injects them into `index.html`.

3. **Test locally**:
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000/index.html
   ```

4. **Commit and push**:
   ```bash
   git add index.html .gitignore
   git commit -m "Update CV and templates"
   git push origin main
   ```

### Why This Approach?

- **GitHub Pages is static**: It cannot execute Python, Ruby, or any server-side code
- **Pre-compiled HTML**: The `index.html` must be fully compiled before uploading to GitHub
- **Local compilation**: Use `compile_templates.py` to embed templates before committing
- **`.gitignore`**: The `compile_templates.py` is excluded from Git (local development only)

## PDF Generation

The PDF download button in the navbar:
- Reads content from the current page
- Generates a PDF with the active language (FR or EN)
- Downloads with filename: `CV_Michael_Raharison_FR.pdf` or `CV_Michael_Raharison_EN.pdf`

**Libraries used**:
- `html2pdf.js` - Primary PDF generator (handles images)
- `jsPDF` - Fallback text-based generator
- `html2canvas` - Renders HTML to canvas for image conversion

## Deployment

Push to the `main` branch on GitHub. Your site will be live at:
- `https://DM034.github.io`

## Technologies

- **Bootstrap 4.3.1** - Responsive UI framework
- **jQuery 3.4.1** - DOM manipulation
- **jsPDF 2.5.1** - PDF generation
- **html2pdf.js** - HTML to PDF converter
- **html2canvas 1.4.1** - Canvas rendering
- **SCSS** - CSS preprocessor

---

**Last updated**: February 18, 2026
