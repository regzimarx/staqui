"use client";
import { useState } from "react";
import { Clickable, Stack, Icon } from "@staqforce-studio/staqui";

export default function ClickableExample() {
  const [selected, setSelected] = useState(false);
  return (
    <Clickable onClick={() => setSelected(!selected)} aria-pressed={selected}>
      <Stack direction="row" align="center">
        <Icon name="package" />
        <span>
          {selected
            ? "Collection selected"
            : "Select the Essentials collection"}
        </span>
      </Stack>
    </Clickable>
  );
}
