"use client";
import { DropZone } from "@staqforce/staqui";

export default function DropZoneExample() {
  return (
    <DropZone
      label="Project attachments"
      accept=".png,.jpg,.pdf"
      multiple
      description="PNG, JPG or PDF, up to 10 MB each. Files stay in this browser."
    />
  );
}
