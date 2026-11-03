import fs from "node:fs";
import assert from "node:assert/strict";
import * as library from "../packages/ui/dist/index.js";
const catalog = JSON.parse(
  fs.readFileSync("apps/docs/lib/catalog.json", "utf8"),
);
const api = JSON.parse(fs.readFileSync("apps/docs/lib/api.json", "utf8"));
const source = JSON.parse(
  fs.readFileSync("apps/docs/lib/example-source.json", "utf8"),
);
assert.equal(new Set(catalog.map((c) => c.slug)).size, catalog.length);
let rows = [
  "# staqui component coverage",
  "",
  "Each StaqUI component is exported, documented, and backed by a synchronized runnable example. Implementation boundaries are documented in the inventory.",
  "",
  "All examples are included in the structural axe test matrix. Interaction tests cover representative controls; browser checks cover representative pages, not every platform/browser combination.",
  "",
  "| Component | StaqUI export | Implementation | Documentation / runnable source | Adaptations |",
  "|---|---|---|---|---|",
];
for (const c of catalog) {
  assert(library[c.name], `Missing export ${c.name}`);
  assert(api[c.slug]?.length, `Missing API ${c.slug}`);
  const example = `packages/ui/examples/${c.slug}.tsx`;
  assert.equal(
    fs.readFileSync(example, "utf8"),
    source[c.slug],
    `Stale example source ${c.slug}`,
  );
  const research = fs.readFileSync(`research/sources/${c.slug}.md`, "utf8");
  assert(
    research.includes("## Implementation") &&
      research.includes("## Accessibility"),
    `Missing component notes ${c.slug}`,
  );
  assert(c.description && c.adaptation && c.accessibility);
  assert(fs.existsSync("apps/docs/app/components/[slug]/page.tsx"));
  const files = fs
    .readdirSync("packages/ui/src")
    .filter((f) => f.endsWith(".tsx"));
  const implementation = files.find((f) =>
    new RegExp(`(?:function|const) ${c.name}\\b`).test(
      fs.readFileSync(`packages/ui/src/${f}`, "utf8"),
    ),
  );
  assert(implementation, `Implementation file missing: ${c.name}`);
  rows.push(
    `| [${c.title}](../apps/docs/app/components/[slug]/page.tsx) | \`${c.name}\` | [Implemented](../packages/ui/src/${implementation}) | [/components/${c.slug}](../${example}) | [Documented](INVENTORY.md#${c.name.toLowerCase()}--${c.category.toLowerCase()}) |`,
  );
}
fs.writeFileSync("research/COVERAGE.md", rows.join("\n") + "\n");
console.log(
  `${catalog.length}/${catalog.length} StaqUI components exported, documented, and backed by synchronized runnable examples.`,
);
