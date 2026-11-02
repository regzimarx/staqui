"use client";
import { useState } from "react";
import { ColorPicker } from "@staqforce/staqui";

export default function ColorPickerExample() {
  const [value, setValue] = useState("#0a2eb5");
  return (
    <ColorPicker label="Accent color" value={value} onValueChange={setValue} />
  );
}
