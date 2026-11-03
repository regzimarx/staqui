"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Icon, StaqProvider } from "@staqforce-studio/staqui";
export function CopyButton({
  text,
  label = "Copy code",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus(""), 2000);
    } catch {
      setStatus("Copy unavailable");
    }
  }
  return (
    <Button
      variant="tertiary"
      size="small"
      aria-label={status || label}
      icon={<Icon name={status === "Copied" ? "check" : "copy"} size={14} />}
      onClick={copy}
    >
      <span aria-live="polite">{status || "Copy"}</span>
    </Button>
  );
}
export function CodeBlock({
  code,
  filename = "Example.tsx",
  showCopy = true,
}: {
  code: string;
  filename?: string;
  showCopy?: boolean;
}) {
  return (
    <StaqProvider theme="dark" className="code-block">
      <div className="code-header">
        <span>{filename}</span>
        {showCopy && <CopyButton text={code} />}
      </div>
      <pre tabIndex={0} aria-label={`${filename} source`}>
        <code>
          {code
            .split(
              /(<!--[\s\S]*?-->|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|<\/?[\w.-]+|\b(?:import|from|export|default|function|const|let|return|true|false|undefined)\b)/g,
            )
            .map((part, index) =>
              index % 2 === 0 ? (
                part
              ) : (
                <span
                  key={index}
                  className={
                    part.startsWith("<!--") || part.startsWith("/*")
                      ? "code-comment"
                      : part.startsWith('"') || part.startsWith("'")
                        ? "code-string"
                        : "code-keyword"
                  }
                >
                  {part}
                </span>
              ),
            )}
        </code>
      </pre>
    </StaqProvider>
  );
}
