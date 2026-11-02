"use client";
import { Badge, Stack } from "@staqforce/staqui";

export default function BadgeExample() {
  return (
    <Stack direction="row" gap="2">
      <Badge>Draft</Badge>
      <Badge tone="success">Published</Badge>
      <Badge tone="warning">Review needed</Badge>
      <Badge tone="critical">Failed</Badge>
      <Badge tone="info">In progress</Badge>
    </Stack>
  );
}
