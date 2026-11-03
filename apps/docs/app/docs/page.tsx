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
        <span className="studio-kicker">STAQUI FIELD GUIDE</span>
        <h1>Documentation</h1>
        <p>
          Set up StaqUI, make it fit your product, and find the components and
          patterns you need.
        </p>
      </div>
      <NextLink href="/docs/getting-started" className="docs-start">
        <span className="docs-start-icon">
          <Icon name="layers" size={23} />
        </span>
        <div>
          <span className="studio-kicker">START HERE</span>
          <h2>Install StaqUI</h2>
          <p>Set up the package and render your first component.</p>
        </div>
        <Icon name="arrowUpRight" size={24} />
      </NextLink>
      <h2 className="docs-guides-heading">Guides</h2>
      <div className="guide-grid">
        {guides
          .filter(([slug]) => slug !== "getting-started")
          .map(([slug, number, title, description]) => (
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
          <h2>Explore the components</h2>
          <p>
            Try the live examples, inspect component props, and copy the source
            for React or HTML.
          </p>
          <NextLink className="studio-text-link" href="/components">
            Open the component reference <Icon name="arrowUpRight" size={15} />
          </NextLink>
        </div>
        <CodeBlock
          filename="App.tsx"
          code={
            'import { StaqProvider, Button }\n  from "@staqforce-studio/staqui";\nimport "@staqforce-studio/staqui/styles.css";\n\nexport default function App() {\n  return (\n    <StaqProvider theme="light">\n      <Button variant="primary">Let’s build</Button>\n    </StaqProvider>\n  );\n}'
          }
        />
      </div>
    </div>
  );
}
