"use client";
import { useState } from "react";
import { DateField } from "@staqforce/staqui";

export default function DateFieldExample() {
  const [value, setValue] = useState("2026-11-12");
  return (
    <DateField
      label="Launch date"
      value={value}
      onValueChange={setValue}
      min="2026-01-01"
      max="2027-12-31"
      description="Choose a date in 2026 or 2027."
    />
  );
}
