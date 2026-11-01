"use client";
import { useState } from "react";
import { EmptyState, Button, Badge } from "@staqui/ui";

export default function EmptyStateExample() {
  const [created, setCreated] = useState(false);
  return (
    <EmptyState
      title={created ? "Your first collection" : "No collections yet"}
      action={
        created ? (
          <Badge tone="success">Local example created</Badge>
        ) : (
          <Button variant="primary" onClick={() => setCreated(true)}>
            Create collection
          </Button>
        )
      }
    >
      {created
        ? "Essentials is ready to organize."
        : "Give related items a place to belong."}
    </EmptyState>
  );
}
