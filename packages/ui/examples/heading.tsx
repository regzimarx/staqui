"use client";
import { Heading, Stack } from "@staqforce-studio/staqui";

export default function HeadingExample() {
  return (
    <Stack>
      <Heading level={2} size="large">
        Collection overview
      </Heading>
      <Heading level={3}>Product details</Heading>
      <Heading level={4} size="small">
        Shipping preferences
      </Heading>
    </Stack>
  );
}
