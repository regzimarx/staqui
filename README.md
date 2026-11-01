# StaqUI

An independent React and TypeScript component library and Next.js documentation site. The workspace covers all 50 components in the researched reference component catalog web-component catalog with original branding, semantic themes, and explicitly documented adaptations.

## Run locally

Requirements: Node.js 22 or later and pnpm 12.16.1 (pinned in package.json).

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm build:ui
pnpm generate:docs
pnpm dev
```

Open http://localhost:3000. No environment variables are required.

## Workspace

- `packages/ui/src`: reusable components, shared types and CSS tokens.
- `packages/ui/examples`: 50 runnable examples, also used by the test suite and documentation previews.
- `apps/docs`: Next.js homepage, searchable catalog, component pages, guides and three application examples.
- `research/INVENTORY.md`: dated source research, reference APIs, related components and adaptations.
- `research/COVERAGE.md`: generated mapping of all 50 reference components to exports, implementation and examples.
- `DESIGN.md`: design decisions and customization principles.
- `validation/RESULTS.md`: verification evidence and limits.

The documentation generator reads the actual TypeScript public API and the exact example files used in previews. Run `pnpm generate:docs` after editing examples or props; `pnpm check:coverage` detects stale snippets and missing components. The Python scripts in `scripts/` retain the original catalog/example authoring process; `create-examples.py` is a historical bootstrap, not part of the build and should not be rerun over edited examples.

## Validate and package

```sh
pnpm build
pnpm typecheck
pnpm test
pnpm check:coverage
pnpm pack:ui
node scripts/smoke-package.mjs
```

`pnpm build` builds the library before generating documentation and building Next.js. The package archive is `artifacts/staqui-ui-0.1.0.tgz`. It includes ESM, CommonJS, declarations, CSS, README and license.

The independent consumer smoke test installs the archive in a temporary project, checks types, resolves both module formats and CSS, and server-renders React without Next.js. Its offline installation uses the local pnpm store populated by workspace installation.

To consume the package elsewhere:

```sh
pnpm add /absolute/path/to/staqui-ui-0.1.0.tgz
```

Import `@staqui/ui/styles.css` once and wrap the application with `StaqProvider`. See `packages/ui/README.md` and the getting-started guide. The package name is local; no registry publication has occurred.

## Deploy on Vercel

Import this repository and configure:

| Setting | Value |
| --- | --- |
| Root directory | `apps/docs` |
| Framework | Next.js |
| Install command | `cd ../.. && pnpm install --frozen-lockfile` |
| Build command | `cd ../.. && pnpm build` |
| Output directory | Next.js default |
| Node | 22.x or a newer supported LTS |
| Environment variables | None |

Enable access to files outside the project root so shared examples and the workspace library are included. `apps/docs/vercel.json` provides the install/build commands. pnpm uses the committed root lockfile. Deployment has been prepared but not executed.

## Scope and limitations

- Coverage is conceptual equivalence, not drop-in Shopify API compatibility. Every adaptation is listed in the inventory and each component page.
- Color inputs support six-digit RGB hex through native controls; no alpha or wide-gamut picker. DateField uses native date UI; DatePicker supports single/range selection with Date objects and matchers.
- Menu nesting, virtualized tables, spreadsheet editing, and Shopify-specific services are outside the exposed API. Icons use Lucide rather than Shopify's icon catalog.
- MoneyField edits a decimal string with a currency label; it does not perform financial arithmetic or localized currency parsing.
- Uploads and application demos remain local. DropZone emits File objects; applications own upload transport and should use its callback for dropped files rather than relying solely on native FormData.
- Built-in theme/density propagate into portals. Custom ancestor-only CSS overrides need corresponding global/portal selectors.
- WCAG 2.2 AA is the design target, not a certification. Automated and Chromium/Neo checks do not replace screen-reader testing or Safari/Firefox and physical touch-device coverage.

MIT licensed original code. Source research captures and dependencies retain their own copyrights and licenses.
