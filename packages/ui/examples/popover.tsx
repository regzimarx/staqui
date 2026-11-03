"use client";
import { Popover, Button, ChoiceList } from "@staqforce-studio/staqui";

export default function PopoverExample() {
  return (
    <Popover label="Display options" trigger={<Button>Display options</Button>}>
      <ChoiceList
        label="Show collections"
        hideLabel
        defaultValue={["all"]}
        options={[
          {
            value: "all",
            label: "All collections",
            description: "Include drafts and published collections.",
          },
          {
            value: "published",
            label: "Published only",
            description: "Show collections visible in the store.",
          },
        ]}
      />
    </Popover>
  );
}
