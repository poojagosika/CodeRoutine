import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
} from "@mui/material";
import {
  School,
  Code,
  Storage,
  Search,
  Cloud,
  CheckCircle,
} from "@mui/icons-material";

const learningTopics = [
  {
    title: "Top 100 Interview Questions",
    subtitle: "Prepare with the best interview questions.",
    icon: <School sx={{ fontSize: 40, color: "#1976d2" }} />,
  },
  {
    title: "Google Interview Questions",
    subtitle: "Get ready for Google interviewsin 1 Month.",
    icon: <Search sx={{ fontSize: 40, color: "#ff5722" }} />,
  },
  {
    title: "DBMS Interview Questions",
    subtitle: "Master Database Management Systems.",
    icon: <Storage sx={{ fontSize: 40, color: "#4caf50" }} />,
  },
  {
    title: "SQL Interview Questions",
    subtitle: "Learn SQL with real-world scenarios.",
    icon: <Code sx={{ fontSize: 40, color: "#f44336" }} />,
  },
  {
    title: "Amazon Interview Questions",
    subtitle: "Prepare for Amazon's interview process.",
    icon: <Cloud sx={{ fontSize: 40, color: "#3f51b5" }} />,
  },
  {
    title: "Learn JS in 2 Months",
    subtitle: "Become proficient in JavaScript quickly.",
    icon: <CheckCircle sx={{ fontSize: 40, color: "#9c27b0" }} />,
  },
];

const LearningPlan = () => {
  return (
    <Box sx={{ paddingBottom: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontSize: "bold" }}>
          Learning Plan
        </Typography>
        <Button variant="outlined" color="primary">
          View More
        </Button>
      </Box>
      <Grid container spacing={4}>
        {learningTopics.map((topic, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={2}>
              <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                {topic.icon}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div">
                    {topic.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {topic.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LearningPlan;
