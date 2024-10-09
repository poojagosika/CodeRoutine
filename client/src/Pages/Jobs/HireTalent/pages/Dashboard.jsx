// Dashboard.js
import React from "react";
import Welcome from "../component/Welcome";
import ActiveJobsSection from "../component/ActiveJobsSection";
import { Box } from "@mui/material";
import AllJobs from "../component/AllJobs";

function Dashboard() {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2} p={3}>
      <Welcome />
      <ActiveJobsSection />
      <AllJobs />
    </Box>
  );
}

export default Dashboard;
