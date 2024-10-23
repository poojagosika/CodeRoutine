import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./component/Sidebar";
import Dashboard from "./pages/Dashboard";
import VirtualHiring from "./pages/VirtualHiring";
import CampusHiring from "./pages/CampusHiring";
import { Route, Routes } from "react-router-dom";

function Hiretalent() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Routes>
          {/* Base Dashboard Route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="virtual-hiring" element={<VirtualHiring />} />
          <Route path="campus-hiring" element={<CampusHiring />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Hiretalent;
