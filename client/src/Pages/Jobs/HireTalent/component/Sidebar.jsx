import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true); // State to control sidebar open/close

  const toggleSidebar = () => {
    setOpen(!open); // Toggle sidebar open/close state
  };

  return (
    <Box
      sx={{
        width: open ? 240 : 60, // Adjust width based on open state
        height: "100vh",
        backgroundColor: "#f0f0f0",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        position: "sticky",
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Place toggle button at the bottom
        transition: "width 0.3s ease",
      }}
    >
      {/* Sidebar Menu */}
      <Collapse in={open}>
        <List>
          {/* Dashboard Link */}
          <ListItem button component={Link} to="/jobs/hiretalent">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>

          <Divider />

          {/* Virtual Hiring Link */}
          <ListItem
            button
            component={Link}
            to="/jobs/hiretalent/virtual-hiring"
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Virtual Hiring" />}
          </ListItem>

          {/* Campus Hiring Link */}
          <ListItem button component={Link} to="/jobs/hiretalent/campus-hiring">
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Campus Hiring" />}
          </ListItem>
        </List>
      </Collapse>

      {/* Toggle Button */}
      <Box
        sx={{
          textAlign: "right",
          position: "sticky ", // Fix the position
          bottom: 0, // Stick to the bottom
          width: open ? 240 : 60,
        }}
      >
        <Divider />

        <IconButton onClick={toggleSidebar}>
          {open ? (
            <ChevronLeftIcon sx={{ fontSize: "40px" }} />
          ) : (
            <ChevronRightIcon sx={{ fontSize: "40px" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
