"use client";
import { useState } from "react";
import { Checkbox, Stack } from "@staqforce-studio/staqui";

export default function CheckboxExample() {
  const [checked, setChecked] = useState(true);
  return (
    <Stack>
      <Checkbox
        label="Product announcements"
        description="News worth opening your inbox for."
        checked={checked}
        onCheckedChange={setChecked}
      />
      <Checkbox
        label="Weekly digest"
        description="Highlights delivered every Monday."
      />
      <Checkbox
        label="Partially selected"
        description="Indeterminate selection."
        indeterminate
      />
    </Stack>
  );
}
