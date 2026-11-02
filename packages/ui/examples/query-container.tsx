"use client";
import { QueryContainer, Grid, Box } from "@staqforce-studio/staqui";

export default function QueryContainerExample() {
  return (
    <QueryContainer name="collection">
      <Grid columns={2} minColumnWidth="10rem">
        <Box background="subtle">Responsive content</Box>
        <Box background="subtle">Resize the viewport</Box>
      </Grid>
    </QueryContainer>
  );
}
