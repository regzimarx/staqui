import {
  Button,
  Heading,
  Icon,
  ListItem,
  Paragraph,
  Stack,
  Text,
  UnorderedList,
} from "@staqforce/staqui";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/code-block";
import { ExampleWorkbench, SettingsDemo } from "@/components/workspace-demo";
import { HomeGallery } from "@/components/home-gallery";
import { SiteLink as Link } from "@/components/site-link";

const chapters = [
  {
    href: "#components",
    title: "Specimens",
    detail: "Fifty components, each one running.",
  },
  {
    href: "#standards",
    title: "Standards",
    detail: "The decisions behind the surface.",
  },
  {
    href: "#compose",
    title: "Compositions",
    detail: "Assembled example applications.",
  },
  {
    href: "#customize",
    title: "Tokens",
    detail: "Color, type, radius, and density.",
  },
];

const tokenSamples = [
  {
    token: "--sq-accent",
    use: "Primary actions and focus",
    swatch: "lp-swatch-accent",
  },
  {
    token: "--sq-selected",
    use: "Chosen rows and controls",
    swatch: "lp-swatch-selected",
  },
  {
    token: "--sq-subtle",
    use: "Quiet canvas behind content",
    swatch: "lp-swatch-subtle",
  },
  {
    token: "--sq-font",
    use: "Fixel Display, overridable",
    swatch: "lp-swatch-type",
  },
];

