"use client";
import { NumberField } from "@staqui/ui";

export default function NumberFieldExample() {
  return (
    <NumberField
      label="Team seats"
      min="1"
      max="100"
      step="1"
      defaultValue="8"
      suffix="members"
    />
  );
}
