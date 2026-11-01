"use client";
import { Spinner, Stack } from "@staqui/ui";

export default function SpinnerExample() {
  return (
    <Stack direction="row" align="center">
      <Spinner size="small" label="Loading items" />
      <Spinner label="Loading collection" />
      <Spinner size="large" label="Loading workspace" />
    </Stack>
  );
}
