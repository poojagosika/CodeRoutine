import { Box, Container, Skeleton } from "@mui/material";
import React from "react";

const DiscussLoading = () => {
  return (
    <Container>
      <Box style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Skeleton style={{ height: "80px" }} />
        <Skeleton style={{ height: "70px" }} />
        <Skeleton style={{ height: "60px" }} />
      </Box>
    </Container>
  );
};

export default DiscussLoading;
