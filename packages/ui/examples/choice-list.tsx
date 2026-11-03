"use client";
import { Badge, ChoiceList } from "@staqforce-studio/staqui";

export default function ChoiceListExample() {
  return (
    <ChoiceList
      label="Workspace plan"
      hideLabel
      defaultValue={["starter"]}
      options={[
        {
          value: "starter",
          label: "Starter",
          description: "For independent makers",
          icon: "✳",
        },
        {
          value: "studio",
          label: "Studio",
          description: "Flexible space for teams",
          icon: "▧",
          badge: (
            <Badge tone="success" size="small">
              Popular
            </Badge>
          ),
        },
        {
          value: "enterprise",
          label: "Enterprise",
          description: "Tools for ambitious teams",
          icon: "▤",
        },
      ]}
    />
  );
}
