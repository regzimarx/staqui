"use client";
import { useState } from "react";
import { Button, ButtonGroup } from "@staqui/ui";

export default function ButtonGroupExample() {
  const [action, setAction] = useState("Draft");
  return (
    <ButtonGroup label="Document actions">
      <Button variant="primary" onClick={() => setAction("Saved locally")}>
        Save draft
      </Button>
      <Button onClick={() => setAction("Changes discarded")}>Discard</Button>
      <span role="status">{action}</span>
    </ButtonGroup>
  );
}
