"use client";
import { useState } from "react";
import { Modal, Button, TextField } from "@staqforce-studio/staqui";

export default function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      title="Create a collection"
      description="Give your collection a name. This example keeps your work in the browser."
      trigger={<Button variant="primary">Create collection</Button>}
      open={open}
      onOpenChange={setOpen}
      footer={
        <Button variant="primary" onClick={() => setOpen(false)}>
          Done
        </Button>
      }
    >
      <TextField
        label="Collection name"
        placeholder="e.g. Essentials"
        autoFocus
      />
    </Modal>
  );
}
