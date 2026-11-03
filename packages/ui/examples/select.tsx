"use client";
import { Select } from "@staqforce-studio/staqui";

export default function SelectExample() {
  return (
    <Select
      label="Invite as"
      defaultValue="administrator"
      options={[
        {
          value: "administrator",
          label: "Administrator",
          description: "Manage all settings",
        },
        {
          value: "editor",
          label: "Editor",
          description: "Edit and publish projects",
        },
        {
          value: "viewer",
          label: "Viewer",
          description: "View projects and reports",
        },
      ]}
    />
  );
}
