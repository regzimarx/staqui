"use client";
import { useState } from "react";
import { Tooltip, Button, Icon } from "@staqforce-studio/staqui";

export default function TooltipExample() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <Tooltip
      content={
        copied
          ? "Link copied"
          : failed
            ? "Copy unavailable"
            : "Copy collection link"
      }
    >
      <Button
        variant="secondary"
        style={{ width: 36, minHeight: 36, paddingInline: 0 }}
        icon={<Icon name={copied ? "check" : "copy"} />}
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
      />
    </Tooltip>
  );
}
