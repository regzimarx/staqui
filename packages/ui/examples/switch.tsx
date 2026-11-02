"use client";
import { useState } from "react";
import { Switch, Stack } from "@staqforce/staqui";

export default function SwitchExample() {
  const [enabled, setEnabled] = useState(true);
  return (
    <Stack>
      <Switch
        label="Enable notifications"
        checked={enabled}
        onCheckedChange={setEnabled}
        description="Receive updates about activity in this workspace."
      />
      <Switch label="Organization policy" disabled defaultChecked />
    </Stack>
  );
}
