# Publishing staqui

Pushes to `main` are published automatically as patch releases by
`.github/workflows/release.yml`. The workflow validates the package, increments
the patch version, commits that version bump, and publishes to
`@staqforce-studio/staqui` using npm Trusted Publishing.

Publish `packages/ui` to the public npm registry. npm, pnpm, Yarn, and Bun can
all install the same release; no separate package-manager publications are needed.
The workspace root and documentation app remain private.

## First release

1. Use Node.js 22 or later and the pnpm version pinned in `package.json`.
   Run `pnpm install --frozen-lockfile` at the repository root.
2. Sign in with `npm login --registry=https://registry.npmjs.org/` and confirm
   the account with `npm whoami --registry=https://registry.npmjs.org/`.
   Complete npm's browser login and any required two-factor authentication.
3. Configure npm Trusted Publishing for `@staqforce-studio/staqui` with:
   - Provider: GitHub Actions
   - Organization/user: `regzimarx`
   - Repository: `staqui`
   - Workflow filename: `release.yml`
   - Environment: leave blank
   
   The package must exist before npm can attach a trusted publisher. Publish the
   first version once from a local authenticated npm session, then add this
   trusted publisher configuration.
4. Review `packages/ui/package.json`, including its version and public metadata.
   Check that the intended version is not already published:
   `npm view @staqforce-studio/staqui versions --registry=https://registry.npmjs.org/`.
   A 404 for the first release is expected, but does not prove scope ownership.
5. Run `pnpm check:release`. This checks types, component tests, catalog coverage,
   builds and packs the library, then installs the archive into independent npm
   and pnpm consumer projects to check declarations, ESM, CommonJS, CSS and SSR.
6. Review the exact package contents:

   ```sh
   npm publish ./artifacts/staqforce-studio-staqui-0.1.0.tgz --dry-run --access public --registry=https://registry.npmjs.org/
   ```

7. Publish the reviewed archive (adjust the filename if the version changed):

   ```sh
   npm publish ./artifacts/staqforce-studio-staqui-0.1.0.tgz --access public --registry=https://registry.npmjs.org/
   ```

   Complete npm's authentication prompt if required. The package includes
   `publishConfig.access: public` and pins the npm registry.

8. Verify publication with `npm view @staqforce-studio/staqui version --registry=https://registry.npmjs.org/`.
   Install `@staqforce-studio/staqui` in a consuming React app, import `@staqforce-studio/staqui/styles.css`
   once, and wrap the app in `StaqProvider`.

`pnpm publish:ui` is a convenience command that runs release validation and
publishes directly from the package directory. Its `prepack` hook rebuilds the
library, including CSS and fonts, so generated files do not need to be committed.
To publish the exact archive already reviewed, use the archive command above.

## Later releases

Update `packages/ui/package.json` to a new semantic version, document the changes,
and repeat validation, archive review, publication, and registry verification.
Published name/version combinations cannot be reused. For prereleases, use a
version such as `0.2.0-beta.0` and add `--tag beta` to the archive publish command
so it does not replace `latest`.

If Bun is installed, also run `node scripts/smoke-package.mjs --manager bun`.
The smoke test requires network access to install dependencies. It uses the
workspace's installed React and TypeScript versions and reads the library's
current version to locate the archive.

Never commit npm credentials. Keep interactive publishing local; automated
publishing should use npm trusted publishing configured for this repository.

References: [npm scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages),
[npm publish](https://docs.npmjs.com/cli/commands/npm-publish).
