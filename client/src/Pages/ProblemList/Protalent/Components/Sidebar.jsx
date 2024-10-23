import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Collapse,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Sidebar = () => {
  const [open, setOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setOpen(!open); // Toggle sidebar open/close state
  };
  return (
    <Box
      sx={{
        width: open ? 240 : 60, // Adjust width based on sidebar state
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        position: "sticky",
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s", // Smooth transition for width change
      }}
    >
      <Collapse in={open}>
        <List>
          {/* Dashboard Link */}
          <ListItem button component={Link} to="/problems/protalent">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          {/* Divider for better grouping */}
          <Divider />

          {/* Virtual Hiring Link */}
          <ListItem
            button
            component={Link}
            to="/problems/protalent/all-problems"
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="All Problems" />
          </ListItem>
        </List>
      </Collapse>
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
