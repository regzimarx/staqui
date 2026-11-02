import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig({
  resolve: {
    alias: { "@staqforce-studio/staqui": resolve(root, "packages/ui/src/index.ts") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./packages/ui/tests/setup.ts"],
    include: ["packages/ui/tests/**/*.test.tsx"],
  },
});
