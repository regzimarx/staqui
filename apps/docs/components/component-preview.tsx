"use client";
import { useState } from "react";
import { Button, Select } from "@staqforce-studio/staqui";
import { examples } from "@/lib/examples";
import sources from "@/lib/example-source.json";
import { CodeBlock, CopyButton } from "./code-block";
import webSources from "@/lib/example-web-source.json";

const languages = ["React", "HTML"] as const;
type Language = (typeof languages)[number];

function getUsage(slug: keyof typeof sources, language: Language) {
  if (language === "React") {
    return { filename: "Example.tsx", code: sources[slug] };
  }

  const imports = `import { element, mount, StaqProvider } from "@staqforce-studio/staqui/html";
import { Fragment } from "react";
import "@staqforce-studio/staqui/styles.css";`;
  const example = webSources[slug];
  const tree = "element(StaqProvider, null, element(Example))";

  return {
    filename: "index.html",
    code: `<!-- Run with a module bundler such as Vite. -->
<div id="staqui-example"></div>
<script type="module">
${imports}

${example}

mount(document.getElementById("staqui-example"), ${tree});
</script>`,
  };
}

export function ComponentPreview({ slug }: { slug: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [language, setLanguage] = useState<Language>("React");
  const [version, setVersion] = useState(0);
  const Component = examples[slug as keyof typeof examples];
  const { code, filename } = getUsage(slug as keyof typeof sources, language);
  return (
    <div className="component-preview">
      <div className="preview-toolbar">
        <div role="tablist" aria-label="Example view">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              id={`example-${t}-tab`}
              aria-controls={`example-${t}`}
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => {
                if (
                  ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? "preview"
                      : e.key === "End"
                        ? "code"
                        : tab === "preview"
                          ? "code"
                          : "preview";
                  setTab(next);
                  document.getElementById(`example-${next}-tab`)?.focus();
                }
              }}
            >
              {t === "preview" ? "Preview" : "Code"}
            </button>
          ))}
        </div>
        <div className="preview-tools">
          <Button
            variant="tertiary"
            size="small"
            onClick={() => setVersion(version + 1)}
          >
            Reset
          </Button>
          {tab === "code" && (
            <Select
              label="Code language"
              className="preview-language"
              hideLabel
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
              options={languages.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          )}
          <CopyButton text={code} />
        </div>
      </div>
      <div
        role="tabpanel"
        id={`example-${tab}`}
        aria-labelledby={`example-${tab}-tab`}
        tabIndex={0}
      >
        {tab === "preview" ? (
          <div className={`preview-canvas preview-${slug}`}>
            <Component key={version} />
          </div>
        ) : (
          <CodeBlock code={code} filename={filename} showCopy={false} />
        )}
      </div>
    </div>
  );
}
