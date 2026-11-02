import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Banner } from "@staqforce/staqui";
import { SiteLink as Link } from "@/components/site-link";
import { CodeBlock } from "@/components/code-block";
import { catalog } from "@/lib/catalog";
const titles: Record<string, string> = {
  "getting-started": "Start with a solid foundation.",
  theming: "Your brand, down to the tokens.",
  accessibility: "Accessible by design. Tested in context.",
  design: "Small decisions. A coherent system.",
  coverage: "Every component, accounted for.",
  deployment: "Ready for Vercel.",
};
export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: titles[slug] ?? "Guide" };
}
export default async function Guide({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!titles[slug]) notFound();
  return (
    <article className="guide-page">
      <div className="breadcrumbs">
        <Link href="/docs/getting-started">Documentation</Link>
        <span>/</span>
        <span>{slug.replaceAll("-", " ")}</span>
      </div>
      <h1>{titles[slug]}</h1>
      {slug === "getting-started" ? (
        <>
          <p className="guide-lead">
            staqui is an independent React and TypeScript library. Import a
            stylesheet, add a provider, and compose your interface.
          </p>
          <Banner title="Local package" tone="info">
            Registry publication under @staqforce/staqui was canceled.
            Install the generated tarball for local development.
          </Banner>
          <h2>Run this workspace</h2>
          <CodeBlock
            filename="Terminal"
            code={
              "corepack enable\npnpm install --frozen-lockfile\npnpm build:ui\npnpm generate:docs\npnpm dev"
            }
          />
          <p>
            Use Node.js 22 or later. pnpm is pinned in the root package.json.
            The documentation starts at http://localhost:3000 and needs no
            environment variables.
          </p>
          <h2>Install in another React app</h2>
          <CodeBlock
            filename="Terminal"
            code={
              "# If published again, choose one:\nnpm install @staqforce/staqui\npnpm add @staqforce/staqui\nbun add @staqforce/staqui\n\n# For local development, at the repository root:\npnpm pack:ui\n# In your app (adjust the path):\npnpm add /absolute/path/to/staqforce-staqui-0.1.0.tgz"
            }
          />
          <p>
            React and React DOM 18.3 or 19 are peer dependencies. Styles and
            declarations ship with the package. No Next.js or Shopify runtime is
            required by the library.
          </p>
          <h2>Compose your first interface</h2>
          <CodeBlock
            code={
              '"use client";\nimport { StaqProvider, Button, TextField, Stack } from "@staqforce/staqui";\nimport "@staqforce/staqui/styles.css";\n\nexport default function App() {\n  return (\n    <StaqProvider theme="light" density="compact">\n      <form onSubmit={event => event.preventDefault()}>\n        <Stack>\n          <TextField label="Project name" required />\n          <Button type="submit" variant="primary">Create project</Button>\n        </Stack>\n      </form>\n    </StaqProvider>\n  );\n}'
            }
          />
          <h2>Use with Next.js</h2>
          <p>
            Import the stylesheet once in your root layout. Components that use
            state or callbacks belong in client components. staqui’s built entry
            points retain the use client directive, and the package can also
            render in a conventional React application.
          </p>
          <Link href="/components">Explore all components</Link>
        </>
      ) : null}
      {slug === "theming" ? (
        <>
          <p className="guide-lead">
            Every surface, state, and control shares a semantic token system.
            Start with the built-in themes, then change only what your product
            needs.
          </p>
          <h2>Theme and density</h2>
          <CodeBlock
            code={
              '<StaqProvider theme="dark" density="comfortable">\n  <YourApplication />\n</StaqProvider>'
            }
          />
          <p>
            Density accepts <code>compact</code> or <code>comfortable</code>.
            Comfortable controls are 40px high; compact controls are 32px, and
            the same tokens drive input height, control padding and table cell
            padding. Target sizes remain at least 24px. Dialogs, menus, popovers
            and tooltips carry their provider’s theme and density into their
            portals. The theme toggle in the header and the floating density
            control apply to every example here, so you can compare them in
            place.
          </p>
          <h2>Override semantic tokens</h2>
          <CodeBlock
            filename="brand.css"
            code={
              '.my-brand {\n  --sq-accent: oklch(40% .1 240);\n  --sq-accent-hover: oklch(33% .1 240);\n  --sq-accent-ink: oklch(99% .003 240);\n  --sq-focus: oklch(48% .15 260);\n  --sq-radius-medium: 6px;\n}\n\n.my-brand[data-staq-theme="dark"] {\n  --sq-accent: oklch(80% .08 240);\n  --sq-accent-ink: oklch(20% .02 240);\n}'
            }
          />
          <p>
            Apply the class to StaqProvider. For custom overrides inside
            portals, also target .sq-modal, .sq-menu, .sq-popover and
            .sq-tooltip with the same token overrides, or declare brand tokens
            globally. Theme and density propagate automatically; arbitrary
            provider-only CSS overrides do not cross the DOM portal boundary.
          </p>
          <h2>Token groups</h2>
          <table className="guide-table">
            <thead>
              <tr>
                <th>Group</th>
                <th>Tokens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Surfaces</td>
                <td>
                  <code>--sq-bg, --sq-surface, --sq-subtle, --sq-hover</code>
                </td>
              </tr>
              <tr>
                <td>Content</td>
                <td>
                  <code>--sq-ink, --sq-muted, --sq-accent</code>
                </td>
              </tr>
              <tr>
                <td>States</td>
                <td>
                  <code>
                    --sq-focus, --sq-selected, --sq-critical, --sq-disabled
                  </code>
                </td>
              </tr>
              <tr>
                <td>Spacing</td>
                <td>
                  <code>--sq-space-0 / 1 / 2 / 3 / 4 / 6 / 8</code>
                </td>
              </tr>
              <tr>
                <td>Shape and motion</td>
                <td>
                  <code>
                    --sq-radius-small / medium / large, --sq-motion-fast /
                    normal
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            The stylesheet is the canonical token list. After changing colors,
            test text contrast, control boundaries, focus rings, error states,
            and portal surfaces in both themes.
          </p>
        </>
      ) : null}
      {slug === "accessibility" ? (
        <>
          <p className="guide-lead">
            staqui targets WCAG 2.2 AA. Its primitives provide a foundation;
            your content and application flows complete the experience.
          </p>
          <h2>Keyboard behavior</h2>
          <table className="guide-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Interaction</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Buttons and controls</td>
                <td>
                  Tab to focus; Enter or Space to activate according to native
                  semantics.
                </td>
              </tr>
              <tr>
                <td>Menus</td>
                <td>
                  Arrow keys, Home/End and typeahead; Escape closes and restores
                  focus.
                </td>
              </tr>
              <tr>
                <td>Modal</td>
                <td>
                  Focus stays in the dialog. Escape closes; the trigger regains
                  focus.
                </td>
              </tr>
              <tr>
                <td>Popover and tooltip</td>
                <td>
                  Escape dismisses. Tooltips appear immediately on keyboard
                  focus.
                </td>
              </tr>
              <tr>
                <td>Calendar</td>
                <td>
                  Arrow keys navigate dates; Page Up/Down changes months;
                  Enter/Space selects.
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Labels and validation</h2>
          <p>
            Every field requires a label. hideLabel visually hides it while
            preserving the accessible name. Description and error text are
            connected by aria-describedby, and errors set aria-invalid. Keep
            required instructions visible outside tooltips.
          </p>
          <h2>Meaning beyond color</h2>
          <p>
            Use status words inside badges and banners. Loading actions expose
            aria-busy and prevent repeat activation. Choose meaningful link
            labels and alt text; decorative icons are hidden from assistive
            technologies.
          </p>
          <h2>Motion and density</h2>
          <p>
            Reduced-motion preferences disable spinner rotation and transitions.
            Compact mode preserves visible focus and minimum target sizes. Check
            your application at 200% zoom, narrow widths and with long
            translated strings.
          </p>
          <h2>What validation can establish</h2>
          <p>
            The test suite runs structural axe checks on every catalog example
            and focused interaction tests for complex controls. Automated checks
            cannot certify WCAG compliance. Screen-reader output, high-contrast
            modes, touch behavior and custom brand overrides still require
            application-level testing.
          </p>
        </>
      ) : null}
      {slug === "design" ? (
        <>
          <p className="guide-lead">
            staqui keeps the restraint of a good admin interface and makes its
            behavior explicit.
          </p>
          <h2>A quiet visual language</h2>
          <p>
            Neutral surfaces carry most of the interface. Blue marks
            primary actions and selected states. Borders are subtle on content
            surfaces and stronger around editable controls, so hierarchy
            survives without heavy shadows.
          </p>
          <h2>Consistency that reduces decisions</h2>
          <p>
            A 4px spacing grid, three corner radii, shared control heights and a
            single icon language keep compositions aligned. Heading levels
            remain separate from visual sizes, while forms share label,
            description, error and value-change conventions.
          </p>
          <h2>Native where it helps</h2>
          <p>
            Native inputs preserve browser validation, autofill and mobile
            keyboards. Radix primitives handle overlay focus and collision
            behavior. React DayPicker provides calendar navigation. The visual
            system and public API belong to staqui.
          </p>
          <h2>An independent system</h2>
          <p>
            The research catalog is reference component catalog web components, not the older
            reference component catalog React library. staqui has no Shopify runtime, assets,
            service calls or App Bridge dependency. Its React API is
            intentionally not a compatibility layer.
          </p>
          <Link href="/docs/coverage">Read component adaptations</Link>
        </>
      ) : null}
      {slug === "coverage" ? (
        <>
          <p className="guide-lead">
            All 50 reference components have a staqui export, a runnable
            example, a dedicated documentation page, and a structural
            accessibility test.
          </p>
          <p>
            Research date: November 1, 2026. Source version: reference component catalog web
            components. Coverage means an independent equivalent, not identical
            platform APIs or feature parity.
          </p>
          <div className="coverage-list">
            {catalog.map((c) => (
              <details key={c.slug}>
                <summary>
                  {c.title}
                  <BadgeSmall category={c.category} />
                </summary>
                <p>{c.adaptation}</p>
                <Link href={`/components/${c.slug}`}>
                  Open staqui documentation
                </Link>
                <br />
                <Link href={c.source} target="_blank">
                  Read source reference
                </Link>
              </details>
            ))}
          </div>
        </>
      ) : null}
      {slug === "deployment" ? (
        <>
          <p className="guide-lead">
            Deploy the documentation as a Next.js project from the monorepo
            root. No secrets, database, or Shopify account are needed.
          </p>
          <h2>Vercel settings</h2>
          <table className="guide-table">
            <tbody>
              <tr>
                <th>Root directory</th>
                <td>
                  <code>apps/docs</code>
                </td>
              </tr>
              <tr>
                <th>Framework preset</th>
                <td>Next.js</td>
              </tr>
              <tr>
                <th>Install command</th>
                <td>
                  <code>cd ../.. && pnpm install --frozen-lockfile</code>
                </td>
              </tr>
              <tr>
                <th>Build command</th>
                <td>
                  <code>cd ../.. && pnpm build</code>
                </td>
              </tr>
              <tr>
                <th>Output directory</th>
                <td>Default Next.js output</td>
              </tr>
              <tr>
                <th>Node.js</th>
                <td>22.x or newer supported LTS</td>
              </tr>
              <tr>
                <th>Environment variables</th>
                <td>None</td>
              </tr>
            </tbody>
          </table>
          <p>
            Enable access to files outside the root directory so the workspace
            package and shared examples are included. The repository’s
            vercel.json provides the commands for the apps/docs root. The
            library is built before Next.js and does not need registry
            publication.
          </p>
          <h2>Before deploying</h2>
          <CodeBlock
            filename="Terminal"
            code={
              "pnpm install --frozen-lockfile\npnpm build\npnpm typecheck\npnpm test\npnpm check:coverage"
            }
          />
          <p>
            This workspace is prepared for deployment; it has not been published
            to Vercel.
          </p>
        </>
      ) : null}
    </article>
  );
}
function BadgeSmall({ category }: { category: string }) {
  return <span className="coverage-category">{category}</span>;
}
