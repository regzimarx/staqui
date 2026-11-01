import { Icon } from "@staqui/ui";
import { CodeBlock } from "@/components/code-block";
import { ExampleWorkbench, SettingsDemo } from "@/components/workspace-demo";
import { HomeGallery } from "@/components/home-gallery";
import { SiteLink as Link } from "@/components/site-link";
export default function Home() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-copy">
          <h1>
            Less UI work.
            <br />
            More good product.
          </h1>
          <p>
            Meet StaqUI. Fifty thoughtfully built React components that turn the
            small details into your head start.
          </p>
          <div className="landing-actions">
            <Link
              href="/docs/getting-started"
              variant="button"
              className="hero-primary"
            >
              Start building <Icon name="arrowUpRight" size={16} />
            </Link>
            <Link href="/components" variant="button">
              Explore components
            </Link>
          </div>
          <div className="landing-compat">
            <span>React + TypeScript</span>
            <span>MIT licensed</span>
            <span>Yours to customize</span>
          </div>
        </div>
        <div className="landing-stage">
          <div className="stage-caption">
            <Icon name="layers" size={16} />
            <span>A few components. A whole workspace.</span>
          </div>
          <SettingsDemo compact />
          <div className="stage-bottom">
            <span>Live example</span>
            <span>Go ahead. Make a change.</span>
          </div>
        </div>
      </section>
      <div className="landing-index">
        <span>A foundation with the details built in.</span>
        <Link href="#components">Explore the system</Link>
        <Link href="#compose">See it in context</Link>
        <Link href="#customize">Make it yours</Link>
      </div>
      <div id="components">
        <HomeGallery />
      </div>
      <section className="landing-principles">
        <h2>
          Small things.
          <br />
          Done with intention.
        </h2>
        <div>
          <article>
            <Icon name="check" />
            <h3>Interaction comes first.</h3>
            <p>
              Visible focus, meaningful labels, keyboard navigation, and
              feedback that tells you what happened.
            </p>
            <Link href="/docs/accessibility">Accessibility approach</Link>
          </article>
          <article>
            <Icon name="sliders" />
            <h3>Density without the noise.</h3>
            <p>
              Comfortable when you need room. Compact when you need context. One
              spacing system holds it together.
            </p>
            <Link href="/docs/theming">Explore the tokens</Link>
          </article>
          <article>
            <Icon name="code" />
            <h3>Built to leave this website.</h3>
            <p>
              A standalone package with typed APIs, exported styles, and no
              platform service dependency.
            </p>
            <Link href="/docs/getting-started">Install in your app</Link>
          </article>
        </div>
      </section>
      <section id="compose" className="landing-compose">
        <div className="landing-section-heading">
          <h2>
            From building blocks
            <br />
            to everyday workflows.
          </h2>
          <p>
            Settings, collections, and a launch plan. Real compositions you can
            click, edit, and explore.
          </p>
        </div>
        <ExampleWorkbench initial="collections" />
      </section>
      <section id="customize" className="landing-customize">
        <div>
          <h2>
            A system.
            <br />
            Not a signature
            <br />
            you’re stuck with.
          </h2>
          <p>
            Start with StaqUI’s quiet defaults. Bring your color, your density,
            and your point of view. Semantic CSS tokens keep everything
            connected.
          </p>
          <Link href="/docs/theming">Make StaqUI your own</Link>
        </div>
        <CodeBlock
          filename="your-brand.css"
          code={
            ':root {\n  --sq-font: "Fixel Display", sans-serif;\n  --sq-accent: #0a2eb5;\n  --sq-radius-medium: 12px;\n  --sq-control-height: 40px;\n}\n\n[data-staq-theme="dark"] {\n  --sq-accent: #8da3ff;\n}'
          }
        />
      </section>
      <section className="landing-close">
        <Icon name="layers" size={40} />
        <h2>
          Your next interface
          <br />
          starts with a good stack.
        </h2>
        <p>Explore the components. Find your starting point. Make it yours.</p>
        <Link
          href="/docs/getting-started"
          variant="button"
          className="hero-primary"
        >
          Build with StaqUI <Icon name="arrowUpRight" size={16} />
        </Link>
      </section>
    </div>
  );
}
