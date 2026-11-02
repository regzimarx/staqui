"use client";
import { Stack, Badge } from "@staqforce/staqui";

export default function StackExample() {
  return (
    <Stack direction="row" gap="3" align="center">
      <Badge tone="success">Ready</Badge>
      <span>All changes saved</span>
    </Stack>
  );
}
