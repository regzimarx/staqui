"use client";
import { MoneyField } from "@staqui/ui";

export default function MoneyFieldExample() {
  return (
    <MoneyField
      label="Monthly budget"
      currency="USD"
      defaultValue="2500"
      min="0"
      description="Amounts are entered as decimal values."
    />
  );
}
