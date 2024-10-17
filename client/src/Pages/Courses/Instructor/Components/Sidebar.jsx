import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 240,
        minHeight: "100vh",
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        position: "sticky",
        left: 0,
        display: "flex",
        flexDirection: "column",
        paddingTop: "10px",
      }}
    >
      {/* Dashboard Link */}
      <ListItem button component={Link} to="/courses/instructor">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem button component={Link} to="/courses/instructor/all">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="All Courses" />
      </ListItem>

      {/* Virtual Hiring Link */}
      <ListItem button component={Link} to="/courses/instructor/tasks">
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>

      {/* Campus Hiring Link */}
      <ListItem button component={Link} to="/courses/instructor/schedule">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" />
      </ListItem>
    </Box>
  );
};

export default Sidebar;
