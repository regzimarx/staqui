"use client";
import { useState } from "react";
import { Button, Stack } from "@staqui/ui";

export default function ButtonExample() {
  const [count, setCount] = useState(0);
  return (
    <Stack direction="row" gap="3">
      <Button variant="primary" onClick={() => setCount(count + 1)}>
        Add item ({count})
      </Button>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Button variant="tertiary" onClick={() => setCount(count + 1)}>
        Add another
      </Button>
      <Button loading>Saving</Button>
      <Button disabled>Unavailable</Button>
      <Button tone="critical" onClick={() => setCount(Math.max(0, count - 1))}>
        Remove item
      </Button>
    </Stack>
  );
}
