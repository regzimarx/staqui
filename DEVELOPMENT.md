# Development

## Requirements

- Node.js 22 or later
- pnpm 12.16.1, pinned in `package.json`

## Setup

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm build:ui
pnpm generate:docs
pnpm dev
```

Open http://localhost:3000. No environment variables are required.

## Development loop

1. Edit components in `packages/ui/src` and examples in
   `packages/ui/examples`.
2. Run `pnpm dev` to work on the documentation site with hot reload.
3. Run `pnpm generate:docs` after changing examples or public component props.
4. Run `pnpm check:release` before opening a pull request.

To keep local and remote branches aligned:

```sh
git pull --rebase --tags origin main
```

## Validation

```sh
pnpm build
pnpm typecheck
pnpm test
pnpm check:coverage
pnpm pack:ui
node scripts/smoke-package.mjs
```

`pnpm check:release` runs the complete release validation, including
independent npm and pnpm consumer smoke tests.
