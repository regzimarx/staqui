"use client";
import { useState } from "react";
import { Checkbox, Stack } from "@staqforce-studio/staqui";

export default function CheckboxExample() {
  const [checked, setChecked] = useState(true);
  return (
    <Stack>
      <Checkbox
        label="Email me a weekly summary"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Checkbox label="Some items selected" indeterminate />
      <Checkbox label="Managed by your organization" disabled defaultChecked />
    </Stack>
  );
}
