"use client";
import { useState } from "react";
import { Button, Icon } from "@staqui/ui";
export function CopyButton({
  text,
  label = "Copy code",
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied");
      setTimeout(() => setStatus(""), 2000);
    } catch {
      setStatus("Copy unavailable");
    }
  }
  return (
    <Button
      variant="tertiary"
      size="small"
      aria-label={status || label}
      onClick={copy}
    >
      <Icon name={status === "Copied" ? "check" : "copy"} size={14} />
      <span aria-live="polite">{status || "Copy"}</span>
    </Button>
  );
}
export function CodeBlock({
  code,
  filename = "Example.tsx",
}: {
  code: string;
  filename?: string;
}) {
  return (
    <div className="code-block">
      <div className="code-header">
        <span>{filename}</span>
        <CopyButton text={code} />
      </div>
      <pre tabIndex={0} aria-label={`${filename} source`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
