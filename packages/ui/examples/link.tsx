"use client";
import { Icon, Link, Stack } from "@staqforce-studio/staqui";

export default function LinkExample() {
  return (
    <Stack direction="row" align="center">
      <Link href="/docs/getting-started">
        Read the documentation <Icon name="arrowUpRight" size={14} />
      </Link>
      <Link href="/components/button" variant="button">
        Explore buttons
      </Link>
    </Stack>
  );
}
