# Deployment

## Vercel documentation site

Deploy the Next.js documentation site by importing
`https://github.com/regzimarx/staqui` in Vercel and configuring:

| Setting | Value |
| --- | --- |
| Root directory | `apps/docs` |
| Framework | Next.js |
| Install command | `cd ../.. && pnpm install --frozen-lockfile` |
| Build command | `cd ../.. && pnpm build` |
| Output directory | Next.js default |
| Node | 22.x or a newer supported LTS |
| Environment variables | None |

Enable access to files outside the project root so shared examples and the
workspace library are included. The committed
[apps/docs/vercel.json](./apps/docs/vercel.json) contains the install and build
commands. Vercel uses the committed root lockfile and automatically redeploys
the site after pushes to `main`.
