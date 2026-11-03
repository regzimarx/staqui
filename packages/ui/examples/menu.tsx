"use client";
import { useState } from "react";
import { Menu, Button, Icon, Stack } from "@staqforce-studio/staqui";

export default function MenuExample() {
  const [action, setAction] = useState("Choose an action");
  return (
    <Stack align="stretch" gap="2" style={{ maxWidth: 320 }}>
      <Menu
        label="Project actions"
        trigger={
          <Button fullWidth>
            Project actions{" "}
            <Icon className="sq-menu-chevron" name="chevronDown" size={16} />
          </Button>
        }
        items={[
          {
            id: "edit",
            label: "Rename project",
            icon: <Icon name="settings" size={14} />,
            onSelect: () => setAction("Editing project"),
          },
          {
            id: "duplicate",
            label: "Make a copy",
            icon: <Icon name="copy" size={14} />,
            onSelect: () => setAction("Local duplicate created"),
          },
          {
            id: "archive",
            label: "Archive project",
            icon: <Icon name="chevronDown" size={14} />,
            onSelect: () => setAction("Archived locally"),
          },
          { id: "locked", label: "Transfer ownership", disabled: true },
        ]}
      />
      <span role="status">{action}</span>
    </Stack>
  );
}
