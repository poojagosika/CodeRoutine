import React from "react";
import { Box, Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

function PostJobs() {
  const navigate = useNavigate();

  const handlePostJobClick = () => {
    navigate("/jobs/postjobs"); // Navigate to the PostForm page
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        startIcon={<OpenInNewIcon />}
        size="small"
        onClick={handlePostJobClick}
      >
        Post New Job
      </Button>
    </Box>
  );
}

export default PostJobs;
