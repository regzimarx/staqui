import NextLink from "next/link";
import { Button, Icon } from "@staqforce-studio/staqui";
import { SettingsDemo, ExampleWorkbench } from "@/components/workspace-demo";
import { HomeGallery } from "@/components/home-gallery";
import { InstallCommand } from "@/components/install-command";
import { CodeBlock } from "@/components/code-block";

export default function Home() {
  return (
    <div className="studio-home">
      <section className="studio-hero">
        <div className="studio-intro">
          <div className="studio-eyebrow">
            <span /> THE PRODUCT INTERFACE TOOLKIT{" "}
            <span className="version-label">v0.1</span>
          </div>
          <h1>
            Less assembly.
            <br />
            More <em>possibility.</em>
          </h1>
          <p className="studio-lead">
            Meet StaqUI. Fifty thoughtfully connected React components for the
            screens people work in every day.
          </p>
          <div className="studio-actions">
            <Button asChild variant="primary">
              <NextLink href="/docs/getting-started">
                Start building <Icon name="arrowUpRight" size={16} />
              </NextLink>
            </Button>
            <Button asChild>
              <NextLink href="/components">Explore the components</NextLink>
            </Button>
          </div>
          <div className="studio-byline">
            <span className="mini-stack" aria-hidden="true">
              ▰<br />▰<br />▰
            </span>
            <span>
              One visual language. Your entire product.
              <br />
              <strong>Made by Staqforce Studio.</strong>
            </span>
          </div>
        </div>
        <div className="studio-showcase">
          <div className="showcase-grid" aria-hidden="true" />
          <div className="showcase-label">
            <span>STQ / INTERFACE STUDIES</span>
            <span>001 — LIVE</span>
          </div>
          <div className="showcase-card">
            <div className="showcase-card-top">
              <span className="showcase-dots">● ● ●</span>
              <span>workspace.settings</span>
              <Icon name="sliders" size={13} />
            </div>
            <SettingsDemo compact />
          </div>
          <div className="showcase-stamp">
            <Icon name="check" size={15} />
            <span>
              Real components.
              <br />
              <strong>Go ahead, try them.</strong>
            </span>
          </div>
          <span className="showcase-caption">COMPOSED WITH STAQ UI ↗</span>
        </div>
      </section>
      <div className="studio-specs">
        <span>
          <strong>50</strong> composable components
        </span>
        <span>
          <Icon name="code" size={16} /> React + TypeScript
        </span>
        <span>
          <Icon name="sun" size={16} /> Light &amp; dark, built in
        </span>
        <span>
          <Icon name="layers" size={16} /> Two densities. One system.
        </span>
      </div>
      <section className="package-feature" aria-labelledby="package-title">
        <div className="package-feature-copy">
          <span className="studio-kicker">AVAILABLE ON NPM</span>
          <h2 id="package-title">
            <Icon name="package" size={24} /> Your next Staq, one install away.
          </h2>
          <p>
            React components, TypeScript declarations, styles, and fonts. All in{" "}
            <code>@staqforce-studio/staqui</code>.
          </p>
          <Button asChild size="small">
            <a
              href="https://www.npmjs.com/package/@staqforce-studio/staqui"
              target="_blank"
              rel="noopener noreferrer"
            >
              View package on npm <Icon name="arrowUpRight" size={14} />
            </a>
          </Button>
        </div>
        <InstallCommand />
      </section>
      <section className="studio-section" id="components">
        <div className="studio-section-head">
          <div>
            <span className="studio-kicker">01 / THE BUILDING BLOCKS</span>
            <h2>
              The pieces behind
              <br />
              your next big thing.
            </h2>
          </div>
          <div>
            <p>
              Choose a collection and get hands-on. These are the same
              components, styles, and states that ship in the library.
            </p>
            <NextLink href="/components" className="studio-text-link">
              Meet all 50 components <Icon name="arrowUpRight" size={15} />
            </NextLink>
          </div>
        </div>
        <HomeGallery />
      </section>
      <section className="studio-manifesto">
        <div className="manifesto-heading">
          <span className="studio-kicker">THE STAQ WAY</span>
          <h2>
            Purpose in
            <br />
            every pixel.
          </h2>
          <p>
            Made for dashboards, workspaces, and the tools that get things done.
          </p>
          <span className="manifesto-mark" aria-hidden="true">
            ≋
          </span>
        </div>
        <div className="manifesto-points">
          <NextLink href="/docs/theming">
            <span>01</span>
            <div>
              <h3>Density with intention.</h3>
              <p>
                32px compact controls. 40px comfortable controls. The same
                rhythm, from a single form to a table full of context.
              </p>
            </div>
            <Icon name="arrowUpRight" size={18} />
          </NextLink>
          <NextLink href="/docs/accessibility">
            <span>02</span>
            <div>
              <h3>Behavior is part of the design.</h3>
              <p>
                Keyboard paths, visible focus, labels, and useful feedback. The
                details that turn a collection into a system.
              </p>
            </div>
            <Icon name="arrowUpRight" size={18} />
          </NextLink>
          <NextLink href="/docs/design">
            <span>03</span>
            <div>
              <h3>Opinionated. Open to you.</h3>
              <p>
                Geist typography, a 4px rhythm, and semantic tokens. A distinct
                starting point with room for your own identity.
              </p>
            </div>
            <Icon name="arrowUpRight" size={18} />
          </NextLink>
        </div>
      </section>
      <section className="studio-section" id="compositions">
        <div className="studio-section-head">
          <div>
            <span className="studio-kicker">02 / CONNECT THE PIECES</span>
            <h2>
              From a component
              <br />
              to your next product.
            </h2>
          </div>
          <div>
            <p>
              Explore three working interfaces built from the same public
              components you’ll use. Search, sort, select, and make yourself at
              home.
            </p>
            <NextLink href="/examples" className="studio-text-link">
              Explore the compositions <Icon name="arrowUpRight" size={15} />
            </NextLink>
          </div>
        </div>
        <ExampleWorkbench initial="collections" />
      </section>
      <section className="studio-section studio-theme">
        <div>
          <span className="studio-kicker">03 / MAKE YOUR MARK</span>
          <h2>
            Your identity.
            <br />
            In every state.
          </h2>
          <p>
            Change a token and the system follows. Bring your colors, tune the
            corners, set the density. Keep the consistency.
          </p>
          <div className="studio-palette" aria-label="Example brand palette">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span>Aa</span>
          </div>
          <NextLink href="/docs/theming" className="studio-text-link">
            Find your theme <Icon name="arrowUpRight" size={15} />
          </NextLink>
        </div>
        <CodeBlock
          filename="your-product.css"
          code={
            ':root {\n  --sq-accent: #0a2eb5;\n  --sq-accent-hover: #08238a;\n              --sq-font: "Geist", sans-serif;\n  --sq-radius-medium: 12px;\n}\n\n/* One system. Every surface. */\n[data-staq-theme="dark"] {\n  --sq-accent: #8da3ff;\n  --sq-accent-ink: #101b52;\n}'
          }
        />
      </section>
      <section className="studio-close">
        <span className="studio-kicker">YOUR NEXT GREAT INTERFACE</span>
        <h2>
          It starts with
          <br />a good <em>Staq.</em>
        </h2>
        <Button asChild>
          <NextLink href="/docs/getting-started">
            Let’s build something <Icon name="arrowUpRight" size={17} />
          </NextLink>
        </Button>
        <span className="close-stack" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </section>
    </div>
  );
}
