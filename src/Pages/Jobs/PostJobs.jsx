import React from "react";
import { Box, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function PostJobs() {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      padding="16px"
    >
      <Button
        variant="contained"
        color="primary"
        startIcon={<OpenInNewIcon />}
        size="small"
      >
        Post New Job
      </Button>
    </Box>
  );
}

export default PostJobs;
