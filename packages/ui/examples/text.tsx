"use client";
import { Text, Stack } from "@staqforce-studio/staqui";

export default function TextExample() {
  return (
    <Stack>
      <Text weight="bold">A clear starting point</Text>
      <Text tone="muted">Supporting details stay in the background.</Text>
      <Text tone="critical">This field needs your attention.</Text>
      <Text size="small">Last edited just now</Text>
    </Stack>
  );
}
