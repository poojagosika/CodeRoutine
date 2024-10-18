import React from "react";
import { Box } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import AllProblems from "./Pages/AllProblems";

function Protalent() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "scroll",
        }}
      >
        <Routes>
          {/* Base Dashboard Route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="all-problems" element={<AllProblems />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Protalent;
