"use client";
import { useState } from "react";
import { Button, Icon } from "@staqforce/staqui";
import { examples } from "@/lib/examples";
import sources from "@/lib/example-source.json";
import { CodeBlock, CopyButton } from "./code-block";
export function ComponentPreview({ slug }: { slug: string }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [version, setVersion] = useState(0);
  const Component = examples[slug as keyof typeof examples];
  const code = sources[slug as keyof typeof sources];
  return (
    <div className="component-preview">
      <div className="preview-toolbar">
        <div role="tablist" aria-label="Example view">
          {(["preview", "code"] as const).map((t, i) => (
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
          <CodeBlock code={code} />
        )}
      </div>
    </div>
  );
}
