"use client";
import { useState } from "react";
import { SearchField, Text, Stack } from "@staqforce-studio/staqui";

export default function SearchFieldExample() {
  const [query, setQuery] = useState("");
  return (
    <Stack>
      <SearchField
        label="Search collections"
        value={query}
        onValueChange={setQuery}
        placeholder="Try Essentials"
      />
      <Text tone="muted">
        {["Essentials", "Spring collection", "Studio favorites"]
          .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
          .join(", ") || "No matching collections"}
      </Text>
    </Stack>
  );
}
