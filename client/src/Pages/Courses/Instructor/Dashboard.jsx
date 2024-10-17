import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Tasks from "./Pages/Tasks";
import Schedule from "./Pages/Schedule";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
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
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Courses />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
