"use client";
import { URLField } from "@staqforce-studio/staqui";

export default function UrlFieldExample() {
  return (
    <URLField
      label="Project website"
      placeholder="https://example.com"
      description="Include https:// in the address."
    />
  );
}
