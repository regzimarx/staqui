# staqui

An independent React and TypeScript UI library with 51 catalog components, semantic light/dark themes. Works in compatible React applications.

## Install

Install [@staqforce-studio/staqui](https://www.npmjs.com/package/@staqforce-studio/staqui) from npm using your preferred package manager:

```sh
npm install @staqforce-studio/staqui
pnpm add @staqforce-studio/staqui
bun add @staqforce-studio/staqui
```

Use one of these commands in an existing React application. To test a local
checkout, run `pnpm pack:ui` at the repository root and install the generated
`artifacts/staqforce-studio-staqui-<version>.tgz` instead. See the repository's
[PUBLISHING.md](https://github.com/regzimarx/staqui/blob/main/PUBLISHING.md) for release instructions.

React and React DOM 18.3 or 19 are peer dependencies. ESM, CommonJS, TypeScript declarations and CSS are included. Load styles once in your application's entry point or root layout.

```tsx
import { StaqProvider, Stack, TextField, Button } from '@staqforce-studio/staqui';
import '@staqforce-studio/staqui/styles.css';

export default function App() {
  return (
    <StaqProvider theme="light">
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

Use `theme="dark"` for the alternate theme. Pill-shaped buttons use their own `size` scale, with minimum heights of 28px, 34px, and 42px for `small`, `medium`, and `large`. A native button with `loading` shows a centered spinner and keeps its width while interaction is disabled. Add `asChild` to `Button` to render its styles onto a single child element, such as a framework link: `<Button asChild variant="primary"><a href="/start">Start</a></Button>`. With `asChild`, put the label and any icon inside that child; the button's own `icon` and `loading` slots apply only to real buttons. Use `theme="staqwish"` for the neutral visual theme from the Staqwish project. Components wrapping native elements accept React HTML and ARIA attributes. Fields use `label`, `description`, `error`, and `onValueChange`; checkboxes and switches use `onCheckedChange`. Overlays use `open` and `onOpenChange`.

## Customization

Override the `--sq-*` CSS custom properties after importing the stylesheet. Theme-specific overrides should target `[data-staq-theme]`. Built-in themes propagate to portals. Scope custom brand overrides globally or explicitly include `.sq-modal`, `.sq-menu`, `.sq-popover` and `.sq-tooltip`; custom ancestor-only CSS does not cross portal boundaries.

## Accessibility

Native inputs provide labels, autofill and constraint validation. Radix handles overlays and focus management; React DayPicker handles calendars. Always supply meaningful labels, descriptions, alternative text, and valid heading structure. Target: WCAG 2.2 AA, not a conformance certification. Perform assistive-technology testing in your consuming application.

## Scope

StaqUI provides a focused React API for product interfaces. Color controls use six-digit RGB hex. DateField pairs a native date input with a DatePicker popover. DatePicker uses Date objects and matcher constraints. The icon set is Lucide. Table sorting is client-side and pagination is application-owned. File uploads and all backend/service behavior belong to the consuming application.

For the full component API, examples, and per-component adaptations, run the documentation site from the repository with `pnpm dev`. The repository also includes `research/INVENTORY.md` and `research/COVERAGE.md`.

MIT licensed. Dependencies retain their respective licenses.

Geist is the default font family; load Geist in your application for the intended appearance, or override `--sq-font` with another family. Unsupported scripts fall back to the system font stack. Corners use an 10/14/22px scale for small, medium, and large radii.

## HTML

Use the `@staqforce-studio/staqui/html` entry with a JavaScript bundler such as Vite. Install `@staqforce-studio/staqui`, `react`, and `react-dom`. The adapter runs the same components internally and exposes every component from the main package. Your application can build component trees with `element()` and use ordinary JavaScript callbacks for events.

Pass an empty host to `mount()`. Use the returned `update(node)` to refresh controlled props and `unmount()` before removing the host. Components with children or element-valued props, such as modal triggers, accept nested `element()` calls.

### HTML with a module bundler

```html
<div id="actions"></div>
<script type="module" src="/src/actions.js"></script>
```

```js
import { Button, StaqProvider, element, mount } from "@staqforce-studio/staqui/html";
import "@staqforce-studio/staqui/styles.css";

mount(
  document.querySelector("#actions"),
  element(StaqProvider, null,
    element(Button, { variant: "primary", onClick: () => console.log("Save") }, "Save"),
  ),
);
```
