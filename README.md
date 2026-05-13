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
├── tokens/                       # Design tokens (shared values)
│   ├── colors.css               # Color tokens (--color-primary, etc.)
│   └── variables.css            # Spacing, typography, radius, shadow tokens
├── base/                         # Base styles (resets and elements)
│   ├── reset.css                # Browser reset and box-model normalization
│   └── elements.css             # HTML element styles (body, headings, links)
├── layout/                       # Page layout structure (optional)
│   └── primary.css
├── components/                   # Reusable components
│   ├── cards.css                # Card, site-hero, feature-grid styles
│   └── buttons.css
└── utilities/                    # Utility classes
    └── utilities.css            # Helper classes (.visually-hidden, .stack)
```

### Assignment Pages

- **[Home](index.html)** — Landing page showcasing the site architecture and completed assignments
- **[Custom Properties and Nesting](unit-1/custom-properties/index.html)** — Unit 1 assignment exploring CSS custom properties and native nesting
- **[Layered Components](unit-2/layered-components/index.html)** — Unit 2 assignment demonstrating the layered component architecture

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
- `--color-primary` — Primary brand color (#0066cc)
- `--color-background` — Page background (#ffffff)
- `--color-text` — Body text color (#202020)
- `--color-accent` — Accent/highlight color (#ff7b00)
- `--color-muted` — Muted/secondary text (#999999)

### Spacing, Typography, and Effects (`css/tokens/variables.css`)
- **Spacing:** `--spacing-sm` (0.5rem), `--spacing-md` (1rem), `--spacing-lg` (2rem)
- **Typography:** `--font-family`, `--font-size-base`, `--line-height`
- **Borders:** `--border-radius`
- **Shadows:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Deployment

This site automatically deploys to [GitHub Pages](https://github.io) on every push to the `main` branch. The `dist/` folder contents are served as the static site.