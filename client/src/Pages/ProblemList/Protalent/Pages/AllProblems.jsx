import React from "react";
import AllProblem from "../Components/AllProblem";
import { Box, Typography } from "@mui/material";

function AllProblems() {
  return (
    <Box gap={2} p={3}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        All Problems
      </Typography>
      <AllProblem />
    </Box>
  );
}

export default AllProblems;
