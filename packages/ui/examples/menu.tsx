"use client";
import { useState } from "react";
import { Menu, Button, Stack } from "@staqui/ui";

export default function MenuExample() {
  const [action, setAction] = useState("Choose an action");
  return (
    <Stack align="start">
      <Menu
        label="Project actions"
        trigger={<Button>Project actions</Button>}
        items={[
          {
            id: "edit",
            label: "Edit project",
            onSelect: () => setAction("Editing project"),
          },
          {
            id: "duplicate",
            label: "Duplicate project",
            onSelect: () => setAction("Local duplicate created"),
          },
          {
            id: "archive",
            label: "Archive project",
            tone: "critical",
            onSelect: () => setAction("Archived locally"),
          },
          { id: "locked", label: "Transfer ownership", disabled: true },
        ]}
      />
      <span role="status">{action}</span>
    </Stack>
  );
}
