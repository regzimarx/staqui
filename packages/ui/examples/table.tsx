"use client";
import { useState } from "react";
import { Table, Badge } from "@staqforce/staqui";

export default function TableExample() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <Table
      label="Collections"
      rows={[
        { id: "01", name: "Essentials", items: 24, status: "Published" },
        { id: "02", name: "Studio favorites", items: 12, status: "Draft" },
        { id: "03", name: "Spring collection", items: 36, status: "Published" },
      ]}
      rowKey={(r) => r.id}
      selected={selected}
      onSelectionChange={setSelected}
      columns={[
        {
          id: "name",
          header: "Collection",
          cell: (r) => r.name,
          sortValue: (r) => r.name,
        },
        {
          id: "items",
          header: "Items",
          cell: (r) => r.items,
          align: "end",
          sortValue: (r) => r.items,
        },
        {
          id: "status",
          header: "Status",
          cell: (r) => (
            <Badge tone={r.status === "Published" ? "success" : "neutral"}>
              {r.status}
            </Badge>
          ),
        },
      ]}
    />
  );
}
