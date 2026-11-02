"use client";
import { Paragraph, Link } from "@staqforce-studio/staqui";

export default function ParagraphExample() {
  return (
    <Paragraph>
      A little structure goes a long way. Group related content, keep actions
      close to their context, and{" "}
      <Link href="/docs/accessibility">make every interaction accessible</Link>.
    </Paragraph>
  );
}
