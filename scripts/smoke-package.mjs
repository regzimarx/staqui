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
const project = mkdtempSync(join(tmpdir(), "staqui-consumer-"));
const archive = resolve("artifacts/staqui-ui-0.1.0.tgz");
if (!existsSync(archive)) throw new Error("Run pnpm pack:ui first.");
const manifest = {
  name: "staqui-consumer-smoke",
  version: "0.0.0",
  private: true,
  type: "module",
  dependencies: {
    "@staqui/ui": `file:${archive}`,
    react: "19.3.1",
    "react-dom": "19.3.1",
  },
  devDependencies: {
    typescript: "5.9.3",
    "@types/react": "19.3.0",
    "@types/react-dom": "19.3.0",
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
    include: ["app.tsx"],
  }),
);
writeFileSync(
  join(project, "app.tsx"),
  `import { StaqProvider, Button, TextField, Table, DatePicker } from '@staqui/ui';\nexport const App = () => <StaqProvider theme="dark"><TextField label="Name"/><Button variant="primary">Save</Button><DatePicker mode="range"/><Table label="Inventory" rows={[{id:'a',qty:4}]} rowKey={r=>r.id} columns={[{id:'qty',header:'Quantity',cell:r=>r.qty}]}/></StaqProvider>;\n`,
);
writeFileSync(
  join(project, "smoke.mjs"),
  `import { createElement } from 'react';import { renderToString } from 'react-dom/server';import { createRequire } from 'node:module';import { readFileSync } from 'node:fs';import * as ui from '@staqui/ui';const require=createRequire(import.meta.url);const cjs=require('@staqui/ui');if(!cjs.Button||!ui.Modal)throw Error('Missing exports');const css=readFileSync(require.resolve('@staqui/ui/styles.css'),'utf8');if(!css.includes('--sq-accent'))throw Error('Missing styles');const html=renderToString(createElement(ui.StaqProvider,{theme:'dark'},createElement(ui.Button,null,'Works outside Next.js')));if(!html.includes('Works outside Next.js'))throw Error('SSR failed');console.log('ESM + CJS + CSS exports + independent React SSR passed.');`,
);
function run(args) {
  const result = spawnSync("pnpm", args, { cwd: project, encoding: "utf8" });
  if (result.status !== 0)
    throw new Error(result.stdout + "\n" + result.stderr);
  return result.stdout;
}
try {
  run(["install", "--ignore-scripts", "--offline"]);
  const checks = [
    run(["exec", "tsc", "--noEmit"]),
    run(["exec", "node", "smoke.mjs"]),
  ];
  const report = {
    passed: true,
    package: archive,
    independentProject: true,
    checks: [
      "TypeScript package declarations",
      "ESM import",
      "CommonJS require",
      "Stylesheet export",
      "React server render without Next.js",
    ],
    output: checks.join("\n"),
  };
  writeFileSync(
    "validation/package-consumer.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(report.output);
  rmSync(project, { recursive: true, force: true });
} catch (error) {
  console.error(`Consumer retained at ${project}`);
  throw error;
}
