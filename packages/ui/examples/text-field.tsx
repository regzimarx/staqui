"use client";
import { TextField, Stack } from "@staqforce/staqui";

export default function TextFieldExample() {
  return (
    <Stack>
      <TextField
        label="Project name"
        placeholder="e.g. Studio collection"
        required
      />
      <TextField
        label="Workspace URL"
        prefix="staq.app/"
        defaultValue="studio"
      />
      <TextField
        label="Project code"
        defaultValue="A!"
        error="Use letters, numbers, and hyphens only."
      />
      <TextField label="Organization" value="North studio" disabled />
    </Stack>
  );
}
