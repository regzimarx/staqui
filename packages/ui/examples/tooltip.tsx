"use client";
import { useState } from "react";
import { Tooltip, Button, Icon } from "@staqui/ui";

export default function TooltipExample() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Tooltip content="Copy the collection link">
      <Button
        aria-label={
          copied
            ? "Copied"
            : failed
              ? "Copy unavailable"
              : "Copy link to collection"
        }
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(
              "https://example.com/collections/essentials",
            );
            setCopied(true);
            setFailed(false);
          } catch {
            setFailed(true);
          }
        }}
      >
        <Icon name={copied ? "check" : "copy"} />
        {copied ? "Copied" : failed ? "Copy unavailable" : "Copy link"}
      </Button>
    </Tooltip>
  );
}
