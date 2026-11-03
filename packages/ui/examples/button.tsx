"use client";
import { useState } from "react";
import { Button, Stack } from "@staqforce-studio/staqui";

export default function ButtonExample() {
  const [count, setCount] = useState(0);
  return (
    <Stack gap="3">
      <Stack direction="row" gap="3" align="center">
        <Button variant="primary" onClick={() => setCount(count + 1)}>
          Add item ({count})
        </Button>
        <Button onClick={() => setCount(0)}>Reset</Button>
        <Button variant="tertiary" onClick={() => setCount(count + 1)}>
          Add another
        </Button>
      </Stack>
      <Stack direction="row" gap="3" align="center">
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </Stack>
      <Stack direction="row" gap="3" align="center">
        <Button variant="primary" loading>
          Saving
        </Button>
        <Button disabled>Unavailable</Button>
        <Button
          tone="critical"
          onClick={() => setCount(Math.max(0, count - 1))}
        >
          Remove item
        </Button>
      </Stack>
    </Stack>
  );
}
