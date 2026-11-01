"use client";
import { Icon, Stack } from "@staqui/ui";

export default function IconExample() {
  return (
    <Stack direction="row" gap="4">
      {(
        ["layers", "package", "settings", "search", "plus", "check"] as const
      ).map((name) => (
        <Icon key={name} name={name} label={name} size={24} />
      ))}
    </Stack>
  );
}
