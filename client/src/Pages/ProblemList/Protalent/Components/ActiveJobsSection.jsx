// ActiveJobsSection.js
import React from "react";
import { Box, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";

function ActiveJobsSection() {
  const getIconStyle = (color) => ({
    backgroundColor: color,
    padding: 2,
    borderRadius: "50%",
    color: "white",
  });

  const JobCard = ({ color, title, count }) => (
    <Box display="flex" gap={2} alignItems="center">
      <Box sx={getIconStyle(color)}>
        <WorkIcon />
      </Box>
      <Box>
        <Typography>{title}</Typography>
        <Typography>{count}</Typography>
      </Box>
    </Box>
  );

  const JobDate = ({ color, title, count }) => (
    <Box display="flex" gap={2} alignItems="center">
      <Box sx={getIconStyle(color)}>
        <CalendarMonthIcon />
      </Box>
      <Box>
        <Typography>{title}</Typography>
        <Typography>{count}</Typography>
      </Box>
    </Box>
  );
  const JobTest = ({ color, title, count }) => (
    <Box display="flex" gap={2} alignItems="center">
      <Box sx={getIconStyle(color)}>
        <ArticleIcon />
      </Box>
      <Box>
        <Typography>{title}</Typography>
        <Typography>{count}</Typography>
      </Box>
    </Box>
  );
  return (
    <Box
      display="flex"
      gap={2}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent={"space-around"}
      alignItems="center"
      sx={{
        backgroundColor: "lightgray",
        padding: 2,
      }}
      borderRadius="20px"
    >
      {/* Reusable Job Cards */}
      <JobCard color="rgb(0, 204, 153)" title="Active Jobs" count="0" />
      <JobDate
        color="rgb(86, 122, 249)"
        title="Applicants till Date"
        count="0"
      />
      <JobTest color="rgb(96, 108, 309)" title="Active Tests" count="0" />
    </Box>
  );
}

export default ActiveJobsSection;
