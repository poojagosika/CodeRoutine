import React from "react";
import { Box, Container, Typography } from "@mui/material";
import CourseList from "./components/CourseList";
const CoursesPage = () => {
  return (
    <Container sx={{ mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom >
        All Courses
      </Typography>
      <CourseList />
    </Container>
  );
};

export default CoursesPage;
