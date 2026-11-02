"use client";
import { Banner, Stack } from "@staqforce-studio/staqui";

export default function BannerExample() {
  return (
    <Stack>
      <Banner title="Your workspace is ready" tone="success" dismissible>
        Invite your team when you are ready.
      </Banner>
      <Banner title="Check the highlighted fields" tone="critical">
        A project name is required.
      </Banner>
    </Stack>
  );
}
