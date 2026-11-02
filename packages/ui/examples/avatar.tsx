"use client";
import { Avatar, Stack } from "@staqforce-studio/staqui";

export default function AvatarExample() {
  return (
    <Stack direction="row" align="center">
      <Avatar name="Maya Chen" size="small" />
      <Avatar name="Alex Rivera" />
      <Avatar name="Sam Patel" size="large" />
    </Stack>
  );
}
