"use client";
import { Link, Stack } from "@staqforce/staqui";

export default function LinkExample() {
  return (
    <Stack direction="row">
      <Link href="/docs/getting-started">Installation guide</Link>
      <Link href="/components/button" variant="button">
        Explore buttons
      </Link>
    </Stack>
  );
}
