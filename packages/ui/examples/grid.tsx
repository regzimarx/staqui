"use client";
import { Grid, Box } from "@staqforce/staqui";

export default function GridExample() {
  return (
    <Grid columns={3} minColumnWidth="8rem">
      {["Draft", "In review", "Published"].map((x) => (
        <Box key={x} background="subtle">
          {x}
        </Box>
      ))}
    </Grid>
  );
}
