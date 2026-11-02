/* Hallmark · waive 26b · StaqUI shared stylesheet defines active and disabled states · This module consumes styled library controls; duplicating their CSS would break the single source of truth. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge, Icon } from "@staqforce/staqui";
import { SiteLink as Link } from "@/components/site-link";
import { catalog } from "@/lib/catalog";
import api from "@/lib/api.json";
import sources from "@/lib/example-source.json";
import { ComponentPreview } from "@/components/component-preview";
import { CodeBlock } from "@/components/code-block";
export function generateStaticParams() {
  return catalog.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = catalog.find((c) => c.slug === slug);
  return {
    title: c?.title ?? "Component not found",
    description: c?.description,
  };
}
export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = catalog.find((c) => c.slug === slug);
  if (!c) notFound();
  const props = api[slug as keyof typeof api] ?? [];
  const related = c.related
    .map((s) => catalog.find((c) => c.slug === s))
    .filter(Boolean)
    .slice(0, 5);
  const index = catalog.indexOf(c);
  return (
    <article className="component-page">
      <div className="breadcrumbs">
        <Link href="/components">Components</Link>
        <span>/</span>
        <span>{c.category}</span>
      </div>
      <div className="component-heading">
        <h1>{c.title}</h1>
        <Badge>React component</Badge>
      </div>
      <p className="component-description">{c.description}</p>
      <nav className="page-toc" aria-label="On this page">
        <a href="#example">Example</a>
        <a href="#usage">Usage</a>
        <a href="#api">API reference</a>
        <a href="#accessibility">Accessibility</a>
      </nav>
      <section id="example">
        <h2>Try it out</h2>
        <p className="section-description">
          Use the live controls. The theme and density settings apply here too.
        </p>
        <ComponentPreview slug={slug} />
      </section>
      <section id="usage">
        <h2>Usage</h2>
        <p className="section-description">
          This is the exact source rendered in the preview above.
        </p>
        <CodeBlock
          code={sources[slug as keyof typeof sources]}
          filename={`${c.name}Example.tsx`}
        />
      </section>
      <section id="api">
        <h2>API reference</h2>
        <p className="section-description">
          Generated from the package’s TypeScript exports. Standard React event
          and ARIA attributes are also accepted where the component wraps a
          native element.
        </p>
        <div
          className="api-scroll"
          tabIndex={0}
          role="region"
          aria-label={`${c.title} props`}
        >
          <table className="api-table">
            <thead>
              <tr>
                <th scope="col">Prop</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((p) => (
                <tr key={p.name}>
                  <td>
                    <code>{p.name}</code>
                    {p.required && (
                      <span className="required-label">Required</span>
                    )}
                  </td>
                  <td>
                    <code>{p.type}</code>
                    {p.default !== null && (
                      <span className="prop-default">
                        Default: <code>{p.default}</code>
                      </span>
                    )}
                  </td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="accessibility">
        <h2>Accessibility & interaction</h2>
        <p>{c.accessibility}</p>
        <p>
          Visible focus, reduced motion, and both color themes are shared across
          StaqUI. Choose labels and document structure that make sense in your
          application; automated checks do not replace assistive-technology
          testing.
        </p>
      </section>
      <section>
        <h2>Variants, states & adaptations</h2>
        <p>{c.adaptation}</p>
        <p>
          Use the typed API above for the supported variants. The example
          demonstrates the primary composition; shared controls inherit hover,
          focus, active and disabled treatment where applicable.
        </p>
        <Link href={c.source} target="_blank">
          Reference research: {c.title}
          <Icon name="arrowUpRight" size={14} />
        </Link>
        <p className="research-date">
          Research captured November 1, 2026. Independent implementation
          inspired by reference component catalog.
        </p>
      </section>
      {related.length > 0 && (
        <section>
          <h2>Compose with</h2>
          <div className="related-links">
            {related.map((r) => (
              <Link
                key={r!.slug}
                href={`/components/${r!.slug}`}
                variant="button"
              >
                {r!.title}
              </Link>
            ))}
          </div>
        </section>
      )}
      <nav className="component-pagination" aria-label="Adjacent components">
        {index > 0 ? (
          <Link href={`/components/${catalog[index - 1].slug}`}>
            Previous: {catalog[index - 1].title}
          </Link>
        ) : (
          <span />
        )}
        {index < catalog.length - 1 && (
          <Link href={`/components/${catalog[index + 1].slug}`}>
            Next: {catalog[index + 1].title}
          </Link>
        )}
      </nav>
    </article>
  );
}