function ChapterHead({
  index,
  label,
  title,
  description,
  href,
  linkLabel,
}: {
  index: string;
  label: string;
  title: ReactNode;
  description: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="lp-chapter-head">
      <div>
        <Text className="lp-mono lp-chapter">
          <Text className="lp-chapter-index">{index}</Text>
          {label}
        </Text>
        <Heading level={2}>{title}</Heading>
      </div>
      <div className="lp-chapter-side">
        <Paragraph tone="muted">{description}</Paragraph>
        {href && linkLabel ? (
          <Link href={href} className="lp-more">
            {linkLabel} <Icon name="arrowUpRight" size={14} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="lp">
      <section className="lp-hero">
        <div className="lp-hero-intro">
          <Text className="lp-mono lp-eyebrow">
            <span className="lp-eyebrow-mark" aria-hidden="true" />
            Staqforce Studio · React component system
          </Text>
          <Heading level={1}>
            Build the product.
            <br />
            <Text tone="muted">Not the components.</Text>
          </Heading>
          <div className="lp-hero-support">
            <Paragraph tone="muted">
              StaqUI is fifty React and TypeScript components for the work that
              takes the longest: focus states, empty states, dense tables,
              overlays, and everything in between.
            </Paragraph>
            <Stack direction="row" gap="3" className="lp-actions">
              <Button asChild variant="primary">
                <NextLink href="/docs/getting-started">
                  Start building <Icon name="arrowUpRight" size={15} />
                </NextLink>
              </Button>
              <Button asChild>
                <NextLink href="/components">Browse components</NextLink>
              </Button>
            </Stack>
          </div>
          <Paragraph className="lp-facts">
            <Text>50 components</Text>
            <Text>React + TypeScript</Text>
            <Text>Semantic tokens</Text>
            <Text>MIT licensed</Text>
          </Paragraph>
        </div>
        <figure className="lp-specimen">
          <div className="lp-specimen-bar">
            <Text className="lp-mono">Specimen — workspace settings</Text>
            <Text className="lp-mono lp-live">Live</Text>
          </div>
          <div className="lp-specimen-body lp-paper">
            <SettingsDemo compact />
          </div>
          <figcaption className="lp-mono">
            Every control here ships in the package. Changes stay in this
            browser.
          </figcaption>
        </figure>
      </section>

      <nav className="lp-index" aria-label="Homepage sections">
        {chapters.map((chapter, i) => (
          <Link href={chapter.href} key={chapter.href}>
            <Text className="lp-mono">0{i + 1}</Text>
            <Text className="lp-index-title">{chapter.title}</Text>
            <Text className="lp-index-detail">{chapter.detail}</Text>
            <Icon name="arrowUpRight" size={14} />
          </Link>
        ))}
      </nav>

      <section id="components" className="lp-section">
        <ChapterHead
          index="01"
          label="Specimens"
          title={
            <>
              Fifty pieces,
              <br />
              in working order.
            </>
          }
          description="Not screenshots. These are the published components, mounted on this page and live to the touch."
          href="/components"
          linkLabel="View all 50"
        />
        <HomeGallery />
      </section>

      <section id="standards" className="lp-section">
        <ChapterHead
          index="02"
          label="Standards"
          title={
            <>
              The decisions
              <br />
              you no longer make.
            </>
          }
          description="Each one starts with how an interface behaves when someone actually uses it."
        />
        <div className="lp-standards">
          <article className="lp-standard">
            <Text className="lp-mono lp-standard-index">02.1</Text>
            <Heading level={3}>Interaction is the product.</Heading>
            <div>
              <Paragraph tone="muted">
                Visible focus, real labels, keyboard paths, and feedback that
                says what happened. The states people hit in a hurry are the
                ones built first.
              </Paragraph>
              <Link href="/docs/accessibility" className="lp-more">
                Accessibility approach <Icon name="arrowUpRight" size={14} />
              </Link>
            </div>
          </article>
          <article className="lp-standard">
            <Text className="lp-mono lp-standard-index">02.2</Text>
            <Heading level={3}>Density is a choice, not a look.</Heading>
            <div>
              <Paragraph tone="muted">
                Comfortable when a task needs room. Compact when a screen needs
                context. One 4px grid, one control height per density, so both
                share the same geometry.
              </Paragraph>
              <Link href="/docs/theming" className="lp-more">
                Themes &amp; tokens <Icon name="arrowUpRight" size={14} />
              </Link>
            </div>
          </article>
          <article className="lp-standard">
            <Text className="lp-mono lp-standard-index">02.3</Text>
            <Heading level={3}>It leaves with you.</Heading>
            <div>
              <Paragraph tone="muted">
                A standalone package with typed props, exported CSS, and no
                platform service behind it. Nothing in the library depends on
                this documentation site to work.
              </Paragraph>
              <Link href="/docs/getting-started" className="lp-more">
                Install in your app <Icon name="arrowUpRight" size={14} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section id="compose" className="lp-section">
        <ChapterHead
          index="03"
          label="Compositions"
          title={
            <>
              From parts
              <br />
              to a working screen.
            </>
          }
          description="Settings, collections, and a launch plan, assembled only from public exports. Click, type, and explore all three."
          href="/examples"
          linkLabel="Open the examples"
        />
        <div className="lp-bench lp-paper">
          <ExampleWorkbench initial="collections" />
        </div>
      </section>

      <section id="customize" className="lp-section lp-tokens-section">
        <div>
          <Text className="lp-mono lp-chapter">
            <Text className="lp-chapter-index">04</Text>
            Tokens
          </Text>
          <Heading level={2}>
            A quiet default,
            <br />
            not a signature.
          </Heading>
          <Paragraph tone="muted" className="lp-tokens-copy">
            Start with StaqUI&rsquo;s restrained palette and let your brand move
            in. Color, corner, type, and density are all semantic CSS custom
            properties, so one override reaches every component and every
            portal.
          </Paragraph>
          <UnorderedList className="lp-tokens">
            {tokenSamples.map((sample) => (
              <ListItem key={sample.token}>
                <span
                  className={`lp-swatch ${sample.swatch}`}
                  aria-hidden="true"
                >
                  {sample.swatch === "lp-swatch-type" ? "Aa" : null}
                </span>
                <code>{sample.token}</code>
                <Text>{sample.use}</Text>
              </ListItem>
            ))}
          </UnorderedList>
          <Link href="/docs/theming" className="lp-more">
            Read the theming guide <Icon name="arrowUpRight" size={14} />
          </Link>
        </div>
        <CodeBlock
          filename="your-brand.css"
          code={
            ':root {\n  --sq-font: "Fixel Display", sans-serif;\n  --sq-accent: #0a2eb5;\n  --sq-radius-medium: 12px;\n  --sq-control-height: 40px;\n}\n\n[data-staq-theme="dark"] {\n  --sq-accent: #8da3ff;\n}'
          }
        />
      </section>

      <section className="lp-close">
        <div>
          <Text className="lp-mono">Ready when you are</Text>
          <Heading level={2}>
            Your next interface
            <br />
            starts with a good stack.
          </Heading>
        </div>
        <div className="lp-close-side">
          <Paragraph tone="muted">
            Install the package, swap in your tokens, and start from pieces that
            already behave.
          </Paragraph>
          <Stack direction="row" gap="3" className="lp-actions">
            <Button asChild variant="primary">
              <NextLink href="/docs/getting-started">
                Build with StaqUI <Icon name="arrowUpRight" size={15} />
              </NextLink>
            </Button>
            <Button asChild>
              <NextLink href="/components">Browse components</NextLink>
            </Button>
          </Stack>
        </div>
      </section>
    </div>
  );
}
