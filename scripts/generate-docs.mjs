import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
const root = process.cwd();
const catalog = JSON.parse(
  fs.readFileSync("apps/docs/lib/catalog.json", "utf8"),
);
const program = ts.createProgram(["packages/ui/src/index.ts"], {
  jsx: ts.JsxEmit.ReactJSX,
  target: ts.ScriptTarget.ES2022,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  module: ts.ModuleKind.ESNext,
  strict: true,
  skipLibCheck: true,
  esModuleInterop: true,
});
const checker = program.getTypeChecker();
const file = program.getSourceFile("packages/ui/src/index.ts");
const exports = checker.getExportsOfModule(checker.getSymbolAtLocation(file));
const native = new Set([
  "children",
  "className",
  "style",
  "id",
  "name",
  "disabled",
  "required",
  "readOnly",
  "value",
  "defaultValue",
  "checked",
  "defaultChecked",
  "onChange",
  "onClick",
  "onBlur",
  "onFocus",
  "href",
  "target",
  "rel",
  "download",
  "placeholder",
  "type",
  "min",
  "max",
  "step",
  "minLength",
  "maxLength",
  "autoComplete",
  "rows",
  "src",
  "alt",
  "srcSet",
  "sizes",
  "loading",
  "width",
  "height",
  "onError",
]);
const descriptions = {
  label: "Visible accessible name for this control.",
  description: "Supporting instructions associated with the control.",
  error: "Validation message; also sets aria-invalid.",
  onValueChange: "Called with the next value. Update controlled state here.",
  onCheckedChange: "Called with the next checked state.",
  value: "Controlled value. Pair with its change callback.",
  defaultValue: "Initial value for uncontrolled usage.",
  children: "Content rendered inside the component.",
  className: "Additional CSS class names.",
  style: "Inline styles, including CSS custom property overrides.",
  disabled: "Prevents user interaction using native disabled semantics.",
  required: "Participates in native form validation.",
  name: "Field name used in form submission.",
  tone: "Semantic status treatment; always pair color with text.",
  variant: "Visual emphasis appropriate to the action hierarchy.",
  size: "Size within the shared component scale.",
  trigger: "A single focusable React element; use a staqui Button or Link.",
  open: "Controlled overlay visibility.",
  onOpenChange: "Called when the user opens or dismisses the overlay.",
  title: "Visible title and accessible name.",
  label: "A meaningful visible or accessible label.",
  options: "Selectable values with stable unique identifiers.",
  items: "Menu actions with stable ids and optional groups.",
  rows: "Records to render. The library does not fetch data.",
  columns: "Typed column definitions, renderers and optional sort accessors.",
  rowKey: "Returns a stable unique key for each record.",
  onSelectionChange: "Receives all selected row keys.",
  pagination: "External page state and navigation callbacks.",
  disabled: "Disables interaction (or date matchers for DatePicker).",
  source: "A Lucide component for icons outside the built-in map.",
};
const defaults = {};
for (const source of program
  .getSourceFiles()
  .filter((f) => /packages\/ui\/src\//.test(f.fileName))) {
  function visit(node) {
    if (
      (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)) &&
      node.name
    ) {
      const binding = node.parameters[0]?.name;
      if (binding && ts.isObjectBindingPattern(binding)) {
        defaults[node.name.text] = Object.fromEntries(
          binding.elements
            .filter((e) => e.initializer)
            .map((e) => [
              (e.propertyName ?? e.name).getText(source),
              e.initializer.getText(source),
            ]),
        );
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
const api = {};
let imports = [],
  entries = [],
  sources = {};
for (const c of catalog) {
  const symbol = exports.find((x) => x.name === c.name);
  if (!symbol) throw new Error(`Missing export ${c.name}`);
  const type = checker.getTypeOfSymbolAtLocation(symbol, file);
  const sig = type.getCallSignatures()[0];
  const param = sig?.parameters[0];
  if (param) {
    const pt = checker.getTypeOfSymbolAtLocation(param, file);
    api[c.slug] = checker
      .getPropertiesOfType(pt)
      .filter(
        (p) =>
          native.has(p.name) ||
          p.declarations?.some((d) =>
            d.getSourceFile().fileName.includes("/packages/ui/src/"),
          ) ||
          p.declarations?.some((d) =>
            d.getSourceFile().fileName.startsWith("packages/ui/src/"),
          ),
      )
      .filter((p) => !["ref", "key"].includes(p.name))
      .map((p) => ({
        name: p.name,
        default: defaults[c.name]?.[p.name] ?? null,
        type: checker
          .typeToString(
            checker.getTypeOfSymbolAtLocation(p, file),
            undefined,
            ts.TypeFormatFlags.NoTruncation,
          )
          .replace(/import\("[^"]+"\)\./g, "")
          .slice(0, 600),
        required: !(p.flags & ts.SymbolFlags.Optional),
        description:
          descriptions[p.name] ??
          (native.has(p.name)
            ? "Standard React / HTML attribute passed to the underlying element."
            : "See the typed definition and working example for this option."),
      }));
  }
  const exampleName =
    c.slug
      .split("-")
      .map((x) => x[0].toUpperCase() + x.slice(1))
      .join("") + "Example";
  imports.push(
    `import ${exampleName} from '../../../packages/ui/examples/${c.slug}';`,
  );
  entries.push(`  '${c.slug}': ${exampleName},`);
  sources[c.slug] = fs.readFileSync(
    `packages/ui/examples/${c.slug}.tsx`,
    "utf8",
  );
}
fs.writeFileSync("apps/docs/lib/api.json", JSON.stringify(api, null, 2) + "\n");
// This file lives one directory deeper than the app root.
fs.writeFileSync(
  "apps/docs/lib/examples.ts",
  `'use client';\n${imports.join("\n")}\nexport const examples = {\n${entries.join("\n")}\n};\n`,
);
fs.writeFileSync(
  "apps/docs/lib/example-source.json",
  JSON.stringify(sources, null, 2) + "\n",
);
console.log(
  `Generated public API and synchronized example source for ${catalog.length} components.`,
);
