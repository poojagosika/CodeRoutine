import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Box } from "@mui/system";

const courses = [
  {
    title: "System Design Course",
    description:
      "Learn the principles of scalable systems architecture, including load balancing, sharding, and microservices.",
    duration: "8 Weeks",
    titleColor: "#00796B",
    btnColor: "info",
  },
  {
    title: "Data Structures & Algorithms",
    description:
      "Master problem-solving techniques and coding challenges through advanced data structures and algorithms.",
    duration: "10 Weeks",
    titleColor: "#3F51B5",
    btnColor: "primary",
  },
  {
    title: "Full Stack Web Development",
    description:
      "Become proficient in front-end and back-end technologies including HTML, CSS, JavaScript, React, and Node.js.",
    duration: "12 Weeks",
    titleColor: "#F57C00",
    btnColor: "warning",
  },
  {
    title: "Complete AI/ML Course",
    description:
      "Dive deep into machine learning models, neural networks, and real-world applications of AI in various domains.",
    duration: "14 Weeks",
    titleColor: "#8E24AA",
    btnColor: "secondary",
  },
];

const Courses = () => {
  return (
    <Box sx={{ paddingBottom: 4 }}>
      <Grid container spacing={4}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  gutterBottom
                  color={course.titleColor}
                >
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ marginTop: 2, fontWeight: "bold" }}
                >
                  Duration: {course.duration}
                </Typography>
              </CardContent>
              <Button variant="contained" color="error">
                Learn More
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Courses;
