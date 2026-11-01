"use client";
import { useState } from "react";
import { Chip, Stack, Button } from "@staqui/ui";

export default function ChipExample() {
  const [tags, setTags] = useState(["Summer", "Essentials", "Handmade"]);
  return (
    <Stack direction="row" gap="2">
      {tags.map((tag) => (
        <Chip
          key={tag}
          onRemove={() => setTags(tags.filter((t) => t !== tag))}
          removeLabel={`Remove ${tag}`}
        >
          {tag}
        </Chip>
      ))}
      {tags.length === 0 && (
        <Button onClick={() => setTags(["Summer", "Essentials", "Handmade"])}>
          Reset tags
        </Button>
      )}
    </Stack>
  );
}
