# StaqUI validation

Validation date: November 1, 2026 (Asia/Manila).

## Automated checks

Final command results are captured in `final-checks.txt`.

- Library builds ESM and CommonJS with TypeScript declarations and exported CSS.
- Next.js production build prerenders the homepage, catalog, all 50 component pages, six guides, examples and not-found handling.
- TypeScript checks cover the package and documentation application, including runnable examples.
- 63 tests: every component example receives structural axe checks, plus meaningful interaction checks for loading suppression, label/error association, radio and checkbox keyboard behavior, password reveal, modal focus containment/restoration, menu keyboard selection, popover dismissal, tooltip focus, file validation, table sorting/selection, date constraints, controlled calendar clearing, and progress clamping.
- Coverage script verifies 50 exports, complete source property captures, nonempty APIs and byte-for-byte synchronized example snippets.
- Independent package consumer: passed ESM import, CommonJS require, stylesheet resolution, TypeScript and React SSR outside Next.js. See `package-consumer.json`.

## BrowserOS Neo

All browser research and browser verification used BrowserOS Neo.

- Homepage screenshots at 1280×800, 1440×900, 1920×1080 and 375px mobile width, including desktop/mobile full pages. Files: `screenshots/`.
- Inspected light and dark themes; confirmed no document horizontal overflow at the inspected 375px and 1440px sizes.
- Verified catalog filtering, global search navigation, working clipboard feedback, theme switching, compact density, modal Escape dismissal and themed portal focus.
- Browser axe scans passed on the corrected date-picker, tooltip and modal pages at desktop size. Table, examples and getting-started pages passed at mobile size. Homepage passed in mobile dark mode.
- Fixed findings: skipped demo heading level, visible-label/accessible-name mismatches in search and calendar day controls, a missing mobile heading space, and a floating density control overlapping mobile content.

The structural unit scans disable color-contrast because jsdom has no rendered layout. The browser scans use the actual rendered document and include contrast checks; region checks were disabled because examples deliberately demonstrate embedded component structures.

## Visual review

Hallmark static sweep: zero FAIL and zero REFLEX findings. One remaining warning concerns different maximum widths for the site shell, component pages and prose guides. This is intentional: the persistent sidebar and long-form reading measure have different width requirements.

The requested separate design reviewer could not run because its agent hit a usage limit. Review continued in-thread using the Neo screenshots. The homepage retains a working component composition, readable hierarchy, mobile stacking and original StaqUI branding. The skill's separate browser render tier was not used; the user explicitly required Neo, and all rendered checks were done there.

## Limits

No Vercel deployment or registry publication was performed. No screen-reader certification, Safari/Firefox matrix, physical mobile device testing or exhaustive visual inspection of every component variant is claimed. The source inventory documents narrower independent APIs, including native RGB color input, native date fields, nonvirtualized tables and application-owned uploads.

## Inter and landing-page update
Production build and TypeScript checks passed after the homepage redesign. Neo verified that Inter loaded successfully, the landing-page sidebar is hidden on desktop, and the document has no horizontal overflow at 1440px and 375px. Desktop and mobile dark-theme screenshots were visually inspected. The rebuilt package includes the Inter WOFF2 and OFL license.

## Fixel Display and rounded components — November 1, 2026

- Replaced Inter with self-hosted Fixel Display WOFF2, weights 100–900 in upright and italic styles, including the embedded copyright attribution and SIL OFL 1.1.
- Increased shared corner tokens to 8/12/20px and replaced hardcoded docs/landing radii with those tokens.
- `pnpm build`, `pnpm typecheck`, `pnpm pack:ui`, and the independent package consumer smoke check passed.
- BrowserOS Neo confirmed actual loaded Fixel Display faces, 12px control corners, and 20px modal corners. Desktop (1440px) and mobile (375px) landing previews had no horizontal overflow; dark landing and light modal were visually checked.
