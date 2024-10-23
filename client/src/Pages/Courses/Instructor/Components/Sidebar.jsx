import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setOpen((prevOpen) => !prevOpen); // Toggle sidebar open/close state
  };

  const sideMenu = [
    {
      name: "Home",
      icon: <HomeIcon />,
      link: "/courses/instructor",
    },
    {
      name: "All Courses",
      icon: <WorkIcon />,
      link: "/courses/instructor/all",
    },
    {
      name: "Tasks",
      icon: <WorkIcon />,
      link: "/courses/instructor/tasks",
    },
    {
      name: "Schedule",
      icon: <SchoolIcon />,
      link: "/courses/instructor/schedule",
    },
  ];

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
        transition: "width 0.3s ease", // Add smooth transition to width
      }}
    >
      {/* Collapsible List */}
      <List>
        {sideMenu.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.link}
            sx={{
              backgroundColor:
                window.location.pathname === item.link ? "#f0f0f0" : "",
              height: "60px",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              transition: "padding 0.3s ease", // Optional: smooth transition for padding
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Box
              sx={{
                opacity: open ? 1 : 0, // Show/hide text with transition
                transition: "opacity 0.3s ease", // Smooth transition for text
              }}
            >
              {open && <ListItemText primary={item.name} />}
            </Box>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          textAlign: "right",
          position: "sticky", // Fix the position
          bottom: 0, // Stick to the bottom
          width: open ? 240 : 60,
          transition: "width 0.3s ease", // Add smooth transition to width
        }}
      >
        <Divider />

        <IconButton
          onClick={toggleSidebar}
          aria-label={open ? "Close Sidebar" : "Open Sidebar"}
        >
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
