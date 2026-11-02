"use client";
import { useState } from "react";
import { ChoiceList } from "@staqforce-studio/staqui";

export default function ChoiceListExample() {
  const [value, setValue] = useState(["private"]);
  return (
    <ChoiceList
      label="Workspace visibility"
      value={value}
      onValueChange={setValue}
      name="visibility"
      options={[
        { value: "private", label: "Private — invited members only" },
        { value: "team", label: "Team — everyone in the workspace" },
        {
          value: "public",
          label: "Public — available on a paid plan",
          disabled: true,
        },
      ]}
    />
  );
}
