import { Box, Container, Skeleton, Stack } from "@mui/material";
import React from "react";

const TopicLoadig = () => {
  return (
    <Container>
      <Box style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Stack spacing={1}>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rectangular" height={150} />
        </Stack>
      </Box>
    </Container>
  );
};

export default TopicLoadig;
