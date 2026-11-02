"use client";
import { Spinner, Stack } from "@staqforce/staqui";

export default function SpinnerExample() {
  return (
    <Stack direction="row" align="center">
      <Spinner size="small" label="Loading items" />
      <Spinner label="Loading collection" />
      <Spinner size="large" label="Loading workspace" />
    </Stack>
  );
}
