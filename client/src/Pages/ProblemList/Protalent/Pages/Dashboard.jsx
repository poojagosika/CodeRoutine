// Dashboard.js
import React from "react";
import { Box } from "@mui/material";
import Welcome from "../Components/Welcome";
import ActiveJobsSection from "../Components/ActiveJobsSection";
import AllProblem from "../Components/AllProblem";

function Dashboard() {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} p={3}>
      <Welcome />
      <ActiveJobsSection />
      <AllProblem />
    </Box>
  );
}

export default Dashboard;
