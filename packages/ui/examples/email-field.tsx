"use client";
import { EmailField } from "@staqui/ui";

export default function EmailFieldExample() {
  return (
    <EmailField
      label="Contact email"
      type="email"
      placeholder="you@example.com"
      autoComplete="email"
      required
    />
  );
}
