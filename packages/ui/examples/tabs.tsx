"use client";
import { Tabs } from "@staqforce-studio/staqui";

export default function TabsExample() {
  return (
    <Tabs
      label="Project views"
      items={[
        {
          value: "overview",
          label: "Overview",
          content: "Project summary and milestones.",
        },
        {
          value: "activity",
          label: "Activity",
          content: "Recent updates from your team.",
        },
        {
          value: "settings",
          label: "Settings",
          content: "Manage project preferences.",
        },
      ]}
    />
  );
}
