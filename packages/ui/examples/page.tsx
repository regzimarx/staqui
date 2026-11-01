"use client";
import { useState } from "react";
import { Page, Text, Button } from "@staqui/ui";

export default function PageExample() {
  const [saved, setSaved] = useState(false);
  return (
    <Page
      heading="Project settings"
      description="Make this workspace your own."
      action={<Button onClick={() => setSaved(true)}>Save locally</Button>}
    >
      <Text>
        {saved
          ? "Local settings saved for this example."
          : "Your project content goes here."}
      </Text>
    </Page>
  );
}
