# staqui

An independent React and TypeScript component library and Next.js documentation site. The workspace includes 50 components with a distinct Staqforce Studio identity, semantic themes, purposeful density, and documented implementation details.

## Guides

- [Development](./DEVELOPMENT.md): setup, local development, and validation.
- [Contributing](./CONTRIBUTING.md): branches, pull requests, and contribution
  expectations.
- [Deployment](./DEPLOYMENT.md): deploy the documentation site to Vercel.
- [Publishing](./PUBLISHING.md): publish the package to npm.

## Workspace

- `packages/ui/src`: reusable components, shared types and CSS tokens.
- `packages/ui/examples`: 50 runnable examples, also used by the test suite and documentation previews.
- `apps/docs`: Next.js homepage, searchable catalog, component pages, guides and three application examples.
- `research/INVENTORY.md`: component descriptions, implementation notes, and accessibility guidance.
- `research/COVERAGE.md`: generated mapping of all 50 components to exports, implementation, and examples.
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

`pnpm build` builds the library before generating documentation and building Next.js. Packing rebuilds the library automatically. The package archive is `artifacts/staqforce-studio-staqui-<version>.tgz`. It includes ESM, CommonJS, declarations, CSS, fonts and their license, README and license.

The independent consumer smoke test installs the archive in a temporary project, checks types, resolves both module formats and CSS, and server-renders React without Next.js. It supports npm, pnpm, and Bun via `--manager`; pnpm is the default. `pnpm check:release` runs the checks and verifies independent npm and pnpm consumers.

Install [@staqforce-studio/staqui](https://www.npmjs.com/package/@staqforce-studio/staqui) from npm using your preferred package manager:

```sh
npm install @staqforce-studio/staqui
pnpm add @staqforce-studio/staqui
bun add @staqforce-studio/staqui
```

Import `@staqforce-studio/staqui/styles.css` once and wrap the application with `StaqProvider`. See `packages/ui/README.md` and the getting-started guide. For local testing, install the generated tarball. See [PUBLISHING.md](./PUBLISHING.md) for account setup, validation, and the release command.

## Scope and limitations

- Every component has a typed API, a runnable example, and documented implementation boundaries.
- Color inputs support six-digit RGB hex through native controls; no alpha or wide-gamut picker. DateField uses native date UI; DatePicker supports single/range selection with Date objects and matchers.
- Menu nesting, virtualized tables, spreadsheet editing, and backend services are outside the exposed API. Icons use Lucide.
- MoneyField edits a decimal string with a currency label; it does not perform financial arithmetic or localized currency parsing.
- Uploads and application demos remain local. DropZone emits File objects; applications own upload transport and should use its callback for dropped files rather than relying solely on native FormData.
- Built-in theme/density propagate into portals. Custom ancestor-only CSS overrides need corresponding global/portal selectors.
- WCAG 2.2 AA is the design target, not a certification. Automated and Chromium/Neo checks do not replace screen-reader testing or Safari/Firefox and physical touch-device coverage.

MIT licensed original code. Source research captures and dependencies retain their own copyrights and licenses.
