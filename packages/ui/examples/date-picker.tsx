"use client";
import { useState } from "react";
import { DatePicker, Stack, Badge } from "@staqforce/staqui";

export default function DatePickerExample() {
  const [value, setValue] = useState<
    import("@staqforce/staqui").DateRange | undefined
  >({ from: new Date(2026, 10, 10), to: new Date(2026, 10, 14) });
  return (
    <Stack align="start">
      <DatePicker
        label="Project timeline"
        mode="range"
        defaultMonth={new Date(2026, 10, 1)}
        value={value}
        onValueChange={setValue}
      />
      <Badge>
        {value?.from
          ? `${value.from.toLocaleDateString()} – ${value.to?.toLocaleDateString() ?? "Choose end date"}`
          : "Choose a range"}
      </Badge>
    </Stack>
  );
}
