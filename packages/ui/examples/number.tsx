"use client";
import { Number, Stack } from "@staqforce/staqui";

export default function NumberExample() {
  return (
    <Stack>
      <Number value={123456.78} />
      <Number value={2500} format={{ style: "currency", currency: "USD" }} />
      <Number
        value={0.872}
        format={{ style: "percent", maximumFractionDigits: 1 }}
      />
    </Stack>
  );
}
