import {
  mkdtempSync,
  writeFileSync,
  readFileSync,
  existsSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const uiPackage = JSON.parse(readFileSync("packages/ui/package.json", "utf8"));
const managerIndex = process.argv.indexOf("--manager");
const manager = managerIndex < 0 ? "pnpm" : process.argv[managerIndex + 1];
if (!["npm", "pnpm", "bun"].includes(manager)) {
  throw new Error("Use --manager npm, pnpm, or bun.");
}
const installedVersion = (name) => require(`${name}/package.json`).version;
const project = mkdtempSync(join(tmpdir(), "staqui-consumer-"));
const archive = resolve(
  `artifacts/${uiPackage.name.replace(/^@/, "").replaceAll("/", "-")}-${uiPackage.version}.tgz`,
);
if (!existsSync(archive)) throw new Error("Run pnpm pack:ui first.");
const manifest = {
  name: "staqui-consumer-smoke",
  version: "0.0.0",
  private: true,
  type: "module",
  dependencies: {
    [uiPackage.name]: `file:${archive}`,
    react: installedVersion("react"),
    "react-dom": installedVersion("react-dom"),
  },
  devDependencies: {
    typescript: installedVersion("typescript"),
    "@types/react": installedVersion("@types/react"),
    "@types/react-dom": installedVersion("@types/react-dom"),
  },
};
writeFileSync(join(project, "package.json"), JSON.stringify(manifest, null, 2));
writeFileSync(join(project, "pnpm-workspace.yaml"), "packages: []\n");
writeFileSync(
  join(project, "tsconfig.json"),
  JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      lib: ["ES2022", "DOM"],
      module: "NodeNext",
      moduleResolution: "NodeNext",
      jsx: "react-jsx",
      strict: true,
      skipLibCheck: true,
      noEmit: true,
    },
    include: ["app.tsx", "app.cts"],
  }),
);
writeFileSync(
  join(project, "app.tsx"),
  `import { StaqProvider, Button, TextField, Table, DatePicker } from '@staqforce/staqui';\nexport const App = () => <StaqProvider theme="dark"><TextField label="Name"/><Button variant="primary">Save</Button><DatePicker mode="range"/><Table label="Inventory" rows={[{id:'a',qty:4}]} rowKey={r=>r.id} columns={[{id:'qty',header:'Quantity',cell:r=>r.qty}]}/></StaqProvider>;\n`,
);
writeFileSync(
  join(project, "app.cts"),
  `import { Button } from '@staqforce/staqui';\nimport { createElement } from 'react';\nexport const button = createElement(Button, { variant: 'primary' }, 'CommonJS');\n`,
);
writeFileSync(
  join(project, "smoke.mjs"),
  `import { createElement } from 'react';import { renderToString } from 'react-dom/server';import { createRequire } from 'node:module';import { readFileSync } from 'node:fs';import * as ui from '@staqforce/staqui';const require=createRequire(import.meta.url);const cjs=require('@staqforce/staqui');if(!cjs.Button||!ui.Modal)throw Error('Missing exports');const css=readFileSync(require.resolve('@staqforce/staqui/styles.css'),'utf8');if(!css.includes('--sq-accent'))throw Error('Missing styles');const html=renderToString(createElement(ui.StaqProvider,{theme:'dark'},createElement(ui.Button,null,'Works outside Next.js')));if(!html.includes('Works outside Next.js'))throw Error('SSR failed');console.log('ESM + CJS + CSS exports + independent React SSR passed.');`,
);
function run(command, args) {
  const result = spawnSync(command, args, { cwd: project, encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(result.stdout + "\n" + result.stderr);
  return result.stdout;
}
try {
  run(manager, ["install", "--ignore-scripts"]);
  const checks = [
    run(process.execPath, [
      join(project, "node_modules/typescript/bin/tsc"),
      "--noEmit",
    ]),
    run(process.execPath, ["smoke.mjs"]),
  ];
  const report = {
    passed: true,
    package: archive,
    independentProject: true,
    packageManager: manager,
    checks: [
      "TypeScript ESM and CommonJS package declarations",
      "ESM import",
      "CommonJS require",
      "Stylesheet export",
      "React server render without Next.js",
    ],
    output: checks.join("\n"),
  };
  writeFileSync(
    `validation/package-consumer${manager === "pnpm" ? "" : `-${manager}`}.json`,
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(report.output);
  rmSync(project, { recursive: true, force: true });
} catch (error) {
  console.error(`Consumer retained at ${project}`);
  throw error;
}
