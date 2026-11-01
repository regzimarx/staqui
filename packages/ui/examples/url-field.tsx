"use client";
import { URLField } from "@staqui/ui";

export default function UrlFieldExample() {
  return (
    <URLField
      label="Project website"
      placeholder="https://example.com"
      description="Include https:// in the address."
    />
  );
}
