"use client";
import { OrderedList, ListItem } from "@staqforce-studio/staqui";

export default function OrderedListExample() {
  return (
    <OrderedList>
      <ListItem>Create a workspace.</ListItem>
      <ListItem>Invite your teammates.</ListItem>
      <ListItem>Publish your first collection.</ListItem>
    </OrderedList>
  );
}
