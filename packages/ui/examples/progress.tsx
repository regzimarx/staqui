"use client";
import { useState } from "react";
import { Progress, Button, Stack } from "@staqforce-studio/staqui";

export default function ProgressExample() {
  const [value, setValue] = useState(40);
  return (
    <Stack>
      <Progress label="Import progress" value={value} />
      <Button onClick={() => setValue(value >= 100 ? 0 : value + 20)}>
        {value >= 100 ? "Reset" : "Advance import"}
      </Button>
    </Stack>
  );
}
