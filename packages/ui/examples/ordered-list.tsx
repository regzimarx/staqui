"use client";
import { OrderedList, ListItem } from "@staqui/ui";

export default function OrderedListExample() {
  return (
    <OrderedList>
      <ListItem>Create a workspace.</ListItem>
      <ListItem>Invite your teammates.</ListItem>
      <ListItem>Publish your first collection.</ListItem>
    </OrderedList>
  );
}
