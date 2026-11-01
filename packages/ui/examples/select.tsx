"use client";
import { useState } from "react";
import { Select } from "@staqui/ui";

export default function SelectExample() {
  const [value, setValue] = useState("en");
  return (
    <Select
      label="Default language"
      value={value}
      onValueChange={setValue}
      options={[
        { value: "en", label: "English", group: "Available" },
        { value: "es", label: "Español", group: "Available" },
        { value: "fr", label: "Français", group: "Available" },
        { value: "ja", label: "日本語", group: "Coming soon", disabled: true },
      ]}
    />
  );
}
