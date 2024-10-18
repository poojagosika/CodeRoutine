import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        backgroundColor: "#f0f0f0",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        position: "sticky",
        left: 0,
      }}
    >
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
        <ListItem button component={Link} to="/problems/protalent/all-problems">
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="All Problems" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
