"use client";
import { Thumbnail, Stack } from "@staqui/ui";

export default function ThumbnailExample() {
  return (
    <Stack direction="row" align="center">
      <Thumbnail
        src="/sample-collection.svg"
        alt="Sample collection"
        size="small"
      />
      <Thumbnail src="/sample-collection.svg" alt="Sample collection" />
      <Thumbnail
        src="/sample-collection.svg"
        alt="Sample collection"
        size="large"
      />
    </Stack>
  );
}
