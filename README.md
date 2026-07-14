# Hunter Evans — Portfolio

**Student:** Hunter Evans  
**Semester:** Spring 2026  
**Live Site:** [View Site](https://hunterevans0.github.io/wdd331-practice/)

## Overview

This is my front-end portfolio, built for **WDD 331R: Advanced CSS** at BYU-I. The
homepage introduces me to a visitor and curates my strongest work as a set of
skill-focused projects; each project links to a live demo of the technique it
teaches. The top-level pages (home, résumé, contact) share a sticky site header
and rich footer, and **every assignment page carries the same shared header** —
brand wordmark, back-to-home nav, and the light/dark theme control — so the site
reads as one product rather than a stack of assignments.

Under the hood it uses a modular, maintainable architecture based on **SMACSS**
(Scalable and Modular Architecture for CSS) principles. All styles are organized
into layers and consolidated into a single minified bundle. The whole thing —
design tokens, layout, motion, and theming — is hand-authored CSS, no framework.

## Project Structure

### CSS Architecture

The stylesheet is organized into layers, each with a specific responsibility:

```
css/
├── main.css                      # Import manifest (controls cascade order)
├── site-chrome.css               # Self-contained shared header (namespaced .pf-*) dropped onto every assignment page
├── print.css                     # @media print rules for resume.html
├── tokens/                       # Design tokens (shared values)
│   ├── colors.css               # OKLCH seeds + light-dark() semantic tokens
│   └── variables.css            # Spacing, typography, radius, shadow tokens
├── base/                         # Base styles (resets and elements)
│   ├── reset.css                # Browser reset and box-model normalization
│   └── elements.css             # HTML element styles (body, headings, links, form controls)
├── components/                   # Reusable components
│   ├── theme-toggle.css         # Light/dark/system theme control
│   ├── site-header.css          # Shared sticky navigation (all portfolio pages)
│   ├── portfolio.css            # Homepage: hero, Selected Work grid, About, contact CTA, rich footer
│   ├── cards.css                # Card, site-hero, feature-grid styles
│   ├── effects.css              # Visual effects showcase styles
│   ├── resume.css               # Resume / CV screen styling
│   ├── forms.css                # Contact form + contact-page layout styling
│   └── icons.css                # Inline SVG icon sizing/layout (color via currentColor)
└── utilities/                    # Utility classes
    └── utilities.css            # Helper classes (.visually-hidden, .stack)
```

### How the portfolio is organized

Navigation is two-tiered so nothing is buried and nothing is orphaned:

1. **Featured work** — the homepage **Selected Work** grid highlights the six strongest projects, each framed by the CSS skill it demonstrates.
2. **Full coursework index** — a "Every assignment, grouped by unit" section on the homepage links *every* `unit-*` page, grouped by unit, so all coursework is reachable in one click.
3. **Shared header everywhere** — every assignment page loads `css/site-chrome.css`, which renders the same header (brand → home, primary nav, and the SVG light/dark theme toggle). That header is each deep page's back-to-home path, and it makes the separate demos read as one site.

### Assignment Pages

- **[Home](index.html)** — Portfolio landing page: a bold hero with value proposition and CTAs, a curated **Selected Work** grid (each project framed by the skill it demonstrates, with a pure-CSS preview thumbnail), the full coursework-by-unit index, an About section, and a contact call-to-action
- **[Ward Activity Board](unit-1/custom-properties/index.html)** — Unit 1 assignment exploring CSS custom properties and native nesting
- **[Scripture Study Companion](unit-2/layered-components/index.html)** — Unit 2 assignment demonstrating the layered component architecture
- **[Lightning CSS Setup](unit-2/lightning-css/index.html)** — Unit 2 assignment: a walkthrough page for the Lightning CSS build tooling, styled straight from the shared design tokens
- **[Visual Effects Showcase](unit-3/visual-effects/index.html)** — Unit 3 assignment: gradients, shadows, blend modes, and filters composed for depth and texture
- **[Editorial Grid Layout](unit-4/grid-layouts/editorial.html)** — Unit 4 assignment building a responsive article layout with `grid-template-areas`
- **[Responsive Card Grid](unit-4/grid-layouts/cards.html)** — Unit 4 assignment building a fluid card grid with `auto-fit` and `minmax()`, upgraded to align card internals across each row with `grid-template-rows: subgrid`
- **[Container Queries](unit-4/advanced/container-demo.html)** — Unit 4 Advanced assignment: one component restyles itself from its `container-type` context using `@container` rules instead of media queries
- **[Sticky Module](unit-4/advanced/sticky-demo.html)** — Unit 4 Advanced assignment: sticky section headers, demonstrating and fixing the `overflow: hidden` scroll-container trap with `overflow: clip`
- **[Type Scale & Fluid Type](unit-5/type-scale-demo.html)** — Unit 5 assignment: a modular type scale with `clamp()`-based fluid sizing
- **[Resume / CV](resume.html)** — Printable resume page with a dedicated print stylesheet (`css/print.css`): hidden screen chrome, `pt` serif type, link URLs surfaced with `::after`, `break-inside: avoid` on entries, `orphans`/`widows` control, and `print-color-adjust: exact` on the brand header. Also hosts the **accessible SVG icon system**: a hidden inline Lucide sprite (`<symbol>` + `<use>`) driving the contact rows (phone, email, LinkedIn, GitHub) and the "Back to Home" arrow as decorative icons (`aria-hidden`/`focusable="false"`, text carries the label), plus the theme-toggle rendered as an icon-only control (accessible name via the button's `aria-label`). Icons inherit color through `currentColor`, so they track the light/dark tokens automatically
- **[Contact Form](contact.html)** — Accessible stub form (label/`for`+`id` pairs) styled with `accent-color`; the message `textarea` uses `field-sizing: content` with `min`/`max-height` guardrails
- **[Meaningful Motion](unit-6/motion/index.html)** — Unit 6 assignment: explicit-property `transition`s on nav links, buttons, and cards (no `transition: all`) with faster-in/slower-out hover timing; a compositor-only `@keyframes` pulse (`transform`/`opacity`, `infinite alternate`) on the live status badge; all motion gated behind `@media (prefers-reduced-motion: no-preference)` with a static "live" badge fallback. Choose topic: `@starting-style` card entrance, staggered with `:nth-child` `transition-delay`

### Build Output

```
dist/
└── styles.css                   # Bundled, minified production stylesheet
```

## Build Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/)

### Installation

```bash
npm install
```

This installs all dependencies defined in `package.json`:
- **PostCSS** — CSS transformation tool
- **postcss-cli** — Command-line interface for PostCSS
- **postcss-import** — Resolves `@import` statements
- **postcss-nesting** — Enables native CSS nesting syntax
- **cssnano** — Minifies the final output

### Running the Build

```bash
npm run build:css
```

This command:
1. Creates the `dist/` directory (if it doesn't exist)
2. Reads `css/main.css` (which imports all layers in order)
3. Processes imports using `postcss-import`
4. Compiles nested selectors using `postcss-nesting`
5. Minifies the output using `cssnano`
6. Writes the final bundle to `dist/styles.css`

The resulting stylesheet is a single minified file with all CSS layers combined in the correct cascade order, ready for production use.

## Design Tokens

All design decisions are centralized in token files:

### Colors (`css/tokens/colors.css`)
Built from OKLCH seeds and `light-dark()` semantic tokens:
- `--color-bg` — Page background
- `--color-surface` — Card/panel surface
- `--color-text` / `--color-text-muted` — Body and secondary text
- `--color-accent` / `--color-accent-hover` — Accent and hover accent
- `--color-link` / `--color-link-hover` — Link colors
- `--color-border` / `--color-border-strong` — Borders
- `accent-color` is set on `:root` so form controls inherit the brand color

### Token Audit (Unit 5)

The token files were audited project-wide (every token name searched across all
pages, not just the shared `css/` layer, since the Unit 4/5 pages consume the
built bundle alongside their own stylesheets):
- **Orphans removed** — `--shadow-xl`, the now-redundant `--shadow-color` plus a
  duplicate `--shadow-sm`/`--shadow-md` block in `colors.css` that `variables.css`
  was already overriding, and the legacy `--space-md` / `--spacing-gap` aliases.
- **Near-duplicates consolidated** — shadow tokens now have a single source of
  truth in `variables.css`.
- **Naming drift settled** — radius now uses `--radius-*` only (dropped
  `--border-radius`), typography uses `--font-family-sans` / `--font-size-md`
  (dropped `--font-family` / `--font-size-base`), and the background token is
  `--color-bg` (a broken `--color-background` reference was fixed).
- **Kept (verified in use)** — the `--accent-200…800` ramp and `--font-family-mono`
  are consumed by the Unit 4 and Unit 5 pages through the shared bundle, so they
  are intentionally retained.

After the audit, every declared token is referenced somewhere in the project and
every `var()` reference resolves.

## Dark Mode

This site supports light, dark, and system color schemes. The theme toggle control is in the top header and preferences are persisted to `localStorage`. Color tokens and theme behavior live in `css/tokens/colors.css` and general tokens live in `css/tokens/variables.css`.

The theme persistence script is `js/theme-preference.js` and should be loaded in the document head before the stylesheet to prevent flashes of the wrong theme.

## JavaScript

Three small, dependency-free scripts progressively enhance the static HTML:

- **`js/theme-preference.js`** — restores the saved light/dark/system choice before
  first paint and persists changes to `localStorage`.
- **`js/icon-sprite.js`** — injects the shared Lucide SVG `<symbol>` sprite once per
  page so every page — including the shared assignment-page header — can reference
  icons (such as the theme-toggle contrast glyph) with `<use href="#icon-*">`
  without duplicating markup. Icons still degrade gracefully without JS because
  visible text carries every label.
- **`js/contact-form.js`** — enhances the contact form (see below).

## Contact Form

The contact form on `contact.html` works out of the box and is one line away from
going fully live:

- **Now:** with no backend configured, submitting opens the visitor's mail client
  pre-filled with their message (the `data-fallback-email` on the `<form>`).
- **To go live:** create a form at [Formspree](https://formspree.io) and set the
  form's `action` to your endpoint (e.g. `https://formspree.io/f/xxxxxxx`).
  `js/contact-form.js` then submits with `fetch()` and shows an inline,
  screen-reader-friendly status message — no other changes needed.

### Spacing, Typography, and Effects (`css/tokens/variables.css`)
- **Spacing:** `--spacing-xs` … `--spacing-xl`
- **Typography:** `--font-family-sans`, `--font-size-sm/md/lg`, `--line-height`
- **Radii:** `--radius-sm`, `--radius-md`, `--radius-lg`
- **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Deployment

This site automatically deploys to [GitHub Pages](https://github.io) on every push to the `main` branch. The `dist/` folder contents are served as the static site.