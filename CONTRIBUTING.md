# Contributing

1. Fork the repository or create a branch from `main`.
2. Follow the setup instructions in
   [DEVELOPMENT.md](./DEVELOPMENT.md).
3. Make focused changes in `packages/ui` or `apps/docs`.
4. Regenerate documentation when public APIs or examples change:

   ```sh
   pnpm generate:docs
   ```

5. Run the release checks:

   ```sh
   pnpm check:release
   ```

6. Push your branch and open a pull request against `main`.

Include a short summary and testing notes. Include screenshots for visible
documentation changes. Keep commits focused, do not commit secrets or
generated build output, and update related documentation when behavior or
public APIs change.

Pull requests run the CI workflow automatically.
