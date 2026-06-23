# WDD 331R Practice Site

**Student:** Hunter Evans  
**Semester:** Spring 2026  
**Live Site:** [View Site](https://hunterevans0.github.io/wdd331-practice/)

## Overview

This repository demonstrates advanced CSS techniques learned in **WDD 331R: Advanced CSS** at BYU-I. The site uses a modular, maintainable architecture based on **SMACSS** (Scalable and Modular Architecture for CSS) principles. All styles are organized into layers and consolidated into a single minified bundle.

## Project Structure

### CSS Architecture

The stylesheet is organized into layers, each with a specific responsibility:

```
css/
├── main.css                      # Import manifest (controls cascade order)
├── print.css                     # @media print rules for resume.html
├── tokens/                       # Design tokens (shared values)
│   ├── colors.css               # OKLCH seeds + light-dark() semantic tokens
│   └── variables.css            # Spacing, typography, radius, shadow tokens
├── base/                         # Base styles (resets and elements)
│   ├── reset.css                # Browser reset and box-model normalization
│   └── elements.css             # HTML element styles (body, headings, links, form controls)
├── components/                   # Reusable components
│   ├── theme-toggle.css         # Light/dark/system theme control
│   ├── cards.css                # Card, site-hero, feature-grid styles
│   ├── effects.css              # Visual effects showcase styles
│   ├── resume.css               # Resume / CV screen styling
│   └── forms.css                # Contact form styling
└── utilities/                    # Utility classes
    └── utilities.css            # Helper classes (.visually-hidden, .stack)
```

### Assignment Pages

- **[Home](index.html)** — Landing page showcasing the site architecture and completed assignments
- **[Custom Properties and Nesting](unit-1/custom-properties/index.html)** — Unit 1 assignment exploring CSS custom properties and native nesting
- **[Layered Components](unit-2/layered-components/index.html)** — Unit 2 assignment demonstrating the layered component architecture
- **[Editorial Grid Layout](unit-4/grid-layouts/editorial.html)** — Unit 4 assignment building a responsive article layout with `grid-template-areas`
- **[Responsive Card Grid](unit-4/grid-layouts/cards.html)** — Unit 4 assignment building a fluid card grid with `auto-fit` and `minmax()`, upgraded to align card internals across each row with `grid-template-rows: subgrid`
- **[Container Queries](unit-4/advanced/container-demo.html)** — Unit 4 Advanced assignment: one component restyles itself from its `container-type` context using `@container` rules instead of media queries
- **[Sticky Module](unit-4/advanced/sticky-demo.html)** — Unit 4 Advanced assignment: sticky section headers, demonstrating and fixing the `overflow: hidden` scroll-container trap with `overflow: clip`
- **[Type Scale & Fluid Type](unit-5/type-scale-demo.html)** — Unit 5 assignment: a modular type scale with `clamp()`-based fluid sizing
- **[Resume / CV](resume.html)** — Printable resume page with a dedicated print stylesheet (`css/print.css`): hidden screen chrome, `pt` serif type, link URLs surfaced with `::after`, `break-inside: avoid` on entries, `orphans`/`widows` control, and `print-color-adjust: exact` on the brand header
- **[Contact Form](contact.html)** — Accessible stub form (label/`for`+`id` pairs) styled with `accent-color`; the message `textarea` uses `field-sizing: content` with `min`/`max-height` guardrails

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

### Spacing, Typography, and Effects (`css/tokens/variables.css`)
- **Spacing:** `--spacing-xs` … `--spacing-xl`
- **Typography:** `--font-family-sans`, `--font-size-sm/md/lg`, `--line-height`
- **Radii:** `--radius-sm`, `--radius-md`, `--radius-lg`
- **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Deployment

This site automatically deploys to [GitHub Pages](https://github.io) on every push to the `main` branch. The `dist/` folder contents are served as the static site.