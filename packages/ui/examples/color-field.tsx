"use client";
import { useState } from "react";
import { ColorField } from "@staqforce-studio/staqui";

export default function ColorFieldExample() {
  const [value, setValue] = useState("#008060");
  return (
    <ColorField label="Brand color" value={value} onValueChange={setValue} />
  );
}
