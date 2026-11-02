import type { Metadata } from "next";
import NextLink from "next/link";
import { Icon } from "@staqforce-studio/staqui";
import { guides } from "@/lib/guides";
import { CodeBlock } from "@/components/code-block";
export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Your field guide to building with StaqUI: setup, themes, accessibility, and component APIs.",
};

export default function Docs() {
  return (
    <div className="content-page docs-hub">
      <div className="page-heading">
        <span className="studio-kicker">THE STAQ UI FIELD GUIDE</span>
        <h1>
          A good place
          <br />
          to start building.
        </h1>
        <p>
          From the first import to the final focus state. Everything you need to
          work with the system.
        </p>
      </div>
      <NextLink href="/docs/getting-started" className="docs-start">
        <Icon name="layers" size={28} />
        <div>
          <span className="studio-kicker">START HERE</span>
          <h2>Your first StaqUI interface</h2>
          <p>A stylesheet, a provider, and a few good building blocks.</p>
        </div>
        <Icon name="arrowUpRight" size={24} />
      </NextLink>
      <div className="guide-grid">
        {guides.map(([slug, number, title, description]) => (
          <NextLink key={slug} href={`/docs/${slug}`}>
            <span className="studio-kicker">{number} / GUIDE</span>
            <h2>
              {title} <Icon name="arrowUpRight" size={17} />
            </h2>
            <p>{description}</p>
          </NextLink>
        ))}
      </div>
      <div className="docs-quick">
        <div>
          <span className="studio-kicker">THE SHAPE OF THINGS</span>
          <h2>
            Familiar React.
            <br />A connected system.
          </h2>
          <p>
            Typed props, native semantics, and explicit state. Browse live
            previews and copy the exact source behind them.
          </p>
          <NextLink className="studio-text-link" href="/components">
            Open the component reference <Icon name="arrowUpRight" size={15} />
          </NextLink>
        </div>
        <CodeBlock
          filename="App.tsx"
          code={
            'import { StaqProvider, Button }\n  from "@staqforce-studio/staqui";\nimport "@staqforce-studio/staqui/styles.css";\n\nexport default function App() {\n  return (\n    <StaqProvider theme="light" density="compact">\n      <Button variant="primary">Let’s build</Button>\n    </StaqProvider>\n  );\n}'
          }
        />
      </div>
    </div>
  );
}
