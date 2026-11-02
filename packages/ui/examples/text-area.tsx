"use client";
import { useState } from "react";
import { TextArea } from "@staqforce-studio/staqui";

export default function TextAreaExample() {
  const [value, setValue] = useState(
    "A considered collection of everyday essentials.",
  );
  return (
    <TextArea
      label="Project description"
      placeholder="What are you working on?"
      maxLength={240}
      description={`${value.length}/240 characters`}
      value={value}
      onValueChange={setValue}
    />
  );
}
