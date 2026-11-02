"use client";
import { Popover, Button, ChoiceList } from "@staqforce-studio/staqui";

export default function PopoverExample() {
  return (
    <Popover label="Display options" trigger={<Button>Display options</Button>}>
      <ChoiceList
        label="Show collections"
        defaultValue={["all"]}
        options={[
          { value: "all", label: "All collections" },
          { value: "published", label: "Published only" },
        ]}
      />
    </Popover>
  );
}
