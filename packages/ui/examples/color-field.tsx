"use client";
import { useState } from "react";
import { ColorField } from "@staqforce-studio/staqui";

export default function ColorFieldExample() {
  const [value, setValue] = useState("#0a2eb5");
  return (
    <ColorField
      label="Brand color"
      value={value}
      onValueChange={setValue}
      description="Enter a six-digit hex color or use the color picker."
    />
  );
}
