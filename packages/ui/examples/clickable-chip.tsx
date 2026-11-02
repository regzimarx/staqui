"use client";
import { useState } from "react";
import { ClickableChip, Stack } from "@staqforce-studio/staqui";

export default function ClickableChipExample() {
  const [selected, setSelected] = useState<string[]>(["Design"]);
  return (
    <Stack direction="row" gap="2">
      {["Design", "Engineering", "Product"].map((label) => (
        <ClickableChip
          key={label}
          selected={selected.includes(label)}
          onClick={() =>
            setSelected(
              selected.includes(label)
                ? selected.filter((x) => x !== label)
                : [...selected, label],
            )
          }
        >
          {label}
        </ClickableChip>
      ))}
    </Stack>
  );
}
