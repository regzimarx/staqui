"use client";
import { useState } from "react";
import {
  Badge,
  Box,
  Heading,
  Paragraph,
  QueryContainer,
  Stack,
} from "@staqforce-studio/staqui";

export default function QueryContainerExample() {
  const [width, setWidth] = useState(480);

  return (
    <Stack gap="3" style={{ width: "100%", maxWidth: 480 }}>
      <style>{`
        .collection-query-layout {
          display: grid;
          gap: var(--sq-space-2);
        }
        @container collection (min-width: 340px) {
          .collection-query-layout {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
      <Stack direction="row" align="center" justify="space-between" gap="2">
        <label>
          Container width{" "}
          <input
            type="range"
            min={240}
            max={480}
            step={10}
            value={width}
            onChange={(event) => setWidth(event.target.valueAsNumber)}
          />
        </label>
        <Badge>{width}px max</Badge>
      </Stack>
      <QueryContainer
        name="collection"
        style={{ width: "100%", maxWidth: width }}
      >
        <Box background="subtle" radius="large" padding="4">
          <Stack gap="3">
            <Heading size="small">Collection overview</Heading>
            <div className="collection-query-layout">
              <Box background="surface" radius="medium" padding="3">
                <Heading size="small">24 products</Heading>
                <Paragraph>Available in the store</Paragraph>
              </Box>
              <Box background="surface" radius="medium" padding="3">
                <Heading size="small">8 drafts</Heading>
                <Paragraph>Ready to review</Paragraph>
              </Box>
            </div>
          </Stack>
        </Box>
      </QueryContainer>
    </Stack>
  );
}
