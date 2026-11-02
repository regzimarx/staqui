# StaqUI

An independent React and TypeScript UI library with 50 catalog components, semantic light/dark themes, and compact and comfortable densities. No Shopify or Next.js runtime dependency.

## Install

This package is currently unpublished. For local testing, use the archive described below. If published again, install using your preferred package manager:

```sh
npm install @staqforce/staqui
pnpm add @staqforce/staqui
bun add @staqforce/staqui
```

Use one of these commands in an existing React application. For an unpublished
checkout, run `pnpm pack:ui` at the repository root and install the generated
`artifacts/staqforce-staqui-<version>.tgz` instead. See the repository's
[PUBLISHING.md](https://github.com/regzimarx/StaqUI/blob/main/PUBLISHING.md) for release instructions.

React and React DOM 18.3 or 19 are peer dependencies. ESM, CommonJS, TypeScript declarations and CSS are included. Load styles once in your application's entry point or root layout.

```tsx
import { StaqProvider, Stack, TextField, Button } from '@staqforce/staqui';
import '@staqforce/staqui/styles.css';

export default function App() {
  return (
    <StaqProvider theme="light" density="compact">
      <form onSubmit={(event) => event.preventDefault()}>
        <Stack>
          <TextField label="Project name" required />
          <Button type="submit" variant="primary">Create project</Button>
        </Stack>
      </form>
    </StaqProvider>
  );
}
```

Use `theme="dark"` for the alternate theme and `density="comfortable"` for roomier 40px controls; `density="compact"` is the default with 32px controls. Add `asChild` to `Button` to render its styles onto a single child element, such as a framework link: `<Button asChild variant="primary"><a href="/start">Start</a></Button>`. With `asChild`, put the label and any icon inside that child; the button's own `icon` and `loading` slots apply only to real buttons. Use `theme="staqwish"` for the neutral Shopify admin-inspired visual system extracted from the Staqwish project. Components wrapping native elements accept React HTML and ARIA attributes. Fields use `label`, `description`, `error`, and `onValueChange`; checkboxes and switches use `onCheckedChange`. Overlays use `open` and `onOpenChange`.

## Customization

Override the `--sq-*` CSS custom properties after importing the stylesheet. Theme-specific overrides should target `[data-staq-theme]`. Built-in theme and density propagate to portals. Scope custom brand overrides globally or explicitly include `.sq-modal`, `.sq-menu`, `.sq-popover` and `.sq-tooltip`; custom ancestor-only CSS does not cross portal boundaries.

## Accessibility

Native inputs provide labels, autofill and constraint validation. Radix handles overlays and focus management; React DayPicker handles calendars. Always supply meaningful labels, descriptions, alternative text, and valid heading structure. Target: WCAG 2.2 AA, not a conformance certification. Perform assistive-technology testing in your consuming application.

## Scope

This is an independent equivalent of the reference component catalog component catalog, not a compatible Shopify API implementation. Color inputs use native six-digit RGB hex; date fields use native browser UI; the calendar uses Date objects and matcher constraints. The icon set is Lucide. Table sorting is client-side and pagination is application-owned. File uploads and all backend/service behavior belong to the consuming application.

For the full component API, examples, and per-component adaptations, run the documentation site from the repository with `pnpm dev`. The repository also includes `research/INVENTORY.md` and `research/COVERAGE.md`.

MIT licensed. Dependencies retain their respective licenses.

Fixel Display is the default font, bundled as self-hosted WOFF2 files (weights 100–900, upright and italic) with its OFL license. Importing the stylesheet loads the font; override `--sq-font` to use another family. Unsupported scripts fall back to the system font stack. Corners use an 8/12/20px scale for small, medium, and large radii.
