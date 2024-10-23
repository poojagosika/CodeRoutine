import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
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
  const sideMenu = [
    {
      name: "Home",
      icon: <DashboardIcon />,
      link: "/jobs/hiretalent",
    },
    {
      name: "Virtual Hiring",
      icon: <WorkIcon />,
      link: "/jobs/hiretalent/virtual-hiring",
    },
    {
      name: "Schedule",
      icon: <SchoolIcon />,
      link: "/jobs/hiretalent/campus-hiring",
    },
  ];

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
        transition: "width 0.3s ease ",
      }}
    >
      {/* Sidebar Menu */}
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
              alignContent: "center",
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
        {/* Dashboard Link */}
      </List>

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
